import { Entity, Schemas, engine } from '@dcl/sdk/ecs'
import ReactEcs, { EntityPropTypes, UiEntity } from '@dcl/sdk/react-ecs'

export const SpriteAnim = engine.defineComponent('sprite-anim-id', {
  id: Schemas.String,
  countU: Schemas.Number,
  countV: Schemas.Number,
  stepU: Schemas.Number,
  stepV: Schemas.Number,
  elapsed: Schemas.Number,
  freq: Schemas.Number,
  currentSprite: Schemas.Number,
  startSpriteIndex: Schemas.Number,
  endSpriteIndex: Schemas.Number,
  playing: Schemas.Boolean,
  loop: Schemas.Boolean
})

// system to step along each sprite in each row with the given frequency
export function SpriteAnimSystem(dt: number) {

  const spriteGroup = engine.getEntitiesWith(SpriteAnim)

  for (const [entity] of spriteGroup) {

    const spriteInfo = SpriteAnim.getMutable(entity)

    if (!spriteInfo.playing) return

    spriteInfo.elapsed += dt

    if (spriteInfo.elapsed >= spriteInfo.freq) {

      const startSpriteIndex = Math.min(spriteInfo.startSpriteIndex, spriteInfo.countU * spriteInfo.countV)

      let endSpriteIndex = Math.min(spriteInfo.endSpriteIndex, spriteInfo.countU * spriteInfo.countV - 1)
      endSpriteIndex = Math.max(endSpriteIndex, startSpriteIndex)

      spriteInfo.currentSprite += 1

      if (spriteInfo.currentSprite > endSpriteIndex) {
        if (spriteInfo.loop) {
          spriteInfo.currentSprite = startSpriteIndex
        } else {
          spriteInfo.currentSprite -= 1
          spriteInfo.playing = false
        }
      }

      spriteInfo.elapsed = 0
    }
  }
}

//helper functions for converting from current step to u and v coordinates
//should define the spriteInfo type
const spriteToV = (spriteInfo: any) => Math.floor(spriteInfo.currentSprite / spriteInfo.countU)
const spriteToU = (spriteInfo: any) => spriteInfo.currentSprite % (spriteInfo.countU)

export type SpriteAnimProps = Omit<EntityPropTypes, 'uiBackground'> & {
  children?: ReactEcs.JSX.Component[]
  spriteAnimator: SpriteAnimation
  uiBackground?: Omit<
    NonNullable<EntityPropTypes['uiBackground']>,
    'textureMode' | 'uvs' | 'texture'
  >
}

export function UIAnimatedSprite(props: SpriteAnimProps) {
  return <UiEntity
    uiTransform={
      props.uiTransform
    }>

    <UiEntity uiTransform={{
      width: '100%',
      height: '100%',
      positionType: 'absolute',
      display: props.spriteAnimator.visible ? 'flex' : 'none'
    }}
      uiBackground={{
        textureMode: 'stretch',
        uvs: props.spriteAnimator.uvs(),
        texture: {
          src: props.spriteAnimator.texture,
        },
      }}>

      {props.children}
    </UiEntity>

  </UiEntity>
}

export class SpriteAnimation {
  entity: Entity
  texture: string
  visible: boolean = false

  constructor(texture: string, rows: number, columns: number, fps: number, startSpriteIndex?: number, endSpriteIndex?: number, playing?: boolean, loop?: boolean) {
    this.entity = engine.addEntity()
    SpriteAnim.create(this.entity, {
      id: "default",
      countU: rows,
      countV: columns,
      stepU: 1 / rows,
      stepV: 1 / columns,
      elapsed: 0,
      freq: (fps != 0) ? 1 / fps : 1,
      startSpriteIndex: startSpriteIndex || 0,
      endSpriteIndex: endSpriteIndex !== undefined ? endSpriteIndex : rows * columns - 1,
      currentSprite: startSpriteIndex || 0,
      playing: playing !== undefined ? playing : true,
      loop: loop !== undefined ? loop : true,
    })

    this.texture = texture
  }

  uvs(): number[] {

    const spriteInfo = SpriteAnim.get(this.entity)

    return [
      spriteToU(spriteInfo) * spriteInfo.stepU, 1 - ((spriteToV(spriteInfo) + 1) * spriteInfo.stepV),
      spriteToU(spriteInfo) * spriteInfo.stepU, 1 - (spriteToV(spriteInfo) * spriteInfo.stepV),
      (spriteToU(spriteInfo) + 1) * spriteInfo.stepU, 1 - (spriteToV(spriteInfo) * spriteInfo.stepV),
      (spriteToU(spriteInfo) + 1) * spriteInfo.stepU, 1 - ((spriteToV(spriteInfo) + 1) * spriteInfo.stepV)
    ]
  }

  show() {
    this.visible = true
  }
  hide() {
    this.visible = false
  }

  toggle() {
    this.visible = !this.visible
  }

  start() {
    const spriteInfo = SpriteAnim.getMutable(this.entity)
    if (!spriteInfo.loop) spriteInfo.currentSprite = spriteInfo.startSpriteIndex
    spriteInfo.playing = true
  }

  stop() {
    const spriteInfo = SpriteAnim.getMutable(this.entity)
    spriteInfo.playing = false
  }
}

engine.addSystem(SpriteAnimSystem)