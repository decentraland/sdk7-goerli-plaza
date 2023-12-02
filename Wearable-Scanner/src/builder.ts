import {
    engine,
    Transform,
    GltfContainer,TextShape, Name,
    MeshRenderer,
  } from '@dcl/sdk/ecs'
  import { Vector3, Quaternion } from '@dcl/sdk/math'
  

     // Function to build the scene with 3D models 
  export function buildScene() {
  
    // Brick wall model source and positions with rotation and scale
    const brickWallModel = 'models/Module_Stone_Curve_01/Module_Stone_Curve_01.glb'
    const brickWallParams = [
      { position: { x: 14.232542037963867, y: 0, z: 10.096558570861816 }, rotation: { x: 4.440892627896218e-16, y: 0.7071068286895752, z: -8.429369557916289e-8, w: -0.7071068286895752 }, scale: { x: 1.0000152587890625, y: 1, z: 1.0000152587890625 } },
      { position: { x: 2.5367984771728516, y: 0, z: 10.069063186645508 }, rotation: { x: 1.693082319850249e-14, y: 0.9999898672103882, z: -1.1920805320642103e-7, w: -0.004503994714468718 }, scale: { x: 1.0000159740447998, y: 1, z: 1.0000159740447998 } },
      { position: { x: 2.5367984771728516, y: 0, z: 2.069063186645508 }, rotation: { x: -9.888260508664334e-16, y: 0.7071068286895752, z: -8.429368847373553e-8, w: 0.7071068286895752 }, scale: { x: 1.0000181198120117, y: 1, z: 1.0000181198120117 } },
      { position: { x: 14.232542037963867, y: 0, z: 2.0965585708618164 }, rotation: { x: 4.56593745492141e-15, y: 0, z: -3.238694636572572e-15, w: -1 }, scale: { x: 1.0000114440917969, y: 1, z: 1.0000114440917969 } },
      { position: { x: 10.822892189025879, y: 0, z: 2.072402000427246 }, rotation: { x: 0, y: 0, z: 0, w: 1 }, scale: { x: 1.122812271118164, y: 1, z: 0.9999998807907104 } }
    ] 
  
    // Create brick walls using a loop
    brickWallParams.forEach(param => {
      const wall = engine.addEntity()
      GltfContainer.create(wall, { src: brickWallModel })
      MeshRenderer.create(wall)
      Transform.create(wall, {
        position: Vector3.create(param.position.x, param.position.y, param.position.z),
        rotation: Quaternion.create(param.rotation.x, param.rotation.y, param.rotation.z, param.rotation.w),
        scale: Vector3.create(param.scale.x, param.scale.y, param.scale.z)
      })
    })

     // Brickwall threshold / doorway     
    const stoneBrickThreshold = engine.addEntity()
    GltfContainer.create(stoneBrickThreshold, { src: 'models/Module_Stone_Straight_Door_01/Module_Stone_Straight_Door_01.glb' })
    MeshRenderer.create(stoneBrickThreshold)
    Transform.create(stoneBrickThreshold, {
      position: Vector3.create(10.5, 0, 9.413106918334961),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1)
    })
  
    // Tower Roof
    const towerRoof = engine.addEntity()
    GltfContainer.create(towerRoof, { src: 'models/Roof_01/Roof_01.glb' })
    MeshRenderer.create(towerRoof)
    Transform.create(towerRoof, {
        position: Vector3.create(8.370111465454102, 3.3169188499450684, 5.924097061157227),
        rotation: Quaternion.create(0, 0, 0, 1),
        scale: Vector3.create(1.67344331741333, 1, 1.2725991010665894)
    })

    // Floor Fantasy Rocks
    const floorFantasyRocks = engine.addEntity()
    GltfContainer.create(floorFantasyRocks, { src: 'models/FloorFantasyRocks_03/FloorFantasyRocks_03.glb' })
    MeshRenderer.create(floorFantasyRocks)
    Transform.create(floorFantasyRocks, {
        position: Vector3.create(8, 0, 8),
        rotation: Quaternion.create(0, 0, 0, 1),
        scale: Vector3.create(1, 1, 1)
    })

    // Signpost Golden
    const signpostGolden = engine.addEntity()
    GltfContainer.create(signpostGolden, { src: 'models/signpost/Signpost_Golden.glb' }) 
    MeshRenderer.create(signpostGolden)
    Transform.create(signpostGolden, {
        position: Vector3.create(6.374037265777588, 0, 3.6893038749694824),
        rotation: Quaternion.create(0, 0, 0, 1),
        scale: Vector3.create(1, 1, 1)
    })

    // Signpost Text
    const signpostText = engine.addEntity()
    Transform.create(signpostText, {
      parent: signpostGolden,                         // using parent so text is attached to singpost and its easier to adjust text 
      position: { x: 0, y: 2.05, z: 0.02 },
      rotation: Quaternion.fromEulerDegrees(0, 180, 0)
    })
    TextShape.create(signpostText, {                     
      text: 'VIP Lounge',
      fontSize: 1.5,
      textColor: { r: 0, g: 0, b: 0, a: 1 } ,          // rgb and 'a' for alpha 
    })
    Name.create(signpostText, { value: 'signpost' })


  }
  
