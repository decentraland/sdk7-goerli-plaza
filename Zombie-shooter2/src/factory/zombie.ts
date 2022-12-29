import {
  Entity,
  engine,
  Transform,
  GltfContainer,
  MeshRenderer,
  Animator,
  PointerHoverFeedback,
  PointerEventType,
  InputAction
} from '@dcl/sdk/ecs'
import { MoveTransformComponent } from '../components/moveTransport'
import { ZombieComponent } from '../components/zombie'

export function createZombie(xPos: number): Entity {
  const zombie = engine.addEntity()

  ZombieComponent.create(zombie)

  Transform.create(zombie, {
    position: { x: xPos, y: 1, z: 3 }
  })

  const zombieGltf = true

  if (zombieGltf) {
    GltfContainer.create(zombie, {
      src: 'models/zombie.glb'
    })
  } else {
    MeshRenderer.setBox(zombie)
  }

  MoveTransformComponent.create(zombie, {
    start: { x: xPos, y: 1, z: 3 },
    end: { x: xPos, y: 1, z: 12 },
    duration: 6,
    normalizedTime: 0,
    lerpTime: 0,
    speed: 0.04,
    interpolationType: 1
  })

  Animator.create(zombie, {
    states: [
      {
        clip: 'Walking',
        loop: true,
        name: 'Walk',
        playing: true
      },
      {
        clip: 'Attacking',
        loop: true,
        name: 'Attack',
        playing: false
      }
    ]
  })

  PointerHoverFeedback.create(zombie, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          button: InputAction.IA_PRIMARY,
          hoverText: 'Shoot'
        }
      }
    ]
  })

  return zombie
}
