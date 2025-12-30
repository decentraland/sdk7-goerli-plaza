/*    PLAYER SHOOTING AREA
    contains all functional components of the shooting area, including firing sounds,
    interface for placement calls, and actual firing mechanics. the firing area allows
    players to shoot weapons when within the area's trigger bounds
*/

import * as utils from '@dcl-sdk/utils'
import {
  AudioSource,
  AvatarAnchorPointType,
  AvatarAttach,
  Entity,
  InputAction,
  Material,
  MeshCollider,
  MeshRenderer,
  PointerEventType,
  RaycastQueryType,
  Transform,
  engine,
  inputSystem,
  raycastSystem,
  TriggerArea,
  triggerAreaEventsSystem
} from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { ShotDecalObject } from './shot-decal-object'

/** manages the state of the shooting area, acting as the functional linkage between a target
 *  being shot, playing sounds, and bulletmark placement. the area is composed of 2 objects:
 *      1 - trigger box area that de/actives shooting when the player leaves/enter the area
 *      2 - floor object that displays shooting area's location
 */
export module PlayerShootingArea {
  /** when true debug logs are generated (toggle off when you deploy) */
  const isDebugging: boolean = false

  //audio paths [hit, impact, missed]
  const AUDIO_SHOT_SFX: string[] = [
    'assets/scene/Audio/shooting-range-advanced/shot-hit.mp3',
    'assets/scene/Audio/shooting-range-advanced/shot-impact.mp3',
    'assets/scene/Audio/shooting-range-advanced/shot-missed.mp3'
  ]

  //shooting area size
  const SHOOTING_AREA_SCALE = { x: 12, y: 1, z: 6 }

  /** when true the player can fire at targets */
  var inShootingArea: boolean = false

  /** trigger area, allows players to shoot when inside */
  var shootingAreaEntity: undefined | Entity = undefined
  /** floor, displays shooting area location */
  var shootingFloorEntity: Entity

  /** object interface used to define all data required to manipulate the transform of the shooting area */
  export interface ShootingAreaTransformData {
    pos: { x: number; y: number; z: number }
    rot: { x: number; y: number; z: number }
  }

  //audio objects setup (single object for all sounds anchored to the player)
  //  NOTE: currently the 'play from start' functionality is scuffed in SDK7, so we need an array roll of sounds
  //  create gun shot audio SFX objects
  /** next audio object that should be played */
  var audioIndex: number[] = []
  /** all audio objects */
  const entityAudioShotHit: Entity[][] = [[], [], []]
  //process each type of audio SFX
  for (let i: number = 0; i < AUDIO_SHOT_SFX.length; i++) {
    audioIndex.push(0)
    //create a few of each type (allows over-play)
    for (let j: number = 0; j < 5; j++) {
      const entity = engine.addEntity()
      Transform.create(entity)
      AudioSource.create(entity, { audioClipUrl: AUDIO_SHOT_SFX[i], loop: false, playing: false })
      AvatarAttach.create(entity, { anchorPointId: AvatarAnchorPointType.AAPT_NAME_TAG })
      entityAudioShotHit[i].push(entity)
    }
  }

  /** plays an audio sound of the given type */
  function PlayShotSound(type: number) {
    //grab next index, check for roll-over
    audioIndex[type]++
    if (audioIndex[type] >= entityAudioShotHit[type].length) audioIndex[type] = 0
    //play next sound
    AudioSource.playSound(entityAudioShotHit[type][audioIndex[type]], AUDIO_SHOT_SFX[type])
  }

  /** left click input -> fire a ray */
  engine.addSystem(() => {
    //pull in feedback from input system
    const cmd = inputSystem.getInputCommand(InputAction.IA_POINTER, PointerEventType.PET_DOWN)
    //if input was triggered, attmept to fire a shot
    if (cmd) {
      if (isDebugging) console.log('Shooting Area: left click => attmepting to fire shot')
      FireShot()
    }
  })
  /** fires a ray from the player's camera, checking for a target hit */
  export function FireShot() {
    //ensure player is within firing zone
    if (!inShootingArea) return

    //draw a new raycast from the camera's position
    raycastSystem.registerLocalDirectionRaycast(
      {
        entity: engine.CameraEntity,
        opts: {
          queryType: RaycastQueryType.RQT_HIT_FIRST,
          direction: Vector3.Forward(), //Transform.get(engine.CameraEntity).rotation
          maxDistance: 30
        }
      },
      function (raycastResult) {
        //entity was hit
        if (raycastResult.hits.length > 0) {
          if (raycastResult.hits[0].entityId) {
            //ensure ray hit a valid target object
            if (raycastResult.hits[0].meshName == 'target_collider') console.log('HIT TARGET COLLIDER')
            //attempt to get hit position and hit entity
            const hitPos = raycastResult.hits[0].position
            if (!hitPos) return
            const hitID = raycastResult.hits[0].entityId
            if (!hitID) return
            if (!raycastResult.hits[0].normalHit) return
            //get target's pieces
            const tarEntity = hitID as Entity
            //get hit pieces
            const hitPosition = { x: hitPos.x, y: hitPos.y, z: hitPos.z }
            const hitNormal = {
              x: raycastResult.hits[0].normalHit.x,
              y: raycastResult.hits[0].normalHit.y,
              z: raycastResult.hits[0].normalHit.z,
              w: 0
            }
            //calculate modified transform
            const modTransform = CalculatePlacementDifference(tarEntity, {
              pos: hitPosition,
              rot: { x: 0, y: 0, z: 0 }
            })
            const modQuart = Quaternion.fromEulerDegrees(modTransform.rot.x, modTransform.rot.y, modTransform.rot.z)
            if (isDebugging)
              console.log(
                'Shooting Area: hit at ' +
                '\n\tposition {x=' +
                modTransform.pos.x +
                ', y=' +
                modTransform.pos.y +
                ', z=' +
                modTransform.pos.z +
                '}' +
                '\n\trotation {x=' +
                modTransform.rot.x +
                ', y=' +
                modTransform.rot.y +
                ', z=' +
                modTransform.rot.z +
                '}'
              )

            //create decal pieces
            const decalRotation = Quaternion.lookRotation(hitNormal)
            ShotDecalObject.Create({ parent: tarEntity, pos: modTransform.pos, rot: decalRotation, pivot: modQuart })

            //play audio - hit
            PlayShotSound(0)
            //play audio - impact
            PlayShotSound(1)
          }
        }
        //no entity hit
        else {
          if (isDebugging) console.log('Shooting Area: no entities hit')
          //play audio - miss
          PlayShotSound(2)
        }
      }
    )
  }

  /** adjusts the given positional data compared to a given entity */
  function CalculatePlacementDifference(
    entity: Entity,
    transMod: ShootingAreaTransformData
  ): ShootingAreaTransformData {
    const transform = Transform.get(entity)
    //get relative position
    const relPos = {
      x: transMod.pos.x - transform.position.x,
      y: transMod.pos.y - transform.position.y,
      z: transMod.pos.z - transform.position.z
    }
    //adjust position (quantify magnitude)
    transMod.pos.x = relPos.x / transform.scale.x
    transMod.pos.y = relPos.y / transform.scale.y
    transMod.pos.z = relPos.z / transform.scale.z
    //adjust rotation
    const rotation = Quaternion.toEulerAngles(transform.rotation)
    transMod.rot.x -= rotation.x
    transMod.rot.y -= rotation.y
    transMod.rot.z -= rotation.z
    //if parent exists, continue adjustment
    if (transform.parent) CalculatePlacementDifference(transform.parent, transMod)

    return transMod
  }

  /** returns the shooting area entity, only one instance is maintained. */
  export function GetSurfaceObject(): Entity {
    //ensure shooting area has been initialized
    if (shootingAreaEntity == undefined) {
      if (isDebugging) console.log('Shooting Area: object does not exist, creating new shooting area...')

      //create shooting area floor
      //  entity
      shootingFloorEntity = engine.addEntity()
      Transform.create(shootingFloorEntity, { scale: { x: SHOOTING_AREA_SCALE.x, y: 1, z: SHOOTING_AREA_SCALE.z } })
      //  shape & collider
      MeshRenderer.setBox(shootingFloorEntity)
      MeshCollider.setBox(shootingFloorEntity)
      //  material
      Material.setPbrMaterial(shootingFloorEntity, {
        albedoColor: Color4.Black(),
        emissiveColor: undefined,
        emissiveIntensity: 0
      })

      //create shooting area object
      //  entity
      shootingAreaEntity = engine.addEntity()
      Transform.create(shootingAreaEntity, { scale: SHOOTING_AREA_SCALE })
      //  trigger area
      TriggerArea.setBox(shootingAreaEntity)
      triggerAreaEventsSystem.onTriggerEnter(shootingAreaEntity, function () {
        console.log(`trigger area entered`)
        inShootingArea = true
        //update floor material
        Material.setPbrMaterial(shootingFloorEntity, {
          albedoColor: Color4.Yellow(),
          emissiveColor: Color4.Yellow(),
          emissiveIntensity: 1
        })
      })
      //exit callback
      triggerAreaEventsSystem.onTriggerExit(shootingAreaEntity, function () {
        console.log(`trigger area exited`)
        inShootingArea = false
        //update floor material
        Material.setPbrMaterial(shootingFloorEntity, {
          albedoColor: Color4.Black(),
          emissiveColor: undefined,
          emissiveIntensity: 0
        })
      })

      if (isDebugging) console.log('Shooting Area: created new shooting area!')
    }
    return shootingAreaEntity
  }

  /** moves the shooting area to the given location */
  export function Move(mod: { x: number; y: number; z: number }) {
    if (isDebugging)
      console.log('Shooting Area: object moved to pos(x=' + mod.x + ', y=' + mod.y + ', z=' + mod.z + ')')
    Transform.getMutable(GetSurfaceObject()).position = mod
    Transform.getMutable(shootingFloorEntity).position = { x: mod.x, y: mod.y - 0.5, z: mod.z }
  }
}
