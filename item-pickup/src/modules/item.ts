import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { engine, GltfContainer, Transform, AudioSource, Entity, VisibilityComponent } from '@dcl/sdk/ecs'
import { PickableItem } from '../components'
import * as utils from '@dcl-sdk/utils'

export function instantiatePickableItem(
  modelPath: string,
  pos: Vector3,
  sfxPath: string,
  respawnSeconds: number,
  action: () => void
) {
  const entity = engine.addEntity()
  GltfContainer.create(entity, {
    src: modelPath
  })

  VisibilityComponent.create(entity)

  Transform.create(entity, {
    position: pos
  })

  AudioSource.create(entity, {
    audioClipUrl: sfxPath,
    playing: false,
    loop: false
  })

  PickableItem.create(entity, {
    respawnSeconds: respawnSeconds,
    respawnTimer: -1
  })

  utils.perpetualMotions.startRotation(entity, Quaternion.fromEulerDegrees(0, 1, 0))

  utils.triggers.addTrigger(entity, 1, 1, [{ type: 'box', scale: Vector3.create(1.5, 3, 1.5) }], () => {
    const visibilityComp = VisibilityComponent.getMutable(entity)
    const pickableItemComp = PickableItem.getMutable(entity)
    if (pickableItemComp.picked) return
    pickableItemComp.picked = true
    visibilityComp.visible = false
    pickableItemComp.respawnTimer = pickableItemComp.respawnSeconds
    AudioSource.getMutable(entity).playing = true
    // action passed as a parameter
    action()
  })
}

export function respawnSystem(deltaTime: number) {
  for (const [entity] of engine.getEntitiesWith(PickableItem)) {
    const pickableItemComp = PickableItem.getMutable(entity)

    if (pickableItemComp.picked) {
      pickableItemComp.respawnTimer -= deltaTime

      // Respawn item
      if (pickableItemComp.respawnTimer <= 0) {
        const visibilityComp = VisibilityComponent.getMutable(entity)
        visibilityComp.visible = true
        pickableItemComp.respawnTimer = pickableItemComp.respawnSeconds
        pickableItemComp.picked = false
      }
    }
  }
}
