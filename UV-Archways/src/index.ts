import { Material, PBMaterial_PbrMaterial, PointerLock, Transform, VideoPlayer, engine, executeTask } from "@dcl/sdk/ecs";
import { creathArches } from "./arches";
import { setupUi } from "./ui";
import { Color3 } from "@dcl/sdk/math";

export const _scene = engine.addEntity()
Transform.create(_scene)

export function main() {

  setupUi()

  const myVideoClip = VideoPlayer.create(_scene, { src: "videos/TunnelVideoTemplate2.mp4", playing: true, loop: true })

  //Video meta information
  const myVideoTexture = Material.Texture.Video({ videoPlayerEntity: _scene })
  const videoMat: PBMaterial_PbrMaterial = {
    texture: myVideoTexture,
    roughness: 1,
    emissiveIntensity: 4,
    alphaTexture: myVideoTexture,
    emissiveTexture: myVideoTexture,
    emissiveColor: Color3.White(),
    specularIntensity: 1,
    transparencyMode: 2
  }

  const ARCH_NUMBER = 28 //How many arches to make
  const ARCH_SPACING = 8 //How much space between them

  const arches = creathArches({
    parent: _scene,
    myVideoTexture: myVideoClip,
    archSpacing: ARCH_SPACING,
    archQty: ARCH_NUMBER,
    material: videoMat
  })

  console.log("arches", arches)

}
