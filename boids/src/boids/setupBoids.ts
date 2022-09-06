import { CONFIG } from "src/config"
import { REGISTRY } from "src/registry"

import BoidsController from "./BoidsController"
import { BOID_CONFIG } from "./Constants"
import ControlHelper from "./ControlHelper"

//SETUP BOUNDARIES
const parcelSize = 15.5
const width = parcelSize 
const depth = parcelSize * 2
const height = 5
const heightBottomOffset = 1 

const subGrids = 4 //large grid count makes all fish operating the same get reduced
/*
300 - 1 subgrid
600 - 2 subgrid
700 - 3 subgrid*
*/
//SETUP INITIALIZATION OF BOIDS
const flockEntityCount = 80
//will randomly place these
const obstacleEntityCount = 0
const predatorCount = 0
const seekCount = 0


const boundaryEdgeShape = PlaneShape
//boundaryEdgeShape.withCollisions = false

const boundarMarkerShape = CylinderShape
//boundarMarkerShape.withCollisions = false

export function createBoundaryPlanes(){

  if(!BOID_CONFIG.SHOW_DEBUG_BOUNDARY_PLANES){
    log("createBoundaryPlanes is disabled SHOW_DEBUG_BOUNDARY_PLANES")
    return
  }
  
  const boundaryTopEnt = engine.addEntity()
  boundaryEdgeShape.create(boundaryTopEnt)
  Transform.create(boundaryTopEnt,
    {position: Vector3.create(width/2,height+heightBottomOffset,depth/2)
    ,scale:Vector3.create(width,depth,1)
    ,rotation:Quaternion.euler(90,0,0)}
    
    )
  //engine.addEntity(boundaryTopEnt)

  const boundaryBottomEnt = engine.addEntity()
  boundaryEdgeShape.create(boundaryBottomEnt)
  Transform.create(boundaryBottomEnt,
    {position: Vector3.create(width/2,heightBottomOffset,depth/2)
    ,scale:Vector3.create(width,depth,1)
    ,rotation:Quaternion.euler(90,0,0)}
    )
  //engine.addEntity(boundaryBottomEnt)
}

export function createBoundaryMarkers(){
  if(!BOID_CONFIG.SHOW_DEBUG_BOUNDARY_MARKERS){
    log("createBoundaryMarkers is disabled SHOW_DEBUG_BOUNDARY_MARKERS")
    return
  }
  const offset = .3
  /*
  
  for(let x=0;x<=width;x+=parcelSize){
    for(let z=0;z<=depth;z+=parcelSize){
        const boundaryEnt = new Entity()
        boundaryEnt.addComponent(new CylinderShape())
        boundaryEnt.addComponent(new Transform( {position: Vector3.create(x+offset,1,z+offset),scale:Vector3.create(.3,1,.3)} ))

        engine.addEntity(boundaryEnt)
    }
  }*/ 
  REGISTRY.boidController!.grid.worldSize
  const boidController = REGISTRY.boidController

  const maxSize = Math.max(boidController!.boundaryX, boidController!.boundaryY, boidController!.boundaryZ);
  const cellSize = boidController!.grid.cellSize;
  const cellRowCount = boidController!.grid.cellRowCount
  const cellCount = boidController!.grid.cellCount
  

  
  for(let x=0;x<=cellRowCount;x+=1){
    for(let z=0;z<=cellRowCount;z+=1){
        const boundaryEnt = engine.addEntity()
        boundarMarkerShape.create(boundaryEnt)
        Transform.create(boundaryEnt,
          {position: Vector3.create((x*cellSize)+offset,height/2 + heightBottomOffset,(cellSize*z)+offset)
          ,scale:Vector3.create(.1,height/2,.1)
          ,rotation:Quaternion.Zero()
        } )

        //engine.addEntity(boundaryEnt)
    }
  }
/*
  const floorEnt = new Entity()
  boundaryEnt.addComponent(boundarMarkerShape)
  boundaryEnt.addComponent(new Transform( {position: Vector3.create((x*cellSize)+offset,1,(cellSize*z)+offset),scale:Vector3.create(.1,1,.1)} ))

  engine.addEntity(boundaryEnt)*/


}

export function initBoidController() {
    const boidController = new BoidsController(width, height, depth, subGrids)
    boidController.boundaryYOffset = heightBottomOffset


    boidController.aligmentWeight = 1
    boidController.cohesionWeight = 1
    boidController.separationWeight = 1

    // create control helper for example controls
    const controlHelper = new ControlHelper(boidController);
    controlHelper.init();

    // add initial entities for an interesting view
    controlHelper.addBoids(flockEntityCount);
    controlHelper.addObstacles(obstacleEntityCount);
 
    //for(let x=0;x<depth/16;x++){
      controlHelper.addObstacle("big-trunk.1",Vector3.create(12.5,0,4.5),1.2)
      controlHelper.addObstacle("big-trunk.2",Vector3.create(12,2,4.5),1)
      controlHelper.addObstacle("big-trunk.3",Vector3.create(11,3.5,5),1)
      controlHelper.addObstacle("big-trunk.35",Vector3.create(9.5,4.5,6.5),.75)
      controlHelper.addObstacle("big-trunk.4",Vector3.create(8,4,7),.5)

      controlHelper.addObstacle("rock.gray.big",Vector3.create(2.2,0,2.2),1.5)
      controlHelper.addObstacle("rock.gray.small",Vector3.create(8.5,-.5,3.5),1)
      controlHelper.addObstacle("rock.gray.med",Vector3.create(14,0,8),1)
      controlHelper.addObstacle("rock.red.1",Vector3.create(12.5,1,13.5),2)
      controlHelper.addObstacle("rock.red.2",Vector3.create(12,4,13.5),2)
      controlHelper.addObstacle("rock.purple",Vector3.create(3,1,13),2)
    //controlHelper.addObstacle("big",Vector3.create(7,4,7),1)
    //}

    controlHelper.addPredators(predatorCount)
    controlHelper.addSeeks(seekCount) 


    //sea.fish.l
    //seaTest.start(64)

    /*
    const seaCube = new Entity()
    seaCube.addComponent(new Transform({
        position: Vector3.create(width, 2, depth),
        scale: Vector3.create(width, height, depth)
    }))
    const boxShape = new BoxShape()
    boxShape.withCollisions = false
    seaCube.addComponent(boxShape)
    //engine.addEntity(seaCube)*/

    REGISTRY.boidController = boidController

}
