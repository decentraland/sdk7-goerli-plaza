//import * as utils from '@dcl/ecs-scene-utils'
import { EasingFunction, engine, Entity, GltfContainer, Transform, TransformType, Tween, TweenLoop, TweenSequence } from '@dcl/sdk/ecs'
import { Quaternion } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'

export enum Direction {
	X = 'x',
	Y = 'y',
	Z = 'z',
	invX = 'invx',
	invY = 'invy',
	invZ = 'invz'
}

export function createRotatingPlatform(model: string, transform: Partial<TransformType>, direction: Direction, duration: number): Entity {
	const entity = engine.addEntity()
	GltfContainer.create(entity, { src: model })
	Transform.create(entity, transform)

	let startRotation = Quaternion.fromEulerDegrees(0, 0, 0)
	let midRotation = Quaternion.fromEulerDegrees(0, 0, 0)
	let endRotation = Quaternion.fromEulerDegrees(0, 0, 0)


	//utils.perpetualMotions.startRotation(entity, rotation)
	switch (direction) {
		case Direction.X:
			midRotation = Quaternion.fromEulerDegrees(180, 0, 0)
			endRotation = Quaternion.fromEulerDegrees(360, 0, 0)
			break
		case Direction.invX:
			midRotation = Quaternion.fromEulerDegrees(-180, 0, 0)
			endRotation = Quaternion.fromEulerDegrees(-360, 0, 0)
			break
		case Direction.Y:
			midRotation = Quaternion.fromEulerDegrees(0, 180, 0)
			endRotation = Quaternion.fromEulerDegrees(0, 360, 0)
			break
		case Direction.invY:
			midRotation = Quaternion.fromEulerDegrees(0, -180, 0)
			endRotation = Quaternion.fromEulerDegrees(0, -360, 0)
			break
		case Direction.Z:
			midRotation = Quaternion.fromEulerDegrees(0, 0, 180)
			endRotation = Quaternion.fromEulerDegrees(0, 0, 360)
			break
		case Direction.invZ:
			midRotation = Quaternion.fromEulerDegrees(0, 0, -180)
			endRotation = Quaternion.fromEulerDegrees(0, 0, -360)
			break
	}


	Tween.create(entity, {
		mode: Tween.Mode.Rotate({
			start: startRotation,
			end: midRotation
		}),
		duration: duration,
		easingFunction: EasingFunction.EF_LINEAR
	})
	TweenSequence.create(entity, {
		loop: TweenLoop.TL_RESTART,
		sequence: [
			{
				mode: Tween.Mode.Rotate({
					start: midRotation,
					end: endRotation
				}),
				duration: duration,
				easingFunction: EasingFunction.EF_LINEAR
			}
		]
	})


	return entity
}
