import { ColliderLayer, GltfContainer, engine } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { Mirror } from './mirror'
import { Selector } from './selector'
import { redrawRays } from './reflectedRay'

export function main() {
  // Base
  const base = engine.addEntity()
  GltfContainer.create(base, {
    src: 'models/baseCheckered.glb',
    invisibleMeshesCollisionMask: ColliderLayer.CL_NONE
  })

  // Boundaries
  const boundaries = engine.addEntity()
  GltfContainer.create(boundaries, {
    src: 'models/boundaries.glb'
  })

  // Mirrors
  //#region

  // mirrorA
  new Mirror({
    selectorModelPath: 'models/mirrorSelector.glb',
    mirrorModelPath: 'models/mirrorScaledColliders.glb',
    position: Vector3.create(2.5, 0, 7.5)
  })

  // mirrorB
  new Mirror({
    selectorModelPath: 'models/mirrorSelector.glb',
    mirrorModelPath: 'models/mirrorScaledColliders.glb',
    position: Vector3.create(8.5, 0, 11.5)
  })
  // mirrorC
  new Mirror({
    selectorModelPath: 'models/mirrorSelector.glb',
    mirrorModelPath: 'models/mirrorScaledColliders.glb',
    position: Vector3.create(8.5, 0, 20.5)
  })

  // mirrorD
  new Mirror({
    selectorModelPath: 'models/mirrorSelector.glb',
    mirrorModelPath: 'models/mirrorScaledColliders.glb',
    position: Vector3.create(2.5, 0, 24.5)
  })
  //#endregion

  new Selector()

  redrawRays()
}
