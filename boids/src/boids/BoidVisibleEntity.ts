
import { CommonResources } from 'src/resources/common.js';

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
    entity!:Entity
    modelEntity!:Entity
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
        const parent = engine.addEntity()//"fish-p-"+this.boid.id)
        //parent.addComponent(fishShape)
        Transform.create(parent, 
            {
                position: {x:1, y:1,z: 1}
                ,scale:   {x:1, y:1,z: 1}
                ,rotation: Quaternion.Zero()
            }
        )
        
        this.entity = parent;//new EntityWrapper(parent)

        
        const child = engine.addEntity()//new Entity("fish-"+this.boid.id)
            
        const childTransform = Transform.create(child,
            {
                position: {x:0, y:0,z: 0}
                ,scale:  {x:1, y:1,z: 1}
                ,rotation: Quaternion.Zero()
                ,parent: parent
            }
        )
        

        if(type == BoidTypeEnum.FLOCK_ENTITY){
            //FIXME NEED THIS
            //Vector3.rotate()
            Transform.getMutable(child).rotation = Quaternion.euler(90,-90,0)
            //child.getComponent(Transform).rotate(new Vector3(0,1,0),-90)
            //child.getComponent(Transform).rotate(new Vector3(1,0,0),90)

            //as fish
            //child.addComponent(fishShapes[ Math.floor(Math.random()*fishShapes.length) ])
            GLTFShape.create(child,{
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
                fishConeShape.create(child,{
                    radiusTop:0 //new way to make cone
                })

                //child.getComponent(Transform).rotate(new Vector3(1,1,1),90)
                Vector3.scale( childTransform.scale,.3 )

                //child.addComponent(CommonResources.RESOURCES.materials.transparent)
            }
        }else if(type == BoidTypeEnum.SEEK_ENTITY){
            if(BOID_CONFIG.VISIBLE_SEEK) {
                //child.addComponent(new BoxShape())
                BoxShape.create(child)

                
                
                //child.getComponent(Transform).rotate(new Vector3(1,1,1),90)
                Vector3.scale( childTransform.scale,.2)
                //child.addComponent(CommonResources.RESOURCES.materials.transparent)
            }
        }else if(type == BoidTypeEnum.OBSTACLE_ENTITY){
            if(BOID_CONFIG.VISIBLE_OBSTACLES) {
                objsSphere.createOrReplace(child)
                //child.addComponentOrReplace(objsSphere)
                //child.addComponent(CommonResources.RESOURCES.materials.transparent)
            }
            log("adding child obs")
        }else{
            log("unknown type",type)
        }
        
        const mutablechildTransform = Transform.getMutable(child)
		if(mutablechildTransform){
			mutablechildTransform.parent= parent
		}
       
        this.modelEntity = child//new EntityWrapper(child)

        //engine.addEntity(parent) 
        
    }
}