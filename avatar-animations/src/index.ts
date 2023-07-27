import {
  AvatarAnchorPointType,
  AvatarAttach,
  engine,
  GltfContainer,
  InputAction,
  inputSystem,
  Material,
  MeshCollider,
  pointerEventsSystem,
  PointerEventType,
  Transform
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { triggerSceneEmote } from '~system/RestrictedActions'

import * as utils from '@dcl-sdk/utils'
//import { setupUi } from './ui'
import { BounceScaling, Snow, Spinner } from './components'
import { createCube } from './factory'

var HAS_SNOWBALL: boolean = false

export function main() {
  // draw UI
  //setupUi()

  utils.addTestCube({ position: Vector3.create(8, 1, 5) }, () => {
    triggerSceneEmote({ src: 'animations/Pose.glb', loop: true })
  })

  utils.addTestCube({ position: Vector3.create(8, 1, 8) }, () => {
    triggerSceneEmote({ src: 'animations/Crafting_Snowball.glb', loop: false })
  })

  utils.addTestCube({ position: Vector3.create(8, 1, 12) }, () => {
    triggerSceneEmote({ src: 'animations/Snowball_Throw.glb', loop: false })
  })

  const snowPile = engine.getEntityOrNullByName('snowPile.glb')

  if (snowPile) {
    GltfContainer.getMutable(snowPile).visibleMeshesCollisionMask = 2

    pointerEventsSystem.onPointerDown(
      {
        entity: snowPile,
        opts: { hoverText: 'get snowball', button: InputAction.IA_POINTER }
      },
      () => {
        if (HAS_SNOWBALL) return
        triggerSceneEmote({ src: 'animations/Crafting_Snowball.glb', loop: false })
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
          GltfContainer.create(snowball, { src: 'assets/models/snowball.glb' })
          Snow.create(snowball, { holding: true })
        }, 500)
      }
    )
  }
}

engine.addSystem(() => {
  if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)) {
    if (!HAS_SNOWBALL) return
    HAS_SNOWBALL = false

    triggerSceneEmote({ src: 'animations/Snowball_Throw.glb', loop: false })

    const snowballsInScene = engine.getEntitiesWith(Snow, Transform)
    for (const [entity, snow, transform] of snowballsInScene) {
      if (snow.holding) {
        const snowParent = transform.parent

        Transform.getMutable(entity).parent = undefined
        const start = Transform.get(engine.PlayerEntity).position
        //const direction = Transform.get(engine.PlayerEntity).rotation
        const elf = engine.getEntityOrNullByName('ElfGrumpy.glb')

        if (elf) {
          const end = Vector3.create(Transform.get(elf).position.x, 1, Transform.get(elf).position.z)

          utils.tweens.startTranslation(entity, start, end, 1, utils.InterpolationType.LINEAR, () => {
            Transform.getMutable(entity).rotation = Quaternion.fromEulerDegrees(-90, 0, 0)
            GltfContainer.createOrReplace(entity, { src: 'assets/models/splat.glb' })
            utils.timers.setTimeout(() => {
              engine.removeEntity(entity)
            }, 300)
          })

          const mutableSnow = Snow.getMutable(entity)
          mutableSnow.holding = false
          if (snowParent) {
            engine.removeEntity(snowParent)
          }
        }
      }
    }
  }
})
