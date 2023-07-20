import {
  Entity,
  engine,
  PointerEvents,
  InputAction,
  PointerEventType,
  inputSystem,
  AudioSource,
  AvatarAttach,
  AvatarAnchorPointType
} from '@dcl/sdk/ecs'
import { EnemyShip } from '../components/customComponents'
import { destroyEnemy } from '../enemy'

export function clickedSystem() {
  if (inputSystem.getInputCommand(InputAction.IA_POINTER, PointerEventType.PET_DOWN)) {
    const blasterSound = AudioSource.getMutable(soundPlayer)
    blasterSound.playing = true

    for (const [entity] of engine.getEntitiesWith(EnemyShip)) {
      if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN, entity)) {
        destroyEnemy(entity)
        console.log('HIT ENEMY')
      }
    }
  }
}

const soundPlayer = engine.addEntity()
AudioSource.create(soundPlayer, {
  audioClipUrl: 'sounds/blaster.mp3',
  playing: false,
  loop: false,
  volume: 0.5
})

AvatarAttach.create(soundPlayer, {
  anchorPointId: AvatarAnchorPointType.AAPT_POSITION
})
