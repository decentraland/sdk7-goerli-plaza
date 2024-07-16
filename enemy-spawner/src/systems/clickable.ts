import {
  Entity,
  engine,
  PointerEvents,
  InputAction,
  PointerEventType,
  inputSystem,
  AudioSource,
  AvatarAttach,
  AvatarAnchorPointType,
  Transform
} from '@dcl/sdk/ecs'
import { EnemyShip } from '../components/customComponents'
import { destroyEnemy } from '../enemy'

export function clickedSystem() {
  if (inputSystem.getInputCommand(InputAction.IA_POINTER, PointerEventType.PET_DOWN)) {
    AudioSource.createOrReplace(soundPlayer, {
      audioClipUrl: 'sounds/blaster.mp3',
      playing: true,
      loop: false,
      volume: 0.5,
      currentTime: 0.0 // reset the blaster sound if it's currently playing
    })

    for (const [entity] of engine.getEntitiesWith(EnemyShip)) {
      if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN, entity)) {
        destroyEnemy(entity)
        console.log('HIT ENEMY')
      }
    }
  }
}

const soundPlayer = engine.addEntity()

Transform.getOrCreateMutable(soundPlayer).parent = engine.PlayerEntity