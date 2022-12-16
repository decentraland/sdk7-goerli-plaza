import { Transform, Entity, engine, Animator } from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { MoveTransformComponent } from '../components/moveTransport'
import { gnarkStates, NPComponent } from '../components/NPC'
import { PathDataComponent } from '../components/pathData'
import { TimeOutComponent } from '../components/timeOut'
import { Interpolate } from '../helper/interpolation'

export function distanceSystem() {
  const playerTransform = Transform.getOrNull(1 as Entity)

  if (playerTransform) {
    for (const [entity, transform] of engine.getEntitiesWith(Transform, NPComponent)) {
      const npcData = NPComponent.getMutable(entity)
      const dist = getDistance(playerTransform.position, transform.position)

      if (dist < 5 && npcData.state !== gnarkStates.YELLING) {
        changeState(entity, gnarkStates.YELLING)
      } else if (dist > 5 && npcData.state === gnarkStates.YELLING) {
        previousState(entity)
      }
    }
  }
}

function getDistance(playerPos: Vector3.ReadonlyVector3, NPCPos: Vector3.ReadonlyVector3) {
  const gap = Vector3.subtract(playerPos, NPCPos)

  return Vector3.length(gap)
}

export function walkAround(dt: number) {
  for (const [entity] of engine.getEntitiesWith(NPComponent)) {
    const npcData = NPComponent.getMutable(entity)

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
  const npcDataMutable = NPComponent.getMutable(entity)

  leaveState(entity, npcDataMutable.state)
  npcDataMutable.previousState = npcDataMutable.state
  npcDataMutable.state = newState

  enterState(entity, npcDataMutable.state)
}

export function previousState(entity: Entity) {
  const npcDataMutable = NPComponent.getMutable(entity)

  leaveState(entity, npcDataMutable.state)
  npcDataMutable.state = npcDataMutable.previousState

  enterState(entity, npcDataMutable.state)
}

export function enterState(entity: Entity, newState: gnarkStates) {
  const animator = Animator.getMutable(entity)
  switch (newState) {
    case gnarkStates.WALKING:
      const walkAnim = Animator.getClip(entity, "walk")
      walkAnim.playing = true

      const move = MoveTransformComponent.get(entity)
      if (move.hasFinished) {
        nextSegment(entity)
      }
      break
    case gnarkStates.TURNING:
      nextSegment(entity)
      const turnAnim = Animator.getClip(entity, "turnRight")
      turnAnim.playing = true

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
      const raiseDeadAnim = Animator.getClip(entity, "raiseDead")
      raiseDeadAnim.playing = true
      break
  }
}

export function leaveState(entity: Entity, oldState: gnarkStates) {
  const animator = Animator.getMutable(entity)
  switch (oldState) {
    case gnarkStates.WALKING:
      // TODO use Animator.Play
      const walkAnim = Animator.getClip(entity, "walk")
      if (!walkAnim.playing) return
      walkAnim.playing = false

      break
    case gnarkStates.TURNING:
      const turnAnim = Animator.getClip(entity, "turnRight")
      if (!turnAnim.playing) return
      turnAnim.playing = false

      break
    case gnarkStates.YELLING:
      const raiseDeadAnim = Animator.getClip(entity, "raiseDead")
      if (!raiseDeadAnim.playing) return
      raiseDeadAnim.playing = false
	  const path= PathDataComponent.get(entity)
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
