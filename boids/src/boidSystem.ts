
/// --- Set up a system ---

import BoidsController from "./boids/BoidsController"
import BoidEntity from "./boids/BoidEntity"
import { REGISTRY } from "./registry"
import { CommonResources } from "./resources/common"
import { IntervalUtil } from "./utils/interval-util"
import { EntityWrapper } from "./portwrapper/EntityWrapper"
import IBoidEntity from "./boids/IBoidEntity"
import { QuaternionWrapper } from "./portwrapper/Quaternion3Wrapper"
import { Vector3Wrapper } from "./portwrapper/Vector3Wrapper"
import { EngineWrapper } from "./portwrapper/EngineWrapper"
import { CameraWrapper } from "./portwrapper/CameraWrapper"
import { TransformWrapper } from "./portwrapper/TransformWrapper"

type ExtPredatorEntity={
  boid:BoidEntity
  entity:Entity
}

function setShapeCollisions(entity:EntityWrapper,val:boolean){
  entity.withCollisions(val)
  
}
function scaleInPlace(entity:EntityWrapper,val:number){
  if(entity.hasComponent(Transform)){
    Vector3Wrapper.scaleInPlace(entity.getComponent(Transform).scale,val,entity.getComponent(Transform).scale)
  }
}

export class BoidSystem  {

  // this group will contain every entity that has a Transform component
  //group = engine.getComponentGroup(Transform)
  controller?:BoidsController
  playerFish?: BoidEntity
  playerObstacle?: BoidEntity
  playerSeek?: BoidEntity
  playerPredator?: BoidEntity

  playerEntities:BoidEntity[] = []

  externalEntities:ExtPredatorEntity[] = []
  
  boidInterval:IntervalUtil

  systemFnCache!:(dt:number)=>void

  constructor (controller:BoidsController,interval:number){
    this.controller = controller
    this.boidInterval = new IntervalUtil(interval)
  }

  addExternalPredatorEntities(entity:Entity){
    //log("addExternalPredatorEntities",entity)
    if(!this.controller){
      throw new Error("controller is required to be defined!")
    }
    const extPred = new BoidEntity(BoidEntity.PREDATOR_ENTITY, 0,0,0);
    //this.playerObstacle.modelEntity.addComponent( CommonResources.RESOURCES.materials.transparent )
    setShapeCollisions(extPred.visibleEntity.modelEntity, false)
    scaleInPlace(extPred.visibleEntity.modelEntity, 2)
    extPred.canMove = true
    this.controller?.addPredator( extPred )
    
    this.externalEntities.push({boid:extPred,entity:entity})
  }
  enablePlayerObstacle(enable:boolean){
    if(!this.controller){
      throw new Error("controller is required to be defined!")
    }
    if(enable && !this.playerObstacle){
      this.playerObstacle = new BoidEntity(BoidEntity.OBSTACLE_ENTITY, 0,0,0);
      //this.playerObstacle.modelEntity.addComponent( CommonResources.RESOURCES.materials.transparent )
      setShapeCollisions(this.playerObstacle.visibleEntity.modelEntity, false)
      scaleInPlace(this.playerObstacle.visibleEntity.modelEntity, .2)
      this.controller.addObstacleEntity( this.playerObstacle )
      
      this.playerEntities.push(this.playerObstacle)

      //const mat = new Material()
      //mat.albedoColor = Color4.Blue()
      //this.playerObstacle.modelEntity.addComponent( mat )
    
    }
    if( this.playerObstacle){
      this.playerObstacle.enabled = enable
    }
  }
  enablePlayerPredator(enable:boolean){
    if(!this.controller){
      throw new Error("controller is required to be defined!")
    }
    if(enable && !this.playerPredator){
      this.playerPredator = new BoidEntity(BoidEntity.PREDATOR_ENTITY, 0,0,0);
      //this.playerObstacle.modelEntity.addComponent( CommonResources.RESOURCES.materials.transparent )
      setShapeCollisions(this.playerPredator.visibleEntity.modelEntity, false)
      scaleInPlace(this.playerPredator.visibleEntity.modelEntity, .7)
      this.controller.addPredator( this.playerPredator )
      
      this.playerEntities.push(this.playerPredator)

      //const mat = new Material()
      //mat.albedoColor = Color4.Blue()
      //this.playerObstacle.modelEntity.addComponent( mat )
    
    }
    if(this.playerPredator){
      this.playerPredator.enabled = enable
    }
  }
  
  enablePlayerSeek(enable:boolean){
    if(!this.controller){
      throw new Error("controller is required to be defined!")
    }
    if(enable && !this.playerSeek){
      this.playerSeek = new BoidEntity(BoidEntity.SEEK_ENTITY, 0,0,0);
      //this.playerSeek.modelEntity.addComponent( CommonResources.RESOURCES.materials.transparent )
      setShapeCollisions(this.playerSeek.visibleEntity.modelEntity, false)
      this.controller.addSeekEntity( this.playerSeek )
      
      this.playerEntities.push(this.playerSeek)

      //const mat = new Material()
      //mat.albedoColor = Color4.Blue()
      //this.playerObstacle.modelEntity.addComponent( mat )
    
    }
    if(this.playerSeek){
      this.playerSeek.enabled = enable
    }
  }
   


  enablePlayerFish(enable:boolean){
    if(!this.controller){
      throw new Error("controller is required to be defined!")
    }
    if(enable && !this.playerFish){
      this.playerFish = new BoidEntity(BoidEntity.FLOCK_ENTITY, 0,0,0);
      
      this.playerEntities.push(this.playerFish)

      this.playerFish.aligmentWeight = 0.01
      this.playerFish.cohesionWeight = 0.01
      this.playerFish.separationWeight = 0.01

      this.controller.addFlockEntity( this.playerFish )
      
      //const mat = new Material()
      //mat.albedoColor = Color4.Blue()
      //this.playerFish.modelEntity.addComponent( mat )
    
    }
    if(!enable && this.playerFish){
      //this.playerFish.enabled = false
    }
  }
  
  createUpdateFn(){
    if(this.systemFnCache === undefined){
      log("createUpdateFn",this)
      this.systemFnCache = (dt:number)=>{
        //log("createUpdateFn called",this)
        this.update(dt)
      }
    }
    return this.systemFnCache
  }

  update(dt: number) {
    //log("system update",dt,this.controller)
    if(this.controller ){//&& this.controller.enabled){
      if(this.boidInterval.update(dt)){
        //log("system update",dt) 
  
        const feet = - 1.3
        const head = 0
        const cameraPos = CameraWrapper.getPositionOrNull()
        if(cameraPos !== undefined && cameraPos !== null ){
          for( let playerEnt of this.playerEntities){
            if(playerEnt && playerEnt.enabled){
              this.controller.grid?.moveEntity(playerEnt, cameraPos.x, cameraPos.y-head , cameraPos.z);
              
              //const flocation = new Vector3(this.playerFish.x,this.playerFish.y,this.playerFish.z)
              const transform = playerEnt.visibleEntity.entity.getComponent(Transform)
              transform.position.x = playerEnt.x
              transform.position.y = playerEnt.y // + REGISTRY.boidController!.boundaryYOffset
              transform.position.z = playerEnt.z
            }
          }
        }else{
          //log("WARN missing camera data",cameraPos)
        }
        for( let extEnt of this.externalEntities){
          if(extEnt && extEnt.boid.enabled){
             
            const sdkEnttransform = TransformWrapper.get(extEnt.entity)//.getComponent(Transform)
            
            this.controller.grid?.moveEntity(extEnt.boid, sdkEnttransform.position.x, sdkEnttransform.position.y , sdkEnttransform.position.z);
              

            //const flocation = new Vector3(this.playerFish.x,this.playerFish.y,this.playerFish.z)
            const transform = extEnt.boid.visibleEntity.entity.getComponent(Transform)
            //log("externalEntities sdkEnttransform",extEnt.boid.canMove,extEnt.boid.enabled,sdkEnttransform.position,extEnt.boid.x,extEnt.boid.y,extEnt.boid.z )
            
            //grid move handled above, this is syncing visible representation
            transform.position.x = extEnt.boid.x
            transform.position.y = extEnt.boid.y // + REGISTRY.boidController!.boundaryYOffset
            transform.position.z = extEnt.boid.z
          }
        }
        
        this.controller.iterate()

      }  

      //keep this outside the step because we are lerping towards the position
      for (let i = 0; i < this.controller.flockEntities.length; i++) {
        const fish = this.controller.flockEntities[i]
        //{{ z: toDeg(angleZ) - 90, y: toDeg(angleY), x: 0 }
        //const [angleZ, angleY] = fish.velocity.angles()
        
        this.draw(fish,dt)
      }
      
    }
    
  }
  draw(boid:BoidEntity,dt?:number){
    if(!boid.visibleEntity.entity.isAlive()){
      log("not alive skipping",boid.id)
      return
    } 
    const moveDt = dt !== undefined ? dt*2 : 1

    const transform = boid.visibleEntity.entity.getComponent(Transform)
    
    //log("moving ",boid.id)

    const flocation = new Vector3Wrapper(boid.x,boid.y+ REGISTRY.boidController!.boundaryYOffset,boid.z)
    const direction = flocation.subtract(transform.position )
    const lookRot = QuaternionWrapper.LookRotation(direction)

    
    const moveVec = Vector3Wrapper.Lerp( transform.position, flocation, moveDt)
    //const rotQ = Quaternion.Slerp( fish.entity.getComponent(Transform).rotation, fish., dt)
    
    Vector3Wrapper.copyFrom(transform.position,moveVec)

    transform.rotation = QuaternionWrapper.Slerp( transform.rotation, lookRot, 1 )
    //transform.lookAt( new Vector3().copyFrom(fish.location) )//.rotate( new Vector3(1,1,1),90 )
    //fish.entity.getComponent(Transform).rotation.copyFrom(rotQ)
  }
  drawStaticObstacles(){
    if(!this.controller){
      throw new Error("this.controller required")
    }
    for (let i = 0; i < this.controller.obstacleEntities.length; i++) {
      const obs = this.controller.obstacleEntities[i]
      
      this.draw(obs,undefined)

    }
  }
  
}


export let boidSystem:BoidSystem
const boidIntervalMS = 30 //roughly 30fps
export function initBoidSystem(){
  const boidController = REGISTRY.boidController
  if(!boidController) throw new Error("boidController not initlalized")
 
  // Add a new instance of the system to the engine
  boidSystem = new BoidSystem(boidController,boidIntervalMS)
  boidSystem.drawStaticObstacles() //does a single/init draw
  boidSystem.enablePlayerObstacle(true) 
  boidSystem.enablePlayerPredator(true) 
  boidSystem.enablePlayerSeek(true)

  REGISTRY.boidSystem = boidSystem 
}
  
export function startBoidSystem(){
  if(!REGISTRY.boidSystem) throw new Error("REGISTRY.boidSystem must be initalized!!!")
  EngineWrapper.addSystem(REGISTRY.boidSystem.createUpdateFn())
}
