import { Material, VideoPlayer, engine } from "@dcl/sdk/ecs";

export const videoParent = engine.addEntity()

export const video = VideoPlayer.create(videoParent, {
    src: 'textures/cc_video.mp4',
    playing: false
})

const videoTexture = Material.Texture.Video({ videoPlayerEntity: videoParent })

export let uvMat =  {
    texture: videoTexture,
    roughness: 1.0,
    specularIntensity: 0,
    metallic: 0,
}