import { createCard } from './card'
import { createPowerBase } from './powerBase'
import { createPowerCube, PowerCube } from './powerCube'

import {
  AudioSource,
  AvatarAnchorPointType,
  AvatarAttach,
  engine,
  GltfContainer,
  InputAction,
  inputSystem,
  PointerEventType,
  Transform
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { createSound } from './sound'
import { userId } from './utils/playerData'

export * from '@dcl/sdk'

// Base
const staticBase = engine.addEntity()
GltfContainer.create(staticBase, { src: 'models/staticBase.glb' })

// Configuration
const Z_OFFSET = 1.5
const GROUND_HEIGHT = 0.55

// Scene objects
createCard(Vector3.create(8, 1.5, 13.5), 'models/card.glb')

createPowerBase(Vector3.create(8, 0.024, 3.5), 'models/powerBase.glb')
const powerCubeEntity = createPowerCube(Vector3.create(8, GROUND_HEIGHT, 3.5), 'models/powerCube.glb')

// Sounds
const cubePickUpSound = createSound('sounds/cubePickup.mp3')
const cubePutDownSound = createSound('sounds/cubePutDown.mp3')

// Controls
engine.addSystem(() => {
  const command = inputSystem.getInputCommand(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)
  if (command) {
    const powerCube = PowerCube.getOrNull(powerCubeEntity)
    if (powerCube) {
      if (!powerCube.isGrabbed && command.hit?.entityId === powerCubeEntity) {
        const transform = Transform.getMutable(powerCubeEntity)
        PowerCube.getMutable(powerCubeEntity).isGrabbed = true
        AudioSource.getMutable(cubePickUpSound).playing = true

        // Calculates the crate's position relative to the camera
        transform.position = Vector3.Zero()
        transform.rotation = Quaternion.Identity()
        transform.position.z += Z_OFFSET

        transform.parent = engine.addEntity()
        AvatarAttach.createOrReplace(transform.parent, {
          avatarId: userId,
          anchorPointId: AvatarAnchorPointType.AAPT_LEFT_HAND
        })
      } else {
        const transform = Transform.getMutable(powerCubeEntity)
        PowerCube.getMutable(powerCubeEntity).isGrabbed = false
        AudioSource.getMutable(cubePutDownSound).playing = true

        const cameraTransform = Transform.get(engine.CameraEntity)
        const forwardVector = Vector3.rotate(Vector3.scale(Vector3.Forward(), Z_OFFSET), cameraTransform.rotation)

        transform.position = Vector3.add(cameraTransform.position, forwardVector)
        transform.position.y = GROUND_HEIGHT

        transform.rotation = Quaternion.fromLookAt(transform.position, cameraTransform.position)
        transform.rotation.x = 0
        transform.rotation.z = 0

        engine.removeEntity(transform.parent)
        transform.parent = undefined
      }
    }
  }
})
