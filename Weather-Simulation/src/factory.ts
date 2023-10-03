import {
  Entity,
  engine,
  Transform,
  GltfContainer,
  MeshRenderer,
  Billboard,
  BillboardMode,
  Material
} from '@dcl/sdk/ecs'
import { IsPrecip, PrecipType, Spin } from './components'
import { flakeMaterial, raindropMaterial } from './materials'

// House factory
export function createHouse(): Entity {
  const house = engine.addEntity()
  Transform.create(house, {
    position: { x: 8, y: 0, z: 8 }
  })
  GltfContainer.create(house, {
    src: 'models/house_dry.gltf'
  })
  return house
}

// Clouds factory
export function createClouds(): Entity {
  const clouds = engine.addEntity()
  Transform.create(clouds, {
    position: { x: 8, y: 10, z: 8 },
    scale: { x: 4, y: 4, z: 4 }
  })
  return clouds
}

// Lightning factory
export function createLightning(): Entity {
  const lightning = engine.addEntity()
  Transform.create(lightning, {
    position: { x: 8, y: 10, z: 8 },
    scale: { x: 5, y: 5, z: 5 }
  })
  return lightning
}

// Rain drop factory
export function createRaindrop(): void {
  const drop = engine.addEntity()
  MeshRenderer.setPlane(drop)
  Transform.create(drop, {
    position: {
      x: Math.random() * 8 + 4,
      y: 10,
      z: Math.random() * 8 + 4
    },
    scale: { x: 0.15, y: 0.15, z: 0.15 }
  })
  // Make drop rotate to always face you in the Y axis
  Billboard.create(drop, {
    billboardMode: BillboardMode.BM_Y
  })
  Material.setPbrMaterial(drop, raindropMaterial)

  // Add component identifier
  IsPrecip.create(drop, {
    type: PrecipType.drop
  })
}

export function createSnowflake(): void {
  const flake = engine.addEntity()
  MeshRenderer.setPlane(flake)
  Transform.create(flake, {
    position: {
      x: Math.random() * 8 + 4,
      y: 10,
      z: Math.random() * 8 + 4
    },
    scale: { x: 0.3, y: 0.3, z: 0.3 }
  })

  // Define spin direction
  Spin.create(flake, {
    dir: {
      x: Math.random() * 30,
      y: Math.random() * 30,
      z: Math.random() * 30
    }
  })

  // Add component identifier
  IsPrecip.create(flake, {
    type: PrecipType.flake
  })

  // Add material variation
  const materialIndex = Math.floor(Math.random() * 4)
  Material.setPbrMaterial(flake, flakeMaterial[materialIndex])
}
