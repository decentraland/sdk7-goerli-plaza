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
import { Quaternion } from '@dcl/sdk/math'
import { createGLTF } from './factory'
import { setupUi } from './ui'

export function main() {
  // Base
  createGLTF({ scale: { x: 2, y: 1, z: 2 } }, 'models/baseDarkWithCollider.glb')

  // Seating
  createGLTF({ position: { x: 16, y: 0.05, z: 10 } }, 'models/seats.glb')

  const screenBody = createGLTF({ position: { x: 16, y: 0.05, z: 16 } }, 'models/screen.glb')

  // Screen
  const screenDisplay = engine.addEntity()
  Transform.create(screenDisplay, {
    parent: screenBody,
    position: { x: 0, y: 6.15, z: 5 },
    scale: { x: 0.625, y: 0.625, z: 0.625 }
  })

  const screen = engine.addEntity()
  MeshRenderer.setPlane(screen)
  MeshCollider.setPlane(screen, ColliderLayer.CL_POINTER | ColliderLayer.CL_PHYSICS)
  Transform.create(screen, {
    parent: screenDisplay,
    scale: { x: 19.2, y: 10.8, z: 1 },
    rotation: Quaternion.fromEulerDegrees(0, 0, 0)
  })

  const screen2 = engine.addEntity()
  MeshRenderer.setPlane(screen2)
  MeshCollider.setPlane(screen2, ColliderLayer.CL_POINTER | ColliderLayer.CL_PHYSICS)
  Transform.create(screen2, {
    parent: screenDisplay,
    scale: { x: 3.84, y: 2.16, z: 1 },
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    position: { x: 8.0, y: -5.0, z: -0.1 }
  })
  VideoPlayer.create(screen, {
    src: 'https://player.vimeo.com/external/878776548.m3u8?s=e6e54ac3862fe71ac3ecbdb2abbfdd7ca7daafaf&logging=false',
    playing: true,
    volume: 1.0
  })

  // Other video links:
  //https://player.vimeo.com/external/878776484.m3u8?s=0b62be8cfb1d35f8bf30fcb33170a6f3a86620fe&logging=false
  //https://player.vimeo.com/external/552481870.m3u8?s=c312c8533f97e808fccc92b0510b085c8122a875

  const videoTexture = Material.Texture.Video({ videoPlayerEntity: screen })

  Material.setPbrMaterial(screen, {
    texture: videoTexture,
    emissiveTexture: videoTexture,
    emissiveIntensity: 0.6,
    roughness: 1.0
  })

  Material.setPbrMaterial(screen2, {
    texture: videoTexture,
    emissiveTexture: videoTexture,
    emissiveIntensity: 0.6,
    roughness: 1.0
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

  // UI with GitHub link
  setupUi()
}
