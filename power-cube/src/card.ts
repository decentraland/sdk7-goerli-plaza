import { AudioSource, engine, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { createSound } from './sound'
import * as utils from '@dcl-sdk/utils'

/**
 * Sound is a separated from the card entity so that you can
 * still hear it even when the card is removed from the engine.
 */
const cardPickupSound = createSound('sounds/cardPickup.mp3')

export function createCard(position: Vector3, gltfSrc: string) {
  const entity = engine.addEntity()

  Transform.create(entity, { position })
  GltfContainer.create(entity, { src: gltfSrc })

  utils.triggers.oneTimeTrigger(entity, 1, 1, [{ type: 'box', position: Vector3.create(0, 0.75, 0) }], () => {
    Transform.getMutable(entity).scale = Vector3.Zero()
    AudioSource.getMutable(cardPickupSound).playing = true
    engine.removeEntity(entity)
  })
}
