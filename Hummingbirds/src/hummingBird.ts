import { MoveTransformComponent } from "./components/moveTransport"


const BirdData = {
	waitingTime: Schemas.Int
}

export const isBird = engine.defineComponent(BirdData, 3333 )


export function createHummingBird(){


	const bird = engine.addEntity()
	Transform.create(bird, {
		position: {x:13, y:3.5, z:5},
		rotation: {x:0, y:0, z:0, w: 1},
		scale:  {x:0.2, y:0.2, z:0.2}
	})
	GLTFShape.create(bird, {
		src:'models/hummingbird.glb'
	})
	Animator.create(bird, {
		states:[
			{
				clip: "fly",
				loop: true,
				playing: true,
				shouldReset: false,
				speed: 2,
				name: "fly" 
			},
			{
				clip: "look",
				loop: false,
				playing: false,
				shouldReset: false,
				name: "look" 
			},
			{
				clip: "shake",
				loop: false,
				playing: false,
				shouldReset: false,
				name: "shake" 
			}
		]
	})

	isBird.create(bird, {
		waitingTime:0
	})
}

export function birdSystem(dt: number){


	for (const [bird] of engine.getEntitiesWith(isBird)) {
	
		if( MoveTransformComponent.has(bird)) return
		
			const birdData = isBird.getMutable(bird)

			birdData.waitingTime -=dt
			if(birdData.waitingTime<= 0){

				let currentPos =  engine.baseComponents.Transform.get(bird).position
			
				birdData.waitingTime = 2

				// next target
				const nextPos = {
					x:Math.random() * 12 + 2,
					y: Math.random() * 3 + 1,
					z: Math.random() * 12 + 2
				}

				dcl.log("New pos", nextPos)

				MoveTransformComponent.create(bird, {
					hasFinished: false,
					duration: 2,
					start:currentPos,
					end: nextPos,
					normalizedTime: 0,
					lerpTime: 0,
					speed: 1,
					interpolationType: 0
				
				})

				const mutableTransform = Transform.getMutable(bird)

				
				Vector3.Up()


				//mutableTransform.rotation = Quaternion.ro
				
				//Quaternion.lookRotation( mutableTransform.position, nextPos)
			}
	  }
}

engine.addSystem(birdSystem)