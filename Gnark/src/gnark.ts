// Coordinates of path to patrol
import { Animator, engine, Entity, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Quaternion } from '@dcl/sdk/math'

const point1 = { x: 8, y: 0, z: 8 }
const point2 = { x: 8, y: 0, z: 24 }
const point3 = { x: 24, y: 0, z: 24 }
const point4 = { x: 24, y: 0, z: 8 }
const pathArray = [point1, point2, point3, point4]

// const TURN_TIME = 0.9

import { MoveTransformComponent } from './components/moveTransport'
import { gnarkStates, NPCData } from './components/NPC'
import { PathDataComponent } from './components/pathData'
import { TimeOutComponent } from './components/timeOut'
import { changeState, turn } from './systems/gnarkAI'

export function createGnark(startingSegment: number = 1): Entity {
  const gnark = engine.addEntity()

  let target = startingSegment + 1
  if (target >= pathArray.length) {
    target = 0
  }

  Transform.create(gnark, {
    position: point1,
    rotation: Quaternion.fromLookAt(point1, pathArray[target])
  })

  GltfContainer.create(gnark, {
    src: 'assets/scene/Models/gnark.glb'
  })

  Animator.create(gnark, {
    states: [
      {
        clip: 'walk',
        playing: true,
        loop: true,
        shouldReset: false
      },
      {
        clip: 'turnRight',
        playing: false,
        loop: false,
        shouldReset: true
      },
      {
        clip: 'raiseDead',
        playing: false,
        loop: true,
        shouldReset: true
      }
    ]
  })

  NPCData.create(gnark, {
    state: gnarkStates.WALKING,
    previousState: gnarkStates.WALKING
  })

  PathDataComponent.create(gnark, {
    path: pathArray,
    paused: false,
    origin: startingSegment,
    target: target
  })

  MoveTransformComponent.create(gnark, {
    start: pathArray[startingSegment],
    end: pathArray[target],
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

  // changeState(gnark, gnarkStates.TURNING)

  return gnark
}
