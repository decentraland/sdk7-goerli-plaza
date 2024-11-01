/*    SHOOTING TARGET
    contains all functional components of shooting target objects, including file location
    model's location path, interface for creation calls, on-object component, and management
    module (used for creating, enabling, disabling, and destroying splat objects). 
*/

import { Schemas, engine, Entity, Transform, GltfContainer, ColliderLayer } from '@dcl/sdk/ecs'
import { READY_TO_SHOOT } from './player-shooting-area'

export module TargetObject {
  //when true debug logs are generated (toggle off when you deploy)
  const isDebugging: boolean = false

  /** shooting model location */
  const MODEL_TARGET_OBJECT = 'models/shooting-range/shooting-target.glb'

  /** represents all possible target types */
  export enum TARGET_TYPE {
    STATIC = 0,
    MOVING = 1
  }

  /** pool of existing objects, managing 2 types of targets: static & moving */
  var pooledObjects: Entity[][] = [[], []]

  /** object interface used to define all data required to create a new target object */
  export interface TargetStaticDataObject {
    type: TARGET_TYPE.STATIC
    pos: { x: number; y: number; z: number }
  }
  /** object interface used to define all data required to create a new target object */
  export interface TargetMovingDataObject {
    type: TARGET_TYPE.MOVING
    speed: number
    waypoints: { x: number; y: number; z: number }[]
  }

  /** component data def for static targets, this will exist attached on the object's entity as a component */
  export const TargetStaticComponentData = {
    /** true when this object is rendered in the scene */
    isActive: Schemas.Boolean
  }
  /** define component, adding it to the engine as a managed behaviour */
  export const TargetStaticComponent = engine.defineComponent('TargetStaticComponentData', TargetStaticComponentData)

  /** component data def for moving targets, this will exist attached on the object's entity as a component */
  export const TargetMovingComponentData = {
    /** true when this object is rendered in the scene */
    isActive: Schemas.Boolean,
    /** if true object's function is being processed by system */
    isProcessing: Schemas.Boolean,
    /** movement speed of target*/
    speed: Schemas.Number,
    /** currently targeted waypoint */
    indexCur: Schemas.Number,
    /** waypoints for target to move to */
    waypoints: Schemas.Array(Schemas.Vector3),
    /** normalized movement speed */
    normal: Schemas.Vector3
  }
  /** define component, adding it to the engine as a managed behaviour */
  export const TargetMovingComponent = engine.defineComponent('TargetMovingComponentData', TargetMovingComponentData)
  /** timed processing for all moving target components */
  const targetProcessingMoving = function MovingTimer(dt: number) {
    //process every entity that has this component

    if (!READY_TO_SHOOT) return

    for (const [entity] of engine.getEntitiesWith(TargetMovingComponent)) {
      const component = TargetMovingComponent.getMutable(entity)
      //ensure target is active and processing movement
      if (!component.isActive || !component.isProcessing) continue
      //get transform
      const pos = Transform.getMutable(entity).position
      //check for destination
      if (
        Math.abs(pos.x - component.waypoints[component.indexCur].x) < 0.1 &&
        Math.abs(pos.y - component.waypoints[component.indexCur].y) < 0.1 &&
        Math.abs(pos.z - component.waypoints[component.indexCur].z) < 0.1
      ) {
        //update target
        component.indexCur++
        if (component.indexCur >= component.waypoints.length) component.indexCur = 0

        //determine new direction that object has to move in
        const direction = {
          x: component.waypoints[component.indexCur].x - pos.x,
          y: component.waypoints[component.indexCur].y - pos.y,
          z: component.waypoints[component.indexCur].z - pos.z
        }
        //recalculate norm translation
        const length = Math.sqrt(direction.x * direction.x + direction.y * direction.y + direction.z * direction.z)
        component.normal = {
          x: direction.x / length,
          y: direction.y / length,
          z: direction.z / length
        }
      }
      //if(isDebugging) console.log("Target Object: waypoint="+component.indexCur
      //	+", x="+pos.x+", y="+pos.y+", z="+pos.z);
      //move towards target location
      pos.x += dt * component.speed * component.normal.x
      pos.y += dt * component.speed * component.normal.y
      pos.z += dt * component.speed * component.normal.z
    }
  }
  /** add system to engine */
  engine.addSystem(targetProcessingMoving)

  /** creates a new target object, returning reference to its entity (this handles the creation of the entity as well so ns can handle pooling) */
  export function Create(data: TargetStaticDataObject | TargetMovingDataObject): Entity {
    if (isDebugging) console.log('Target Object: attempting to create object of type=' + data.type + '...')

    //attempt to find pre-existing component
    var entity: undefined | Entity = undefined
    for (let i = 0; i < pooledObjects[data.type].length; i++) {
      //process based on component type we are after
      switch (data.type) {
        case TARGET_TYPE.STATIC:
          if (!TargetStaticComponent.get(pooledObjects[data.type][i]).isActive)
            entity = Enable(pooledObjects[data.type][i], data)
          break
        case TARGET_TYPE.MOVING:
          if (!TargetMovingComponent.get(pooledObjects[data.type][i]).isActive)
            entity = Enable(pooledObjects[data.type][i], data)
          break
      }
      if (entity != undefined) {
        if (isDebugging) console.log('Target Object: recycled unused object!')
        break
      }
    }
    if (!entity) {
      if (isDebugging) console.log('Target Object: created new object!')
      //create object
      //  create entity
      entity = engine.addEntity()
      //  add custom model
      GltfContainer.create(entity, {
        src: MODEL_TARGET_OBJECT,
        visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
        invisibleMeshesCollisionMask: undefined
      })
    }

    //add requested component type, initialized by type
    switch (data.type) {
      case TARGET_TYPE.STATIC:
        //update position
        Transform.getOrCreateMutable(entity).position = data.pos
        //update component
        const compStatic = TargetStaticComponent.getOrCreateMutable(entity)
        compStatic.isActive = true
        break
      case TARGET_TYPE.MOVING:
        //update position
        Transform.getOrCreateMutable(entity).position = data.waypoints[0]
        //update component
        const compMoving = TargetMovingComponent.getOrCreateMutable(entity)
        compMoving.isActive = true
        compMoving.isProcessing = true
        compMoving.speed = data.speed
        compMoving.indexCur = 0
        compMoving.waypoints = []
        //	note: we cannot take these data objects in by reference, we must assert them
        for (let i = 0; i < data.waypoints.length; i++) {
          compMoving.waypoints.push({ x: data.waypoints[i].x, y: data.waypoints[i].y, z: data.waypoints[i].z })
        }
        if (isDebugging) console.log('Target Object: ' + compMoving.waypoints.length + ', ' + data.waypoints.length)
        break
    }

    //add entity to pooling
    pooledObjects[data.type].push(entity)
    if (isDebugging) console.log('Target Object: created new object!')
    //provide entity reference
    return entity
  }

  /** enables the given object with the provided settings (assumes object was previously disabled) */
  export function Enable(entity: Entity, data: TargetStaticDataObject | TargetMovingDataObject): Entity {
    if (isDebugging) console.log('Target Object: re-enabling unused object...')

    //enable object (soft-state work-around)
    Transform.getMutable(entity).scale = { x: 1, y: 1, z: 1 }

    if (isDebugging) console.log('Target Object: re-enabled unused object!')
    return entity
  }

  /** disables all objects from the game */
  export function DisableAll() {
    if (isDebugging) console.log('Target Object: disabling all objects...')

    //parse all objects in the pool
    for (let i = 0; i < pooledObjects.length; i++) {
      for (let j = 0; j < pooledObjects[i].length; j++) {
        Disable(pooledObjects[i][j], i)
      }
    }

    if (isDebugging) console.log('Target Object: disabled all objects!')
  }
  /** disables given object from game (does not destroy object, remains in pool) */
  export function Disable(entity: Entity, type: number) {
    //disable via component, based on object type
    switch (type) {
      case TARGET_TYPE.STATIC:
        TargetStaticComponent.getMutable(entity).isActive = false
        break
      case TARGET_TYPE.MOVING:
        TargetMovingComponent.getMutable(entity).isActive = false
        TargetMovingComponent.getMutable(entity).isProcessing = false
        break
    }

    //hide object (soft-state work-around)
    Transform.getMutable(entity).scale = { x: 0, y: 0, z: 0 }
  }

  /** destroyes all objects in the game */
  export function DestroyAll() {
    if (isDebugging) console.log('Target Object: destroying all objects...')

    //parse all objects in the pool
    for (let i = 0; i < pooledObjects.length; i++) {
      while (0 < pooledObjects[i].length) {
        const obj = pooledObjects[i].pop()
        if (obj != undefined) Destroy(obj)
      }
    }

    if (isDebugging) console.log('Target Object: destroyed all objects!')
  }
  /** destroys given object (removes from engine and pool) */
  export function Destroy(entity: Entity) {
    engine.removeEntityWithChildren(entity)
  }
}
