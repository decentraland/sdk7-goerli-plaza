import {
  engine,
  Transform,
  Schemas,
  Animator,
  GltfContainer,
  InputAction,
  pointerEventsSystem,
  AudioSource,
  Entity
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { showUI } from './denyUI'
import { hasWornPE, isWearingPE } from './peTracking'

export function addChest() {
  /**
   * Handle door states
   */

  const denySound = engine.addEntity()
  const openClip = engine.addEntity()
  const closeClip = engine.addEntity()

  // Create AudioSource component
  AudioSource.create(denySound, {
    audioClipUrl: 'sounds/navigationBackward.mp3',
    playing: false
  })

  AudioSource.create(openClip, {
    audioClipUrl: 'sounds/open.mp3',
    playing: false
  })
  AudioSource.create(closeClip, {
    audioClipUrl: 'sounds/close.mp3',
    playing: false
  })
  // Define a simple function
  function playSound(entity: Entity) {
    // fetch mutable version of audio source component
    const audioSource = AudioSource.getMutable(entity)

    // modify its playing value
    audioSource.playing = true
  }

  const chest = engine.addEntity()
  Transform.create(chest, {
    position: Vector3.create(6.5, 5, 7.5),
    scale: Vector3.create(1, 1, 1),
    rotation: Quaternion.create(0, 0, 0, 1)
  })
  GltfContainer.create(chest, {
    src: 'models/Chest_Pirates.glb'
  })
  Animator.create(chest, {
    states: [
      {
        name: 'Close',
        clip: 'close',
        playing: false,
        loop: false
      },
      {
        name: 'Open',
        clip: 'open',
        playing: false,
        loop: false,
        shouldReset: true
      }
    ]
  })

  pointerEventsSystem.onPointerDown(
    {
      entity: chest,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Open'
      }
    },
    () => {
      if (hasWornPE || isWearingPE) {
        showUI()
        playSound(denySound)
      } else {
        console.log('ALLOWED: no Portable Experience was detected')
        Animator.playSingleAnimation(chest, 'Open', true)
        playSound(openClip)
      }
    }
  )
}
