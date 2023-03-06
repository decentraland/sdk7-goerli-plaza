import BoidVisibleEntity from './BoidVisibleEntity.js';
import { BOID_CONFIG } from './Constants.js';
import Grid from "./Grid";
import IBoidEntity, { BoidTypeEnum } from './IBoidEntity.js';
import IBoidVisibleEntity from './IBoidVisibleEntity.js';

let idCounter = 0;

/**
 * @module BoidEntity 
 * Entity class defines an entitiy model which has a position and a velocity.
 * Also it has some utiliy methods.
 */
export default class BoidEntity implements IBoidEntity {
    id:number
    type:number
    x:number
    y:number
    z:number
    vx:number
    vy:number
    vz:number
    grid?:Grid
 
    visibleEntity!:IBoidVisibleEntity

    //entity!:Entity
    //modelEntity!:Entity
    canMove:boolean = false //default is false

    maxSpeed:number
    burstSpeed: number
    decelSpeed: number = .05
    acelSpeed: number = .2
    enabled:boolean = true
    
    //optional //override system controlling it
    aligmentWeight?:number
    cohesionWeight?:number
    separationWeight?:number

    aligmentRadius?:number
    cohesionRadius?:number
    separationRadius?:number
    obstacleRadius?:number
    seekRadius?:number
    avoidRadius?:number
    
    //maxEntitySpeed?:number

    //aligmentRadius?:number
    //cohesionRadius?:number
    //separationRadius?:number
    //obstacleRadius?:number

    static FLOCK_ENTITY = BoidTypeEnum.FLOCK_ENTITY;
    static OBSTACLE_ENTITY = BoidTypeEnum.OBSTACLE_ENTITY;
    static PREDATOR_ENTITY = BoidTypeEnum.PREDATOR_ENTITY;
    static SEEK_ENTITY = BoidTypeEnum.SEEK_ENTITY;
    /**
     * Constructor for the Entity class
     * @param {Number} type entitiy type that defines it as flock or obstacle entitiy 
     * @param {Number} x x position
     * @param {Number} y y position
     * @param {Number} z z position
     * @param {Number} vx x velocity
     * @param {Number} vy y velocity
     * @param {Number} vz z velocity
     */
    constructor(type:number, x:number=0, y:number=0, z:number=0, vx:number=0, vy:number=0, vz:number=0) {
        this.id = ++idCounter;
        this.type = type;
        this.x = x;
        this.y = y;
        this.z = z;
        this.vx = vx;
        this.vy = vy;
        this.vz = vz;

        this.maxSpeed = (Math.random() + 5) * BOID_CONFIG.MAX_SPEED_SCALE
        this.burstSpeed = 0
        //this.grid = undefined;
        //this.mesh = undefined;

        //this.FLOCK_ENTITY = 1;
        //this.OBSTACLE_ENTITY = 1;

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
        this.visibleEntity = new BoidVisibleEntity(this)
        this.visibleEntity.initEntity()
    }
    /**
     * Sets the grid instance
     * @param {Grid} grid 
     */
    setGrid(grid?:Grid) {
        this.grid = grid;
    }

    /**
     * @returns {Number} type of the entity
     */
    getType() {
        return this.type;
    }

    /**
     * @returns {Number} the current scalar velocity of the entity.
     */
    getVelocity() {
        return Math.sqrt((this.vx*this.vx)+(this.vy*this.vy)+(this.vz*this.vz));
    }

    /**
     * Checks the velocity of the entitiy and limits it to the given parameter
     * @param {Number} maxVelocity 
     */
    checkVelocity(maxVelocity = 1) {
        const velocity = this.getVelocity();
        if(velocity > maxVelocity && velocity > 0) {
            this.vx = maxVelocity*this.vx/velocity;
            this.vy = maxVelocity*this.vy/velocity;
            this.vz = maxVelocity*this.vz/velocity;
        }
    }

    /**
     * This method adds the given velocity to the current velocity.
     * @param {Number} vx x velocity
     * @param {Number} vy y velocity
     * @param {Number} vz z velocity
     */
    addVelocity(vx:number, vy:number, vz:number) {
        this.vx += vx;
        this.vy += vy;
        this.vz += vz;
    }

    /**
     * This method moves the entity.
     * @param {Number} maxVelocity 
     * @param {Number} bx 
     * @param {Number} by 
     * @param {Number} bz 
     */
    move(maxVelocity:number, bx:number, by:number, bz:number) {
        this.checkVelocity(maxVelocity);

        let nx = this.x + this.vx;
        let ny = this.y + this.vy;
        let nz = this.z + this.vz;

        nx = Math.max(0, nx);
        nx = Math.min(bx, nx);
        ny = Math.max(0, ny);
        ny = Math.min(by, ny);
        nz = Math.max(0, nz);
        nz = Math.min(bz, nz);
        
        this.grid?.moveEntity(this, nx, ny, nz);
    }

    /**
     * Calculate the distance between the entity and the given entity
     * @param {Entity} otherEntity 
     * @returns {Number} the distance between two entities
     */
    getDistance(otherEntity:BoidEntity) {
        const dx = this.x - otherEntity.x;
        const dy = this.y - otherEntity.y;
        const dz = this.z - otherEntity.z;
        return Math.sqrt((dx*dx)+(dy*dy)+(dz*dz));
    }

    /**
     * Serialized the entitiy
     * @returns {Object} serialized data
     */
    serialize() {
        //removed
    }

    /**
     * Updates the internal data of the entity if the IDs match
     * @param {Object} data 
     */
    updateData(data:any) {
        //removed
    }

    /**
     * This static method deserializes the given data and returns new Entity instance.
     * @param {Object} data 
     * @returns {Entitiy} deserialized Entitiy instance
     */
    deserialize(data:any) {
        //removed
    }
}