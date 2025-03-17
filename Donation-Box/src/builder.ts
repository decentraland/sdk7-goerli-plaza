import {Vector3,Quaternion } from '@dcl/sdk/math'
import { MeshCollider, Name, TextShape, GltfContainer, Transform, engine, MeshRenderer } from '@dcl/sdk/ecs'


// build scene, all models besides the box are below 

export function buildScene() {
  
    // Entity: FloorBaseGrass
  const FloorBaseGrass = engine.addEntity()
  GltfContainer.create(FloorBaseGrass, { src: 'models/FloorBaseGrass_01/FloorBaseGrass_01.glb' })
  MeshCollider.setBox(FloorBaseGrass)
  MeshRenderer.create(FloorBaseGrass)

  Transform.create(FloorBaseGrass, { 
    position: Vector3.create(8, 0, 8),
    rotation: Quaternion.create(0, 0, 0, 0),
    scale: Vector3.create(1, 1, 1)
  })


  // Entity: Small Star Mosaic Tile
  const smallStarMosaicTile = engine.addEntity()
  GltfContainer.create(smallStarMosaicTile, { src: 'models/Floor_Tiles_2M_01/Floor_Tiles_2M_01.glb' })
  MeshRenderer.create(smallStarMosaicTile)
  MeshCollider.setBox(smallStarMosaicTile)

  Transform.create(smallStarMosaicTile, { 
    position: Vector3.create(10.600052833557129, 0, 11.026769638061523),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1)
  })


  // Entity: Exodus Base
  const exodusBase = engine.addEntity()
  GltfContainer.create(exodusBase, { src: 'models/HTC_Base/HTC_Base.glb' })
  MeshRenderer.create(exodusBase)
  MeshCollider.setBox(smallStarMosaicTile)


  Transform.create(exodusBase, { 
    position: Vector3.create(8.5, 0, 7),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1)
  })

  // Entity: Big Mossy Rock
  const bigMossyRock = engine.addEntity()
  GltfContainer.create(bigMossyRock, { src: 'models/RockLargeMoss_01/RockLargeMoss_01.glb'})
  MeshRenderer.create(bigMossyRock)
  MeshCollider.setBox(bigMossyRock)

  Transform.create(bigMossyRock, { 
    position: Vector3.create(8.34492301940918, 0, 6.976346969604492),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1)
  })

 // Red Bicycle
  const redBicycle = engine.addEntity()
  GltfContainer.create(redBicycle, { src: 'models/Bicycle_01/Bicycle_01.glb' })
  MeshRenderer.create(redBicycle)
  Transform.create(redBicycle, {
    position: Vector3.create(7.925111770629883, 3.541813373565674, 6.748531818389893),
    rotation: Quaternion.create(0, 0, 0.3236430883407593, 0.9461792707443237),
    scale: Vector3.create(1, 1, 1)
  })

  // Black Tricorn Hat
  const blackTricornHat = engine.addEntity()
  GltfContainer.create(blackTricornHat, { src: 'models/PirateHat_02/PirateHat_02.glb' })
  MeshRenderer.create(blackTricornHat)
  Transform.create(blackTricornHat, {
    position: Vector3.create(6.9359636306762695, 4.237381458282471, 7.16286563873291),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1)
  })

  // Hard Hat
  const hardHat = engine.addEntity()
  GltfContainer.create(hardHat, { src: 'models/ConstructionHat_01/ConstructionHat_01.glb' })
  MeshRenderer.create(hardHat)
  Transform.create(hardHat, {
    position: Vector3.create(7.09410285949707, 4.228394508361816, 6.328909397125244),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1)
  })

  // Pineapple
  const pineapple = engine.addEntity()
  GltfContainer.create(pineapple, { src: 'models/FoodPineapple_01/FoodPineapple_01.glb' })
  MeshRenderer.create(pineapple)
  Transform.create(pineapple, {
    position: Vector3.create(8.227413177490234, 4.179879188537598, 6.675386905670166),
    rotation: Quaternion.create(0.6708388924598694, 2.9603538926324148e-15, -7.997022777317397e-8, 0.7416031956672668),
    scale: Vector3.create(1, 1.0000091791152954, 1.0000091791152954)
  })

  // Treehouse
  const treehouse = engine.addEntity()
  GltfContainer.create(treehouse, { src: 'models/TreeHouse_01/TreeHouse_01.glb' })
  MeshRenderer.create(treehouse)
  Transform.create(treehouse, {
    position: Vector3.create(7.653783798217773, 4.356611251831055, 6.759873390197754),
    rotation: Quaternion.create(0, 0, 0.22944684326648712, 0.9733211994171143),
    scale: Vector3.create(0.13905857503414154, 0.13905857503414154, 0.13905858993530273)
  })
  
  // Fire Hydrant
  const fireHydrant = engine.addEntity()
  GltfContainer.create(fireHydrant, { src: 'models/FireHydrant_01/FireHydrant_01.glb' })
  MeshRenderer.create(fireHydrant)
  Transform.create(fireHydrant, {
    position: Vector3.create(7.476778030395508, 3.913282871246338, 7.0745978355407715),
    rotation: Quaternion.create(-0.6561812162399292, 2.2000484370892455e-15, 7.822289660452952e-8, 0.754603385925293),
    scale: Vector3.create(1, 1, 1)
  })
// Construction Cone
  const constructionCone = engine.addEntity()
  GltfContainer.create(constructionCone, { src: 'models/ConstructionCone_01/ConstructionCone_01.glb' })
  MeshRenderer.create(constructionCone)
  Transform.create(constructionCone, {
    position: Vector3.create(8.642478942871094, 3.720047950744629, 6.743607044219971),
    rotation: Quaternion.create(0, 0, -0.24345248937606812, 0.9699128270149231),
    scale: Vector3.create(0.9999990463256836, 0.9999990463256836, 1)
  })

  // Street Mailbox
  const streetMailbox = engine.addEntity()
  GltfContainer.create(streetMailbox, { src: 'models/MailPost_01/MailPost_01.glb' })
  MeshRenderer.create(streetMailbox)
  Transform.create(streetMailbox, {
    position: Vector3.create(8.055581092834473, 4.899134159088135, 6.7307820320129395),
    rotation: Quaternion.create(0.797650933265686, 0.6026478409767151, -0.022571535781025887, 0.007694894913583994),
    scale: Vector3.create(1.0000251531600952, 1.000025987625122, 1.0000176429748535)
  })

  // Soccer Ball
  const soccerBall = engine.addEntity()
  GltfContainer.create(soccerBall, { src: 'models/PlaygroundBall_01/PlaygroundBall_01.glb' })
  MeshRenderer.create(soccerBall)
  Transform.create(soccerBall, {
    position: Vector3.create(7.697266578674316, 6.081168174743652, 6.973837852478027),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(0.7361947894096375, 0.7573351263999939, 1.0583322048187256)
  })

  // Construction Ladder
  const constructionLadder = engine.addEntity()
  GltfContainer.create(constructionLadder, { src: 'models/ConstructionLadder_01/ConstructionLadder_01.glb' })
  MeshRenderer.create(constructionLadder)
  Transform.create(constructionLadder, {
    position: Vector3.create(8.168024063110352, 4.95, 6.8478217124938965),
    rotation: Quaternion.create(-4.222302077746302e-17, 0.16147533059120178, -1.924935588704102e-8, 0.9868767857551575),
    scale: Vector3.create(0.9999996423721313, 1, 0.9999996423721313)
  })

  // Classroom Chair
  const classroomChair = engine.addEntity()
  GltfContainer.create(classroomChair, { src: 'models/Chair_02/Chair_02.glb' })
  MeshRenderer.create(classroomChair)
  Transform.create(classroomChair, {
    position: Vector3.create(7.639830112457275, 5.38, 6.700704097747803),
    rotation: Quaternion.create(0, 0, -0.5815821290016174, 0.813487708568573),
    scale: Vector3.create(1, 1, 1)
  })

  // Red Fish
  const redFish = engine.addEntity()
  GltfContainer.create(redFish, { src: 'models/Fish_02/Fish_02.glb' })
  MeshRenderer.create(redFish)
  Transform.create(redFish, {
    position: Vector3.create(8.362448692321777, 3.6637864112854004, 7.084746360778809),
    rotation: Quaternion.create(-0.35617244243621826, 0.5057852268218994, 0.34137439727783203, -0.7076624035835266),
    scale: Vector3.create(1, 1, 1)
  })

  // Anvil
  const anvil = engine.addEntity()
  GltfContainer.create(anvil, { src: 'models/Anvil_01/Anvil_01.glb' })
  MeshRenderer.create(anvil)
  Transform.create(anvil, {
    position: Vector3.create(7.7743635177612305, 6.421475887298584, 6.972078323364258),
    rotation: Quaternion.create(-3.689186886108285e-16, 0.14545948803424835, -1.7340116897912594e-8, 0.9893642663955688),
    scale: Vector3.create(1, 1, 1)
  })

  // Small Star Mosaic Tiles (2 to 12)
  const mosaicTileModels = 'models/Floor_Tiles_2M_01/Floor_Tiles_2M_01.glb'
  const mosaicTilePositions = [
    { x: 8.600052833557129, y: 0, z: 11.026769638061523 },
    { x: 6.600052833557129, y: 0, z: 11.026769638061523 },
    { x: 6.600052833557129, y: 0, z: 9.026769638061523 },
    { x: 6.600052833557129, y: 0, z: 7.026769638061523 },
    { x: 6.600052833557129, y: 0, z: 5.026769638061523 },
    { x: 8.5, y: 0, z: 5 },
    { x: 10.5, y: 0, z: 5 },
    { x: 12.5, y: 0, z: 5 },
    { x: 12.5, y: 0, z: 7 },
    { x: 12.5, y: 0, z: 9 },
    { x: 12.5, y: 0, z: 11 }
  ]
  mosaicTilePositions.forEach((pos, index) => {
    const tile = engine.addEntity()
    GltfContainer.create(tile, { src: mosaicTileModels })
    MeshRenderer.create(tile)
    Transform.create(tile, {
      position: Vector3.create(pos.x, pos.y, pos.z),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1)
    })
  })
  
  // Square Signpost
  const squareSignpost = engine.addEntity()
  GltfContainer.create(squareSignpost, { src: 'models/Signpost_Square.glb' }) // Update the model path if necessary
  MeshRenderer.create(squareSignpost)
  Transform.create(squareSignpost, {
    position: Vector3.create(5, 0, 12),
    rotation: Quaternion.create(-6.236331743169569e-15, 0.999313235282898, -1.1912741371133961e-7, -0.037055909633636475),
    scale: Vector3.create(1.0000048875808716, 1, 1.0000048875808716)
  })

    // Signpost Text
    const signpostText = engine.addEntity()
    Transform.create(signpostText, {
      parent: squareSignpost,                         // using parent so text is attached to singpost and its easier to adjust text 
      position: { x: 0, y: 2, z: -0.01 },
      rotation: Quaternion.fromEulerDegrees(0, 0, 0)
    })
    TextShape.create(signpostText, {                     
      text: 'Support\n the artist',
      fontSize: 1,
      textColor: { r: 0, g: 0, b: 0, a: 1 } ,          // rgb and a for alpha 
    })
    Name.create(signpostText, { value: 'signpost' })
  

  // Bush
  const bush = engine.addEntity()
  GltfContainer.create(bush, { src: 'models/Bush_02/Bush_02.glb' })
  MeshRenderer.create(bush)
  Transform.create(bush, {
    position: Vector3.create(11.5, 0, 13.5),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1)
  })
  
  // Square Wood Table
  const squareWoodTable = engine.addEntity()
  GltfContainer.create(squareWoodTable, { src: 'models/Table_03/Table_03.glb' })
  MeshRenderer.create(squareWoodTable)
  Transform.create(squareWoodTable, {
    position: Vector3.create(6.5, 0, 12),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1)
  })
}