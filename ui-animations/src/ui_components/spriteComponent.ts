import { Schemas, engine } from "@dcl/sdk/ecs";

  
export const SpriteAtlas = engine.defineComponent('sprite-atlas-id', {       
    countU: Schemas.Number,   
    countV: Schemas.Number,   
    stepU: Schemas.Number,    
    stepV: Schemas.Number,    
    currentSpriteU: Schemas.Number,  
    currentSpriteV: Schemas.Number,        
  })

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
