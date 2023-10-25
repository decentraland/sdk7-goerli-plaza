import { Sound } from './sound'
import { engine, Entity, GltfContainer, Transform } from '@dcl/ecs'
import { Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'
import { PuzzleBuilder } from './puzzleBuilder'
import { EasingFunction, InputAction, PointerEvents, PointerEventType, Tween } from '@dcl/sdk/ecs'

export class Statue {
	public entity: Entity
	public symbol: Entity
	public symbolGlow: Entity
	private blockMovement: boolean = false

	constructor(position: Vector3) {
		this.entity = engine.addEntity()
		this.symbol = engine.addEntity()
		this.symbolGlow = engine.addEntity()

		GltfContainer.create(this.entity, { src: 'models/statue.glb' })
		Transform.create(this.entity, { position: position })

		GltfContainer.create(this.symbol, { src: 'models/symbol.glb' })
		Transform.create(this.symbol, { parent: this.entity })

		GltfContainer.create(this.symbolGlow, { src: 'models/symbolGlow.glb' })
		Transform.create(this.symbolGlow, { parent: this.entity, scale: Vector3.create(0, 0, 0) })

		PointerEvents.create(this.entity, {
			pointerEvents: [
				{
					eventType: PointerEventType.PET_DOWN,
					eventInfo: {
						button: InputAction.IA_POINTER,
						showFeedback: false
					}
				}
			]
		})
	}

	toggleGlow(isOn: boolean): void {
		if (isOn) {
			Transform.getMutable(this.symbol).scale = Vector3.create(0, 0, 0)
			Transform.getMutable(this.symbolGlow).scale = Vector3.create(1, 1, 1)
		} else {
			Transform.getMutable(this.symbol).scale = Vector3.create(1, 1, 1)
			Transform.getMutable(this.symbolGlow).scale = Vector3.create(0, 0, 0)
		}
	}

	moveStatue(currentPos: Vector3, endPos: Vector3): void {
		if (!this.blockMovement) {
			this.blockMovement = true

			Sound.playStatueMove()
			// Slide the statue to its endPos over half a second
			Tween.createOrReplace(this.entity, {
				mode: Tween.Mode.Move({
					start: currentPos,
					end: endPos,
				}),
				duration: 500,
				easingFunction: EasingFunction.EF_EASESINE,
			})

			utils.timers.setTimeout(() => {
				this.blockMovement = false
				if (PuzzleBuilder.checkSolution()) {
					PuzzleBuilder.finishGame()
				}
			}, 750)
		}
	}
}
