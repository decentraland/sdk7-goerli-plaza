
import { AudioSource, AvatarAttach, engine, Entity, GltfContainer, Transform } from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"
import { triggerAreaSystem } from "./utils/triggerArea"

/**
 * Sound is a separated from the coin entity so that you can
 * still hear it even when the coin is removed from the engine.
 */
const coinPickupSound = engine.addEntity()
Transform.create(coinPickupSound)
AudioSource.create(coinPickupSound, { audioClipUrl: 'sounds/coinPickup.mp3' })

export function createCoin(
  model: string,
  position: Vector3,
  size: Vector3,
  centerOffset: Vector3
): Entity {
  const entity = engine.addEntity()
  GltfContainer.create(entity, { src: model })
  Transform.create(entity, { position })

  triggerAreaSystem.setTriggerArea(entity, size, centerOffset)

  triggerAreaSystem.onPlayerEnter(entity, () => {
    triggerAreaSystem.removeTriggerArea(entity)
    AudioSource.getMutable(coinPickupSound).playing = true
    Transform.getMutable(coinPickupSound).position = Transform.get(engine.PlayerEntity).position
    engine.removeEntity(entity)
  })

  return entity
}
