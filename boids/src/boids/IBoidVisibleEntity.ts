import { EntityWrapper } from 'src/portwrapper/EntityWrapper.js';
import IBoidEntity from './IBoidEntity.js';


/**
 * @module BoidVisualEntity 
 * Entity class defines an entitiy model which has a position and a velocity.
 * Also it has some utiliy methods.
 */
export default interface IBoidVisibleEntity {
    boid:IBoidEntity
    entity:EntityWrapper
    modelEntity:EntityWrapper
    //maxEntitySpeed?:number
    
    initEntity():void
}