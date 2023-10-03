import { engine, GltfContainer, CameraMode, CameraType, Transform } from '@dcl/sdk/ecs';
import { Vector3 } from '@dcl/sdk/math';
import { MessageBus } from '@dcl/sdk/message-bus';
import { onPlayerExpressionObservable } from '@dcl/sdk/observables';
import { isMenuVisible, onClapMeterFull, setupUi, toggleMenuVisibility } from './ui';
import { ClapMeter, START_ANGLE, clapMeterFull, clapMeterNeedle, clapMeterBoard, COOLDOWN_TIME } from './clapMeter';
import * as utils from '@dcl-sdk/utils'

export let isClapping: boolean = false;

export function main() {
	// draw UI
	setupUi();

	// Multiplayer (p2p)
	const sceneMessageBus = new MessageBus();

	// Setup scene
	const base = engine.addEntity();
	GltfContainer.create(base, {
		src: "models/baseDarkWithCollider.glb"
	});

	const clapMeter = new ClapMeter(
		Vector3.create(8, 0.5, 8), // Position
		Vector3.create(0, 0, 0), // Rotation in Euler degrees
		Vector3.create(1, 1, 1), // Scale
		undefined // Parent entity
	);

	// Use a timer to control the cooldown
	let clapCooldownTimer: ReturnType<typeof utils.timers.setTimeout> | null = null;

	// Listen for claps
	onPlayerExpressionObservable.add(({ expressionId }) => {
		if (expressionId == "clap") {
			console.log('clap detected')
			isClapping = true;
			sceneMessageBus.emit("updateClapMeter", {});

			// Set a timer to reset isClapping after a certain duration
			clapCooldownTimer = utils.timers.setTimeout(() => {
				isClapping = false;
				clapCooldownTimer = 0;

				// Update needle when the timer expires
				sceneMessageBus.emit("updateClapMeter", {});
			}, COOLDOWN_TIME);
		}
	});

	// Update the clap meter for all players
	sceneMessageBus.on("updateClapMeter", () => {
		clapMeter.updateNeedle(10);
		console.log('updated message bus');

		if (clapMeterFull) {
			// Trigger an action when the clap meter is full
			onClapMeterFull()
		}
	});

	function checkCameraMode() {
		if (!engine.CameraEntity) return

		let cameraEntity = CameraMode.get(engine.CameraEntity)

		if (cameraEntity.mode == CameraType.CT_THIRD_PERSON) {
			console.log('The player is using the 3rd person camera')

			if (isMenuVisible && !clapMeterFull) {
				toggleMenuVisibility(); // Hide the UI
			}
		} else {
			console.log('The player is using the 1st person camera')

			if (!isMenuVisible && !clapMeterFull) {
				toggleMenuVisibility(); // Display the UI
			}
		}
	}

	engine.addSystem(checkCameraMode);
}

