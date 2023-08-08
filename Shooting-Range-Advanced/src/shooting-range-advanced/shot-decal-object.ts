/*    SHOT DECAL
    contains all functional components of shot decal objects, including file location
    model's location path and interface for creation calls
*/

import { Entity, GltfContainer, Transform, engine } from '@dcl/sdk/ecs'
import * as utils from '@dcl-sdk/utils'

export module ShotDecalObject {
  //when true debug logs are generated (toggle off when you deploy)
  const isDebugging: boolean = false

  /** decal model location */
  const MODEL_DECAL_OBJECT = 'models/shooting-range-advanced/shot-decal.glb'

  /** pool of existing objects */
  var pooledObjects: Entity[] = []

  /** how many seconds a decal will remain active */
  const DECAL_LIFESPAN = 3600

  /** object interface used to define all data required to create a new target object */
  export interface ShotDecalDataObject {
    parent: undefined | Entity
    pos: { x: number; y: number; z: number }
    rot: { x: number; y: number; z: number; w: number }
    pivot: { x: number; y: number; z: number; w: number }
  }

  /** creates a new object, returning reference to its entity */
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

    //create object
    //  create anchor entity
    const anchor = engine.addEntity()
    Transform.create(anchor, {
      parent: data.parent,
      rotation: data.pivot
    })
    //  create decal entity
    const entity = engine.addEntity()
    Transform.create(entity, {
      parent: anchor,
      position: data.pos,
      rotation: data.rot
    })
    //  add custom model
    GltfContainer.create(entity, {
      src: MODEL_DECAL_OBJECT,
      visibleMeshesCollisionMask: undefined,
      invisibleMeshesCollisionMask: undefined
    })

    //register a delayed function to remove the decal after it has expired
    utils.timers.setTimeout(function () {
      engine.removeEntity(anchor)
    }, DECAL_LIFESPAN)

    //add entity to pooling
    pooledObjects.push(entity)
    if (isDebugging)
      console.log(
        'Shot Decal Object: created new object at' +
          '\n\tpar rotation {x=' +
          data.pivot.x +
          ', y=' +
          data.pivot.y +
          ', z=' +
          data.pivot.z +
          '}' +
          '\n\ttar position {x=' +
          data.pos.x +
          ', y=' +
          data.pos.y +
          ', z=' +
          data.pos.z +
          '}' +
          '\n\ttar rotation {x=' +
          data.rot.x +
          ', y=' +
          data.rot.y +
          ', z=' +
          data.rot.z +
          '}'
      )
    //provide entity reference
    return entity
  }
}
