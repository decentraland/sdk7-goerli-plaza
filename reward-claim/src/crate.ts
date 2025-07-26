import * as utils from '@dcl-sdk/utils'
import {
  AudioSource,
  EasingFunction,
  engine,
  Entity,
  GltfContainer,
  InputAction,
  PointerEvents,
  pointerEventsSystem,
  raycastSystem,
  Schemas,
  Transform,
  Tween
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { claimToken } from './claim/claim'
import { ClaimConfigInstType } from './claim/claimConfig'

type dropArea = {
  SW: Vector3
  NE: Vector3
}

let DROP_HEIGHT = 15

let stageDropArea: dropArea = {
  SW: Vector3.create(3, 0, 3),
  NE: Vector3.create(9, 0, 9)
}

//export const Crate = engine.defineComponent('Crate', {
//  startPos: Schemas.Vector3,
//  endPos: Schemas.Vector3,
//  campaign: Schemas.String,
//  campaign_key: Schemas.String,
//  openUI: Schemas.Boolean
//})

export function randomCrateSpawn(campaign: ClaimConfigInstType, campaign_key: string) {
  let xDiff = stageDropArea.NE.x - stageDropArea.SW.x
  let zDiff = stageDropArea.NE.z - stageDropArea.SW.z

  let finalX = Math.random() * xDiff + stageDropArea.SW.x
  let finalZ = Math.random() * zDiff + stageDropArea.SW.z

  SpawnCrate(
    'assets/scene/Models/crate_jungle.glb',
    'assets/scene/Models/parachute_jungle.glb',
    Vector3.create(finalX, DROP_HEIGHT, finalZ),
    campaign,
    campaign_key
  )
}

export function SpawnCrate(
  model: string,
  parachuteModel: string,
  position: Vector3,
  campaign: ClaimConfigInstType,
  campaign_key: string
) {
  let crate = engine.addEntity()

  Transform.create(crate, {
    position: position
  })

  GltfContainer.create(crate, {
    src: model
  })

  //Crate.create(crate, {
  //  startPos: position,
  //  endPos: Vector3.Zero(),
  //  campaign: campaign,
  //  campaign_key: campaign_key,
  //  openUI: false,
  //})

  AudioSource.create(crate, {
    audioClipUrl: 'assets/scene/Audio/star-idle.mp3',
    loop: true,
    playing: true
  })

  let parachute = engine.addEntity()

  Transform.create(parachute, {
    position: Vector3.create(0, 1, 0),
    parent: crate
  })

  GltfContainer.create(parachute, {
    src: parachuteModel
  })

  AudioSource.create(parachute, {
    audioClipUrl: 'assets/scene/Audio/star-spawn.mp3',
    loop: false,
    playing: true
  })

  pointerEventsSystem.onPointerDown(
    {
      entity: crate,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Claim' }
    },
    function () {
      console.log('clicked entity')

      claimToken(campaign, campaign_key)

      VanishCrate(crate)
    }
  )

  DropCrate(crate, parachute, 5000)
}

export function VanishCrate(crate: Entity) {
  Tween.createOrReplace(crate, {
    mode: Tween.Mode.Scale({
      start: Vector3.One(),
      end: Vector3.Zero()
    }),
    duration: 1000,
    easingFunction: EasingFunction.EF_EASEINBOUNCE
  })

  utils.timers.setTimeout(() => {
    utils.playSound('assets/scene/Audio/star-collect.mp3', false, Transform.get(crate).position)
    engine.removeEntityWithChildren(crate)
  }, 1000)

  // utils.tweens.startScaling(crate, Vector3.One(), Vector3.Zero(), 1, utils.InterpolationType.EASEINBOUNCE, () => {
  //   engine.removeEntity(crate)
  //   //PlayCoinSound()
  // })
}

export function DropCrate(crate: Entity, parachute: Entity, speed?: number) {
  const cratePosition = Transform.get(crate).position

  raycastSystem.registerLocalDirectionRaycast(
    {
      entity: crate,
      opts: { direction: Vector3.Down(), maxDistance: 30 }
    },
    function (raycastResult) {
      console.log('hit ground at ... ', raycastResult.hits[0])
      let endPos = Vector3.Zero()
      if (raycastResult.hits && raycastResult.hits[0] && raycastResult.hits[0].position) {
        endPos = raycastResult.hits[0].position
      } else {
        endPos = Vector3.clone(cratePosition)
        endPos.y = 0
      }

      // utils.tweens.startTranslation(crate, cratePosition, endPos, speed ? speed : 5, utils.InterpolationType.EASEINSINE)

      // utils.timers.setTimeout(() => {
      //   utils.tweens.startScaling(parachute, Vector3.One(), Vector3.Zero(), 1, utils.InterpolationType.EASEINSINE)
      // }, speed ? speed : 5000)

      Tween.create(crate, {
        mode: Tween.Mode.Move({
          start: cratePosition,
          end: endPos
        }),
        duration: speed ? speed : 5000,
        easingFunction: EasingFunction.EF_EASEINSINE
      })

      utils.timers.setTimeout(
        () => {
          Tween.create(parachute, {
            mode: Tween.Mode.Scale({
              start: Vector3.One(),
              end: Vector3.Zero()
            }),
            duration: 1000,
            easingFunction: EasingFunction.EF_EASEINSINE
          })
        },
        speed ? speed : 5000
      )
    }
  )
}
