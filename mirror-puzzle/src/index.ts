import { ColliderLayer, GltfContainer, engine } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { Mirror } from './mirror'
import { Selector } from './selector'
import { redrawRays } from './reflectedRay'
import { setupUi } from './ui'

export function main() {
  // Base
  const base = engine.addEntity()
  GltfContainer.create(base, {
    src: 'assets/scene/Models/baseCheckered.glb',
    invisibleMeshesCollisionMask: ColliderLayer.CL_NONE
  })

  // Boundaries
  const boundaries = engine.addEntity()
  GltfContainer.create(boundaries, {
    src: 'assets/scene/Models/boundaries.glb'
  })

  // Mirrors
  //#region

  // mirrorA
  new Mirror({
    selectorModelPath: 'assets/scene/Models/mirrorSelector.glb',
    mirrorModelPath: 'assets/scene/Models/mirrorScaledColliders.glb',
    position: Vector3.create(2.5, 0, 7.5)
  })

  // mirrorB
  new Mirror({
    selectorModelPath: 'assets/scene/Models/mirrorSelector.glb',
    mirrorModelPath: 'assets/scene/Models/mirrorScaledColliders.glb',
    position: Vector3.create(8.5, 0, 11.5)
  })
  // mirrorC
  new Mirror({
    selectorModelPath: 'assets/scene/Models/mirrorSelector.glb',
    mirrorModelPath: 'assets/scene/Models/mirrorScaledColliders.glb',
    position: Vector3.create(8.5, 0, 20.5)
  })

  // mirrorD
  new Mirror({
    selectorModelPath: 'assets/scene/Models/mirrorSelector.glb',
    mirrorModelPath: 'assets/scene/Models/mirrorScaledColliders.glb',
    position: Vector3.create(2.5, 0, 24.5)
  })
  //#endregion

  new Selector()

  redrawRays()

  // UI with GitHub link
  setupUi()
}
