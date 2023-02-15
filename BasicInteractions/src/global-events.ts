import { engine, Entity, InputAction, inputSystem } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
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

  const prevButtonStates: Map<InputAction, boolean> = new Map([[InputAction.IA_POINTER, true], [InputAction.IA_PRIMARY, true], [InputAction.IA_SECONDARY, true]])

  engine.addSystem((dt: number) => {

    const buttonStateChange: Map<InputAction, boolean> = new Map()
    for (const [button, state] of prevButtonStates.entries()) {
      buttonStateChange.set(button, state !== inputSystem.isPressed(button))
    }

    if (buttonStateChange.get(InputAction.IA_POINTER) && inputSystem.isPressed(InputAction.IA_POINTER)) {
      PainterComponent.createOrReplace(globalPointerDownCube)
    }
    if (buttonStateChange.get(InputAction.IA_POINTER) && !inputSystem.isPressed(InputAction.IA_POINTER)) {
      PainterComponent.createOrReplace(globalPointerUpCube)
    }
    if (buttonStateChange.get(InputAction.IA_PRIMARY) && inputSystem.isPressed(InputAction.IA_PRIMARY)) {
      PainterComponent.createOrReplace(globalPrimaryDownCube)
    }
    if (buttonStateChange.get(InputAction.IA_PRIMARY) && !inputSystem.isPressed(InputAction.IA_PRIMARY)) {
      PainterComponent.createOrReplace(globalPrimaryUpCube)
    }
    if (buttonStateChange.get(InputAction.IA_SECONDARY) && inputSystem.isPressed(InputAction.IA_SECONDARY)) {
      PainterComponent.createOrReplace(globalSecondaryDownCube)
    }
    if (buttonStateChange.get(InputAction.IA_SECONDARY) && !inputSystem.isPressed(InputAction.IA_SECONDARY)) {
      PainterComponent.createOrReplace(globalSecondaryUpCube)
    }

    for (const button of prevButtonStates.keys()) {
      prevButtonStates.set(button, inputSystem.isPressed(button))
    }
  })

}
