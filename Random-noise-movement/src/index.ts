import { Noise } from '@dcl/noise-utils'
import { engine, GltfContainer, Material, Transform } from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { WaveGrass } from './components'
// export all the functions required to make the scene work
export * from '@dcl/sdk'

// --- Set up a system ---

// timer variable
let t = 0
function PerlinNoiseSystem(dt: number) {
  // update the timer based on the time since the last tick
  t += dt / 2

  // iterate over the entities of the group
  for (const [entity] of engine.getEntitiesWith(Transform, WaveGrass)) {
    // get the Transform component of the entity
    const transform = Transform.getMutable(entity)

    if (!transform.rotation) return

    // // rotate grass blades along x axis based on noise
    const rotX = Noise.simplex3(transform.position.x / 16, t, transform.position.z / 16) * 2

    //  // rotate grass blades along z axis based on noise
    const rotZ = Noise.simplex3(transform.position.z / 16, t, transform.position.x / 16) * 2

    transform.rotation = Quaternion.fromEulerDegrees(rotX, 0, rotZ)
  }
}

engine.addSystem(PerlinNoiseSystem)

// --- ground ---
const ground = engine.addEntity()
Transform.create(ground, {
  position: Vector3.create(8, 0, 8)
})
GltfContainer.create(ground, {
  src: 'models/ground.glb'
})

/// --- Spawner function ---

function spawnGrass(shape: string, x: number, y: number, z: number) {
  // create the entity
  const grass = engine.addEntity()

  // add a transform to the entity
  Transform.create(grass, {
    position: Vector3.create(x, y, z),
    rotation: Quaternion.fromEulerDegrees(0, Math.random() * 30, 0),
    scale: Vector3.create(1, 0.5 + Math.random() / 2, 1)
  })

  // add a shape to the entity
  GltfContainer.create(grass, {
    src: shape
  })

  WaveGrass.create(grass)

  Material.setPbrMaterial(grass, {
    albedoColor: Color4.create(x / 16, y / 16, z / 4)
  })

  return grass
}

/// --- Spawn grass blades ---

const grassModel = 'models/grass.glb'
const grass2Model = 'models/grass2.glb'
const grass3Model = 'models/grass3.glb'

for (let x = 1.4; x < 15.35; x++) {
  for (let y = 1.4; y < 15.35; y++) {
    // select a glb mesh randomly from the 3 variations
    const selector = Math.random()

    if (selector > 0.66) {
      spawnGrass(grassModel, x, 0, y)
    } else if (selector > 0.33) {
      spawnGrass(grass2Model, x, 0, y)
    } else {
      spawnGrass(grass3Model, x, 0, y)
    }
  }
}

let started = false
