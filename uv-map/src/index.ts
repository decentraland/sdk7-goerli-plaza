import { engine, GltfContainer, Material, MeshRenderer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { Sprite } from './definitions'
import updateSpriteFrameSystem from './modules/spriteFrames'

export function main() {
  // // 3d model of robot
  const robot = engine.addEntity()
  GltfContainer.create(robot, { src: 'models/robotTalking.glb' })
  Transform.create(robot, { position: Vector3.create(8, 1.5, 8) })

  const robotFace = engine.addEntity()

  // // material for face
  Material.setPbrMaterial(robotFace, {
    texture: Material.Texture.Common({ src: 'images/robotTalking.png' }),
    specularIntensity: 0,
    metallic: 0,
    roughness: 1
  })
  // create plane to show the frames on
  MeshRenderer.setPlane(
    robotFace,
    Array.from({ length: 8 }, () => 0)
  )
  Transform.create(robotFace, {
    position: Vector3.create(8, 1.5, 8.005),
    scale: Vector3.create(0.4, 0.4, 0.4)
  })

  // parameters:  rows, columns, interval between frames
  Sprite.create(robotFace, {
    rows: 8,
    columns: 8,
    interval: 0.2
  })

  engine.addSystem(updateSpriteFrameSystem)
}
