/*    SHOOTING TARGET
    contains all functional components of shooting target objects, including file location
    model's location path, interface for creation calls, on-object component, and management
    module (used for creating, enabling, disabling, and destroying splat objects). 
*/

import {
  Schemas,
  engine,
  Entity,
  Transform,
  GltfContainer,
  ColliderLayer,
  DeepReadonlyObject,
  MeshRenderer,
  MeshCollider
} from '@dcl/sdk/ecs'
import { PLATFORM_STYLE_TYPE, TargetStyleData } from './target-data'
import { Quaternion } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'

export module TargetObject {
  /** represents a single part of a dynamic target */
  export class TargetObjectPiece {
    /** when true, the object exists in the scene & is being rendered */
    public IsActive: boolean = true
    /** parental object (used for positioning) */
    public EntityParent: Entity = engine.addEntity()
    /** listing of all colliders */
    public TargetColliderPieces: Entity[] = []
    /** listing of all static pieces */
    public TargetStaticPieces: Entity[] = []
    /** listing of all rotating pieces */
    public TargetRotatingPieces: Entity[] = []
  }

  //when true debug logs are generated (toggle off when you deploy)
  const isDebugging: boolean = false

  /** pool of existing objects, managing 2 types of targets: static & moving */
  var pooledObjects: TargetObjectPiece[] = []

  /** object interface used to define all data required to create a new target object */
  export interface TargetDataObject {
    type: PLATFORM_STYLE_TYPE
    pos: { x: number; y: number; z: number }
    rot: { x: number; y: number; z: number }
  }

  /** creates a new target object, returning reference to its entity (this handles the creation of the entity as well so ns can handle pooling) */
  export function Create(data: TargetDataObject): TargetObjectPiece {
    if (isDebugging)
      console.log(
        'Target Object: attempting to create object of type=' +
          data.type +
          ' at pos(x=' +
          data.pos.x +
          ', y=' +
          data.pos.y +
          ', z=' +
          data.pos.z +
          ')...'
      )
    const def = TargetStyleData[data.type]

    //attempt to find pre-existing component
    var entry: undefined | TargetObjectPiece = undefined
    for (let i = 0; i < pooledObjects.length; i++) {
      if (!pooledObjects[i].IsActive) {
        if (isDebugging) console.log('Target Object: recycling unused object!')
        //set reference & reactivate
        entry = pooledObjects[i]
        entry.IsActive = true
        break
      }
    }
    //if no unused entry, create anew
    if (entry == undefined) {
      if (isDebugging) console.log('Target Object: created new object!')
      //create entry
      entry = new TargetObjectPiece()
      Transform.create(entry.EntityParent)
      pooledObjects.push(entry)
    }

    //prepare object
    //	position parent
    Transform.getMutable(entry.EntityParent).position = data.pos
    Transform.getMutable(entry.EntityParent).rotation = Quaternion.fromEulerDegrees(data.rot.x, data.rot.y, data.rot.z)
    //	process all static pieces for target definition
    var staticPieces: number = 0
    if (def.staticPieces) {
      //create objects
      staticPieces = def.staticPieces.length
      for (let i = 0; i < staticPieces; i++) {
        //ensure target entity exists
        if (entry.TargetStaticPieces.length <= i) entry.TargetStaticPieces.push(engine.addEntity())
        const entityStatic: Entity = entry.TargetStaticPieces[i]
        //	update transform
        Transform.getOrCreateMutable(entityStatic).parent = entry.EntityParent
        Transform.getOrCreateMutable(entityStatic).position = def.staticPieces[i].position
        //  update custom model
        GltfContainer.createOrReplace(entityStatic, {
          src: def.staticPieces[i].path,
          visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
          invisibleMeshesCollisionMask: undefined
        })
      }
    }
    //remove all unused static peices
    while (entry.TargetStaticPieces.length > staticPieces) {
      const piece = entry.TargetStaticPieces.pop()
      if (piece) engine.removeEntity(piece)
    }
    //	process all rotating pieces for target definition
    var rotatingPieceCount: number = 0
    if (def.rotatingPieces) {
      //create objects
      rotatingPieceCount = def.rotatingPieces.length
      for (let i = 0; i < rotatingPieceCount; i++) {
        //ensure target entity exists
        if (entry.TargetRotatingPieces.length <= i) entry.TargetRotatingPieces.push(engine.addEntity())
        const entityRotating: Entity = entry.TargetRotatingPieces[i]

        //	update transform
        Transform.getOrCreateMutable(entityRotating).parent = entry.EntityParent
        Transform.getOrCreateMutable(entityRotating).position = def.rotatingPieces[i].position
        //  update custom model
        GltfContainer.createOrReplace(entityRotating, {
          src: def.rotatingPieces[i].path,
          visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
          invisibleMeshesCollisionMask: undefined
        })
        //	update component
        utils.perpetualMotions.startRotation(
          entityRotating,
          Quaternion.fromEulerDegrees(
            def.rotatingPieces[i].rotationSpeed.x,
            def.rotatingPieces[i].rotationSpeed.y,
            def.rotatingPieces[i].rotationSpeed.z
          )
        )
      }
    }
    //remove all unused rotating peices
    while (entry.TargetRotatingPieces.length > rotatingPieceCount) {
      const piece = entry.TargetRotatingPieces.pop()
      if (piece) engine.removeEntity(piece)
    }

    //provide entry reference
    if (isDebugging)
      console.log(
        'Target Object: object id=' + entry.EntityParent.toString() + ' placed, total objects=' + pooledObjects.length
      )
    return entry
  }

  /** disables all objects from the game */
  export function DisableAll() {
    if (isDebugging) console.log('Target Object: disabling all objects...')

    //parse all objects in the pool
    for (let i = 0; i < pooledObjects.length; i++) {
      Disable(pooledObjects[i])
    }

    if (isDebugging) console.log('Target Object: disabled all objects!')
  }
  /** disables given object from game (does not destroy object, remains in pool) */
  export function Disable(entry: TargetObjectPiece) {
    //disable via data
    entry.IsActive = false

    //hide object (soft-state work-around)
    Transform.getMutable(entry.EntityParent).scale = { x: 0, y: 0, z: 0 }
  }

  /** destroyes all objects in the game */
  export function DestroyAll() {
    if (isDebugging) console.log('Target Object: destroying all objects...')

    //parse all objects in the pool
    for (let i = 0; i < pooledObjects.length; i++) {
      while (0 < pooledObjects.length) {
        const obj = pooledObjects.pop()
        if (obj != undefined) Destroy(obj)
      }
    }

    if (isDebugging) console.log('Target Object: destroyed all objects!')
  }
  /** destroys given object (removes from engine and pool) */
  export function Destroy(entry: TargetObjectPiece) {
    engine.removeEntity(entry.EntityParent)
  }
}
