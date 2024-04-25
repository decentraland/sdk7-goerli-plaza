import { Transform, Entity, engine, Animator } from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { MoveTransformComponent } from '../components/moveTransport'
import { gnarkStates, NPCData } from '../components/NPC'
import { PathDataComponent } from '../components/pathData'
import { TimeOutComponent } from '../components/timeOut'
import { Interpolate } from '../helper/interpolation'

export function distanceSystem() {
  const playerTransform = Transform.getOrNull(engine.PlayerEntity)

  if (playerTransform) {
    for (const [entity, transform] of engine.getEntitiesWith(Transform, NPCData)) {
      const npcData = NPCData.getMutable(entity)
      const dist = getDistance(playerTransform.position, transform.position)

      if (dist < 5 && npcData.state !== gnarkStates.YELLING) {
        changeState(entity, gnarkStates.YELLING)
      } else if (dist > 5 && npcData.state === gnarkStates.YELLING) {
        changeState(entity, gnarkStates.WALKING)
      }
    }
  }
}

function getDistance(playerPos: Vector3.ReadonlyVector3, NPCPos: Vector3.ReadonlyVector3) {
  const gap = Vector3.subtract(playerPos, NPCPos)

  return Vector3.length(gap)
}

export function walkAround(dt: number) {
  for (const [entity] of engine.getEntitiesWith(NPCData, Transform, MoveTransformComponent)) {
    const npcData = NPCData.getMutable(entity)

    switch (npcData.state) {
      case gnarkStates.WALKING:
        const move = MoveTransformComponent.getMutable(entity)
        const transform = Transform.getMutable(entity)

        move.normalizedTime = Math.min(Math.max(move.normalizedTime + dt * move.speed, 0), 1)
        move.lerpTime = Interpolate(move.interpolationType, move.normalizedTime)

        // assign value to transform
        transform.position = Vector3.lerp(move.start, move.end, move.lerpTime)

        // has finished
        move.hasFinished = move.normalizedTime >= 1

        if (move.hasFinished) {
          changeState(entity, gnarkStates.TURNING)
        }
        break
      case gnarkStates.TURNING:
        const timer = TimeOutComponent.getMutable(entity)

        timer.timeLeft = timer.timeLeft - dt

        // has finished
        if (timer.timeLeft <= 0) {
          timer.hasFinished = true
          changeState(entity, gnarkStates.WALKING)
        }
        break
    }
  }
}

export function changeState(entity: Entity, newState: gnarkStates) {
  const npcDataMutable = NPCData.getMutable(entity)

  leaveState(entity, npcDataMutable.state)
  npcDataMutable.previousState = npcDataMutable.state
  npcDataMutable.state = newState

  enterState(entity, npcDataMutable.state)
}

export function previousState(entity: Entity) {
  const npcDataMutable = NPCData.getMutable(entity)

  leaveState(entity, npcDataMutable.state)
  npcDataMutable.state = npcDataMutable.previousState

  enterState(entity, npcDataMutable.state)
}

export function enterState(entity: Entity, newState: gnarkStates) {
  const animator = Animator.getMutable(entity)
  switch (newState) {
    case gnarkStates.WALKING:
      Animator.playSingleAnimation(entity, 'walk')

      const move = MoveTransformComponent.get(entity)
      if (move.hasFinished) {
        nextSegment(entity)
      }
      break
    case gnarkStates.TURNING:
      nextSegment(entity)
      Animator.playSingleAnimation(entity, 'turnRight', true)

      const timer = TimeOutComponent.getMutable(entity)
      // if(timer.hasFinished){
      timer.timeLeft = 0.9
      timer.hasFinished = false
      // }

      break
    case gnarkStates.YELLING:
      const transform = Transform.getMutable(entity)
      const playerPosition = Transform.get(engine.PlayerEntity)
      transform.rotation = Quaternion.fromLookAt(transform.position, playerPosition.position)
      Animator.playSingleAnimation(entity, 'raiseDead', true)

      break
  }
}

export function leaveState(entity: Entity, oldState: gnarkStates) {
  const animator = Animator.getMutable(entity)
  switch (oldState) {
    case gnarkStates.WALKING:
      Animator.stopAllAnimations(entity)
      break
    case gnarkStates.TURNING:
      Animator.stopAllAnimations(entity)
      break
    case gnarkStates.YELLING:
      Animator.stopAllAnimations(entity)
      const path = PathDataComponent.get(entity)
      turn(entity, path.path[path.target])
      break
  }
}

export function turn(entity: Entity, target: Vector3) {
  const transform = Transform.getMutable(entity)
  transform.rotation = Quaternion.fromLookAt(transform.position, target)
}

export function nextSegment(entity: Entity) {
  const path = PathDataComponent.getMutable(entity)
  path.origin += 1
  path.target += 1
  if (path.target >= path.path.length) {
    path.target = 0
  } else if (path.origin >= path.path.length) {
    path.origin = 0
  }

  const move = MoveTransformComponent.getMutable(entity)

  ;(move.start = path.path[path.origin]), (move.end = path.path[path.target]), (move.normalizedTime = 0)
  move.lerpTime = 0
  move.speed = 0.1
  move.hasFinished = false

  turn(entity, path.path[path.target])
}
