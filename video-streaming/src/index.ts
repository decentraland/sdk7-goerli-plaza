import {
  ColliderLayer,
  engine,
  InputAction,
  Material,
  MeshCollider,
  MeshRenderer,
  pointerEventsSystem,
  Transform,
  VideoPlayer
} from '@dcl/sdk/ecs'
import { } from '@dcl/sdk/math'
import { setupUi } from './ui'

export function main() {

  // fetch screens from editor
  const screen = engine.getEntityOrNullByName("screen")
  const screen2 = engine.getEntityOrNullByName("screen2")

  if (screen && screen2) {


    VideoPlayer.create(screen, {
      src: 'https://player.vimeo.com/external/552481870.m3u8?s=c312c8533f97e808fccc92b0510b085c8122a875',// 'https://player.vimeo.com/external/878776548.m3u8?s=e6e54ac3862fe71ac3ecbdb2abbfdd7ca7daafaf&logging=false',
      playing: true,
      volume: 1.0
    })

    // Other video links:
    //'https://player.vimeo.com/external/878776484.m3u8?s=0b62be8cfb1d35f8bf30fcb33170a6f3a86620fe&logging=false'
    //'https://player.vimeo.com/external/552481870.m3u8?s=c312c8533f97e808fccc92b0510b085c8122a875'

    const videoTexture = Material.Texture.Video({ videoPlayerEntity: screen })

    Material.setPbrMaterial(screen, {
      texture: videoTexture,
      emissiveTexture: videoTexture,
      emissiveIntensity: 1,
      roughness: 0,
      metallic: 0
    })

    Material.setPbrMaterial(screen2, {
      texture: videoTexture,
      emissiveTexture: videoTexture,
      emissiveIntensity: 1,
      roughness: 0,
      metallic: 0
    })

    pointerEventsSystem.onPointerDown(
      {
        entity: screen,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Play/pause'
        }
      },
      () => {
        const videoPlayer = VideoPlayer.getMutable(screen)
        videoPlayer.playing = !videoPlayer.playing
      }
    )
  }

  // UI with GitHub link
  setupUi()
}
