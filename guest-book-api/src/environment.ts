import { engine, GltfContainer, TextAlignMode, TextShape, Transform } from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'

export function buildScene() {
  const scene = engine.addEntity()
  Transform.create(scene, {
    position: Vector3.Zero()
  })

  const floor = engine.addEntity()
  GltfContainer.create(floor, {
    src: 'assets/scene/Models/FloorBaseGrass_01/FloorBaseGrass_01.glb'
  })
  Transform.create(floor, {
    position: Vector3.create(8, 0, 8),
    parent: scene
  })

  const narrowCrater = engine.addEntity()
  GltfContainer.create(narrowCrater, {
    src: 'assets/scene/Models/Crater_02/Crater_02.glb'
  })
  Transform.create(narrowCrater, {
    position: Vector3.create(10.355362892150879, 0, 8),
    parent: scene
  })

  const ancientMediumStonePath = engine.addEntity()
  GltfContainer.create(ancientMediumStonePath, {
    src: 'assets/scene/Models/RockFloor_Module_2M/RockFloor_Module_2M.glb'
  })
  Transform.create(ancientMediumStonePath, {
    position: Vector3.create(7.01444149017334, 0, 9.5),
    parent: scene
  })

  const ancientMediumStonePath2 = engine.addEntity()
  GltfContainer.create(ancientMediumStonePath2, {
    src: 'assets/scene/Models/RockFloor_Module_2M/RockFloor_Module_2M.glb'
  })
  Transform.create(ancientMediumStonePath2, {
    position: Vector3.create(5.01444149017334, 0, 9.5),
    parent: scene
  })

  const ancientMediumStonePath3 = engine.addEntity()
  GltfContainer.create(ancientMediumStonePath3, {
    src: 'assets/scene/Models/RockFloor_Module_2M/RockFloor_Module_2M.glb'
  })
  Transform.create(ancientMediumStonePath3, {
    position: Vector3.create(5.01444149017334, 0, 11.5),
    parent: scene
  })

  const ancientMediumStonePath4 = engine.addEntity()
  GltfContainer.create(ancientMediumStonePath4, {
    src: 'assets/scene/Models/RockFloor_Module_2M/RockFloor_Module_2M.glb'
  })
  Transform.create(ancientMediumStonePath4, {
    position: Vector3.create(5.01444149017334, 0, 13.5),
    parent: scene
  })

  const ancientMediumStonePath5 = engine.addEntity()
  GltfContainer.create(ancientMediumStonePath5, {
    src: 'assets/scene/Models/RockFloor_Module_2M/RockFloor_Module_2M.glb'
  })
  Transform.create(ancientMediumStonePath5, {
    position: Vector3.create(5.01444149017334, 0, 15.5),
    parent: scene
  })

  const bush = engine.addEntity()
  GltfContainer.create(bush, {
    src: 'assets/scene/Models/Bush_02/Bush_02.glb'
  })
  Transform.create(bush, {
    position: Vector3.create(12.5, 0, 13.5),
    parent: scene
  })

  const evergreenShrub = engine.addEntity()
  GltfContainer.create(evergreenShrub, {
    src: 'assets/scene/Models/Bush_03/Bush_03.glb'
  })
  Transform.create(evergreenShrub, {
    position: Vector3.create(4.5, 0, 1.5),
    parent: scene
  })

  const sunflowerHead = engine.addEntity()
  GltfContainer.create(sunflowerHead, {
    src: 'assets/scene/Models/Flower_01/Flower_01.glb'
  })
  Transform.create(sunflowerHead, {
    position: Vector3.create(6.5, 0, 15),
    parent: scene
  })

  const greenPoplars = engine.addEntity()
  GltfContainer.create(greenPoplars, {
    src: 'assets/scene/Models/TreeFir_02/TreeFir_02.glb'
  })
  Transform.create(greenPoplars, {
    position: Vector3.create(13.5, 0, 2),
    parent: scene
  })

  const rusticMerchantFishStand = engine.addEntity()
  GltfContainer.create(rusticMerchantFishStand, {
    src: 'assets/scene/Models/SellingGoods_02/SellingGoods_02.glb'
  })
  Transform.create(rusticMerchantFishStand, {
    position: Vector3.create(6.51444149017334, 0, 13),
    rotation: Quaternion.create(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
    scale: Vector3.create(1.0000107288360596, 1, 1.0000107288360596),
    parent: scene
  })

  const rusticMerchantFishStand2 = engine.addEntity()
  GltfContainer.create(rusticMerchantFishStand2, {
    src: 'assets/scene/Models/SellingGoods_02/SellingGoods_02.glb'
  })
  Transform.create(rusticMerchantFishStand2, {
    position: Vector3.create(2.2349023818969727, 0, 6),
    parent: scene
  })

  const rusticCoveredMerchantStand = engine.addEntity()
  GltfContainer.create(rusticCoveredMerchantStand, {
    src: 'assets/scene/Models/SellingGoods_03/SellingGoods_03.glb'
  })
  Transform.create(rusticCoveredMerchantStand, {
    position: Vector3.create(6.51444149017334, 0, 11),
    rotation: Quaternion.create(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
    scale: Vector3.create(1.0000088214874268, 1, 1.0000088214874268),
    parent: scene
  })

  const rusticCoveredMerchantStand2 = engine.addEntity()
  GltfContainer.create(rusticCoveredMerchantStand2, {
    src: 'assets/scene/Models/SellingGoods_03/SellingGoods_03.glb'
  })
  Transform.create(rusticCoveredMerchantStand2, {
    position: Vector3.create(5.234902381896973, 0, 6),
    parent: scene
  })

  const rusticCoveredMerchantStand3 = engine.addEntity()
  GltfContainer.create(rusticCoveredMerchantStand3, {
    src: 'assets/scene/Models/SellingGoods_03/SellingGoods_03.glb'
  })
  Transform.create(rusticCoveredMerchantStand3, {
    position: Vector3.create(2, 0, 12.5),
    rotation: Quaternion.create(-1.1023608648087421e-15, 0.7806753516197205, -9.306374693096586e-8, 0.6249369382858276),
    scale: Vector3.create(1.0000100135803223, 1, 1.0000100135803223),
    parent: scene
  })

  const rusticMerchantStand = engine.addEntity()
  GltfContainer.create(rusticMerchantStand, {
    src: 'assets/scene/Models/SellingGoods_01/SellingGoods_01.glb'
  })
  Transform.create(rusticMerchantStand, {
    position: Vector3.create(1.7751564979553223, 0, 9.83009147644043),
    rotation: Quaternion.create(1.1038385137852273e-15, 0.7071068286895752, -8.429368847373553e-8, 0.7071067690849304),
    parent: scene
  })

  const cafeStreetSign = engine.addEntity()
  GltfContainer.create(cafeStreetSign, {
    src: 'assets/scene/Models/Sign_02/Sign_02.glb'
  })
  Transform.create(cafeStreetSign, {
    position: Vector3.create(10, 0, 3.5),
    rotation: Quaternion.create(-1.050000167921502e-14, -0.3896034359931946, 4.644433104772361e-8, -0.9209827780723572),
    scale: Vector3.create(1.0000003576278687, 1, 1.0000003576278687),
    parent: scene
  })

  const redBicycle = engine.addEntity()
  GltfContainer.create(redBicycle, {
    src: 'assets/scene/Models/Bicycle_01/Bicycle_01.glb'
  })
  Transform.create(redBicycle, {
    position: Vector3.create(2.5, 0, 3.5),
    rotation: Quaternion.create(
      -0.47008490562438965,
      3.1905565895098075e-16,
      5.6038484075315864e-8,
      0.8826212882995605
    ),
    scale: Vector3.create(1, 1.0000017881393433, 1.0000017881393433),
    parent: scene
  })

  const signpost = engine.addEntity()
  GltfContainer.create(signpost, {
    src: 'assets/scene/Models/Signpost.glb'
  })
  Transform.create(signpost, {
    position: Vector3.create(11, 0, 11),
    parent: scene
  })
  const signpostText = engine.addEntity()
  Transform.create(signpostText, {
    position: Vector3.create(-0.172, 1.6, -0.2),
    rotation: Quaternion.fromEulerDegrees(5, 90, 0),
    scale: Vector3.create(0.05, 0.05, 0.05),
    parent: signpost
  })
  TextShape.create(signpostText, {
    text: 'The extraordinary crater\n(NOT a tourist trap)',
    fontSize: 19,
    textColor: Color4.White(),
    width: 20,
    height: 10,
    textAlign: TextAlignMode.TAM_MIDDLE_CENTER
  })

  const signpost2 = engine.addEntity()
  GltfContainer.create(signpost2, {
    src: 'assets/scene/Models/Signpost.glb'
  })
  Transform.create(signpost2, {
    position: Vector3.create(6.01444149017334, 0, 15),
    rotation: Quaternion.create(-1.7015905116955343e-15, 0, -6.982296401520131e-16, 1),
    scale: Vector3.create(0.9999994039535522, 1, 0.9999994039535522),
    parent: scene
  })
  const signpost2Text = engine.addEntity()
  Transform.create(signpost2Text, {
    position: Vector3.create(-0.172, 1.6, -0.2),
    rotation: Quaternion.fromEulerDegrees(5, 90, 0),
    scale: Vector3.create(0.05, 0.05, 0.05),
    parent: signpost2
  })
  TextShape.create(signpost2Text, {
    text: 'The extraordinary crater\n(NOT a tourist trap)',
    fontSize: 19,
    textColor: Color4.White(),
    width: 20,
    height: 10,
    textAlign: TextAlignMode.TAM_MIDDLE_CENTER
  })

  const signpostRoot = engine.addEntity()
  GltfContainer.create(signpostRoot, {
    src: 'assets/scene/Models/Signpost_Root.glb'
  })
  Transform.create(signpostRoot, {
    position: Vector3.create(10.355362892150879, 0, 5),
    rotation: Quaternion.create(-6.65064594497863e-16, -0.4713967442512512, 5.6194867426029305e-8, 0.8819212913513184),
    parent: scene
  })
  const signpostRootText = engine.addEntity()
  Transform.create(signpostRootText, {
    position: Vector3.create(-0.1, 1.3, 0.3),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    scale: Vector3.create(0.05, 0.05, 0.05),
    parent: signpostRoot
  })
  TextShape.create(signpostRootText, {
    text: "Isn't nature incredible?\nJust look at that!\nJust Wow!",
    fontSize: 20,
    textColor: Color4.White(),
    width: 20,
    height: 10,
    textAlign: TextAlignMode.TAM_MIDDLE_CENTER
  })

  const signpostRoot2 = engine.addEntity()
  GltfContainer.create(signpostRoot2, {
    src: 'assets/scene/Models/Signpost_Root.glb'
  })
  Transform.create(signpostRoot2, {
    position: Vector3.create(12.355362892150879, 0, 6),
    rotation: Quaternion.create(-1.10062582369541e-15, -0.6343932747840881, 7.562556447737734e-8, 0.7730104327201843),
    scale: Vector3.create(1.4099667072296143, 1.409968376159668, 1.4099667072296143),
    parent: scene
  })
  const signpostRoot2Text = engine.addEntity()
  Transform.create(signpostRoot2Text, {
    position: Vector3.create(-0.1, 1.3, 0.3),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    scale: Vector3.create(0.05, 0.05, 0.05),
    parent: signpostRoot2
  })
  TextShape.create(signpostRoot2Text, {
    text: 'Take a selfie,\nShare it with your friends,\nyour family, pets\nTell them all to come!',
    fontSize: 20,
    textColor: Color4.White(),
    width: 20,
    height: 10,
    textAlign: TextAlignMode.TAM_MIDDLE_CENTER
  })

  const signpostWood = engine.addEntity()
  GltfContainer.create(signpostWood, {
    src: 'assets/scene/Models/SignPost_wood.glb'
  })
  Transform.create(signpostWood, {
    position: Vector3.create(10.855362892150879, 0, 9.5),
    rotation: Quaternion.create(-1.5513695361373393e-15, -0.7997391223907471, 9.53363255007389e-8, 0.600347638130188),
    scale: Vector3.create(0.9999958276748657, 1, 0.9999958276748657),
    parent: scene
  })
  const signpostWoodText = engine.addEntity()
  Transform.create(signpostWoodText, {
    position: Vector3.create(0, 1, 0.33),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    scale: Vector3.create(0.05, 0.05, 0.05),
    parent: signpostWood
  })
  TextShape.create(signpostWoodText, {
    text: 'Pictures of crater \n50 USD\n',
    fontSize: 20,
    textColor: Color4.White(),
    width: 20,
    height: 10,
    textAlign: TextAlignMode.TAM_MIDDLE_CENTER
  })

  const signpostGolden = engine.addEntity()
  GltfContainer.create(signpostGolden, {
    src: 'assets/scene/Models/Signpost_Golden.glb'
  })
  Transform.create(signpostGolden, {
    position: Vector3.create(13, 0, 10.5),
    rotation: Quaternion.create(3.2226755494740985e-15, -0.8135725855827332, 9.698539571445508e-8, 0.5814635157585144),
    scale: Vector3.create(1.0000009536743164, 1, 1.0000009536743164),
    parent: scene
  })
  const signpostGoldenText = engine.addEntity()
  Transform.create(signpostGoldenText, {
    position: Vector3.create(0, 2.08, 0.025),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    scale: Vector3.create(0.05, 0.05, 0.05),
    parent: signpostGolden
  })
  TextShape.create(signpostGoldenText, {
    text: 'Guided tours of the crater\nAsk in vistor center',
    fontSize: 20,
    textColor: Color4.White(),
    width: 20,
    height: 10,
    textAlign: TextAlignMode.TAM_MIDDLE_CENTER
  })

  const roundSignpost = engine.addEntity()
  GltfContainer.create(roundSignpost, {
    src: 'assets/scene/Models/SignPost_Circle.glb'
  })
  Transform.create(roundSignpost, {
    position: Vector3.create(4, 0, 3.5),
    rotation: Quaternion.create(
      5.415829561889168e-15,
      0.9999245405197144,
      -1.1920029407974653e-7,
      0.012292832136154175
    ),
    scale: Vector3.create(1.0000014305114746, 1, 1.0000014305114746),
    parent: scene
  })
  const roundSignpostText = engine.addEntity()
  Transform.create(roundSignpostText, {
    position: Vector3.create(0, 2.05, -0.03),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: Vector3.create(0.05, 0.05, 0.05),
    parent: roundSignpost
  })
  TextShape.create(roundSignpostText, {
    text: 'Park your \nbike here\n15 USD',
    fontSize: 20,
    textColor: Color4.Black(),
    outlineColor: Color4.Black(),
    outlineWidth: 0.3,
    width: 20,
    height: 10,
    textAlign: TextAlignMode.TAM_MIDDLE_CENTER
  })
}
