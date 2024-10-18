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
  const screen = engine.getEntityOrNullByName("Video Player")
  const screen2 = engine.getEntityOrNullByName("screen2")

  if (screen && screen2) {

    // grab video from smart item
    const videoTexture = Material.Texture.Video({ videoPlayerEntity: screen })

    // apply same video to second screen
    Material.setPbrMaterial(screen2, {
      texture: videoTexture,
      emissiveTexture: videoTexture,
      emissiveIntensity: 1,
      roughness: 0,
      metallic: 0
    })

    pointerEventsSystem.onPointerDown(
      {
        entity: screen2,
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


// Other video links:
//'https://player.vimeo.com/external/878776484.m3u8?s=0b62be8cfb1d35f8bf30fcb33170a6f3a86620fe&logging=false'

//'https://player.vimeo.com/external/552481870.m3u8?s=c312c8533f97e808fccc92b0510b085c8122a875'
