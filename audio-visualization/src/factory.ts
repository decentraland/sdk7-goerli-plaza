import {
  Entity,
  engine,
  Transform,
  MeshRenderer,
  MeshCollider,
  PointerEvents,
  PointerEventType,
  InputAction,
  Material
} from '@dcl/sdk/ecs'
import { VisualAmplitude, VisualBar } from './components'
import { Color4 } from '@dcl/sdk/math'

export function createVisualBar(x: number, y: number, z: number, index: number): Entity {
  console.log("createVisualAmplitude: start for " + index)
  const entity = engine.addEntity()

  // Used to react to audio bands
  VisualBar.create(entity, { index })

  Transform.create(entity, { position: { x, y, z } })

  MeshRenderer.setBox(entity)
  Material.setPbrMaterial(entity, { albedoColor: Color4.Yellow() })

  console.log("createVisualAmplitude: finish for " + index)

  return entity
}

export function createVisualAmplitude(x: number, y: number, z: number): Entity {
  console.log("createVisualAmplitude: start")
  const entity = engine.addEntity()

  // Used to react to audio amplitude
  VisualAmplitude.create(entity)

  Transform.create(entity, { position: { x, y, z } })

  MeshRenderer.setSphere(entity)
  Material.setPbrMaterial(entity, { albedoColor: Color4.Purple() })

  console.log("createVisualAmplitude: finish")

  return entity
}
