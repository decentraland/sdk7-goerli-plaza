import { Entity, MeshRenderer, Material, Transform, Billboard, BillboardMode, engine } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { smokeTexture, SmokeParticle, SmokeSource } from '../definitions'

function spawnSmokePuff(entity: Entity, parent: Entity) {
  const size = Math.random() / 2 + 0.4

  MeshRenderer.setPlane(entity)

  Material.setPbrMaterial(entity, {
    texture: smokeTexture,
    alphaTexture: smokeTexture,
    roughness: 1,
    metallic: 0,
    alphaTest: 0.2
  })

  Transform.createOrReplace(entity, {
    scale: Vector3.create(size, size, size),
    parent
  })

  Billboard.createOrReplace(entity, { billboardMode: BillboardMode.BM_Y })

  SmokeParticle.createOrReplace(entity, {
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
