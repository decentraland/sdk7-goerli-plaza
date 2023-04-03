import { AudioSource, engine, Entity, GltfContainer, Transform } from "@dcl/sdk/ecs"
import { Color3, Quaternion, Vector3 } from "@dcl/sdk/math"
import * as utils from '@dcl-sdk/utils'


/**
 * Sound is a separated from the coin entity so that you can
 * still hear it even when the coin is removed from the engine.
 */
const switchSound = engine.addEntity()
Transform.create(switchSound)
AudioSource.create(switchSound, { audioClipUrl: 'sounds/switch.mp3' })

export function createSwitchBoard(
  model: string,
  startPos: Vector3,
  endPos: Vector3,
): Entity {
  const entity = engine.addEntity()
  GltfContainer.create(entity, { src: model })
  Transform.create(entity, { position:startPos })

  const buttonA = engine.addEntity()
  GltfContainer.create(buttonA, { src: 'models/buttonA.glb' })
  Transform.create(buttonA, {parent: entity})

  const buttonB = engine.addEntity()
  GltfContainer.create(buttonB, { src: 'models/buttonB.glb' })
  Transform.create(buttonB, {parent: entity})

  const gear = engine.addEntity()
  GltfContainer.create(gear, { src: 'models/gears.glb' })
  Transform.create(gear, {parent: entity})

  utils.triggers.addTrigger(buttonA, 1, 1, [{type: "box", scale:Vector3.create(2.75, 2.75, 2.75), position:Vector3.create(1.5, 2, 0)}],
	()=>{
		Transform.getMutable(switchSound).position = Transform.get(engine.PlayerEntity).position
		AudioSource.getMutable(switchSound).playing = true
		
		movePlatform(entity, buttonA, buttonB, gear, -0.12, 0, -180, endPos)
	}, 
	undefined,  
	Color3.Yellow()
  )

  utils.triggers.addTrigger(buttonB, 1, 1, [{type: "box", scale:Vector3.create(2.75, 2.75, 2.75), position:Vector3.create(-1.5, 2, 0)}],
  ()=>{
	  Transform.getMutable(switchSound).position = Transform.get(engine.PlayerEntity).position
	  AudioSource.getMutable(switchSound).playing = true
	  movePlatform(entity, buttonA, buttonB, gear, 0, -0.12, 180, startPos) 
  }, 
  undefined,  
  Color3.Yellow()
  )

  return entity
}


function movePlatform(
	platform: Entity,
	buttonA: Entity,
	buttonB: Entity,
	gear: Entity,
	buttonAPos: number,
	buttonBPos: number,
    rotationSpeed: number,
    targetPos: Vector3
){

	utils.tweens.stopTranslation(platform)

	Transform.getMutable(buttonA).position.y = buttonAPos
	Transform.getMutable(buttonB).position.y = buttonBPos

	utils.perpetualMotions.startRotation(gear, Quaternion.fromEulerDegrees(0,0, rotationSpeed))

	const currentPos = Transform.get(platform).position
	const speed = Math.abs(targetPos.x - currentPos.x) * 0.25

	utils.tweens.startTranslation(platform, currentPos, targetPos, speed, utils.InterpolationType.LINEAR, ()=>{

		Transform.getMutable(buttonA).position.y = 0
		Transform.getMutable(buttonB).position.y = 0

		utils.perpetualMotions.stopRotation(gear)

		Transform.getMutable(switchSound).position = Transform.get(engine.PlayerEntity).position
	  	AudioSource.getMutable(switchSound).playing = true

	})

}


utils.triggers.enableDebugDraw(true)