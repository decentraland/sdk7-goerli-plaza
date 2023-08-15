import { TextShape, Transform, Billboard, engine,  Entity, GltfContainer, pointerEventsSystem, InputAction } from "@dcl/sdk/ecs"
import { Vector3, Quaternion } from "@dcl/sdk/math"
import { createBaseScene } from "./baseScene"
import { nftCollection, createPainting } from "./nft"
import { createScene } from "./scene1"
import { SCENE_MGR } from "./global"
import { hideScene, showScene } from "./modules/SceneMgmt/sceneManager"
import { createScene2 } from "./scene2"
import { createScene3 } from "./scene3"
import { createScene4 } from "./scene4"
import { movePlayerTo } from "~system/RestrictedActions"

export let scene1active = false
export function createFullScene(){
const baseSceneRoot = createBaseScene()


const baseSceneId = SCENE_MGR.generateSceneId()
// const baseScene = SubScene.show(baseSceneId,"baseScene",[],undefined,undefined)
// const baseSceneEntity = baseScene.addEntity(baseSceneRoot) 
// baseSceneEntity.visibilityStrategy = ROOT_SCENE_VISIBILITY_STRATEGY


const galleryGroup1 = createScene()
//const _scene1 = loadStaticScene1()
const galleryGroup2 = createScene2()
const galleryGroup3 = createScene3()
const galleryGroup4 = createScene4()
// const galleryGroup5 = createScene5()
hideScene(galleryGroup1)
hideScene(galleryGroup2)
hideScene(galleryGroup3)
hideScene(galleryGroup4)


// galleryGroup1.enable()
// galleryGroup1.hide()
// SCENE_MGR.changeToScene(galleryGroup1)

let toggleCnter = 1



const toggleEntText = engine.addEntity()
TextShape.create(toggleEntText, {text: "Change Scene", fontSize: 2} )
Transform.create(toggleEntText, {position: Vector3.create(8,2,16) })
Billboard.create(toggleEntText, {})


const toggleEnt = engine.addEntity()
Transform.create(toggleEnt, { position:  Vector3.create(8,0,16),
  scale: Vector3.create(1.2,1.2,1.2),
  rotation: Quaternion.fromEulerDegrees(0,270,0)})
  GltfContainer.create(toggleEnt, {
    src: 'models/KeyboardSciFi_01/KeyboardSciFi_01.glb'
}
)

pointerEventsSystem.onPointerDown(
  {
      entity: toggleEnt,
      opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Change Scene'
      }
  },
  () => {
    {
      hideScene(galleryGroup1)
      hideScene(galleryGroup2)
      hideScene(galleryGroup3)
      hideScene(galleryGroup4)
      console.log(scene1active)
     
            
      switch(toggleCnter){
        case 0:
            // SCENE_MGR.changeToScene(galleryGroup1)
            showScene(baseSceneRoot)
            
            scene1active = false
         
          
         
          break;
        case 1:
            // SCENE_MGR.changeToScene(galleryGroup2)
            
            showScene(galleryGroup1)
            scene1active = true
            
            
            
    
        
          break;
        case 2:
            // SCENE_MGR.changeToScene(galleryGroup3)
            showScene(galleryGroup2)

            hideScene(galleryGroup1)
            scene1active = false
    
          
          break;
        case 3:
            // SCENE_MGR.changeToScene(galleryGroup4)
            // galleryGroup4.movePlayerHere()
            showScene(galleryGroup3)

            hideScene(galleryGroup2)
            scene1active = false
      
          
            break;
          
        case 4:
            // SCENE_MGR.changeToScene(galleryGroup5)
            hideScene(galleryGroup3)
            showScene(galleryGroup4)
            scene1active = false
            movePlayerTo({  newRelativePosition: Vector3.create(16, 12, 16) })

            
    
        
          break;
        case 5:
          //   SCENE_MGR.hideScenes()
          // baseScene.hide()
          //galleryGroup4.movePlayerHere()
          hideScene(baseSceneRoot)
          scene1active = false
    
          break;
            
      }
    
      toggleCnter++
      if(toggleCnter >= 6){
        toggleCnter = 0
      }
    
    }
   
  


  }
)


  }

