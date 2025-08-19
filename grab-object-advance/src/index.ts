import { engine, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
// /*
//   IMPORTANT: The tsconfig.json has been configured to include "node_modules/cannon/build/cannon.js"
//   Code is adapted from: https://github.com/schteppe/cannon.js/blob/master/examples/threejs_mousepick.html
// */

import { _inputSystem, setupMarker, updateMarkerSystem } from './marker'
import { createBoxBody, setupCannon, updatePhysicsSystem } from './world'
import { setupUi } from './ui'

export function main() {
  // // Base scene
  const base = engine.addEntity()
  GltfContainer.create(base, { src: 'assets/scene/Models/baseLight.glb' })
  Transform.create(base, { scale: Vector3.create(2, 2, 2) })

  setupCannon()
  setupMarker()

  createBoxBody(Vector3.create(2, 5, 4))
  createBoxBody(Vector3.create(2.3, 3.5, 4))

  engine.addSystem(updatePhysicsSystem)
  engine.addSystem(updateMarkerSystem)
  engine.addSystem(_inputSystem)

  // UI with GitHub link
  setupUi()
}
