import { Billboard, BillboardMode, engine, GltfContainer, TextShape, Transform } from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'

export function setUpScene() {
  //MainBase
  const FloorBaseDirt = engine.addEntity()
  const sign = engine.addEntity()
  const signText = engine.addEntity()
  GltfContainer.create(FloorBaseDirt, { src: 'assets/scene/models/FloorBaseDirt_01.glb' })
  GltfContainer.create(sign, { src: 'assets/scene/models/SignPost_wood.glb' })
  Transform.createOrReplace(FloorBaseDirt, {
    position: Vector3.create(8, 0, 8),
    scale: Vector3.create(1, 1, 1),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0)
  })
  Transform.createOrReplace(sign, {
    position: Vector3.create(8, 0, 8),
    scale: Vector3.create(4, 4, 4)
  })

  const text = 'Free Wearables \n HERE!'
  TextShape.create(signText, {
    text: text,
    textColor: Color4.White(),
    fontSize: 4
  })
  Transform.create(signText, {
    position: Vector3.create(8, 3.8, 9.3),
    scale: Vector3.create(1, 1, 1),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0)
  })
}
