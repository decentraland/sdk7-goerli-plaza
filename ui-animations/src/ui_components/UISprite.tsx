import ReactEcs, { EntityPropTypes, UiEntity } from "@dcl/sdk/react-ecs"


export type SpriteAtlasProps = Omit<EntityPropTypes, 'uiTransform' | 'uiBackground'> &{
    children?: ReactEcs.JSX.Component[] 
    texture:string 
    left:number    
    right:number
    top:number
    bottom:number
    uiTransform?: Omit<
    NonNullable<EntityPropTypes['uiTransform']>,
    '' 
    > 
    uiBackground?: Omit<
      NonNullable<EntityPropTypes['uiBackground']>,
      'textureMode' | 'uvs' | 'texture'
    >  
  }
  
  export function UISprite(props: SpriteAtlasProps) {
    return  <UiEntity uiTransform={ props.uiTransform} >    
              <UiEntity
                uiTransform={{
                  width:"100%",
                  height: "100%"
                }} 
                uiBackground={{ 
                  textureMode: 'stretch',
                  uvs:  [
                    props.left, props.bottom,
                    props.left,  props.top,
                    props.right,  props.top,
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

