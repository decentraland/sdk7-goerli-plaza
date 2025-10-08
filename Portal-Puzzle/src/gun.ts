import {
  AudioSource,
  AvatarAnchorPointType,
  AvatarAttach,
  CameraModeArea,
  CameraType,
  Entity,
  GltfContainer,
  Transform,
  engine
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { TriggerArea, triggerAreaEventsSystem } from '@dcl/sdk/ecs'
import * as utils from '@dcl-sdk/utils'
import { colorSystem, gunSystem } from './systems'
import { GlowColor, PortalColor } from './components'
import { OnlyInScene, onlyInSceneSystem } from './onlyRenderInScene'

export let HOLDING_GUN = false

export function spawnGun(gun: Entity) {
  utils.perpetualMotions.startRotation(gun, Quaternion.fromEulerDegrees(0, 15, 0))

  const trigger = engine.addEntity()
  Transform.create(trigger, { parent: gun })
  TriggerArea.setBox(trigger)
  triggerAreaEventsSystem.onTriggerEnter(trigger, () => {
    pickUpGun(gun)
    engine.removeEntity(trigger)
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
  AudioSource.createOrReplace(gun, { audioClipUrl: 'assets/scene/Audio/gunPickup.mp3', playing: true, loop: false })

  const gunParent = engine.addEntity()
  const gunTranform = Transform.getMutable(gun)
    ; (gunTranform.parent = engine.CameraEntity), (gunTranform.position = Vector3.create(0.45, -0.625, 0.9))
  gunTranform.rotation = Quaternion.fromEulerDegrees(0, 0, 0)
  utils.triggers.removeTrigger(gun)

  // render gun only in scene
  OnlyInScene.create(gun)
  engine.addSystem(onlyInSceneSystem)

  // keep camera in 1st person while in scene
  const modEntity = engine.addEntity()
  Transform.create(modEntity, {
    position: Vector3.create(8, 4, 8)
  })
  CameraModeArea.create(modEntity, {
    area: Vector3.create(16, 8, 16),
    mode: CameraType.CT_FIRST_PERSON
  })
}
