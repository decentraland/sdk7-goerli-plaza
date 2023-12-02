import {
    engine,
    Transform,
    GltfContainer,
    MeshRenderer,
    
  } from '@dcl/sdk/ecs'
  import { Vector3,Quaternion } from '@dcl/sdk/math'

  export function buildScene() {
    

    // Entity: FloorFantasyRocks
    const floorFantasyRocks = engine.addEntity()
    GltfContainer.create(floorFantasyRocks, { src: 'models/FloorFantasyRocks_03/FloorFantasyRocks_03.glb' })
    MeshRenderer.create(floorFantasyRocks)
    Transform.create(floorFantasyRocks, {
      position: Vector3.create(8, 0, 8),
      scale: Vector3.create(1, 1, 1)
    })
  
    // Entity: Module_Stair_Straight_1M
    const moduleStairStraight1M = engine.addEntity()
    GltfContainer.create(moduleStairStraight1M, { src: 'models/Module_Stair_Straight_1M/Module_Stair_Straight_1M.glb' })
    MeshRenderer.create(moduleStairStraight1M)
    Transform.create(moduleStairStraight1M, {
      position: Vector3.create(9, 0, 15.5),
      scale: Vector3.create(3.7663958072662354, 4.651392459869385, 3.7663958072662354)
    })
  
    // Entity: Pillar_Top_Stones_Corner_01
    const pillarTopStonesCorner01 = engine.addEntity()
    GltfContainer.create(pillarTopStonesCorner01, { src: 'models/Pillar_Top_Stones_Corner_01/Pillar_Top_Stones_Corner_01.glb' })
    MeshRenderer.create(pillarTopStonesCorner01)
    Transform.create(pillarTopStonesCorner01, {
      position: Vector3.create(3, 0, 3.5),
      scale: Vector3.create(1, 1.4962525367736816, 0.9856662750244141)
    })
      

    // Entity: StoneTopBlock3
    const stoneTopBlock3 = engine.addEntity()
    GltfContainer.create(stoneTopBlock3, { src: 'models/Pillar_Top_Stones_Corner_01/Pillar_Top_Stones_Corner_01.glb' })
    MeshRenderer.create(stoneTopBlock3)
    Transform.create(stoneTopBlock3, {
      position: Vector3.create(9, 0, 12),
      scale: Vector3.create(1.245723843574524, 1.434235692024231, 0.7579238414764404)
    })

    // Entity: StoneTopBlock2
    const stoneTopBlock2 = engine.addEntity()
    GltfContainer.create(stoneTopBlock2, { src: 'models/Pillar_Top_Stones_Corner_01/Pillar_Top_Stones_Corner_01.glb' })
    MeshRenderer.create(stoneTopBlock2)
    Transform.create(stoneTopBlock2, {
      position: Vector3.create(16, 0, 4),
      scale: Vector3.create(1, 1.4962525367736816, 0.9856662750244141)
    })

    // Entity: DogStatue
    const dogStatue = engine.addEntity()
    GltfContainer.create(dogStatue, { src: 'models/PillarDog_01/PillarDog_01.glb' })
    MeshRenderer.create(dogStatue)
    Transform.create(dogStatue, {
      position: Vector3.create(1.301210880279541, 2.4656124114990234, 2.1973533630371094),
      rotation: Quaternion.create(1.108018303742572e-15, -0.7071068286895752, 8.429369557916289e-8, -0.7071068286895752),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537)
    })

    // Entity: CatStatue
    const catStatue = engine.addEntity()
    GltfContainer.create(catStatue, { src: 'models/PillarCat_01/PillarCat_01.glb' })
    MeshRenderer.create(catStatue)
    Transform.create(catStatue, {
      position: Vector3.create(14.51323413848877, 2.4653825759887695, 2.5529298782348633),
      rotation: Quaternion.create(-2.4085271740892887e-15, 0.7071068286895752, -8.429369557916289e-8, 0.7071068286895752),
      scale: Vector3.create(1.0000030994415283, 1, 1.0000030994415283)
    })

  }
  