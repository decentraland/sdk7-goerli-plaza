/*    SPLAT OBJECT
    contains all functional components of splat objects, including model's file location 
    path, interface for creation calls, on-object component, and management module (used 
    for creating, enabling, disabling, and destroying splat objects). 
*/

import {
  AudioSource,
  AvatarAnchorPointType,
  AvatarAttach,
  Entity,
  GltfContainer,
  Schemas,
  Transform,
  engine
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

/** manages the state of splat objects, acting as an interface for the creation, dis/able,
 *  and destruction of objects
 */
export module SplatObject {
  /** when true debug logs are generated (toggle off when you deploy) */
  const isDebugging: boolean = false

  /** splat sound location, played when splat object is placed */
  const AUDIO_SPLAT_PLACEMENT: string = 'assets/scene/Audio/splat-attack/splat.wav'
  /** splat model location */
  const MODEL_SPLAT_OBJECT: string = 'assets/scene/Models/splat-attack/splat-object.glb'

  /** pool of existing objects */
  var pooledObjects: Entity[] = []

  /** object interface used to define all data required to create a new splat object */
  export interface SplatDataObject {
    x: number
    y: number
    z: number
  }

  /** component data def, this will exist attached on the object's entity as a component */
  export const SplatComponentData = {
    /** true when this object is rendered in the scene */
    isActive: Schemas.Boolean
  }
  /** define component, adding it to the engine as a managed behaviour */
  export const SplatComponent = engine.defineComponent('SplatComponentData', SplatComponentData)

  //audio object setup (single object for all sounds anchored to the player)
  //  create entity
  const splatAudioObj = engine.addEntity()
  Transform.create(splatAudioObj, {
    position: Vector3.create(0, 0, 0),
    scale: Vector3.create(1, 1, 1),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0)
  })
  //  add audio component
  AudioSource.create(splatAudioObj, {
    audioClipUrl: AUDIO_SPLAT_PLACEMENT,
    loop: false,
    playing: false,
    volume: 5
  })
  //  anchor to player
  AvatarAttach.create(splatAudioObj, {
    anchorPointId: AvatarAnchorPointType.AAPT_NAME_TAG
  })

  /** plays the splat placement sound */
  export function PlaySound() {
    AudioSource.getMutable(splatAudioObj).playing = true
  }

  /** creates a new collectible object, returning reference to its entity (this handles the creation of the entity as well so ns can handle pooling) */
  export function Create(pos: SplatDataObject): Entity {
    if (isDebugging)
      console.log(
        'Splat Object: attempting to create object at pos(x=' + pos.x + ', y=' + pos.y + ', z=' + pos.z + ')...'
      )

    //attempt to find an existing unused object
    for (let i = 0; i < pooledObjects.length; i++) {
      if (!SplatComponent.get(pooledObjects[i]).isActive) {
        if (isDebugging) console.log('Splat Object: recycled unused object!')
        //re-enable unused object from pooling
        Enable(pooledObjects[i])
        //position object
        Transform.getMutable(pooledObjects[i]).position = pos
        return pooledObjects[i]
      }
    }

    //create object
    //  create entity
    const entity = engine.addEntity()
    Transform.create(entity, { position: pos })
    //  add custom model
    GltfContainer.create(entity, {
      src: MODEL_SPLAT_OBJECT,
      visibleMeshesCollisionMask: undefined,
      invisibleMeshesCollisionMask: undefined
    })
    //  add component, initialized by type
    SplatComponent.create(entity, {
      isActive: true
    })

    //add entity to pooling
    pooledObjects.push(entity)
    if (isDebugging) console.log('Splat Object: created new object!')
    //provide entity reference
    return entity
  }

  /** enables the given object (assumes object was previously disabled) */
  export function Enable(entity: Entity): Entity {
    if (isDebugging) console.log('Splat Object: re-enabling unused object...')

    //get & reset component from object
    const component = SplatComponent.getMutable(entity)
    component.isActive = true

    //enable object (soft-state work-around)
    Transform.getMutable(entity).scale = { x: 1, y: 1, z: 1 }

    if (isDebugging) console.log('Splat Object: re-enabled unused object!')
    return entity
  }

  /** disables all objects from the game */
  export function DisableAll() {
    if (isDebugging) console.log('Splat Object: disabling all objects...')

    //parse all objects in the pool
    for (let i = 0; i < pooledObjects.length; i++) {
      Disable(pooledObjects[i])
    }

    if (isDebugging) console.log('Splat Object: disabled all objects!')
  }
  /** disables given object from game (does not destroy object, remains in pool) */
  export function Disable(entity: Entity) {
    //disable via component
    const component = SplatComponent.getMutable(entity)
    component.isActive = false

    //hide object (soft-state work-around)
    Transform.getMutable(entity).scale = { x: 0, y: 0, z: 0 }
  }

  /** destroyes all objects in the game */
  export function DestroyAll() {
    if (isDebugging) console.log('Splat Object: destroying all objects...')

    //parse all objects in the pool
    while (0 < pooledObjects.length) {
      const obj = pooledObjects.pop()
      if (obj != undefined) Destroy(obj)
    }

    if (isDebugging) console.log('Splat Object: destroyed all objects!')
  }
  /** destroys given object (removes from engine and pool) */
  export function Destroy(entity: Entity) {
    engine.removeEntity(entity)
  }
}
