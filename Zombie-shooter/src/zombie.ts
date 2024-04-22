import { GameControllerComponent } from './components/gameController'
import { MoveTransformComponent } from './components/moveTransport'

import { onMoveZombieFinish } from './systems/moveZombie'

import { playSound } from './systems/sound'
import {
  Entity,
  engine,
  Transform,
  GltfContainer,
  Animator,
  pointerEventsSystem,
  InputAction,
  MeshCollider,
  AvatarAttach,
  AvatarAnchorPointType,
  PointerEvents,
  PointerEventType,
  AudioSource
} from '@dcl/sdk/ecs'
import { ZombieComponent } from './components/zombie'
import { WallState } from './components/wallState'
import { breakWall, damageWall } from './walls'

export function createZombie(xPos: number): Entity {
  const zombie = engine.addEntity()

  ZombieComponent.create(zombie)


  Transform.create(zombie, {
    position: { x: xPos, y: 1, z: 3 }
  })

  GltfContainer.create(zombie, {
    src: 'models/zombie.glb'
  })

  MoveTransformComponent.create(zombie, {
    start: { x: xPos, y: 1, z: 3 },
    end: { x: xPos, y: 1, z: 12 },
    duration: 6,
    normalizedTime: 0,
    lerpTime: 0,
    speed: 0.08,
    hasFinished: false,
    interpolationType: 1
  })

  MeshCollider.setBox(zombie)

  Animator.create(zombie, {
    states: [
      {
        clip: 'Walking',
        loop: true,
        playing: true
      },
      {
        clip: 'Attacking',
        loop: true,
        playing: false
      }
    ]
  })

  AudioSource.create(zombie)

  PointerEvents.create(zombie, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          button: InputAction.IA_POINTER,
          hoverText: 'Shoot',
          maxDistance: 20
        }
      }
    ]
  })


  onMoveZombieFinish(zombie, () => {
    console.log('finished zombie', zombie)

    const animator = Animator.getMutable(zombie)
    const walkAnim = Animator.getClip(zombie, 'Walking')
    const attackAnim = Animator.getClip(zombie, 'Attacking')
    if (walkAnim && attackAnim) {
      walkAnim.playing = false
      walkAnim.loop = false
      attackAnim.playing = true
      attackAnim.loop = true
    }

    ZombieComponent.getMutable(zombie).rechedEnd = true


  })

  return zombie
}

const dummySoundPlayer = engine.addEntity()
AvatarAttach.create(dummySoundPlayer)
