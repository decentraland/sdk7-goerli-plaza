import { Animator, Entity, Transform, engine } from '@dcl/sdk/ecs'
import ReactEcs, { EntityPropTypes, PositionUnit, UiEntity } from '@dcl/sdk/react-ecs'
import { SpriteAnim } from './spriteComponent'

export type SpriteAnimProps =  Omit<EntityPropTypes, 'uiTransform' | 'uiBackground'> & {
  children?: ReactEcs.JSX.Component[] 
  spriteAnimator:SpriteAnimation 
  uiTransform?: Omit<
    NonNullable<EntityPropTypes['uiTransform']>,
    '' 
  >
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
    entity:Entity
    texture:string    
  
    constructor(texture:string, rows:number, columns:number, fps:number){
      this.entity = engine.addEntity()
      SpriteAnim.create(this.entity,{
        id: "default",  
        countU: rows,   
        countV: columns,   
        stepU: 1/rows,    
        stepV: 1/columns,    
        currentSpriteU: 0,  
        currentSpriteV: 0,  
        elapsed: 0,  
        freq: (fps != 0)?1/fps:1 ,
      })  

      this.texture = texture
    }   
  
    uvs():number[]{
      
    const spriteInfo = SpriteAnim.get(this.entity)

      return  [
        spriteInfo.currentSpriteU * spriteInfo.stepU, 1 - ((spriteInfo.currentSpriteV + 1) * spriteInfo.stepV),
        spriteInfo.currentSpriteU * spriteInfo.stepU, 1 - (spriteInfo.currentSpriteV * spriteInfo.stepV),
        (spriteInfo.currentSpriteU + 1) * spriteInfo.stepU, 1 - (spriteInfo.currentSpriteV * spriteInfo.stepV),
        (spriteInfo.currentSpriteU + 1) * spriteInfo.stepU, 1 - ((spriteInfo.currentSpriteV + 1) * spriteInfo.stepV)
      ]    
  }
}

