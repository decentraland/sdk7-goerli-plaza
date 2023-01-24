import { engine, Material, MeshRenderer, PBMaterial_PbrMaterial, Schemas, Transform } from '@dcl/sdk/ecs'
import { Color3, Quaternion, Vector3 } from '@dcl/sdk/math'

// @Component('particle')
// export class Particle {
//   life = Math.random()
//   seed = Math.random() * this.width
//   constructor(public width: number, public height: number, public speed: number, public parentTransform: Entity) {}
// }

// Particles
export const Particle = engine.defineComponent(
  "Particle",
  {
    life: Schemas.Float,
    seed: Schemas.Float,
    width: Schemas.Number,
    height: Schemas.Number,
    speed: Schemas.Number
  }
)

export function particleSystem(dt: number) {
  for (const [entity] of engine.getEntitiesWith(Particle, Transform)) {
    const particle = Particle.getMutable(entity)

    particle.life += dt * particle.speed // Particle speed
    particle.life %= 1 // Reset particle life

    const transform = Transform.getMutable(entity)
    transform.position = Vector3.create(0, particle.life * particle.height, 0 - particle.seed)
  }
}

// Setup particles
const material: PBMaterial_PbrMaterial = {
  metallic: 1,
  albedoColor: Color3.create(0.5, 1.5, 2),
  emissiveColor: Color3.create(0.5, 1.5, 2)
}

// Position particles with a
const particleParentEntity = engine.addEntity()
Transform.create(particleParentEntity, {
  position: Vector3.create(16, 0, 10),
  rotation: Quaternion.fromEulerDegrees(0, 90, 0)
})

// Initialise particles
const MAX_PARTICLES = 256

for (let i = 0; i < MAX_PARTICLES; i++) {
  const particleEntity = engine.addEntity()
  MeshRenderer.setPlane(particleEntity)
  Material.setPbrMaterial(particleEntity, material)
  Particle.create(particleEntity, {
    life: Math.random(),
    seed: 16 * Math.random(),
    height: 7,
    speed: 0.25
  })

  Transform.create(particleEntity, {
    rotation: Quaternion.fromEulerDegrees(0, 90, 0),
    scale: Vector3.create(0.01, 0.1, 1),
    parent: particleParentEntity
  })
}
