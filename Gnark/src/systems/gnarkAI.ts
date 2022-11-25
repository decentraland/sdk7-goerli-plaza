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
      const walkAnim = animator.states.find((anim) => {
        return anim.name === 'walk'
      })
      if (!walkAnim) return
      walkAnim.playing = true

      const move = MoveTransformComponent.get(entity)
      if (move.hasFinished) {
        nextSegment(entity)
      }
      break
    case gnarkStates.TURNING:
      nextSegment(entity)
      const turnAnim = animator.states.find((anim) => {
        return anim.name === 'turnRight'
      })
      if (!turnAnim) return
      turnAnim.playing = true

      const timer = TimeOutComponent.getMutable(entity)
      // if(timer.hasFinished){
      timer.timeLeft = 0.9
      timer.hasFinished = false
      // }

      break
    case gnarkStates.YELLING:
      const raiseDeadAnim = animator.states.find((anim) => {
        return anim.name === 'raiseDead'
      })
      if (!raiseDeadAnim) return
      raiseDeadAnim.playing = true
      break
  }
}

export function leaveState(entity: Entity, oldState: gnarkStates) {
  const animator = Animator.getMutable(entity)
  switch (oldState) {
    case gnarkStates.WALKING:
      // TODO use Animator.Play
      const walkAnim = animator.states.find((anim) => {
        return anim.name === 'walk'
      })
      if (!walkAnim) return
      walkAnim.playing = false

      break
    case gnarkStates.TURNING:
      const turnAnim = animator.states.find((anim) => {
        return anim.name === 'turnRight'
      })
      if (!turnAnim) return
      turnAnim.playing = false

      break
    case gnarkStates.YELLING:
      const raiseDeadAnim = animator.states.find((anim) => {
        return anim.name === 'raiseDead'
      })
      if (!raiseDeadAnim) return
      raiseDeadAnim.playing = false
      break
  }
}

export function turn(gnark: Entity) {
  const path = PathDataComponent.getMutable(gnark)
  const difference = Vector3.subtract(path.path[path.target], path.path[path.origin])
  const normalizedDifference = Vector3.normalize(difference)

  Transform.getMutable(gnark).rotation = Quaternion.lookRotation(normalizedDifference)
}

export function nextSegment(gnark: Entity) {
  const path = PathDataComponent.getMutable(gnark)
  path.origin += 1
  path.target += 1
  if (path.target >= path.path.length) {
    path.target = 0
  } else if (path.origin >= path.path.length) {
    path.origin = 0
  }

  const move = MoveTransformComponent.getMutable(gnark)

  ;(move.start = path.path[path.origin]), (move.end = path.path[path.target]), (move.normalizedTime = 0)
  move.lerpTime = 0
  move.speed = 0.1
  move.hasFinished = false

  turn(gnark)
}
