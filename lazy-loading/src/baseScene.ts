import { GltfContainer, Transform, engine } from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'

export function createBaseScene() {
  const scene = engine.addEntity()
  Transform.create(scene, {
    position: Vector3.create(0, 0, 0),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1)
  })

  const entity = engine.addEntity()
  Transform.create(entity, {
    position: Vector3.create(8, 0, 8),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1),
    parent: scene
  })
  GltfContainer.create(entity, {
    src: 'models/FloorBaseDirt_01.glb'
  })

  const entity2 = engine.addEntity()
  Transform.create(entity2, {
    position: Vector3.create(24, 0, 8),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1),
    parent: scene
  })
  GltfContainer.create(entity2, {
    src: 'models/FloorBaseDirt_01.glb'
  })
  const entity3 = engine.addEntity()
  Transform.create(entity3, {
    position: Vector3.create(8, 0, 24),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1),
    parent: scene
  })
  GltfContainer.create(entity3, {
    src: 'models/FloorBaseDirt_01.glb'
  })
  const entity4 = engine.addEntity()
  Transform.create(entity4, {
    position: Vector3.create(24, 0, 24),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1),
    parent: scene
  })
  GltfContainer.create(entity4, {
    src: 'models/FloorBaseDirt_01.glb'
  })

  const rockTile = engine.addEntity()
  Transform.create(rockTile, {
    position: Vector3.create(31, 0, 17.5),
    rotation: Quaternion.create(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
    scale: Vector3.create(1, 1, 1),
    parent: scene
  })
  GltfContainer.create(rockTile, {
    src: 'models/FloorBlock_04.glb'
  })

  const rockTile2 = engine.addEntity()
  Transform.create(rockTile2, {
    position: Vector3.create(29, 0, 17.5),
    rotation: Quaternion.create(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
    scale: Vector3.create(1, 1, 1),
    parent: scene
  })
  GltfContainer.create(rockTile2, {
    src: 'models/FloorBlock_04.glb'
  })

  const rockTile3 = engine.addEntity()
  Transform.create(rockTile3, {
    position: Vector3.create(27, 0, 17.5),
    rotation: Quaternion.create(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
    scale: Vector3.create(1, 1, 1),
    parent: scene
  })
  GltfContainer.create(rockTile3, {
    src: 'models/FloorBlock_04.glb'
  })

  const rockTile4 = engine.addEntity()
  Transform.create(rockTile4, {
    position: Vector3.create(25, 0, 17.5),
    rotation: Quaternion.create(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
    scale: Vector3.create(1, 1, 1),
    parent: scene
  })
  GltfContainer.create(rockTile4, {
    src: 'models/FloorBlock_04.glb'
  })
  const rockTile5 = engine.addEntity()
  Transform.create(rockTile5, {
    position: Vector3.create(23, 0, 17.5),
    rotation: Quaternion.create(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
    scale: Vector3.create(1, 1, 1),
    parent: scene
  })
  GltfContainer.create(rockTile5, {
    src: 'models/FloorBlock_04.glb'
  })

  const rockTile6 = engine.addEntity()
  Transform.create(rockTile6, {
    position: Vector3.create(21, 0, 17.5),
    rotation: Quaternion.create(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
    scale: Vector3.create(1, 1, 1),
    parent: scene
  })
  GltfContainer.create(rockTile6, {
    src: 'models/FloorBlock_04.glb'
  })

  const rockTile7 = engine.addEntity()
  Transform.create(rockTile7, {
    position: Vector3.create(19, 0, 17.5),
    rotation: Quaternion.create(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
    scale: Vector3.create(1, 1, 1),
    parent: scene
  })
  GltfContainer.create(rockTile7, {
    src: 'models/FloorBlock_04.glb'
  })

  const rockTile8 = engine.addEntity()
  Transform.create(rockTile8, {
    position: Vector3.create(17, 0, 17.5),
    rotation: Quaternion.create(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
    scale: Vector3.create(1, 1, 1),
    parent: scene
  })
  GltfContainer.create(rockTile8, {
    src: 'models/FloorBlock_04.glb'
  })

  const rockTile9 = engine.addEntity()
  Transform.create(rockTile9, {
    position: Vector3.create(15, 0, 17.5),
    rotation: Quaternion.create(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
    scale: Vector3.create(1, 1, 1),
    parent: scene
  })
  GltfContainer.create(rockTile9, {
    src: 'models/FloorBlock_04.glb'
  })
  const rockTile10 = engine.addEntity()
  Transform.create(rockTile10, {
    position: Vector3.create(13, 0, 17.5),
    rotation: Quaternion.create(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
    scale: Vector3.create(1, 1, 1),
    parent: scene
  })
  GltfContainer.create(rockTile10, {
    src: 'models/FloorBlock_04.glb'
  })
  const rockTile11 = engine.addEntity()
  Transform.create(rockTile11, {
    position: Vector3.create(11, 0, 17.5),
    rotation: Quaternion.create(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
    scale: Vector3.create(1, 1, 1),
    parent: scene
  })
  GltfContainer.create(rockTile11, {
    src: 'models/FloorBlock_04.glb'
  })

  const rockTile12 = engine.addEntity()
  Transform.create(rockTile12, {
    position: Vector3.create(9, 0, 17.5),
    rotation: Quaternion.create(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
    scale: Vector3.create(1, 1, 1),
    parent: scene
  })
  GltfContainer.create(rockTile12, {
    src: 'models/FloorBlock_04.glb'
  })
  const rockTile13 = engine.addEntity()
  Transform.create(rockTile13, {
    position: Vector3.create(7, 0, 17.5),
    rotation: Quaternion.create(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
    scale: Vector3.create(1, 1, 1),
    parent: scene
  })
  GltfContainer.create(rockTile13, {
    src: 'models/FloorBlock_04.glb'
  })
  const rockTile14 = engine.addEntity()
  Transform.create(rockTile14, {
    position: Vector3.create(5, 0, 17.5),
    rotation: Quaternion.create(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
    scale: Vector3.create(1, 1, 1),
    parent: scene
  })
  GltfContainer.create(rockTile14, {
    src: 'models/FloorBlock_04.glb'
  })
  const rockTile15 = engine.addEntity()
  Transform.create(rockTile15, {
    position: Vector3.create(3, 0, 17.5),
    rotation: Quaternion.create(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
    scale: Vector3.create(1, 1, 1),
    parent: scene
  })
  GltfContainer.create(rockTile15, {
    src: 'models/FloorBlock_04.glb'
  })

  const rockTile16 = engine.addEntity()
  Transform.create(rockTile16, {
    position: Vector3.create(1, 0, 17.5),
    rotation: Quaternion.create(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
    scale: Vector3.create(1, 1, 1),
    parent: scene
  })
  GltfContainer.create(rockTile16, {
    src: 'models/FloorBlock_04.glb'
  })

  return scene
}
