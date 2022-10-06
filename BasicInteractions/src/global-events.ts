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
    if (isPointerEventActive(MagicGlobalEntity, ActionButton.POINTER, PointerEventType.DOWN)) {
      PainterComponent.createOrReplace(globalPointerDownCube)
    }
    if (isPointerEventActive(MagicGlobalEntity, ActionButton.POINTER, PointerEventType.UP)) {
      PainterComponent.createOrReplace(globalPointerUpCube)
    }
    if (isPointerEventActive(MagicGlobalEntity, ActionButton.PRIMARY, PointerEventType.DOWN)) {
      PainterComponent.createOrReplace(globalPrimaryDownCube)
    }
    if (isPointerEventActive(MagicGlobalEntity, ActionButton.PRIMARY, PointerEventType.UP)) {
      PainterComponent.createOrReplace(globalPrimaryUpCube)
    }
    if (isPointerEventActive(MagicGlobalEntity, ActionButton.SECONDARY, PointerEventType.DOWN)) {
      PainterComponent.createOrReplace(globalSecondaryDownCube)
    }
    if (isPointerEventActive(MagicGlobalEntity, ActionButton.SECONDARY, PointerEventType.UP)) {
      PainterComponent.createOrReplace(globalSecondaryUpCube)
    }
  })
}
