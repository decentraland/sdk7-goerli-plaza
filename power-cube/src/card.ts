import { AudioSource, engine, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { createSound } from './sound'
import { triggerAreaSystem } from './utils/triggerArea'

/**
 * Sound is a separated from the card entity so that you can
 * still hear it even when the card is removed from the engine.
 */
const cardPickupSound = createSound('sounds/cardPickup.mp3')

export function createCard(position: Vector3, gltfSrc: string) {
  const entity = engine.addEntity()

  Transform.create(entity, { position })
  GltfContainer.create(entity, { src: gltfSrc })

  triggerAreaSystem.setTriggerArea(entity, Vector3.add(position, Vector3.create(1, 1, 1)), Vector3.create(0, 0.75, 0))
  triggerAreaSystem.onPlayerEnter(entity, () => {
    Transform.getMutable(entity).scale = Vector3.Zero()
    AudioSource.getMutable(cardPickupSound).playing = true
  })

  triggerAreaSystem.onPlayerExit(entity, () => {
    triggerAreaSystem.removeTriggerArea(entity)
    engine.removeEntity(entity)
  })
}
