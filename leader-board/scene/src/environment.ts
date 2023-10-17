import { engine, GltfContainer, TextAlignMode, TextShape, Transform } from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'

export function buildScene() {
  const scene = engine.addEntity()
  Transform.create(scene, {
    position: Vector3.Zero()
  })

  const floor = engine.addEntity()
  GltfContainer.create(floor, {
    src: 'models/FloorBaseGrass_01/FloorBaseGrass_01.glb'
  })
  Transform.create(floor, {
    position: Vector3.create(8, 0, 8),
    parent: scene
  })

  const classicBench = engine.addEntity()
  GltfContainer.create(classicBench, {
    src: 'models/Bench_01/Bench_01.glb'
  })
  Transform.create(classicBench, {
    position: Vector3.create(12.5, 0, 11.5),
    rotation: Quaternion.create(0, -0.2902846932411194, 3.4604628496026635e-8, 0.9569403529167175),
    parent: scene
  })

  const bluePinkMysticalMushroomTree = engine.addEntity()
  GltfContainer.create(bluePinkMysticalMushroomTree, {
    src: 'models/Tree_02/Tree_02.glb'
  })
  Transform.create(bluePinkMysticalMushroomTree, {
    position: Vector3.create(12.5, 0, 3.5),
    parent: scene
  })

  const ancientMediumStonePath = engine.addEntity()
  GltfContainer.create(ancientMediumStonePath, {
    src: 'models/RockFloor_Module_2M/RockFloor_Module_2M.glb'
  })
  Transform.create(ancientMediumStonePath, {
    position: Vector3.create(9, 0, 9),
    parent: scene
  })

  const ancientMediumStonePath2 = engine.addEntity()
  GltfContainer.create(ancientMediumStonePath2, {
    src: 'models/RockFloor_Module_2M/RockFloor_Module_2M.glb'
  })
  Transform.create(ancientMediumStonePath2, {
    position: Vector3.create(6, 0, 9),
    parent: scene
  })

  const ancientMediumStonePath3 = engine.addEntity()
  GltfContainer.create(ancientMediumStonePath3, {
    src: 'models/RockFloor_Module_2M/RockFloor_Module_2M.glb'
  })
  Transform.create(ancientMediumStonePath3, {
    position: Vector3.create(4, 0, 9),
    parent: scene
  })

  const shrub = engine.addEntity()
  GltfContainer.create(shrub, {
    src: 'models/Bush_01/Bush_01.glb'
  })
  Transform.create(shrub, {
    position: Vector3.create(4.5, 0, 3),
    parent: scene
  })

  const shrub2 = engine.addEntity()
  GltfContainer.create(shrub2, {
    src: 'models/Bush_01/Bush_01.glb'
  })
  Transform.create(shrub2, {
    position: Vector3.create(3.5, 0, 15),
    parent: scene
  })

  const balsamFlower = engine.addEntity()
  GltfContainer.create(balsamFlower, {
    src: 'models/Plant_02/Plant_02.glb'
  })
  Transform.create(balsamFlower, {
    position: Vector3.create(11.5, 0, 2.5),
    parent: scene
  })

  const sunflowerHead = engine.addEntity()
  GltfContainer.create(sunflowerHead, {
    src: 'models/Flower_01/Flower_01.glb'
  })
  Transform.create(sunflowerHead, {
    position: Vector3.create(1.5, 0, 14),
    parent: scene
  })

  const ballDroid = engine.addEntity()
  GltfContainer.create(ballDroid, {
    src: 'models/Droid_01/Droid_01.glb'
  })
  Transform.create(ballDroid, {
    position: Vector3.create(3.5, 2.4617645740509033, 10.160882949829102),
    rotation: Quaternion.create(-4.3225023034628926e-15, 0.4927974045276642, -5.87460284862118e-8, 0.8701441287994385),
    scale: Vector3.create(1.0000085830688477, 1, 1.0000085830688477),
    parent: scene
  })

  const signpostRoot = engine.addEntity()
  GltfContainer.create(signpostRoot, {
    src: 'models/Signpost_Root.glb'
  })
  Transform.create(signpostRoot, {
    position: Vector3.create(10, 0, 13),
    rotation: Quaternion.create(
      -1.0589019759773763e-14,
      -0.9652383923530579,
      1.1506537589411892e-7,
      0.2613711953163147
    ),
    scale: Vector3.create(1.0000317096710205, 1, 1.0000317096710205),
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
    text: 'How many times can you\nclick in 10 seconds?',
    fontSize: 24,
    textColor: Color4.White(),
    width: 20,
    height: 10,
    textAlign: TextAlignMode.TAM_MIDDLE_CENTER
  })

  const signpostTree = engine.addEntity()
  GltfContainer.create(signpostTree, {
    src: 'models/Sign_Arrow.glb'
  })
  Transform.create(signpostTree, {
    position: Vector3.create(5.163928985595703, 0.5730905532836914, 12.90584945678711),
    rotation: Quaternion.create(
      1.2258724139686383e-14,
      0.9999500513076782,
      -1.1920333520265558e-7,
      -0.010002732276916504
    ),
    scale: Vector3.create(1.0000059604644775, 1, 1.0000059604644775),
    parent: scene
  })
  const signpostTreeText = engine.addEntity()
  Transform.create(signpostTreeText, {
    position: Vector3.create(0.25, 0.4, 0.025),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    scale: Vector3.create(0.05, 0.05, 0.05),
    parent: signpostTree
  })
  TextShape.create(signpostTreeText, {
    text: 'Click the dog!',
    fontSize: 20,
    textColor: Color4.fromHexString('#8cfdff'),
    outlineColor: Color4.fromHexString('#8cfdff'),
    outlineWidth: 0.4,
    width: 20,
    height: 10,
    textAlign: TextAlignMode.TAM_MIDDLE_CENTER
  })

  const signpostTree2 = engine.addEntity()
  GltfContainer.create(signpostTree2, {
    src: 'models/Sign_Square.glb'
  })
  Transform.create(signpostTree2, {
    position: Vector3.create(7.5, 2.9045917987823486, 14.463543891906738),
    rotation: Quaternion.create(
      3.1957551483444624e-15,
      -0.9999372959136963,
      1.192018075357737e-7,
      0.011200233362615108
    ),
    scale: Vector3.create(1.0000020265579224, 1, 1.0000020265579224),
    parent: scene
  })
  const signpostTree2Text = engine.addEntity()
  Transform.create(signpostTree2Text, {
    position: Vector3.create(0, 0.55, 0.04),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    scale: Vector3.create(0.05, 0.05, 0.05),
    parent: signpostTree2
  })
  TextShape.create(signpostTree2Text, {
    text: "Who's a good boy?",
    fontSize: 30,
    textColor: Color4.fromHexString('#8cfdff'),
    outlineColor: Color4.fromHexString('#8cfdff'),
    outlineWidth: 0.4,
    width: 20,
    height: 10,
    textAlign: TextAlignMode.TAM_MIDDLE_CENTER
  })

  const indicatorArrow = engine.addEntity()
  GltfContainer.create(indicatorArrow, {
    src: 'models/Arrow.glb'
  })
  Transform.create(indicatorArrow, {
    position: Vector3.create(7, 2.9388692378997803, 13),
    parent: scene
  })
}
