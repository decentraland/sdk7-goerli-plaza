import { Schemas, engine } from "@dcl/sdk/ecs"
import ReactEcs, { EntityPropTypes, UiEntity } from "@dcl/sdk/react-ecs"

export const SpriteAtlas = engine.defineComponent('sprite-atlas-id', {
  countU: Schemas.Number,
  countV: Schemas.Number,
  stepU: Schemas.Number,
  stepV: Schemas.Number,
  currentSpriteU: Schemas.Number,
  currentSpriteV: Schemas.Number,
})


export type SpriteAtlasProps = Omit<EntityPropTypes, 'uiBackground'> & {
  children?: ReactEcs.JSX.Component[]
  texture: string
  left: number
  right: number
  top: number
  bottom: number
  uiBackground?: Omit<
    NonNullable<EntityPropTypes['uiBackground']>,
    'textureMode' | 'uvs' | 'texture'
  >
}

export function UISprite(props: SpriteAtlasProps) {
  return <UiEntity uiTransform={props.uiTransform} >
    <UiEntity
      uiTransform={{
        width: "100%",
        height: "100%"
      }}
      uiBackground={{
        textureMode: 'stretch',
        uvs: [
          props.left, props.bottom,
          props.left, props.top,
          props.right, props.top,
          props.right, props.bottom
        ],
        texture: {
          src: props.texture,
        },
      }}>
      {props.children}
    </UiEntity>
  </UiEntity>
}

