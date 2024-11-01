// We define the empty imports so the auto-complete feature works as expected.
import { GltfContainer, Transform, engine } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

import { HasGameLoaded, IsBallAlive } from './components/definitions'
import { BallTranslatorSystem } from './gameLogic/ballTranslator'
import { CollisionDetection } from './gameLogic/collision'
import { loadAllLevels } from './gameLogic/loadLevels'
import { createArcade } from './gameObjects/arcade'
import { createSound } from './gameObjects/sound'
import { spinSystem } from './utils'
import { Sounds, Games, CABINETS } from './gameLogic/sharedConstants'
import { setupUi } from './ui'

export function main() {
  createSound(Sounds.S_HIT)
  createSound(Sounds.S_MISS)

  // Defining behavior. See `src/systems.ts` file.
  engine.addSystem(spinSystem)
  engine.addSystem(BallTranslatorSystem)
  engine.addSystem(CollisionDetection)

  HasGameLoaded.createOrReplace(engine.RootEntity, { loaded: false })
  IsBallAlive.createOrReplace(engine.RootEntity, { alive: false })

  // Base
  const base = engine.addEntity()
  GltfContainer.create(base, { src: 'models/baseLight.glb' })
  Transform.create(base, { scale: Vector3.create(2, 1, 1) })

  // Create Arcades
  createArcade(Vector3.create(2, 0.01, 8), Quaternion.fromEulerDegrees(0, 0, 0), Games.G_DECENTRALAND)
  createArcade(Vector3.create(5, 0.01, 8), Quaternion.fromEulerDegrees(0, 0, 0), Games.G_ATARI)
  createArcade(Vector3.create(8, 0.01, 8), Quaternion.fromEulerDegrees(0, 0, 0), Games.G_BITCOIN)
  createArcade(Vector3.create(11, 0.01, 8), Quaternion.fromEulerDegrees(0, 0, 0), Games.G_ETHEREUM)

  loadAllLevels()
  setupUi()
}
