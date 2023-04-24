// Coordinates of path to patrol
import { Animator, engine, Entity, GltfContainer, Transform } from '@dcl/sdk/ecs'
import {} from '@dcl/sdk/math'

const point1 = { x: 8, y: 0, z: 8 }
const point2 = { x: 8, y: 0, z: 24 }
const point3 = { x: 24, y: 0, z: 24 }
const point4 = { x: 24, y: 0, z: 8 }
const pathArray = [point1, point2, point3, point4]

// const TURN_TIME = 0.9

import { MoveTransformComponent } from './components/moveTransport'
import { gnarkStates, NPComponent } from './components/NPC'
import { PathDataComponent } from './components/pathData'
import { TimeOutComponent } from './components/timeOut'

export function createGnark(startingSegment: number = 1): Entity {
  const gnark = engine.addEntity()

  Transform.create(gnark, {
    position: point1
  })

  GltfContainer.create(gnark, {
    src: 'models/gnark.glb'
  })

  Animator.create(gnark, {
    states: [
      {
        name: 'walk',
        clip: 'walk',
        playing: true,
        weight: 1,
        speed: 1,
        loop: true,
        shouldReset: false
      },
      {
        name: 'turnRight',
        clip: 'turnRight',
        playing: false,
        weight: 1,
        speed: 1,
        loop: false,
        shouldReset: true
      },
      {
        name: 'raiseDead',
        clip: 'raiseDead',
        playing: false,
        weight: 1,
        speed: 1,
        loop: true,
        shouldReset: true
      }
    ]
  })

  NPComponent.create(gnark, {
    state: gnarkStates.TURNING,
    previousState: gnarkStates.WALKING
  })

  PathDataComponent.create(gnark, {
    path: pathArray,
    paused: false,
    origin: startingSegment,
    target: startingSegment + 1
  })

  MoveTransformComponent.create(gnark, {
    start: pathArray[startingSegment],
    end: pathArray[startingSegment + 1],
    normalizedTime: 0,
    lerpTime: 0,
    speed: 0.1,
    hasFinished: false,
    interpolationType: 0
  })

  TimeOutComponent.create(gnark, {
    timeLeft: 0.9,
    hasFinished: false,
    paused: false
  })

  return gnark
}
