import {
  AudioSource,
  AvatarAnchorPointType,
  AvatarAttach,
  Entity,
  GltfContainer,
  Transform,
  engine
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'
import { colorSystem, gunSystem } from './systems'
import { GlowColor, PortalColor } from './components'

export let HOLDING_GUN = false

export function spawnGun(gun: Entity) {
  utils.perpetualMotions.startRotation(gun, Quaternion.fromEulerDegrees(0, 15, 0))

  utils.triggers.addTrigger(gun, 1, 1, [{ type: 'box' }], () => {
    pickUpGun(gun)
  })

  const blueGlow = engine.addEntity()
  const orangeGlow = engine.addEntity()

  GlowColor.create(blueGlow, { color: PortalColor.Blue })
  GltfContainer.create(blueGlow, { src: 'assets/models/portalGunBlueGlow.glb' })
  Transform.create(blueGlow, {
    parent: gun,
    scale: Vector3.One()
  })

  GlowColor.create(orangeGlow, { color: PortalColor.Orange })
  GltfContainer.create(orangeGlow, { src: 'assets/models/portalGunOrangeGlow.glb' })
  Transform.create(orangeGlow, {
    parent: gun,
    scale: Vector3.Zero()
  })
}

export function pickUpGun(gun: Entity) {
  HOLDING_GUN = true

  utils.perpetualMotions.stopRotation(gun)
  AudioSource.createOrReplace(gun, { audioClipUrl: 'sounds/gunPickup.mp3', playing: true, loop: false })

  const gunParent = engine.addEntity()
  AvatarAttach.create(gunParent, { anchorPointId: AvatarAnchorPointType.AAPT_NAME_TAG })
  const gunTranform = Transform.getMutable(gun)
  gunTranform.parent = gunParent
  gunTranform.position = Vector3.create(0.45, -0.625, 0.9)
  gunTranform.rotation = Quaternion.fromEulerDegrees(0, 0, 0)

  utils.triggers.removeTrigger(gun)
}
