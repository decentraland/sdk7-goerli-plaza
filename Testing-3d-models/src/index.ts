import { engine, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

// export all the functions required to make the scene work
export * from '@dcl/sdk'

let samplescene = engine.addEntity()

GltfContainer.create(samplescene, { src: 'assets/scene/Models/SampleScene.glb' })

Transform.create(samplescene, {
  position: Vector3.create(32, 0, 32),
  scale: Vector3.create(1, 1, 1)
})

let samplescene_02 = engine.addEntity()

GltfContainer.create(samplescene_02, { src: 'assets/scene/Models/SampleScene_02.glb' })

Transform.create(samplescene_02, {
  position: Vector3.create(32, 0, 32),
  scale: Vector3.create(1, 1, 1)
})

let samplescene_03 = engine.addEntity()

GltfContainer.create(samplescene_03, { src: 'assets/scene/Models/SampleScene_03.glb' })

Transform.create(samplescene_03, {
  position: Vector3.create(32, 0, 32),
  scale: Vector3.create(1, 1, 1)
})

let animatedcube = engine.addEntity()

GltfContainer.create(animatedcube, { src: 'assets/scene/Models/AnimatedCube.glb' })

Transform.create(animatedcube, {
  position: Vector3.create(32, 0, 32),
  scale: Vector3.create(1, 1, 1)
})

let animatedcubemorph = engine.addEntity()

GltfContainer.create(animatedcubemorph, { src: 'assets/scene/Models/AnimatedCubeMorph.glb' })

Transform.create(animatedcubemorph, {
  position: Vector3.create(32, 0, 32),
  scale: Vector3.create(1, 1, 1)
})

let animatedspheremorph = engine.addEntity()

GltfContainer.create(animatedspheremorph, { src: 'assets/scene/Models/AnimatedSphereMorph.glb' })

Transform.create(animatedspheremorph, {
  position: Vector3.create(32, 0, 32),
  scale: Vector3.create(1, 1, 1)
})

let riggedanimation = engine.addEntity()

GltfContainer.create(riggedanimation, { src: 'assets/scene/Models/RiggedAnimation.glb' })

Transform.create(riggedanimation, {
  position: Vector3.create(32, 0, 32),
  scale: Vector3.create(1, 1, 1)
})

let riggeddracoanimation = engine.addEntity()

GltfContainer.create(riggeddracoanimation, { src: 'assets/scene/Models/RiggedDracoAnimation.glb' })

Transform.create(riggeddracoanimation, {
  position: Vector3.create(32, 0, 32),
  scale: Vector3.create(1, 1, 1)
})

let avocado = engine.addEntity()

GltfContainer.create(avocado, { src: 'assets/scene/Models/avocado.glb' })

Transform.create(avocado, {
  position: Vector3.create(32, 0, 32),
  scale: Vector3.create(1, 1, 1)
})
