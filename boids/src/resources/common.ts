
/*
const INVISIBLE_MATERIAL = new BasicMaterial()
const INVISIBLE_MATERIAL_texture = new Texture('images/transparent-texture.png')
INVISIBLE_MATERIAL.texture = INVISIBLE_MATERIAL_texture
INVISIBLE_MATERIAL.alphaTest = 1
*/


//const GLTF_CACHE:Record<string,GLTFShape> = {}



export class CommonResources {
    static RESOURCES = {
        models:{
          names:{
            
          }
        },
        textures: {
          //sprite_sheet: spriteSheetTexture,
          /*transparent: {
            texture: INVISIBLE_MATERIAL_texture,
            size:{sourceHeight:1,sourceWidth:1} //ImageSection
          }*/
          
        },
        materials: {
          //sprite_sheet: spriteSheetMaterial
          //transparent: INVISIBLE_MATERIAL
        },
        strings:{
           
        },
        images:{
          portrait:{
          }
        }
      }
}

/*
export function getOrCreateGLTFShape(model:string):GLTFShape{
  let shape:GLTFShape = GLTF_CACHE[model]
  if(!shape){
    log("miss gltf cache",model)
    shape = new GLTFShape(model)
    GLTF_CACHE[model] = shape
  }else{
    log("hit gltf cache",model)
  }
  return shape;
}*/
