import { engine, Entity, GltfContainer, Transform, inputSystem, InputAction } from '@dcl/ecs'
import { Sound } from './sound'
import { PuzzleBuilder } from './puzzleBuilder'
import { Selector } from './selector'
import { setupUi } from './ui'

export const MAX_DISTANCE = 5

export function main() {
  // Base
  const base: Entity = engine.addEntity()
  GltfContainer.create(base, { src: 'models/base.glb' })

  const room: Entity = engine.addEntity()
  GltfContainer.create(room, { src: 'models/room.glb' })

  // Preload the sounds
  new Sound()

  new PuzzleBuilder()
  new Selector()

  // UI with GitHub link
  setupUi()
}
