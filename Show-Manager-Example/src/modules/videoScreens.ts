import { Entity, Material, MeshRenderer, PBMaterial_PbrMaterial, Transform, engine } from '@dcl/sdk/ecs'
import { Color3, Vector3 } from '@dcl/sdk/math'

/// Add video screens

export abstract class VideoScreens {
  static S1: Entity
  static S2: Entity

  static Initialise() {
    const videoMat: PBMaterial_PbrMaterial = {
      castShadows: false,
      metallic: 0,
      roughness: 1,
      emissiveIntensity: 1,
      emissiveColor: Color3.White(),
      alphaTest: 1
    }

    // S1
    VideoScreens.S1 = engine.addEntity()
    MeshRenderer.setPlane(
      VideoScreens.S1,
      [
        0.218, 0, 0.218, 1, 0.782, 1, 0.782, 0,

        0.218, 0, 0.218, 1, 0.782, 1, 0.782, 0
      ]
    )
    Transform.create(VideoScreens.S1, {
      position: Vector3.create(8, 2.766, 5.2),
      scale: Vector3.create(8.32, 8.32, 1)
    })
    Material.setPbrMaterial(VideoScreens.S1, videoMat)

    // S2
    VideoScreens.S2 = engine.addEntity()
    MeshRenderer.setPlane(
      VideoScreens.S2,
      [
        0.218, 0, 0.218, 1, 0.782, 1, 0.782, 0,

        0.218, 0, 0.218, 1, 0.782, 1, 0.782, 0
      ]
    )
    Transform.create(VideoScreens.S2, {
      position: Vector3.create(8, 2.7, 1.72),
      scale: Vector3.create(5.6, 5.6, 1)
    })
    Material.setPbrMaterial(VideoScreens.S2, videoMat)
  }
}
