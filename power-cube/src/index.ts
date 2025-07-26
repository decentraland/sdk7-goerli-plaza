import { createCard } from './card'
import { createPowerBase } from './powerBase'
import { createPowerCube, dropAllCubes } from './powerCube'

import {
  AudioSource,
  AvatarAnchorPointType,
  AvatarAttach,
  engine,
  GltfContainer,
  InputAction,
  inputSystem,
  PointerEvents,
  PointerEventType,
  Transform
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { setupUi } from './ui'

export function main() {
  // Base
  const staticBase = engine.addEntity()
  GltfContainer.create(staticBase, { src: 'assets/scene/Models/staticBase.glb' })
  PointerEvents.create(staticBase, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          showFeedback: false
        }
      }
    ]
  })

  // Scene objects
  createCard(Vector3.create(8, 1.5, 13.5), 'assets/scene/Models/card.glb')

  const GROUND_HEIGHT = 0.55

  createPowerBase(Vector3.create(8, 0.024, 3.5), 'assets/scene/Models/powerBase.glb')
  const powerCubeEntity = createPowerCube(Vector3.create(8, GROUND_HEIGHT, 3.5), 'assets/scene/Models/powerCube.glb')

  // UI with GitHub link
  setupUi()
}
