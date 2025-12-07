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
  const entity = engine.addEntity()

  // Used to react to audio bands
  VisualBar.create(entity, { index })

  Transform.create(entity, { position: { x, y, z } })

  // set how the cube looks and collides
  MeshRenderer.setBox(entity)
  MeshCollider.setBox(entity)
  Material.setPbrMaterial(entity, { albedoColor: Color4.Green() })

  // Create PointerEvent with the hover feedback.
  // We are going to check the onClick event on the changeColorSystem.
  PointerEvents.create(entity, {
    pointerEvents: [
      { eventType: PointerEventType.PET_DOWN, eventInfo: { button: InputAction.IA_POINTER, hoverText: 'Change Color' } }
    ]
  })

  return entity
}

export function createVisualAmplitude(x: number, y: number, z: number): Entity {
  const entity = engine.addEntity()

  // Used to react to audio amplitude
  VisualAmplitude.create(entity)

  Transform.create(entity, { position: { x, y, z } })

  // set how the cube looks and collides
  MeshRenderer.setSphere(entity)
  MeshCollider.setSphere(entity)
  Material.setPbrMaterial(entity, { albedoColor: Color4.Yellow() })

  return entity
}
