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
  GltfContainer,
  InputAction,
  Material,
  MeshCollider,
  MeshRenderer,
  PointerEventType,
  PointerEvents,
  RaycastQueryType,
  Transform,
  engine,
  inputSystem,
  raycastSystem
} from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { ShotDecalObject } from './shot-decal-object'
import { ScoreObject } from './score-object'

/** manages the state of the shooting area, acting as the functional linkage between a target
 *  being shot, playing sounds, and bulletmark placement. the area is composed of 2 objects:
 *      1 - trigger box area that de/actives shooting when the player leaves/enter the area
 *      2 - floor object that displays shooting area's location
 */
export module PlayerShootingArea {
  /** when true debug logs are generated (toggle off when you deploy) */
  const isDebugging: boolean = false

  //audio paths
  const AUDIO_SHOT_SFX: string[] = ['audio/shooting-range/shot-hit.mp3', 'audio/shooting-range/shot-missed.mp3']

  //shooting area size
  const SHOOTING_AREA_SCALE = { x: 12, y: 1, z: 4 }

  /** when true the player can fire at targets */
  var inShootingArea: boolean = false

  /** trigger area, allows players to shoot when inside */
  var shootingAreaEntity: undefined | Entity = undefined
  /** floor, displays shooting area location */
  var shootingFloorEntity: Entity

  /** object interface used to define all data required to manipulate the transform of the shooting area */
  export interface ShootingAreaTransformData {
    x: number
    y: number
    z: number
  }

  //audio objects setup (single object for all sounds anchored to the player)
  //  NOTE: currently the 'play from start' functionality is scuffed in SDK7, so we need an array roll of sounds
  //  create gun shot audio SFX objects
  const entityAudioShotHit: Entity[][] = [[], []]
  //process each type of audio SFX
  for (let i: number = 0; i < AUDIO_SHOT_SFX.length; i++) {
    //create a few of each type (allows over-play)
    for (let j: number = 0; j < 5; j++) {
      const entity = engine.addEntity()
      Transform.create(entity)
      AudioSource.create(entity, { audioClipUrl: AUDIO_SHOT_SFX[i], loop: false, playing: false })
      AvatarAttach.create(entity, { anchorPointId: AvatarAnchorPointType.AAPT_NAME_TAG })
      entityAudioShotHit[i].push(entity)
    }
  }

  /** next audio object that should be played */
  var audioIndex: number[] = [0, 0]
  /** plays an audio sound of the given type */
  function PlayShotSound(type: number) {
    //grab next index, check for roll-over
    audioIndex[type]++
    if (audioIndex[type] >= entityAudioShotHit[type].length) audioIndex[type] = 0
    //play next sound
    AudioSource.getMutable(entityAudioShotHit[type][audioIndex[type]]).playing = true
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
            if (isDebugging) console.log('Shooting Area: valid hit found, attempting to find entity...')
            //attempt to get hit position and hit entity
            const hitPos = raycastResult.hits[0].position
            if (!hitPos) return
            const hitID = raycastResult.hits[0].entityId
            if (!hitID) return
            const entity = hitID as Entity
            const transform = Transform.get(entity)
            const relPos = {
              x: hitPos.x - transform.position.x,
              y: hitPos.y - transform.position.y,
              z: hitPos.z - transform.position.z - 0.05
            }

            if (isDebugging)
              console.log(
                'Shooting Area: hit validated entityID=' +
                  hitID +
                  ', mesh=' +
                  raycastResult.hits[0].meshName +
                  '\t\nposition{ x=' +
                  relPos.x +
                  ', y=' +
                  relPos.y +
                  ', z=' +
                  relPos.z +
                  ' }'
              )

            //render new shot decal
            ShotDecalObject.Create({ parent: entity, pos: relPos })
            //render new score display
            switch (raycastResult.hits[0].meshName) {
              case 'target10_collider':
                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z - 0.5 }
                })
                break
              case 'target25_collider':
                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TWENTYFIVE,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z - 0.5 }
                })
                break
              case 'target50_collider':
                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.FIFTY,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z - 0.5 }
                })
                break
            }
            //play audio - hit
            PlayShotSound(0)
          }
        }
        //no entity hit
        else {
          if (isDebugging) console.log('Shooting Area: no entities hit')
          //play audio - miss
          PlayShotSound(1)
        }
      }
    )
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
        albedoColor: Color4.Red(),
        emissiveColor: undefined,
        emissiveIntensity: 0
      })

      //create shooting area object
      //  entity
      shootingAreaEntity = engine.addEntity()
      Transform.create(shootingAreaEntity, { scale: SHOOTING_AREA_SCALE })
      //  trigger area
      utils.triggers.addTrigger(
        shootingAreaEntity,
        utils.NO_LAYERS,
        utils.LAYER_1,
        [{ type: 'box', scale: SHOOTING_AREA_SCALE }],
        //entry callback
        function (otherEntity) {
          console.log(`trigger area entered, object=${otherEntity}!`)
          inShootingArea = true
          //update floor material
          Material.setPbrMaterial(shootingFloorEntity, {
            albedoColor: Color4.Yellow(),
            emissiveColor: Color4.Yellow(),
            emissiveIntensity: 1
          })
        },
        //exit callback
        function (otherEntity) {
          console.log(`trigger area exited, object=${otherEntity}!`)
          inShootingArea = false
          //update floor material
          Material.setPbrMaterial(shootingFloorEntity, {
            albedoColor: Color4.Red(),
            emissiveColor: undefined,
            emissiveIntensity: 0
          })
        }
      )

      if (isDebugging) console.log('Shooting Area: created new shooting area!')
    }
    return shootingAreaEntity
  }

  /** moves the shooting area to the given location */
  export function Move(mod: ShootingAreaTransformData) {
    if (isDebugging)
      console.log('Shooting Area: object moved to pos(x=' + mod.x + ', y=' + mod.y + ', z=' + mod.z + ')')
    Transform.getMutable(GetSurfaceObject()).position = mod
    Transform.getMutable(shootingFloorEntity).position = { x: mod.x, y: mod.y - 0.45, z: mod.z }
  }
}
