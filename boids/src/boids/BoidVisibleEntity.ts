import { EntityWrapper } from 'src/portwrapper/EntityWrapper.js';
import { CommonResources } from 'src/resources/common.js';
import { QuaternionWrapper } from '../portwrapper/Quaternion3Wrapper.js';
import { TransformWrapper } from '../portwrapper/TransformWrapper.js';
import { Vector3Wrapper } from '../portwrapper/Vector3Wrapper.js';
//import BoidEntity from './BoidEntity.js';
import { BOID_CONFIG } from './Constants.js';
import Grid from "./Grid";
import IBoidEntity, { BoidTypeEnum } from './IBoidEntity.js';
import IBoidVisibleEntity from './IBoidVisibleEntity.js';

export const fishConeShape = CylinderShape////CylinderShape //new ConeShape() is gone?
//fishConeShape.withCollisions = false

export const fishBoxShape = BoxShape//new BoxShape()
//fishBoxShape.withCollisions = false
 
export const objsSphere = SphereShape//new SphereShape()
 //objsSphere.withCollisions = false

export const fishShapes:string[] =
[
  ("models/Fish_01/Fish_01.glb"),
  ("models/Fish_03/Fish_03.glb"),
  ("models/Fish_04/Fish_04.glb")
]

//for(const p in fishShapes){
//  fishShapes[p].withCollisions = false
//}


/**
 * @module BoidVisualEntity 
 * Entity class defines an entitiy model which has a position and a velocity.
 * Also it has some utiliy methods.
 */
export default class BoidVisibleEntity implements IBoidVisibleEntity {
    boid:IBoidEntity
    entity!:EntityWrapper
    modelEntity!:EntityWrapper
    //maxEntitySpeed?:number
    /**
     * Constructor for the Entity class
     * @param {Number} boid entitiy
     */
    constructor(boid:IBoidEntity) {
        this.boid = boid

        this.initEntity()
        /*if(this.id == 1){
        log(this.id,"fish stats",{
            id:this.id,
            mass:this.mass,
            maxforce:this.maxforce,
            maxspeed:this.maxspeed,
        })
        }*/
    }

    initEntity(){
        const type = this.boid.type
        const parent = new EntityWrapper()//"fish-p-"+this.boid.id)
        //parent.addComponent(fishShape)
        parent.addComponent(Transform,
            {
                position:new Vector3Wrapper(1,1,1)
                ,scale: Vector3Wrapper.One()
                ,rotation: QuaternionWrapper.Zero()
            }
        )
        
        this.entity = parent;//new EntityWrapper(parent)

        
        const child = new EntityWrapper()//new Entity("fish-"+this.boid.id)
            
        child.addComponent(Transform,
            {
                position:Vector3Wrapper.Zero()
                ,scale: Vector3Wrapper.One()
                ,rotation: QuaternionWrapper.Zero()
                ,parent: parent.entity
            }
        )
        

        if(type == BoidTypeEnum.FLOCK_ENTITY){
            //FIXME NEED THIS
            //Vector3.rotate()
            child.getComponent(Transform).rotation = QuaternionWrapper.Euler(90,-90,0)
            //child.getComponent(Transform).rotate(new Vector3(0,1,0),-90)
            //child.getComponent(Transform).rotate(new Vector3(1,0,0),90)

            //as fish
            //child.addComponent(fishShapes[ Math.floor(Math.random()*fishShapes.length) ])
            GLTFShape.create(child.entity,{
                src:fishShapes[ Math.floor(Math.random()*fishShapes.length) ]
            })
            
            //as particles 
            
            //sphere particles
            //child.addComponentOrReplace(objsSphere)
            //child.getComponent(Transform).scale.scaleInPlace(.05)

            //cube particles
            //child.addComponentOrReplace(fishBoxShape)
            //child.getComponent(Transform).scale.scaleInPlace(.05)

        }else if(type == BoidTypeEnum.PREDATOR_ENTITY){
            if(BOID_CONFIG.VISIBLE_PREDATOR) {
                //child.addComponent(fishConeShape)
                fishConeShape.create(child.entity,{
                    radiusTop:0 //new way to make cone
                })

                //child.getComponent(Transform).rotate(new Vector3(1,1,1),90)
                Vector3Wrapper.scaleInPlace( child.getComponent(Transform).scale,.3,child.getComponent(Transform).scale)

                //child.addComponent(CommonResources.RESOURCES.materials.transparent)
            }
        }else if(type == BoidTypeEnum.SEEK_ENTITY){
            if(BOID_CONFIG.VISIBLE_SEEK) {
                //child.addComponent(new BoxShape())
                BoxShape.create(child.entity)

                
                
                //child.getComponent(Transform).rotate(new Vector3(1,1,1),90)
                Vector3Wrapper.scaleInPlace( child.getComponent(Transform).scale,.2,child.getComponent(Transform).scale)
                //child.addComponent(CommonResources.RESOURCES.materials.transparent)
            }
        }else if(type == BoidTypeEnum.OBSTACLE_ENTITY){
            if(BOID_CONFIG.VISIBLE_OBSTACLES) {
                objsSphere.createOrReplace(child.entity)
                //child.addComponentOrReplace(objsSphere)
                //child.addComponent(CommonResources.RESOURCES.materials.transparent)
            }
            log("adding child obs")
        }else{
            log("unknown type",type)
        }
        
        
        child.setParent(parent.entity) //HOW DO WE DO PARENTING
        
        this.modelEntity = child//new EntityWrapper(child)

        //engine.addEntity(parent) 
        
    }
}