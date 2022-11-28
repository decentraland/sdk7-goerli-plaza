import { Vector3 } from '@dcl/sdk/math'
import { engine, Entity, InputAction, inputSystem, PointerEventType } from '@dcl/sdk/ecs'
import { PainterComponent } from './painter'
import { createMesh } from './utils'

export function setupGlobalEvents() {
  // Global Pointer Down Sphere
  const globalPointerDownCube = createMesh(Vector3.create(2, 1, 10), 'Global pointer down', 0.5, true)

  // Global Pointer Up Sphere
  const globalPointerUpCube = createMesh(Vector3.create(2, 1, 12), 'Global pointer up', 0.5, true)

  // Global Primary Down Sphere
  const globalPrimaryDownCube = createMesh(Vector3.create(4, 1, 10), 'Global primary down', 0.5, true)

  // Global Primary Up Sphere
  const globalPrimaryUpCube = createMesh(Vector3.create(4, 1, 12), 'Global primary up', 0.5, true)

  // Global Secondary Down Sphere
  const globalSecondaryDownCube = createMesh(Vector3.create(6, 1, 10), 'Global secondary down', 0.5, true)

  // Global Secondary Up Sphere
  const globalSecondaryUpCube = createMesh(Vector3.create(6, 1, 12), 'Global secondary up', 0.5, true)

  /////// GLOBAL EVENT LISTENERS

  const MagicGlobalEntity = undefined as any as Entity

  engine.addSystem(() => {
    if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN, MagicGlobalEntity)) {
      PainterComponent.createOrReplace(globalPointerDownCube)
    }
    if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_UP, MagicGlobalEntity)) {
      PainterComponent.createOrReplace(globalPointerUpCube)
    }
    if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN, MagicGlobalEntity)) {
      PainterComponent.createOrReplace(globalPrimaryDownCube)
    }
    if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_UP, MagicGlobalEntity)) {
      PainterComponent.createOrReplace(globalPrimaryUpCube)
    }
    if (inputSystem.isTriggered(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN, MagicGlobalEntity)) {
      PainterComponent.createOrReplace(globalSecondaryDownCube)
    }
    if (inputSystem.isTriggered(InputAction.IA_SECONDARY, PointerEventType.PET_UP, MagicGlobalEntity)) {
      PainterComponent.createOrReplace(globalSecondaryUpCube)
    }
  })
}
