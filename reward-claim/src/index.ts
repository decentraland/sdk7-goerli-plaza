import {
  Animator,
  ColliderLayer,
  EasingFunction,
  Entity,
  GltfContainer,
  InputAction,
  Transform,
  Tween,
  TweenLoop,
  TweenSequence,
  engine,
  pointerEventsSystem
} from '@dcl/sdk/ecs'
import { CONFIG } from './config'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { claimToken } from './claim/claim'
import { ClaimConfig } from './claim/claimConfig'
import { setupUi } from './claim/ui'
import { randomCrateSpawn } from './crate'
import { getActionEvents } from '@dcl/asset-packs/dist/events'

export function main() {
  CONFIG.init()

  setupUi()

  // UI test - comment this line out
  //openUI('images/scene-thumbnail.png', 'Wearable Name')

  let dispenser = engine.addEntity()
  Transform.create(dispenser, {
    position: Vector3.create(8, 0, 8)
  })

  GltfContainer.create(dispenser, {
    src: 'assets/scene/Models/dispenser_DCLMF23.glb',
    invisibleMeshesCollisionMask: ColliderLayer.CL_POINTER
  })

  Animator.create(dispenser)

  pointerEventsSystem.onPointerDown(
    {
      entity: dispenser,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Claim'
      }
    },
    function () {
      let camp = ClaimConfig.campaign.CAMPAIGN_TEST

      claimToken(camp, camp.campaignKeys.KEY_0)
      Animator.playSingleAnimation(dispenser, 'Animation')
    }
  )

  const wearablePlaceholder = engine.addEntity()

  Transform.create(wearablePlaceholder, {
    position: Vector3.create(0, 1.75, 0),
    scale: Vector3.create(0.75, 0.75, 0.75),
    parent: dispenser
  })

  GltfContainer.create(wearablePlaceholder, {
    src: 'assets/scene/Models/wearable/MANA_Eyewear.glb',
    visibleMeshesCollisionMask: undefined,
    invisibleMeshesCollisionMask: undefined
  })

  spinInPlace(wearablePlaceholder, 3000)

  const lever = engine.getEntityOrNullByName('Lever')

  if (lever) {
    const lever_actions = getActionEvents(lever)
    lever_actions.on('Activate', () => {
      let camp = ClaimConfig.campaign.CAMPAIGN_TEST
      randomCrateSpawn(camp, camp.campaignKeys.KEY_0)
    })
  }

  // floor

  let floor = engine.addEntity()

  GltfContainer.create(floor, { src: 'assets/scene/Models/baseLight.glb' })
}

export function spinInPlace(entity: Entity, duration: number) {
  Tween.create(entity, {
    mode: Tween.Mode.Rotate({
      start: Quaternion.fromEulerDegrees(0, 0, 0),
      end: Quaternion.fromEulerDegrees(0, 180, 0)
    }),
    duration: duration,
    easingFunction: EasingFunction.EF_LINEAR
  })
  TweenSequence.create(entity, {
    loop: TweenLoop.TL_RESTART,
    sequence: [
      {
        mode: Tween.Mode.Rotate({
          start: Quaternion.fromEulerDegrees(0, 180, 0),
          end: Quaternion.fromEulerDegrees(0, 360, 0)
        }),
        duration: duration,
        easingFunction: EasingFunction.EF_LINEAR
      }
    ]
  })
}
