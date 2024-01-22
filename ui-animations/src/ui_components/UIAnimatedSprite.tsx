import { Entity, Schemas, engine } from '@dcl/sdk/ecs'
import ReactEcs, { EntityPropTypes, UiEntity } from '@dcl/sdk/react-ecs'

export const SpriteAnim = engine.defineComponent('sprite-anim-id', {
  id: Schemas.String,
  countU: Schemas.Number,
  countV: Schemas.Number,
  stepU: Schemas.Number,
  stepV: Schemas.Number,
  currentSpriteU: Schemas.Number,
  currentSpriteV: Schemas.Number,
  elapsed: Schemas.Number,
  freq: Schemas.Number,
})

// system to step along each sprite in each row with the given frequency
export function SpriteAnimSystem(dt: number) {

  const spriteGroup = engine.getEntitiesWith(SpriteAnim)

  for (const [entity] of spriteGroup) {

    const spriteInfo = SpriteAnim.getMutable(entity)

    spriteInfo.elapsed += dt

    if (spriteInfo.elapsed >= spriteInfo.freq) {

      spriteInfo.currentSpriteU += 1

      if (spriteInfo.currentSpriteU >= spriteInfo.countU) {
        spriteInfo.currentSpriteU = 0
        spriteInfo.currentSpriteV += 1
      }

      if (spriteInfo.currentSpriteV >= spriteInfo.countV) {

        spriteInfo.currentSpriteU = 0
        spriteInfo.currentSpriteV = 0
      }

      spriteInfo.elapsed = 0
    }
  }
}


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
    }
    uiBackground={{
      textureMode: 'stretch',
      uvs: props.spriteAnimator.uvs(),
      texture: {
        src: props.spriteAnimator.texture,
      },
    }}>
    {props.children}
  </UiEntity>
}

export class SpriteAnimation {
  entity: Entity
  texture: string

  constructor(texture: string, rows: number, columns: number, fps: number) {
    this.entity = engine.addEntity()
    SpriteAnim.create(this.entity, {
      id: "default",
      countU: rows,
      countV: columns,
      stepU: 1 / rows,
      stepV: 1 / columns,
      currentSpriteU: 0,
      currentSpriteV: 0,
      elapsed: 0,
      freq: (fps != 0) ? 1 / fps : 1,
    })

    this.texture = texture
  }

  uvs(): number[] {

    const spriteInfo = SpriteAnim.get(this.entity)

    return [
      spriteInfo.currentSpriteU * spriteInfo.stepU, 1 - ((spriteInfo.currentSpriteV + 1) * spriteInfo.stepV),
      spriteInfo.currentSpriteU * spriteInfo.stepU, 1 - (spriteInfo.currentSpriteV * spriteInfo.stepV),
      (spriteInfo.currentSpriteU + 1) * spriteInfo.stepU, 1 - (spriteInfo.currentSpriteV * spriteInfo.stepV),
      (spriteInfo.currentSpriteU + 1) * spriteInfo.stepU, 1 - ((spriteInfo.currentSpriteV + 1) * spriteInfo.stepV)
    ]
  }
}

engine.addSystem(SpriteAnimSystem)