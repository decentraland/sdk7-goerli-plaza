import { engine, Transform, GltfContainer, TextShape } from '@dcl/sdk/ecs'
import { Quaternion } from '@dcl/sdk/math'

/**
 * This function builds the scene by initializing
 * and setting up necessary entities and components.
 *
 * @returns {Entity} Returns signpost text entity with TextShape component.
 */
export function buildScene() {
  // Create parent entity, that holds all the scenes items
  const _scene = engine.addEntity()

  // Give the entity a position via a transform component
  Transform.create(_scene, {
    position: { x: 0, y: 0, z: 0 }
  })

  // Grass
  const grass = engine.addEntity()
  GltfContainer.create(grass, {
    src: 'models/FloorBaseGrass_01/FloorBaseGrass_01.glb'
  })
  Transform.create(grass, {
    parent: _scene,
    position: { x: 8, y: 0, z: 8 }
  })

  // Bench
  const bench = engine.addEntity()
  GltfContainer.create(bench, {
    src: 'models/Bench_01/Bench_01.glb'
  })
  Transform.create(bench, {
    parent: _scene,
    position: { x: 12.5, y: 0, z: 11.5 },
    rotation: { x: 0, y: -0.29, z: 0, w: 1 }
  })

  // Mystical Mushroom Tree
  const mysticalMushroomTree = engine.addEntity()
  GltfContainer.create(mysticalMushroomTree, {
    src: 'models/Tree_02/Tree_02.glb'
  })
  Transform.create(mysticalMushroomTree, {
    parent: _scene,
    position: { x: 12.5, y: 0, z: 3.5 }
  })

  // Barbecue
  const barbacue = engine.addEntity()
  GltfContainer.create(barbacue, {
    src: 'models/Barbacue_01/Barbacue_01.glb'
  })
  Transform.create(barbacue, {
    parent: _scene,
    position: { x: 5.5, y: 0, z: 14 }
  })

  // Stone Path
  const stonePath = engine.addEntity()
  GltfContainer.create(stonePath, {
    src: 'models/RockFloor_Module_2M/RockFloor_Module_2M.glb'
  })
  Transform.create(stonePath, {
    parent: _scene,
    position: { x: 8.5, y: 0, z: 12.5 }
  })

  // Stone Path 2
  const stonePath2 = engine.addEntity()
  GltfContainer.create(stonePath2, {
    src: 'models/RockFloor_Module_2M/RockFloor_Module_2M.glb'
  })
  Transform.create(stonePath2, {
    parent: _scene,
    position: { x: 6, y: 0, z: 9 }
  })

  // Stone Path 3
  const stonePath3 = engine.addEntity()
  GltfContainer.create(stonePath3, {
    src: 'models/RockFloor_Module_2M/RockFloor_Module_2M.glb'
  })
  Transform.create(stonePath3, {
    parent: _scene,
    position: { x: 4, y: 0, z: 9 }
  })

  // Shrub
  const shrub = engine.addEntity()
  GltfContainer.create(shrub, {
    src: 'models/Bush_01/Bush_01.glb'
  })
  Transform.create(shrub, {
    parent: _scene,
    position: { x: 4.5, y: 0, z: 3 }
  })

  // Shrub 2
  const shrub2 = engine.addEntity()
  GltfContainer.create(shrub2, {
    src: 'models/Bush_01/Bush_01.glb'
  })
  Transform.create(shrub2, {
    parent: _scene,
    position: { x: 3.5, y: 0, z: 15 }
  })

  // Balsam Flower
  const balsamFlower = engine.addEntity()
  GltfContainer.create(balsamFlower, {
    src: 'models/Plant_02/Plant_02.glb'
  })
  Transform.create(balsamFlower, {
    parent: _scene,
    position: { x: 11.5, y: 0, z: 2.5 }
  })

  // Sunflower
  const sunFlower = engine.addEntity()
  GltfContainer.create(sunFlower, {
    src: 'models/Flower_01/Flower_01.glb'
  })
  Transform.create(sunFlower, {
    parent: _scene,
    position: { x: 1.5, y: 0, z: 14 }
  })
  // Fountain
  const fountain = engine.addEntity()
  GltfContainer.create(fountain, {
    src: 'models/Fountain_03/Fountain_03.glb'
  })
  Transform.create(fountain, {
    parent: _scene,
    position: { x: 8, y: 0, z: 8 }
  })

  // Signpost
  const signpost = engine.addEntity()
  GltfContainer.create(signpost, {
    src: 'models/Signpost.glb'
  })
  Transform.create(signpost, {
    parent: _scene,
    position: { x: 11.5, y: 0, z: 14 },
    rotation: Quaternion.fromEulerDegrees(0, 210, 0)
  })

  // Signpost Text
  const signpostText = engine.addEntity(true)
  Transform.create(signpostText, {
    parent: signpost,
    position: { x: 0, y: 1.3, z: 0.45 },
    rotation: Quaternion.fromEulerDegrees(0, 180, 0)
  })
  TextShape.create(signpostText, {
    text: 'PARTY TIME!',
    fontSize: 2
  })

  return TextShape.getMutable(signpostText)
}
