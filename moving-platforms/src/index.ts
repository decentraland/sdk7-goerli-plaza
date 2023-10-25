import { EasingFunction, engine, Entity, GltfContainer, Transform, Tween, TweenLoop, TweenSequence } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { createCoin } from './modules/coin'
import * as utils from '@dcl-sdk/utils'

export function main() {
	// Instantiate base models
	GltfContainer.create(engine.addEntity(), {
		src: 'models/baseLight.glb'
	})

	GltfContainer.create(engine.addEntity(), {
		src: 'models/staticPlatforms.glb'
	})

	// Instantiate moving platforms

	//// only horizontal
	const platform1 = engine.addEntity()
	GltfContainer.create(platform1, {
		src: 'models/movingPlatform.glb'
	})
	Transform.create(platform1, {
		position: Vector3.create(2, 1.5, 8)
	})


	Tween.create(platform1, {
		mode: Tween.Mode.Move({
			start: Vector3.create(2, 1.5, 8),
			end: Vector3.create(2, 1.5, 10),
		}),
		duration: 2000,
		easingFunction: EasingFunction.EF_LINEAR,
	})

	TweenSequence.create(platform1, { sequence: [], loop: TweenLoop.TL_YOYO })


	//// only vertical
	const platform2 = engine.addEntity()
	GltfContainer.create(platform2, {
		src: 'models/movingPlatform.glb'
	})
	Transform.create(platform2, {
		position: Vector3.create(4, 1.5, 14)
	})


	Tween.create(platform2, {
		mode: Tween.Mode.Move({
			start: Vector3.create(4, 1.5, 14),
			end: Vector3.create(4, 4, 14),
		}),
		duration: 2000,
		easingFunction: EasingFunction.EF_LINEAR,
	})

	TweenSequence.create(platform2, { sequence: [], loop: TweenLoop.TL_YOYO })


	//// triggerable platform
	const platform3 = engine.addEntity()
	GltfContainer.create(platform3, {
		src: 'models/triggerPlatform.glb'
	})
	Transform.create(platform3, {
		position: Vector3.create(14, 4, 12)
	})

	const triggerMarker = engine.addEntity()
	Transform.create(triggerMarker, {
		position: Vector3.create(14, 4, 12)
	})

	utils.triggers.addTrigger(
		triggerMarker,
		utils.LAYER_1,
		utils.LAYER_1,
		[{ type: 'box', scale: Vector3.create(1, 2, 1) }],
		() => {
			console.log("JUMPED ON")

			Tween.createOrReplace(platform3, {
				mode: Tween.Mode.Move({
					start: Vector3.create(14, 4, 12),
					end: Vector3.create(14, 4, 4),
				}),
				duration: 2000,
				easingFunction: EasingFunction.EF_LINEAR,
				currentTime: 0 // in case it was already moving
			})

			TweenSequence.createOrReplace(platform3, {
				sequence: [{
					mode: Tween.Mode.Move({
						start: Vector3.create(14, 4, 4),
						end: Vector3.create(14, 4, 12),
					}),
					duration: 2000,
					easingFunction: EasingFunction.EF_LINEAR,
				}],

			}) // non looping
		}
	)

	//utils.triggers.enableDebugDraw(true)

	//// path with many waypoints
	const platform4 = engine.addEntity()
	GltfContainer.create(platform4, {
		src: 'models/movingPlatform.glb'
	})
	Transform.create(platform4, {
		position: Vector3.create(6.5, 7, 4)
	})

	Tween.create(platform4, {
		mode: Tween.Mode.Move({
			start: Vector3.create(6.5, 7, 4),
			end: Vector3.create(6.5, 7, 12),
		}),
		duration: 2000,
		easingFunction: EasingFunction.EF_LINEAR,
	})

	TweenSequence.create(platform4, {
		sequence: [
			{
				mode: Tween.Mode.Move({
					start: Vector3.create(6.5, 7, 12),
					end: Vector3.create(6.5, 10.5, 12),
				}),
				duration: 2000,
				easingFunction: EasingFunction.EF_LINEAR,
			},
			{
				mode: Tween.Mode.Move({
					start: Vector3.create(6.5, 10.5, 12),
					end: Vector3.create(6.5, 10.5, 4),
				}),
				duration: 2000,
				easingFunction: EasingFunction.EF_LINEAR,
			},
			{
				mode: Tween.Mode.Move({
					start: Vector3.create(6.5, 10.5, 4),
					end: Vector3.create(6.5, 7, 4),
				}),
				duration: 2000,
				easingFunction: EasingFunction.EF_LINEAR,
			}
		], loop: TweenLoop.TL_RESTART
	})

	// Instantiate pickable coin
	createCoin('models/starCoin.glb', Vector3.create(9, 12.75, 8), Vector3.create(1.5, 3, 1.5), Vector3.create(0, 1, 0))
}
