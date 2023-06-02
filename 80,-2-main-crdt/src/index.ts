import { GltfContainer, MeshRenderer, Transform, engine } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

import './validations.test'

import { ui } from './ui'
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'

export function main() {
	ReactEcsRenderer.setUiRenderer(ui)
}

// rotate all cubes
engine.addSystem(function rotateCube(dt) {
	for (const [entity] of engine.getEntitiesWith(MeshRenderer)) {
		const mutableTransform = Transform.getMutable(entity)

		mutableTransform.rotation = Quaternion.multiply(
			mutableTransform.rotation,
			Quaternion.fromAngleAxis(dt * 10, Vector3.Up())
		)
	}
})

// rotate all gltf
engine.addSystem(function rotateCube(dt) {
	for (const [entity] of engine.getEntitiesWith(GltfContainer)) {
		const mutableTransform = Transform.getMutable(entity)

		mutableTransform.rotation = Quaternion.multiply(
			mutableTransform.rotation,
			Quaternion.fromAngleAxis(dt * 40, Vector3.Up())
		)
	}
})
