// Pointer Down Cube


import { PainterComponent } from './painter'
import { createMesh } from './utils'

export function setupEventOnEntities() {
  const pointerDownCube = createMesh(Vector3.create(2, 1, 4), 'Pointer down', 1, false)
  PointerHoverFeedback.create(pointerDownCube, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          button: InputAction.IA_POINTER,
          hoverText: 'Activate'
        }
      }
    ]
  })

  // Pointer Up Cube

  const pointerUpCube = createMesh(Vector3.create(2, 1, 6), 'Pointer up', 1, false)
  PointerHoverFeedback.create(pointerUpCube, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_UP,
        eventInfo: {
          button: InputAction.IA_PRIMARY,
          hoverText: 'Activate'
        }
      }
    ]
  })

  //  Primary Down Cube (while pointing)
  const primaryDownCube = createMesh(Vector3.create(8, 1, 12), 'Primary down', 1, false)
  PointerHoverFeedback.create(primaryDownCube, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          button: InputAction.IA_PRIMARY,
          hoverText: 'Activate'
        }
      }
    ]
  })
  // Primary Up Cube
  const primaryUpCube = createMesh(Vector3.create(10, 1, 12), 'Primary up', 1, false)
  PointerHoverFeedback.create(primaryUpCube, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_UP,
        eventInfo: {
          button: InputAction.IA_PRIMARY,
          hoverText: 'Activate'
        }
      }
    ]
  })

  // Secondary Down Cube
  const secondaryDownCube = createMesh(Vector3.create(12, 1, 12), 'Secondary down', 1, false)
  PointerHoverFeedback.create(secondaryDownCube, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          button: InputAction.IA_SECONDARY,
          hoverText: 'Activate'
        }
      }
    ]
  })

  // Secondary Up Cube
  const secondaryUpCube = createMesh(Vector3.create(14, 1, 12), 'Secondary up', 1, false)
  PointerHoverFeedback.create(secondaryUpCube, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_UP,
        eventInfo: {
          button: InputAction.IA_SECONDARY,
          hoverText: 'Activate'
        }
      }
    ]
  })

  engine.addSystem(() => {
    if (Input.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN, pointerDownCube)) {
      PainterComponent.createOrReplace(pointerDownCube)
    }
    if (Input.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_UP, pointerUpCube)) {
      PainterComponent.createOrReplace(pointerUpCube)
    }
    if (Input.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN, primaryDownCube)) {
      PainterComponent.createOrReplace(primaryDownCube)
    }
    if (Input.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_UP, primaryUpCube)) {
      PainterComponent.createOrReplace(primaryUpCube)
    }
    if (Input.isTriggered(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN, secondaryDownCube)) {
      PainterComponent.createOrReplace(secondaryDownCube)
    }
    if (Input.isTriggered(InputAction.IA_SECONDARY, PointerEventType.PET_UP, secondaryUpCube)) {
      PainterComponent.createOrReplace(secondaryUpCube)
    }
  })
}
