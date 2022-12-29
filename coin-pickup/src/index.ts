
import { engine, GltfContainer, Transform } from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"
import { createCoin } from "./coin"

export * from '@dcl/sdk'

// Adding base scene models
const base = engine.addEntity()
GltfContainer.create(base, { src: 'models/baseLight.glb' })

const platform = engine.addEntity()
GltfContainer.create(platform, { src: 'models/platform.glb' })
Transform.create(platform)

// Contains the positions for each coin
const coinPositions = [
  Vector3.create(2.2, 1.5, 2.2),
  Vector3.create(5.2, 1.5, 2.2),
  Vector3.create(8, 1.5, 2.2),
  Vector3.create(10.8, 1.5, 2.2),
  Vector3.create(13.8, 1.5, 2.2),
  Vector3.create(13.8, 2.18, 5),
  Vector3.create(13.8, 2.8, 8),
  Vector3.create(10.8, 2.8, 8),
  Vector3.create(8, 2.8, 8),
  Vector3.create(5.2, 2.8, 8),
  Vector3.create(2.2, 2.8, 8),
  Vector3.create(2.2, 3.4, 10.9),
  Vector3.create(2.2, 3.9, 13.8),
  Vector3.create(5.2, 3.9, 13.8),
  Vector3.create(8, 3.9, 13.8),
  Vector3.create(10.8, 3.9, 13.8),
  Vector3.create(13.8, 3.9, 13.8),
]

// Setup the coins
for (const coinPosition of coinPositions) {
  createCoin(
    'models/coin.glb',
    coinPosition,
    Vector3.create(1.5, 3, 1.5),
    Vector3.create(0, 1, 0)
  )
}
