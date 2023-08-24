import { engine, Entity, GltfContainer, Transform, inputSystem, InputAction } from '@dcl/ecs'
import { Sound } from './sound'
import { PuzzleBuilder } from './puzzleBuilder'
import { Selector } from './selector'

export const MAX_DISTANCE = 5

// Base
const base:Entity = engine.addEntity()
GltfContainer.create(base, { src: "models/base.glb"})

const room:Entity = engine.addEntity()
GltfContainer.create(room, { src: "models/room.glb"})

// Preload the sounds
new Sound()

new PuzzleBuilder()
new Selector()