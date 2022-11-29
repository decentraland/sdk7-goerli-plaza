import { Entity, MeshRenderer, Material, Transform, Billboard, BillboardMode, engine } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { smokeMaterial, SmokeParticle, SmokeSource } from '../definitions'

function spawnSmokePuff(entity: Entity, parent: Entity) {
  const newVel: Vector3 = {
    x: (Math.random() - Math.random()) / 6,
    y: Math.random() / 2 + 0.1,
    z: (Math.random() - Math.random()) / 6
  }
  const size = Math.random() / 2 + 0.2

  MeshRenderer.setPlane(entity)
  Material.setPbrMaterial(entity, smokeMaterial)

  Transform.createOrReplace(entity, {
    scale: Vector3.create(size, size, size),
    parent
  })

  Billboard.createOrReplace(entity, { billboardMode: BillboardMode.BM_Y_AXE })

  SmokeParticle.createOrReplace(entity, {
    velocity: newVel,
    visible: true
  })
}

export default function throwSmokeSystem(dt: number) {
  for (const [entity] of engine.getEntitiesWith(SmokeSource)) {
    const smokeSource = SmokeSource.getMutable(entity)
    smokeSource.nextSmoke -= dt
    if (smokeSource.nextSmoke < 0) {
      smokeSource.nextSmoke = smokeSource.smokeInterval

      const smokeParticles = Array.from(engine.getEntitiesWith(SmokeParticle))

      if (smokeParticles.length < smokeSource.particleCount) {
        spawnSmokePuff(engine.addEntity(), entity)
      } else {
        const freeParticle = smokeParticles.find(([_, p]) => p.visible === false)
        if (freeParticle) {
          const [particleEntity] = freeParticle
          spawnSmokePuff(particleEntity, entity)
        }
      }
    }
  }
}
