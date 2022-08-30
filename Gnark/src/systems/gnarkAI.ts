import { MoveTransformComponent } from "../components/moveTransport"
import { gnarkStates, NPComponent } from "../components/NPC"
import { PathDataComponent } from "../components/pathData"
import { TimeOutComponent } from "../components/timeOut"
import { Interpolate } from "../helper/interpolation"


export type Vector3Type = {
	x: number,
	y: number,
	z: number
  }

export function distanceSystem(dt: number) {
	const playerTransform = engine.baseComponents.Transform.getOrNull(1 as Entity)

	 if(playerTransform){
		for (const [entity, transform, npcData] of engine.getEntitiesWith(engine.baseComponents.Transform, NPComponent)) {
			const dist = getDistance(playerTransform.position, transform.position)

			if(dist < 5 && npcData.state !== gnarkStates.YELLING){
			
				changeState(entity, gnarkStates.YELLING)
		
			} else if(dist > 5 && npcData.state == gnarkStates.YELLING){

				previousState(entity)
			}
		}
	}
}


 
function getDistance(playerPos: Vector3Type, NPCPos:Vector3Type){
	const gap = Vector3.subtract(playerPos, NPCPos)

	return Vector3.length(gap)
}





export function walkAround(dt: number) {
	for (const [entity,  npcData] of engine.getEntitiesWith( NPComponent)) {
  
	switch(npcData.state) {
		case gnarkStates.WALKING:

			const move = MoveTransformComponent.getMutable(entity)
			const transform = engine.baseComponents.Transform.getMutable(entity)
		
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
			timer.hasFinished = timer.timeLeft >= 0
		
			if (timer.hasFinished) {
				changeState(entity, gnarkStates.WALKING)	
			}
		break
	
	}	
	}
  }



export function changeState(entity:Entity, newState: gnarkStates){

	const npcDataMutable = NPComponent.getMutable(entity)

	leaveState(entity, npcDataMutable.state)
	npcDataMutable.previousState = npcDataMutable.state
	npcDataMutable.state = newState

	enterState(entity, npcDataMutable.state)

}


export function previousState(entity:Entity){

	const npcDataMutable = NPComponent.getMutable(entity)

	leaveState(entity, npcDataMutable.state)
	npcDataMutable.state = npcDataMutable.previousState

	enterState(entity, npcDataMutable.state)

}

export function enterState(entity:Entity, newState: gnarkStates){
	const animator = engine.baseComponents.Animator.getMutable(entity)
	switch(newState) {
		case gnarkStates.WALKING:
			const walkAnim = animator.states.find( (anim) =>{return anim.name=="walk"})
			if(!walkAnim) return
			walkAnim.playing = true

			const move = MoveTransformComponent.get(entity)
			if(move.hasFinished){
				nextSegment(entity)
			}
			break
		case gnarkStates.TURNING:
			const turnAnim = animator.states.find( (anim) =>{return anim.name=="turnRight"})
			if(!turnAnim) return
			turnAnim.playing = true

			const timer = TimeOutComponent.getMutable(entity)
			if(timer.hasFinished){
				timer.timeLeft = 0.9
				timer.hasFinished = false
			}
			
			break
		case gnarkStates.YELLING:
			const raiseDeadAnim = animator.states.find( (anim) =>{return anim.name=="raiseDead"})
			if(!raiseDeadAnim) return
			raiseDeadAnim.playing = true
			break	
	}
}


export function leaveState(entity:Entity, oldState: gnarkStates){
	const animator = engine.baseComponents.Animator.getMutable(entity)
	switch(oldState) {
		case gnarkStates.WALKING:
			const walkAnim = animator.states.find( (anim) =>{return anim.name=="walk"})
			if(!walkAnim) return
			walkAnim.playing = false

			break
		case gnarkStates.TURNING:
			const turnAnim = animator.states.find( (anim) =>{return anim.name=="turnRight"})
			if(!turnAnim) return
			turnAnim.playing = false
			
			break
		case gnarkStates.YELLING:
			const raiseDeadAnim = animator.states.find( (anim) =>{return anim.name=="raiseDead"})
			if(!raiseDeadAnim) return
			raiseDeadAnim.playing = false
			break	
	}
}



export  function nextSegment(gnark:Entity){

	let path = PathDataComponent.getMutable(gnark)
	path.origin += 1
	path.target += 1
	if (path.target >= path.path.length) {
		path.target = 0
	} else if (path.origin >= path.path.length) {
		path.origin = 0
	}

	const move = MoveTransformComponent.getMutable(gnark)
	
	move.start = path.path[path.origin],
	move.end = path.path[path.target],
	move.duration = 10
	move.normalizedTime = 0
	move.lerpTime = 0
	move.speed = 0.1
	move.hasFinished = false
	move.interpolationType = 1
		

	engine.baseComponents.Transform.getMutable(gnark).rotation.y += 90
}