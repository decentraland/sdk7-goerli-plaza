import { engine, Entity, GltfContainer, Transform, SystemFn, UiText } from '@dcl/sdk/ecs';
import { Quaternion, Vector3 } from '@dcl/sdk/math';
import * as utils from '@dcl-sdk/utils'
import { isClapping } from '.';

// Config
export const START_ANGLE = 350;
const END_ANGLE = 190;
const ANGLE_INCREMENT = 1; // How many degrees the needle moves forwards
const COOLDOWN_INCREMENT = 0.1; // How many degrees the needle moves backwards
export const COOLDOWN_TIME = 6000; // Cooldown time in milliseconds

// Create clap meter entities
export const clapMeterNeedle = engine.addEntity();
export const clapMeterBoard = engine.addEntity();

// Export clapMeterFull variable
export let clapMeterFull: boolean = false;

export class ClapMeter {
	private currentNeedleRotation: number = START_ANGLE;
	private cooldownRemaining: number = 0;

	constructor(
		position: Vector3,
		rotation: Vector3,
		scale: Vector3,
		parent?: Entity
	) {
		// Add 3D model to clap meter board
		GltfContainer.create(clapMeterBoard, {
			src: 'models/clapMeterBoard.glb'
		});

		// Calculate rotation in Euler degrees
		const eulerRotation = Quaternion.fromEulerDegrees(
			rotation.x,
			rotation.y,
			rotation.z
		);

		// Add transform to clap meter board
		Transform.create(clapMeterBoard, {
			position: position,
			rotation: eulerRotation,
			scale: scale,
			parent: parent
		});

		// Add 3D model to clap meter needle
		GltfContainer.create(clapMeterNeedle, {
			src: 'models/clapMeterNeedle.glb'
		});

		// Set needle rotation to start angle
		Transform.create(clapMeterNeedle, {
			position: Vector3.create(0, 0.05, 0),
			rotation: Quaternion.fromEulerDegrees(0, 0, START_ANGLE),
			parent: clapMeterBoard
		});

		// Register the updateNeedle system to the engine
		engine.addSystem(this.updateNeedle);
	}

	public updateNeedle: SystemFn = (dt: number) => {
		const clapsNeeded = 4; // Number of claps needed to reach the end, higher number = more difficult / lower number = easier

		if (this.cooldownRemaining > 0) {
			this.currentNeedleRotation += COOLDOWN_INCREMENT;

			// Clamp the needle rotation to the start angle
			if (this.currentNeedleRotation >= START_ANGLE) {
				this.currentNeedleRotation = START_ANGLE;
			}

			// Decrease remaining cooldown time
			this.cooldownRemaining -= dt;


			if (this.cooldownRemaining <= 0) {
				// Cooldown is over, reset the needle
				this.cooldownRemaining = 0;
				clapMeterFull = false;
			}
		}

		else if (isClapping && this.currentNeedleRotation > END_ANGLE) {
			// If clapping and the needle is not at the end, advance the needle
			const angleIncrement = ANGLE_INCREMENT / clapsNeeded;

			this.currentNeedleRotation -= angleIncrement;

			// Clamp the needle rotation to the end angle
			if (this.currentNeedleRotation <= END_ANGLE) {
				this.currentNeedleRotation = END_ANGLE;
				clapMeterFull = true;


			}
		} else if (this.currentNeedleRotation < START_ANGLE) {
			// If not clapping and the needle is not at the start, return the needle to start
			this.currentNeedleRotation += COOLDOWN_INCREMENT / clapsNeeded;

			// Clamp the needle rotation to the start angle
			if (this.currentNeedleRotation >= START_ANGLE) {
				this.currentNeedleRotation = START_ANGLE;
			}
		}

		// Update the needle's rotation
		Transform.createOrReplace(clapMeterNeedle, {
			position: Vector3.create(0, 0.05, 0),
			rotation: Quaternion.fromEulerDegrees(0, 0, this.currentNeedleRotation),
			parent: clapMeterBoard,
		});
	};
}
