import {
  Animator,
  AudioSource,
  AvatarAnchorPointType,
  AvatarAttach,
  ColliderLayer,
  engine,
  GltfContainer,
  InputAction,
  inputSystem,
  Material,
  MeshCollider,
  MeshRenderer,
  PointerEvents,
  pointerEventsSystem,
  PointerEventType,
  Transform
} from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'

import { gunSystem, colorSystem } from './systems'

import { spawnGun } from './gun'
import { onlyInSceneSystem } from './onlyRenderInScene'
import { setupUi } from './ui'

export function main() {
  const card = engine.getEntityOrNullByName('card.glb')
  if (card) {
    utils.perpetualMotions.startRotation(card, Quaternion.fromEulerDegrees(0, 15, 0))

    utils.triggers.oneTimeTrigger(card, 1, 1, [{ type: 'box' }], () => {
      const cardTransform = Transform.getMutable(card)
      cardTransform.scale = Vector3.Zero()
      AudioSource.createOrReplace(card, { audioClipUrl: 'sounds/cardPickup.mp3', playing: true, loop: false })
    })
  }

  const gun = engine.getEntityOrNullByName('portalGun.glb')
  if (gun) {
    spawnGun(gun)
  }

  engine.addSystem(gunSystem)
  engine.addSystem(colorSystem)

  // UI with GitHub link
  setupUi()
}
