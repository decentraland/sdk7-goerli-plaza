// Coordinates of path to patrol

import { CustomComponents, dogStates } from './components'

const point1 = { x: 8, y: 0, z: 8 }
const point2 = { x: 8, y: 0, z: 24 }
// const point3 = { x: 24, y: 0, z: 24 }
// const point4 = { x: 24, y: 0, z: 8 }
// const pathArray = [point1, point2, point3, point4]
// const TURN_TIME = 0.9

export function createDog(): Entity {
  const dog = engine.addEntity()

  Transform.create(dog, {
    position: point1,
    scale: { x: 1, y: 1, z: 1 },
    rotation: { x: 0, y: 0, z: 0, w: 1 }
  })

  GltfContainer.create(dog, {
    src: 'models/BlockDog.glb'
  })

  Animator.create(dog, {
    states: [
      {
        name: 'Walking',
        clip: 'Walking',
        playing: false,
        weight: 1,
        speed: 1,
        loop: true,
        shouldReset: false
      },
      {
        name: 'Sitting',
        clip: 'Sitting',
        playing: false,
        weight: 1,
        speed: 1,
        loop: false,
        shouldReset: true
      },
      {
        name: 'Standing',
        clip: 'Standing',
        playing: false,
        weight: 1,
        speed: 1,
        loop: false,
        shouldReset: true
      },
      {
        name: 'Drinking',
        clip: 'Drinking',
        playing: false,
        weight: 1,
        speed: 1,
        loop: true,
        shouldReset: true
      },
      {
        name: 'Idle',
        clip: 'Idle',
        playing: false,
        weight: 1,
        speed: 1,
        loop: true,
        shouldReset: true
      }
    ]
  })

  CustomComponents.NPC.create(dog, { state: dogStates.Idle, previousState: dogStates.Idle })

  // const randomPathStart = Math.floor(Math.random() * 3)

  CustomComponents.MoveTransform.create(dog, {
    start: point1,
    end: point2,
    normalizedTime: 0,
    lerpTime: 0,
    speed: 0.1,
    hasFinished: false,
    interpolationType: 1
  })

  CustomComponents.TimeOut.create(dog, {
    timeLeft: 0.9,
    hasFinished: false,
    paused: false
  })

  PointerHoverFeedback.create(dog, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          button: InputAction.IA_PRIMARY,
          hoverText: 'Sit'
        }
      }
    ]
  })

  return dog
}
