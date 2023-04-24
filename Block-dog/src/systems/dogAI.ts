import { engine, Entity, Animator, PointerEvents, Transform } from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { bowl } from '..'
import { CustomComponents, dogStates } from '../components'
import { onMoveFinish } from './moveSystem'

const CHANGE_VARIABILITY = 4

export function randomSwitchBehavior(dt: number) {
  for (const [entity] of engine.getEntitiesWith(CustomComponents.NPC)) {
    const npcData = CustomComponents.NPC.getMutable(entity)
    npcData.changeTimer -= dt
    if (npcData.changeTimer < 0) {
      const stateRandomizer = Math.random()

      if (stateRandomizer > 0.9 && npcData.state !== dogStates.Drinking) {
        changeState(entity, dogStates.GoDrink)
        npcData.changeTimer = 12 + (Math.random() - 0.5) * CHANGE_VARIABILITY
      } else if (stateRandomizer > 0.8) {
        changeState(entity, dogStates.Follow)
        npcData.changeTimer = 12 + (Math.random() - 0.5) * CHANGE_VARIABILITY
      } else if (stateRandomizer > 0.4) {
        changeState(entity, dogStates.Idle)
        npcData.changeTimer = 5 + (Math.random() - 0.5) * CHANGE_VARIABILITY
      } else {
        changeState(entity, dogStates.Sit)
        npcData.changeTimer = 5 + (Math.random() - 0.5) * CHANGE_VARIABILITY
      }
    }
  }
}

export function changeState(entity: Entity, newState: dogStates) {
  const npcDataMutable = CustomComponents.NPC.getMutable(entity)

  leaveState(entity, npcDataMutable.state)
  npcDataMutable.previousState = npcDataMutable.state
  npcDataMutable.state = newState

  enterState(entity, npcDataMutable.state)
}

export function enterState(entity: Entity, newState: dogStates) {
  const MutableTransform = Transform.getMutable(entity)

  switch (newState) {
    case dogStates.Idle:
      Animator.playSingleAnimation(entity, 'Idle')
      CustomComponents.MoveTransform.deleteFrom(entity)
      break

    case dogStates.Sit:
      Animator.playSingleAnimation(entity, 'Sitting')
      const MutablePointerEvent = PointerEvents.getMutable(entity).pointerEvents[0]
      if (MutablePointerEvent.eventInfo) {
        MutablePointerEvent.eventInfo.hoverText = 'Stand'
      }
      CustomComponents.MoveTransform.deleteFrom(entity)
      break

    case dogStates.Follow:
      Animator.playSingleAnimation(entity, 'Walking')

      const playerPos = Transform.get(engine.PlayerEntity).position
      if (isInBounds(playerPos)) {
        const floorLevelPlayerPos = Vector3.create(playerPos.x, 0, playerPos.z)

        MutableTransform.rotation = Quaternion.fromLookAt(MutableTransform.position, floorLevelPlayerPos)

        const playerToDogVector = Vector3.normalize(Vector3.subtract(MutableTransform.position, floorLevelPlayerPos))
        const finalPos = Vector3.add(floorLevelPlayerPos, playerToDogVector)

        CustomComponents.MoveTransform.createOrReplace(entity, {
          start: Transform.get(entity).position,
          end: finalPos,
          speed: 0.1,
          hasFinished: false,
          normalizedTime: 0,
          lerpTime: 0
        })
        onMoveFinish(entity, () => {
          changeState(entity, dogStates.Sit)
        })
      }
      break

    case dogStates.GoDrink:
      Animator.playSingleAnimation(entity, 'Walking')
      const bowlPosition = Transform.get(bowl).position
      const bowlToDogVector = Vector3.normalize(Vector3.subtract(MutableTransform.position, bowlPosition))
      const finalPos = Vector3.add(bowlPosition, bowlToDogVector)

      MutableTransform.rotation = Quaternion.fromLookAt(MutableTransform.position, bowlPosition)

      CustomComponents.MoveTransform.createOrReplace(entity, {
        start: Transform.get(entity).position,
        end: finalPos,
        speed: 0.1,
        hasFinished: false,
        normalizedTime: 0,
        lerpTime: 0
      })
      onMoveFinish(entity, () => {
        changeState(entity, dogStates.Drinking)
      })
      break

    case dogStates.Drinking:
      Animator.playSingleAnimation(entity, 'Drinking')
      CustomComponents.MoveTransform.deleteFrom(entity)
      break
  }
}

export function leaveState(entity: Entity, oldState: dogStates) {
  switch (oldState) {
    case dogStates.Idle:
      break

    case dogStates.Sit:
      const MutablePointerEvent = PointerEvents.getMutable(entity).pointerEvents[0]
      if (MutablePointerEvent.eventInfo) {
        MutablePointerEvent.eventInfo.hoverText = 'Sit'
      }
      break

    case dogStates.Follow:
      CustomComponents.MoveTransform.deleteFrom(entity)
      break

    case dogStates.GoDrink:
      CustomComponents.MoveTransform.deleteFrom(entity)
      break

    case dogStates.Drinking:
      break
  }
}

// check if the target is inside the scene's bounds
export function isInBounds(position: Vector3): boolean {
  return position.x > 0 && position.x < 16 && position.z > 0 && position.z < 16
}
