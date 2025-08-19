import { Animator, AudioSource, engine } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'
import { getPlayer } from '@dcl/sdk/src/players'
import { doorSystem } from './systems'
import { DoorState } from './components'
import { setupUi } from './ui'

// Defining behavior. See `src/systems.ts` file.
engine.addSystem(doorSystem)

var SCANNING: boolean = false

export function main() {
  // fetch door
  const door = engine.getEntityOrNullByName('Door_Fantasy.glb')
  if (door) {
    DoorState.create(door)
    Animator.create(door, {
      states: [
        { clip: 'Open', loop: false, shouldReset: false },
        { clip: 'Close', loop: false, shouldReset: false }
      ]
    })
  }

  const scanner = engine.getEntityOrNullByName('Wearable-Reader.glb')
  if (scanner && door) {
    Animator.create(scanner, {
      states: [
        { clip: 'Laser_Action', loop: false, shouldReset: true },
        { clip: 'Allow_Action', loop: false, shouldReset: true },
        { clip: 'NotAllow_Action', loop: false, shouldReset: true }
      ]
    })
    Animator.playSingleAnimation(scanner, 'NotAllow_Action', true)

    utils.triggers.addTrigger(
      scanner,
      1,
      1,
      [{ type: 'box', scale: Vector3.create(2, 4, 3), position: Vector3.create(0, 0, 1) }],
      () => {
        if (SCANNING) return
        SCANNING = true
        Animator.playSingleAnimation(scanner, 'Laser_Action', true)
        AudioSource.createOrReplace(scanner, {
          audioClipUrl: 'assets/scene/Audio/LaserHum.mp3',
          playing: true,
          loop: false
        })
        // check wearables

        utils.timers.setTimeout(async () => {
          const accepted = await checkWearables('urn:decentraland:off-chain:base-avatars:thug_life')
          if (accepted) {
            Animator.playSingleAnimation(scanner, 'Allow_Action', true)
            AudioSource.createOrReplace(scanner, {
              audioClipUrl: 'assets/scene/Audio/accept.mp3',
              playing: true,
              loop: false
            })
            DoorState.getMutable(door).open = true
            DoorState.getMutable(door).dirty = true
          } else {
            Animator.playSingleAnimation(scanner, 'NotAllow_Action', true)
            AudioSource.createOrReplace(scanner, {
              audioClipUrl: 'assets/scene/Audio/access_denied.mp3',
              playing: true,
              loop: false
            })
          }

          SCANNING = false
        }, 4000)
      }
    )
  }

  //utils.triggers.enableDebugDraw(true)

  // UI with GitHub link
  setupUi()
}

export async function checkWearables(filter: string) {
  const playerData = getPlayer()

  if (!playerData || !playerData.wearables) return false

  console.log('Currently wearing: ', playerData.wearables)
  let result = false
  for (const wearable of playerData.wearables) {
    if (wearable === filter) {
      result = true
    }
  }

  console.log('HAS WEARABLE? ', result)
  return result
}
