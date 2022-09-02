import { BOID_CONFIG } from './Constants.js';
import BoidEntity from './BoidEntity.js';
import Grid from './Grid.js'


/**
 * @module BoidsController 
 * BoidsController class defines a container for boids entities.
 * All entities (flock or obstalces) are added to BoidsController.
 * BoidsController calculates and updates entity positions and velocities.
 */
export default class BoidsController {
    grid:Grid
    subDivisionCount:number

    flockEntities:BoidEntity[] = [];
    obstacleEntities:BoidEntity[] = [];

    boundaryX:number
    boundaryY:number
    boundaryZ:number

    boundaryYOffset:number = 0

    aligmentWeight:number
    cohesionWeight:number
    separationWeight:number
    obstacleWeight:number
    seekWeight:number
    avoidWeight:number

    maxEntitySpeed:number

    aligmentRadius:number
    cohesionRadius:number
    separationRadius:number
    obstacleRadius:number
    seekRadius:number
    avoidRadius:number
    /**
     * Constructor for the BoidsController
     * @param {Number} boundaryX world size in x axis
     * @param {Number} boundaryY world size in y axis
     * @param {Number} boundaryZ world size in z axis
     * @param {Number} subDivisionCount subdivision count defines the grid size. 
     * If it is given 10, world will be splitted into 10*10*10 cubes for spatial partitioning.
     */
    constructor(boundaryX = 500*BOID_CONFIG.AREA_SCALE, boundaryY = 500*BOID_CONFIG.AREA_SCALE, boundaryZ = 500*BOID_CONFIG.AREA_SCALE, subDivisionCount=1) {
        const maxSize = Math.max(boundaryX, boundaryY, boundaryZ);
        this.grid = new Grid(maxSize, maxSize/subDivisionCount);
        this.subDivisionCount = subDivisionCount;

        this.flockEntities = [];
        this.obstacleEntities = [];

        this.boundaryX = boundaryX;
        this.boundaryY = boundaryY;
        this.boundaryZ = boundaryZ;

        this.aligmentWeight = 2.0 * BOID_CONFIG.FORCE_SCALE;
        this.cohesionWeight = 4 * BOID_CONFIG.FORCE_SCALE;
        this.separationWeight = 0.3 * BOID_CONFIG.FORCE_SCALE;

        this.maxEntitySpeed = 5 * BOID_CONFIG.MAX_SPEED_SCALE;

        this.aligmentRadius = 100*BOID_CONFIG.AREA_SCALE;
        this.cohesionRadius = 100*BOID_CONFIG.AREA_SCALE;
        this.separationRadius = 50*BOID_CONFIG.AREA_SCALE*100*BOID_CONFIG.AREA_SCALE;
        this.obstacleRadius = 100*BOID_CONFIG.AREA_SCALE;
        this.seekRadius = 100*BOID_CONFIG.AREA_SCALE
        this.avoidRadius = 100*BOID_CONFIG.AREA_SCALE

        this.obstacleWeight = 100*BOID_CONFIG.AREA_SCALE*100*BOID_CONFIG.AREA_SCALE
        this.seekWeight = 100*BOID_CONFIG.AREA_SCALE
        this.avoidWeight = 100*BOID_CONFIG.AREA_SCALE
    }

    /**
     * Adds flock entity to boids container
     * @param {Entity} entity 
     */
    addFlockEntity(entity:BoidEntity) {
        this.grid.addEntity(entity);
        this.flockEntities.push(entity);
    }

    /**
     * Returns flock entities
     * @returns {Array} flock entities
     */
    getFlockEntities() {
        return this.flockEntities;
    }

    /**
     * Adds obstacle entity to boids controller
     * @param {Entity} entity 
     */
    addObstacleEntity(entity:BoidEntity) {
        log("addObstacleEntity",entity.id)
        this.grid.addEntity(entity);
        this.obstacleEntities.push(entity);
    }
    addPredator(entity:BoidEntity) {
        log("addPredator",entity.id)
        this.grid.addEntity(entity);
        this.flockEntities.push(entity);
    }
    

    addSeekEntity(entity:BoidEntity) {
        this.grid.addEntity(entity);
        this.flockEntities.push(entity);
    }
    

    /**
     * Returns obstacle entities
     * @returns {Array} obstacle entities
     */
    getObstacleEntities() {
        return this.obstacleEntities;
    }

    /**
     * Returns world boundary
     * @returns {Array} boundary vector
     */
    getBoundary() {
        return [this.boundaryX, this.boundaryY, this.boundaryZ];
    }

    /**
     * Sets max speed for flock entities.
     * @param {Number} s 
     */
    setMaxSpeed(s:number) {
        this.maxEntitySpeed = s;
    }

    /**
     * Sets aligment weight. This changes how much flock entities are effected by each others alignment
     * @param {Number} w 
     */
    setAligmentWeight(w:number) {
        this.aligmentWeight = w;
    }

    /**
     * Sets cohesion weight. This changes how much flock entities are inclined to stick together
     * @param {Number} w 
     */
    setCohesionWeight(w:number) {
        this.cohesionWeight = w;
    }

    /**
     * Sets separation weight. This changes how much flock entities are inclined to separate from each together
     * @param {Number} w 
     */
    setSeparationWeight(w:number) {
        this.separationWeight = w;
    }

    /**
     * Sets world boundary
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} z 
     */
    setBoundary(x:number, y:number, z:number) {
        this.boundaryX = x;
        this.boundaryY = y;
        this.boundaryZ = z;
    }

    setVals(arr:number[],val:number){
        for(const p in arr){
            arr[p] = val
        }
    }
    /**
     * iterate calculates the new position for flock entities.
     * start and end indices are used for parallelization of this calculation
     * @param {Number} start start index for calculation
     * @param {Number} end end index for calculation
     */
    iterate(start:number=0, end:number=this.flockEntities.length) {
        //log("interate",start,end)
        for(let i=start; i<end; i++) {
            const entity = this.flockEntities[i];
            if(!entity.enabled) continue

            if(!entity.canMove) continue

            entity.burstSpeed = Math.max(entity.burstSpeed - entity.decelSpeed,0)

            const aligmentVel =  this.computeAlignment(entity);
            const cohVel = this.computeCohesion(entity); // (entity.getType() == EntityX.PREDATOR_ENTITY) ? [0,0,0] : 
            const sepVel = this.computeSeparation(entity);
            const obsVel = this.computeObstacles(entity);

            //TODO create a computeAvoid
            /*
            for (let i = 0; i < fish.length; i++) {
                var dist = this.location.dist(fish[i].location)
                if (dist < radius) {
                    var force = fish[i].location
                    .clone()
                    .subtractInPlace(this.location)
                    .scale(-100*BOID_CONFIG.FORCE_SCALE)//.mul(-100*BOID_CONFIG.AREA_SCALE)
                    this.applyForce(force)
                }
                } */
            
            //this.setVals(aligmentVel,0)
            //this.setVals(cohVel,0)
            //this.setVals(sepVel,0)
            //this.setVals(obsVel,0)
 
            const seekVel = this.computeSeek(entity);
            const avoidVel = this.computeAvoid(entity);

            // add components
            const vx = this.aligmentWeight*aligmentVel[0] + this.cohesionWeight*cohVel[0] +
                        this.separationWeight*sepVel[0] + this.obstacleWeight*obsVel[0]
                        + this.seekWeight*seekVel[0] + this.avoidWeight*avoidVel[0]; 
            const vy = this.aligmentWeight*aligmentVel[1] + this.cohesionWeight*cohVel[1] +
                        this.separationWeight*sepVel[1] + this.obstacleWeight*obsVel[1]
                        + this.seekWeight*seekVel[1] + this.avoidWeight*avoidVel[1]; 
            const vz = this.aligmentWeight*aligmentVel[2] + this.cohesionWeight*cohVel[2] +
                        this.separationWeight*sepVel[2] + this.obstacleWeight*obsVel[2]
                        + this.seekWeight*seekVel[2] + this.avoidWeight*avoidVel[2]; 

            entity.addVelocity(vx, vy, vz);
            entity.move(this.maxEntitySpeed + entity.burstSpeed, this.boundaryX, this.boundaryY, this.boundaryZ);
        }
    }

    /**
     * Computes alignment vector for the given entity
     * @param {Entity} entity 
     * @returns {Array} alignment vector
     */
    computeAlignment(entity:BoidEntity) {
        let aligmentX = 0;
        let aligmentY = 0;
        let aligmentZ = 0;
        let neighborCount = 0;

        let aligmentRadius = entity.aligmentRadius !== undefined ? entity.aligmentRadius : this.aligmentRadius
        
        this.grid.getEntitiesInCube(entity.x, entity.y, entity.z, aligmentRadius, (currentEntity:BoidEntity) => {
            if(currentEntity != entity &&
               (currentEntity.getType() == BoidEntity.FLOCK_ENTITY ) && // || currentEntity.getType() == EntityX.PREDATOR_ENTITY) &&
               entity.getDistance(currentEntity) < aligmentRadius) {
                neighborCount++;
                aligmentX += currentEntity.vx;
                aligmentY += currentEntity.vy;
                aligmentZ += currentEntity.vz;
            }
        });

        if(neighborCount > 0)
        {
            aligmentX /= neighborCount;
            aligmentY /= neighborCount;
            aligmentZ /= neighborCount;
            const aligmentMag = Math.sqrt((aligmentX*aligmentX)+(aligmentY*aligmentY)+(aligmentZ*aligmentZ));
            if(aligmentMag > 0) {
                aligmentX /= aligmentMag;
                aligmentY /= aligmentMag;
                aligmentZ /= aligmentMag;
            }
        }

        return [aligmentX, aligmentY, aligmentZ];
    }

    /**
     * Computes cohesion vector for the given entity
     * @param {Entity} entity 
     * @returns {Array} cohesion vector
     */
    computeCohesion(entity:BoidEntity) {
        let cohX = 0;
        let cohY = 0;
        let cohZ = 0;
        let neighborCount = 0;

        let cohesionRadius = entity.cohesionRadius !== undefined ? entity.cohesionRadius : this.cohesionRadius

        this.grid.getEntitiesInCube(entity.x, entity.y, entity.z, cohesionRadius, (currentEntity:BoidEntity) => {
            if(currentEntity != entity &&
                (currentEntity.getType() == BoidEntity.FLOCK_ENTITY ) && // || currentEntity.getType() == EntityX.PREDATOR_ENTITY) &&
               entity.getDistance(currentEntity) < cohesionRadius) {
                neighborCount++; 
                cohX += currentEntity.x;
                cohY += currentEntity.y;
                cohZ += currentEntity.z;
            }
        });

        if(neighborCount > 0)
        {
            cohX /= neighborCount;
            cohY /= neighborCount;
            cohZ /= neighborCount;

            cohX = cohX - entity.x;
            cohY = cohY - entity.y;
            cohZ = cohZ - entity.z;

            var cohMag = Math.sqrt((cohX*cohX)+(cohY*cohY)+(cohZ*cohZ));
            if(cohMag > 0) {
                cohX /= cohMag;
                cohY /= cohMag;
                cohZ /= cohMag;
            }
        }

        return [cohX, cohY, cohZ];
    }

    /**
     * Computes separation vector for the given entity
     * @param {Entity} entity 
     * @returns {Array} separation vector
     */
    computeSeparation(entity:BoidEntity) {
        let sepX = 0;
        let sepY = 0;
        let sepZ = 0;
        //let neighborCount = 0;

        let separationRadius = entity.separationRadius !== undefined ? entity.separationRadius : this.separationRadius

        this.grid.getEntitiesInCube(entity.x, entity.y, entity.z, separationRadius, (currentEntity:BoidEntity) => {
            if(!currentEntity.enabled) return
            let distance = entity.getDistance(currentEntity);
            if(distance <= 0) {
                distance = 0.01 * BOID_CONFIG.AREA_SCALE
            }
            
            if(currentEntity != entity &&
                (currentEntity.getType() == BoidEntity.FLOCK_ENTITY ) && // || currentEntity.getType() == EntityX.PREDATOR_ENTITY) &&
               distance < this.separationRadius) {

                //log("computeSeparation",currentEntity.id)

                //neighborCount++;
                const sx = entity.x - currentEntity.x;
                const sy = entity.y - currentEntity.y;
                const sz = entity.z - currentEntity.z;
                sepX += (sx/distance)/distance;
                sepY += (sy/distance)/distance;
                sepZ += (sz/distance)/distance;
            }
        });

        return [sepX, sepY, sepZ];
    }

    
    //started from computeCohesion - idea to make them be drawn together
    computeSeek(entity:BoidEntity) {
        let seekRadius = entity.seekRadius !== undefined ? entity.seekRadius : this.seekRadius
        return this.computeSeekOrAvoid(entity,seekRadius,1,BoidEntity.SEEK_ENTITY)
    }
    computeAvoid(entity:BoidEntity) {
        let avoidRadius = entity.avoidRadius !== undefined ? entity.avoidRadius : this.avoidRadius
        return this.computeSeekOrAvoid(entity,avoidRadius,-1,BoidEntity.PREDATOR_ENTITY)
    }
    computeSeekOrAvoid(entity:BoidEntity,radius:number,dir:number,type:number) {
        let cohX = 0;
        let cohY = 0;
        let cohZ = 0;
        let neighborCount = 0;

        //const isSeek = dir > 1
        const isAvoid = dir < 0
        

        this.grid.getEntitiesInCube(entity.x, entity.y, entity.z, radius, (currentEntity:BoidEntity) => {
            if(currentEntity.enabled && currentEntity != entity &&
                ( 
                    (currentEntity.getType() === type)
                ) && //|| currentEntity.getType() == EntityX.PREDATOR_ENTITY) &&
               entity.getDistance(currentEntity) < radius) {
                neighborCount++; 
                cohX += currentEntity.x;
                cohY += currentEntity.y;
                cohZ += currentEntity.z;



                if( isAvoid && currentEntity.getType() == BoidEntity.PREDATOR_ENTITY ){ 
                    //TODO lower cohesion/separation out of fear?
                    entity.burstSpeed = Math.max(entity.burstSpeed + entity.acelSpeed,entity.maxSpeed)
                    log("computeSeekOrAvoid.predator",currentEntity.id,entity.id,entity.burstSpeed)
                }
            }
        });

        if(neighborCount > 0)
        {
            
            cohX /= neighborCount;
            cohY /= neighborCount;
            cohZ /= neighborCount;

            cohX = cohX - entity.x;
            cohY = cohY - entity.y;
            cohZ = cohZ - entity.z;

            var cohMag = Math.sqrt((cohX*cohX)+(cohY*cohY)+(cohZ*cohZ));
            if(cohMag > 0) {
                cohX /= cohMag;
                cohY /= cohMag;
                cohZ /= cohMag;
            }
        }

        return [dir*cohX, dir*cohY, dir*cohZ];
    }

    /**
     * Computes obstacle avoidance vector for the given entity
     * @param {Entity} entity 
     * @returns {Array} obstacle avoidance vector
     */
    computeObstacles(entity:BoidEntity) {
        let avoidX = 0;
        let avoidY = 0;
        let avoidZ = 0;

        let obstacleRadius = entity.obstacleRadius !== undefined ? entity.obstacleRadius : this.obstacleRadius
  
        this.grid.getEntitiesInCube(entity.x, entity.y, entity.z, obstacleRadius, (currentObstacle:BoidEntity) => {
            if(!currentObstacle.enabled) return// [avoidX, avoidY, avoidZ]
            if(currentObstacle.getType() != BoidEntity.OBSTACLE_ENTITY && currentObstacle.getType() != BoidEntity.PREDATOR_ENTITY ) return// [avoidX, avoidY, avoidZ]
            //log("computeObstacles",currentObstacle.id,entity.id,entity.burstSpeed)
            const distance = entity.getDistance(currentObstacle);
            if(distance > 0 &&
               distance < obstacleRadius) {
                const ox = entity.x - currentObstacle.x;
                const oy = entity.y - currentObstacle.y;
                const oz = entity.z - currentObstacle.z;
                avoidX += (ox/distance)/distance;
                avoidY += (oy/distance)/distance;
                avoidZ += (oz/distance)/distance;
                
                if( currentObstacle.getType() == BoidEntity.PREDATOR_ENTITY ){ 
                    //TODO lower cohesion/separation out of fear?
                    entity.burstSpeed = Math.max(entity.burstSpeed + entity.acelSpeed,entity.maxSpeed)
                    log("computeObstacles.predator",currentObstacle.id,entity.id,entity.burstSpeed)
                }else{
                    //log("computeObstacles.obstacle",currentObstacle.id,entity.id,entity.burstSpeed)
                }
            } else{
                //cool down
            }
        });

        // avoid boundary limits
        const boundaryObstacleRadius = this.obstacleRadius/4;
        const distX = this.boundaryX - entity.x;
        const distY = this.boundaryY - entity.y;
        const distZ = this.boundaryZ - entity.z;
        if(entity.x < boundaryObstacleRadius && Math.abs(entity.x) > 0) {
            avoidX += 1/entity.x;
        } else if(distX < boundaryObstacleRadius && distX > 0) {
            avoidX -= 1/distX;
        }
        if(entity.y < boundaryObstacleRadius && Math.abs(entity.y) > 0) {
            avoidY += 1/entity.y;
        } else if(distY < boundaryObstacleRadius && distY > 0) {
            avoidY -= 1/distY;
        }
        if(entity.z < boundaryObstacleRadius && Math.abs(entity.z) > 0) {
            avoidZ += 1/entity.z;
        } else if(distZ < boundaryObstacleRadius && distZ > 0) {
            avoidZ -= 1/distZ;
        }

        return [avoidX, avoidY, avoidZ];
    }

    /**
     * This methods serializes the whole boids controller with entities and
     * returns as a simple object.
     * @returns {Object} serialized BoidsController data
     */
    /*serialize() {
        //removed
    }*/

    /**
     * This methods serializes only the boids data for the given start and end indices.
     * @param {Number} start 
     * @param {Number} end 
     * @returns {Object} serialized partial boids data
     */
    serializeBoidsData(start=0, end=this.flockEntities.length) {
        //removed
    }

    /**
     * Applies the serialized boids data.
     * @param {Object} data 
     */
    applyBoidsData(data:any) {
       //removed
    }

    /**
     * This static method deserializes a boids controller data
     * and creates a new BoidsController instance.
     * @param {Object} data 
     * @returns {BoidsController} deserialized BoidsController instance
     */
    static deserialize(data:any) {
        //removed
    }
}