
import { dogStates, NPComponent } from "../components/NPC"







export function dogBehavior(dt: number) {
	for (const [entity] of engine.getEntitiesWith( NPComponent)) {
  
	const npcData = NPComponent.getMutable(entity)

	switch(npcData.state) {
		case dogStates.Idle:
			break
		
		case dogStates.Sit:
			break

		case dogStates.Follow:
			break

		case dogStates.GoDrink:
			break

		case dogStates.Drinking:
			break


		// 	const move = MoveTransformComponent.getMutable(entity)
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

		// 	const timer = TimeOutComponent.getMutable(entity)

		// 	timer.timeLeft = timer.timeLeft - dt
		
		// 	// has finished
		// 	timer.hasFinished = timer.timeLeft >= 0
		
		// 	if (timer.hasFinished) {
		// 		changeState(entity, dogStates.WALKING)	
		// 	}
		// break
	
	}	
	}
}



export function changeState(entity:Entity, newState: dogStates){

	const npcDataMutable = NPComponent.getMutable(entity)

	leaveState(entity, npcDataMutable.state)
	npcDataMutable.previousState = npcDataMutable.state
	npcDataMutable.state = newState

	enterState(entity, npcDataMutable.state)

}


// export function previousState(entity:Entity){

// 	const npcDataMutable = NPComponent.getMutable(entity)

// 	leaveState(entity, npcDataMutable.state)
// 	npcDataMutable.state = npcDataMutable.previousState

// 	enterState(entity, npcDataMutable.state)

// }

export function enterState(entity:Entity, newState: dogStates){
	const animator = Animator.getMutable(entity)
	switch(newState) {
		case dogStates.Idle:
			const IdleAnim = animator.states.find((anim)=>{return anim.name == "Idle"})
			if(IdleAnim) IdleAnim.playing = true
			break
		
		case dogStates.Sit:
			const SitAnim = animator.states.find((anim)=>{return anim.name == "Sitting"})
			if(SitAnim) SitAnim.playing = true
			const MutablePointerEvent = PointerEvents.getMutable(entity).pointerEvents[0]
			if(MutablePointerEvent.eventInfo){
				MutablePointerEvent.eventInfo.hoverText =  "Stand"
			}
			
			
			break

		case dogStates.Follow:
			const walkAnim = animator.states.find((anim)=>{return anim.name == "Walking"})
			if(walkAnim) walkAnim.playing = true
			break

		case dogStates.GoDrink:
			const walkAnim2 = animator.states.find((anim)=>{return anim.name == "Walking"})
			if(walkAnim2) walkAnim2.playing = true
			break

		case dogStates.Drinking:
			const drinkAnim = animator.states.find((anim)=>{return anim.name == "Drinking"})
			if(drinkAnim) drinkAnim.playing = true
			break
	


// 		case dogStates.WALKING:
// 			const walkAnim = animator.states.find( (anim) =>{return anim.name=="walk"})
// 			if(!walkAnim) return
// 			walkAnim.playing = true

// 			const move = MoveTransformComponent.getFrom(entity)
// 			if(move.hasFinished){
// 				nextSegment(entity)
// 			}
// 			break
// 		case dogStates.TURNING:
// 			const turnAnim = animator.states.find( (anim) =>{return anim.name=="turnRight"})
// 			if(!turnAnim) return
// 			turnAnim.playing = true

// 			const timer = TimeOutComponent.getMutable(entity)
// 			if(timer.hasFinished){
// 				timer.timeLeft = 0.9
// 				timer.hasFinished = false
// 			}
			
// 			break
// 		case dogStates.YELLING:
// 			const raiseDeadAnim = animator.states.find( (anim) =>{return anim.name=="raiseDead"})
// 			if(!raiseDeadAnim) return
// 			raiseDeadAnim.playing = true
// 			break	
	}
}


export function leaveState(entity:Entity, oldState: dogStates){
	const animator = Animator.getMutable(entity)
	switch(oldState) {
		case dogStates.Idle:
			const IdleAnim = animator.states.find((anim)=>{return anim.name == "Idle"})
			if(IdleAnim) IdleAnim.playing = false
		break
	
		case dogStates.Sit:
			const SitAnim = animator.states.find((anim)=>{return anim.name == "Sitting"})
			if(SitAnim) SitAnim.playing = false

			const MutablePointerEvent = PointerEvents.getMutable(entity).pointerEvents[0]
			if(MutablePointerEvent.eventInfo){
				MutablePointerEvent.eventInfo.hoverText =  "Sit"
			}
			break

		case dogStates.Follow:
			const walkAnim = animator.states.find((anim)=>{return anim.name == "Walking"})
			if(walkAnim) walkAnim.playing = false
			break

		case dogStates.GoDrink:
			const walkAnim2 = animator.states.find((anim)=>{return anim.name == "Walking"})
			if(walkAnim2) walkAnim2.playing = false
			break

		case dogStates.Drinking:
			const drinkAnim = animator.states.find((anim)=>{return anim.name == "Drinking"})
			if(drinkAnim) drinkAnim.playing = false
			break

// 		case dogStates.WALKING:
// 			const walkAnim = animator.states.find( (anim) =>{return anim.name=="walk"})
// 			if(!walkAnim) return
// 			walkAnim.playing = false

// 			break
// 		case dogStates.TURNING:
// 			const turnAnim = animator.states.find( (anim) =>{return anim.name=="turnRight"})
// 			if(!turnAnim) return
// 			turnAnim.playing = false
			
// 			break
// 		case dogStates.YELLING:
// 			const raiseDeadAnim = animator.states.find( (anim) =>{return anim.name=="raiseDead"})
// 			if(!raiseDeadAnim) return
// 			raiseDeadAnim.playing = false
// 			break	
	}
}



export function turn(entity:Entity, target:ReadOnlyVector3){
	let transform = Transform.getMutable(entity)
	const difference = Vector3.subtract( transform.position, target)
	const normalizedDifference = Vector3.normalize(difference)
	
	Transform.getMutable(entity).rotation = Quaternion.lookRotation(normalizedDifference)
}

// check if the target is inside the scene's bounds
export function isInBounds(position: ReadOnlyVector3): boolean {
	return (
	  position.x > 0.5 && position.x < 9.5 && position.z > 0.5 && position.z < 9.5
	)
  }
  