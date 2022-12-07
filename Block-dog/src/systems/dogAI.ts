import { engine, Entity, Animator, PointerHoverFeedback, Transform } from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { bowl } from '..'
import { CustomComponents, dogStates } from '../components'

// export function dogBehavior() {
//   for (const [entity] of engine.getEntitiesWith(CustomComponents.NPC)) {
//     const npcData = CustomComponents.NPC.getMutable(entity)

    // switch (npcData.state) {
    //   case dogStates.Idle:
	// 	Animator.playSingleAnimation(entity, "Idle")
    //     break

    //   case dogStates.Sit:
	// 	Animator.playSingleAnimation(entity, "Sit")
    //     break

    //   case dogStates.Follow:
	// 	Animator.playSingleAnimation(entity, "Walk")
    //     break

    //   case dogStates.GoDrink:
	// 	Animator.playSingleAnimation(entity, "Walk")
    //     break

    //   case dogStates.Drinking:
	// 	Animator.playSingleAnimation(entity, "Drinking")
    //     break

      // 	const move = MoveTransform.getMutable(entity)
      // 	const transform = Transform.getMutable(entity)

      // 	move.normalizedTime = Math.min(Math.max(move.normalizedTime + dt * move.speed, 0), 1)
      // 	move.lerpTime = Interpolate(move.interpolationType, move.normalizedTime)

      // 	// assign value to transform
      // 	transform.position = Vector3.lerp(move.start, move.end, move.lerpTime)

      // 	// has finished
      // 	move.hasFinished = move.normalizedTime >= 1

      // 	if (move.hasFinished) {
      // 		changeState(entity, dogStates.TURNING)
      // 	}
      // break
      // case dogStates.TURNING:

      // 	const timer = TimeOut.getMutable(entity)

      // 	timer.timeLeft = timer.timeLeft - dt

      // 	// has finished
      // 	timer.hasFinished = timer.timeLeft >= 0

      // 	if (timer.hasFinished) {
      // 		changeState(entity, dogStates.WALKING)
      // 	}
      // break
    //}
//   }
// }

export function changeState(entity: Entity, newState: dogStates) {
  const npcDataMutable = CustomComponents.NPC.getMutable(entity)

  leaveState(entity, npcDataMutable.state)
  npcDataMutable.previousState = npcDataMutable.state
  npcDataMutable.state = newState

  enterState(entity, npcDataMutable.state)
}

// export function previousState(entity:Entity){

// 	const npcDataMutable = NPC.getMutable(entity)

// 	leaveState(entity, npcDataMutable.state)
// 	npcDataMutable.state = npcDataMutable.previousState

// 	enterState(entity, npcDataMutable.state)

// }

export function enterState(entity: Entity, newState: dogStates) {
  const MutableTransform = Transform.getMutable(entity)

	switch (newState) {
    case dogStates.Idle:
		Animator.playSingleAnimation(entity, "Idle")
		CustomComponents.MoveTransform.deleteFrom(entity)
      break

    case dogStates.Sit:
	  Animator.playSingleAnimation(entity, "Sitting")
      const MutablePointerEvent = PointerHoverFeedback.getMutable(entity).pointerEvents[0]
      if (MutablePointerEvent.eventInfo) {
        MutablePointerEvent.eventInfo.hoverText = 'Stand'
      }
	  CustomComponents.MoveTransform.deleteFrom(entity)
      break

    case dogStates.Follow:
	  Animator.playSingleAnimation(entity, "Walking")
	  
	  
	  const playerPos = Transform.get(engine.PlayerEntity).position
	  if(isInBounds(playerPos)){
		MutableTransform.rotation = Quaternion.fromToRotation(MutableTransform.position, playerPos )
		CustomComponents.MoveTransform.createOrReplace(entity, {
			start: Transform.get(entity).position,
			end: playerPos,
			speed: 0.05,
			hasFinished: false,
			normalizedTime: 0,
			lerpTime: 0
		})
	  }
      break

    case dogStates.GoDrink:
	  Animator.playSingleAnimation(entity, "Walking")
	  const bowlPosition = Transform.get(bowl).position
	  MutableTransform.rotation = Quaternion.fromToRotation(MutableTransform.position, bowlPosition )

	  CustomComponents.MoveTransform.createOrReplace(entity, {
		start: Transform.get(entity).position,
		end: bowlPosition,
		speed: 0.05,
		hasFinished: false,
		normalizedTime: 0,
		lerpTime: 0
	})
      break

    case dogStates.Drinking:
	  Animator.playSingleAnimation(entity, "Drinking")
	  CustomComponents.MoveTransform.deleteFrom(entity)
      break
  }
}

export function leaveState(entity: Entity, oldState: dogStates) {
  switch (oldState) {
    case dogStates.Idle:
      
      break

    case dogStates.Sit:
      const MutablePointerEvent = PointerHoverFeedback.getMutable(entity).pointerEvents[0]
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
  return position.x > 0.5 && position.x < 9.5 && position.z > 0.5 && position.z < 9.5
}
