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
import { Vector3 } from '@dcl/sdk/math'

export * from '@dcl/sdk'

// Base
const staticBase = engine.addEntity()
GltfContainer.create(staticBase, { src: 'models/staticBase.glb' })

// Scene objects
createCard(Vector3.create(8, 1.5, 13.5), 'models/card.glb')

const GROUND_HEIGHT = 0.55

createPowerBase(Vector3.create(8, 0.024, 3.5), 'models/powerBase.glb')
const powerCubeEntity = createPowerCube(Vector3.create(8, GROUND_HEIGHT, 3.5), 'models/powerCube.glb')
