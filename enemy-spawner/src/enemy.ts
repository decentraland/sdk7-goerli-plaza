import {
  Entity,
  engine,
  Transform,
  GltfContainer,
  AudioSource,
  PointerEvents,
  PointerEventType,
  InputAction,
  ColliderLayer
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { EnemyShip, Expire, MoveTransformComponent, ShipShapes } from './components/customComponents'
import { InterpolationType } from './helper/interpolation'

// Configuration
const TRAVEL_DISTANCE = 28
const SPEED = 1.3
const MAX_TRAVEL_SPEED_OFFSET = 0.2

export function spawnEnemy(shape: ShipShapes, x: number, y: number, z: number): Entity {
  const enemy = engine.addEntity()

  Transform.create(enemy, {
    position: Vector3.create(x, y, z)
  })

  GltfContainer.create(enemy, {
    src: shape
  })

  MoveTransformComponent.create(enemy, {
    start: { x: x, y: y, z: z },
    end: { x: x, y: y, z: z - TRAVEL_DISTANCE },
    speed: SPEED / 10 + Math.random() * (MAX_TRAVEL_SPEED_OFFSET / 10),
    normalizedTime: 0,
    lerpTime: 0,
    hasFinished: false,
    interpolationType: InterpolationType.EASEINSINE
  })

  PointerEvents.create(enemy, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          button: InputAction.IA_POINTER,
          showFeedback: false
        }
      }
    ]
  })

  EnemyShip.create(enemy)
  return enemy
}

export function destroyEnemy(entity: Entity) {
  MoveTransformComponent.deleteFrom(entity)
  EnemyShip.deleteFrom(entity)
  GltfContainer.createOrReplace(entity, {
    src: 'models/glowingSpaceship.glb'
  })
  AudioSource.create(entity, {
    audioClipUrl: 'sounds/explosion.mp3',
    playing: true,
    volume: 2
  })

  Expire.create(entity, {
    timeLeft: 1
  })
}
