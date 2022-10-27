import { PainterComponent } from './painter'
import { buildPointerHoverFeedback, createMesh } from './utils'

export function setupEventOnEntities() {
  const pointerDownCube = createMesh(Vector3.create(2, 1, 4), 'Pointer down', 1, false)
  PointerHoverFeedback.create(
    pointerDownCube,
    buildPointerHoverFeedback(PointerEventType.PET_DOWN, InputAction.IA_POINTER, 'Activate')
  )

  // Pointer Up Cube

  const pointerUpCube = createMesh(Vector3.create(2, 1, 6), 'Pointer up', 1, false)
  PointerHoverFeedback.create(
    pointerUpCube,
    buildPointerHoverFeedback(PointerEventType.PET_UP, InputAction.IA_PRIMARY, 'Activate')
  )

  //  Primary Down Cube (while pointing)
  const primaryDownCube = createMesh(Vector3.create(8, 1, 12), 'Primary down', 1, false)
  PointerHoverFeedback.create(
    primaryDownCube,
    buildPointerHoverFeedback(PointerEventType.PET_DOWN, InputAction.IA_PRIMARY, 'Activate')
  )
  // Primary Up Cube
  const primaryUpCube = createMesh(Vector3.create(10, 1, 12), 'Primary up', 1, false)
  PointerHoverFeedback.create(
    primaryUpCube,
    buildPointerHoverFeedback(PointerEventType.PET_UP, InputAction.IA_PRIMARY, 'Activate')
  )

  // Secondary Down Cube
  const secondaryDownCube = createMesh(Vector3.create(12, 1, 12), 'Secondary down', 1, false)
  PointerHoverFeedback.create(
    secondaryDownCube,
    buildPointerHoverFeedback(PointerEventType.PET_DOWN, InputAction.IA_SECONDARY, 'Activate')
  )

  // Secondary Up Cube
  const secondaryUpCube = createMesh(Vector3.create(14, 1, 12), 'Secondary up', 1, false)
  PointerHoverFeedback.create(
    secondaryUpCube,
    buildPointerHoverFeedback(PointerEventType.PET_UP, InputAction.IA_SECONDARY, 'Activate')
  )

  engine.addSystem(() => {
    if (Input.wasInputJustActive(InputAction.IA_POINTER, PointerEventType.PET_DOWN, pointerDownCube)) {
      PainterComponent.createOrReplace(pointerDownCube)
    }
    if (Input.wasInputJustActive(InputAction.IA_POINTER, PointerEventType.PET_UP, pointerUpCube)) {
      PainterComponent.createOrReplace(pointerUpCube)
    }
    if (Input.wasInputJustActive(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN, primaryDownCube)) {
      PainterComponent.createOrReplace(primaryDownCube)
    }
    if (Input.wasInputJustActive(InputAction.IA_PRIMARY, PointerEventType.PET_UP, primaryUpCube)) {
      PainterComponent.createOrReplace(primaryUpCube)
    }
    if (Input.wasInputJustActive(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN, secondaryDownCube)) {
      PainterComponent.createOrReplace(secondaryDownCube)
    }
    if (Input.wasInputJustActive(InputAction.IA_SECONDARY, PointerEventType.PET_UP, secondaryUpCube)) {
      PainterComponent.createOrReplace(secondaryUpCube)
    }
  })
}
