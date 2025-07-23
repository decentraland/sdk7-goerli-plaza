import {
  AvatarAnchorPointType,
  AvatarAttach,
  EasingFunction,
  engine,
  GltfContainer,
  InputAction,
  inputSystem,
  Material,
  MeshCollider,
  pointerEventsSystem,
  PointerEventType,
  Transform,
  Tween
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { triggerSceneEmote } from '~system/RestrictedActions'

import * as utils from '@dcl-sdk/utils'
//import { setupUi } from './ui'
import { BounceScaling, Snow, Spinner } from './components'
import { createCube } from './factory'
import { setupUi } from './ui'

var HAS_SNOWBALL: boolean = false

export function main() {
  utils.addTestCube({ position: Vector3.create(8, 1, 5) }, () => {
    triggerSceneEmote({ src: 'assets/scene/Models/Pose_emote.glb', loop: true })
  })

  utils.addTestCube({ position: Vector3.create(8, 1, 8) }, () => {
    triggerSceneEmote({ src: 'assets/scene/Models/Crafting_Snowball_emote.glb', loop: false })
  })

  utils.addTestCube({ position: Vector3.create(8, 1, 12) }, () => {
    triggerSceneEmote({ src: 'assets/scene/Models/Snowball_Throw_emote.glb', loop: false })
  })

  const snowPile = engine.getEntityOrNullByName('assets/scene/Models/snowPile.glb')

  if (snowPile) {
    GltfContainer.getMutable(snowPile).visibleMeshesCollisionMask = 2

    pointerEventsSystem.onPointerDown(
      {
        entity: snowPile,
        opts: { hoverText: 'get snowball', button: InputAction.IA_POINTER }
      },
      () => {
        if (HAS_SNOWBALL) return
        triggerSceneEmote({ src: 'assets/scene/Models/Crafting_Snowball_emote.glb', loop: false })
        utils.timers.setTimeout(() => {
          HAS_SNOWBALL = true
          const snowballParent = engine.addEntity()
          AvatarAttach.create(snowballParent, { anchorPointId: AvatarAnchorPointType.AAPT_RIGHT_HAND })
          const snowball = engine.addEntity()
          Transform.create(snowball, {
            scale: Vector3.create(0.5, 0.5, 0.5),
            position: Vector3.create(0.1, 0.13, 0),
            parent: snowballParent
          })
          GltfContainer.create(snowball, { src: 'assets/scene/Models/snowball.glb' })
          Snow.create(snowball, { holding: true })
        }, 500)
      }
    )
  }

  // UI with GH link
  setupUi()
}

engine.addSystem(() => {
  if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)) {
    if (!HAS_SNOWBALL) return
    HAS_SNOWBALL = false

    triggerSceneEmote({ src: 'assets/scene/Models/Snowball_Throw_emote.glb', loop: false })

    const snowballsInScene = engine.getEntitiesWith(Snow, Transform)
    for (const [entity, snow, transform] of snowballsInScene) {
      if (snow.holding) {
        const snowParent = transform.parent

        Transform.getMutable(entity).parent = undefined
        const start = Transform.get(engine.PlayerEntity).position
        //const direction = Transform.get(engine.PlayerEntity).rotation
        const elf = engine.getEntityOrNullByName('assets/scene/Models/ElfGrumpy.glb')

        if (elf) {
          const end = Vector3.create(Transform.get(elf).position.x, 1, Transform.get(elf).position.z)

          Tween.createOrReplace(entity, {
            mode: Tween.Mode.Move({
              start: start,
              end: end
            }),
            duration: 1000,
            easingFunction: EasingFunction.EF_LINEAR
          })

          // move to next pos (after rotating)
          utils.timers.setTimeout(() => {
            Transform.getMutable(entity).rotation = Quaternion.fromEulerDegrees(-90, 0, 0)
            GltfContainer.createOrReplace(entity, { src: 'assets/scene/Models/splat.glb' })
            utils.timers.setTimeout(() => {
              engine.removeEntityWithChildren(entity)
            }, 300)
          }, 1000)

          const mutableSnow = Snow.getMutable(entity)
          mutableSnow.holding = false
          if (snowParent) {
            engine.removeEntityWithChildren(snowParent)
          }
        }
      }
    }
  }
})
