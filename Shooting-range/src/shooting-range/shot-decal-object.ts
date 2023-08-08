/*    SHOT DECAL
    contains all functional components of shot decal objects, including file location
    model's location path, interface for creation calls, on-object component, and management
    module (used for creating, enabling, disabling, and destroying splat objects). when placed
    shot decals automatically decay after a period of time (get repooled for use later)
*/

import { Entity, GltfContainer, Schemas, Transform, engine } from '@dcl/sdk/ecs'

export module ShotDecalObject {
  //when true debug logs are generated (toggle off when you deploy)
  const isDebugging: boolean = false

  /** decal model location */
  const MODEL_DECAL_OBJECT = 'models/shooting-range/shot-decal.glb'

  /** pool of existing objects */
  var pooledObjects: Entity[] = []

  /** how many seconds a decal will remain active */
  const DECAL_LIFESPAN = 12

  /** object interface used to define all data required to create a new target object */
  export interface ShotDecalDataObject {
    parent: Entity
    pos: { x: number; y: number; z: number }
  }

  /** component data def, this will exist attached on the object's entity as a component */
  export const ShotDecalComponentData = {
    /** true when this object is rendered in the scene */
    isActive: Schemas.Boolean,
    /** time remaing until mark disable */
    decayTime: Schemas.Number
  }
  /** define component, adding it to the engine as a managed behaviour */
  export const ShotDecalComponent = engine.defineComponent('ShotDecalComponentData', ShotDecalComponentData)

  /** timed processing for component */
  function ShotDecalTimerSystem(dt: number) {
    //process every entity that has this component
    for (const [entity] of engine.getEntitiesWith(ShotDecalComponent)) {
      const component = ShotDecalComponent.getMutable(entity)
      //skip if not active/processing
      if (!component.isActive) continue
      //add time
      component.decayTime += dt
      //check for toggle
      if (component.decayTime >= DECAL_LIFESPAN) {
        ShotDecalObject.Disable(entity)
      }
    }
  }
  /** add system to engine */
  engine.addSystem(ShotDecalTimerSystem)

  /** creates a new object, returning reference to its entity (this handles the creation of the entity as well so ns can handle pooling) */
  export function Create(data: ShotDecalDataObject): Entity {
    if (isDebugging)
      console.log(
        'Shot Decal Object: attempting to create object at pos(x=' +
          data.pos.x +
          ', y=' +
          data.pos.y +
          ', z=' +
          data.pos.z +
          ')...'
      )

    //attempt to find pre-existing component
    for (let i = 0; i < pooledObjects.length; i++) {
      if (!ShotDecalComponent.get(pooledObjects[i]).isActive) {
        if (isDebugging) console.log('Shot Decal Object: recycled unused object!')
        return Enable(pooledObjects[i], data)
      }
    }

    //create object
    //  create entity
    const entity = engine.addEntity()
    Transform.create(entity, {
      parent: data.parent,
      position: { x: data.pos.x, y: data.pos.y, z: data.pos.z }
    })
    //  add custom model
    GltfContainer.create(entity, {
      src: MODEL_DECAL_OBJECT,
      visibleMeshesCollisionMask: undefined,
      invisibleMeshesCollisionMask: undefined
    })
    //  add component
    ShotDecalComponent.create(entity, { isActive: true, decayTime: 0 })

    //add entity to pooling
    pooledObjects.push(entity)
    if (isDebugging) console.log('Shot Decal Object: created new object!')
    //provide entity reference
    return entity
  }

  /** enables the given object with the provided settings (assumes object was previously disabled) */
  export function Enable(entity: Entity, data: ShotDecalDataObject): Entity {
    if (isDebugging) console.log('Shot Decal Object: re-enabling unused object...')

    //reactivate requested component, initialized by type
    ShotDecalComponent.getMutable(entity).isActive = true
    ShotDecalComponent.getMutable(entity).decayTime = 0

    //place objects
    Transform.getMutable(entity).parent = data.parent
    Transform.getMutable(entity).position = { x: data.pos.x, y: data.pos.y, z: data.pos.z }

    //enable object (soft-state work-around)
    Transform.getMutable(entity).scale = { x: 1, y: 1, z: 1 }

    if (isDebugging) console.log('Shot Decal Object: re-enabled unused object!')
    return entity
  }

  /** disables all objects from the game */
  export function DisableAll() {
    if (isDebugging) console.log('Shot Decal Object: disabling all objects...')

    //parse all objects in the pool
    for (let i = 0; i < pooledObjects.length; i++) {
      Disable(pooledObjects[i])
    }

    if (isDebugging) console.log('Shot Decal Object: disabled all objects!')
  }
  /** disables given object from game (does not destroy object, remains in pool) */
  export function Disable(entity: Entity) {
    const component = ShotDecalComponent.getMutable(entity)
    //disable via component
    component.isActive = false

    //hide object (soft-state work-around)
    Transform.getMutable(entity).scale = { x: 0, y: 0, z: 0 }
  }

  /** destroyes all objects in the game */
  export function DestroyAll() {
    if (isDebugging) console.log('Shot Decal Object: destroying all objects...')

    //parse all objects in the pool
    while (0 < pooledObjects.length) {
      const obj = pooledObjects.pop()
      if (obj != undefined) Destroy(obj)
    }

    if (isDebugging) console.log('Shot Decal Object: destroyed all objects!')
  }
  /** destroys given object (removes from engine and pool) */
  export function Destroy(entity: Entity) {
    engine.removeEntity(entity)
  }
}
