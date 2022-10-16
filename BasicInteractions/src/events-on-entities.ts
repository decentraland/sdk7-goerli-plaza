// Pointer Down Cube


import { PainterComponent } from './painter'
import { createMesh } from './utils'

export function setupEventOnEntities() {
  const pointerDownCube = createMesh(Vector3.create(2, 1, 4), 'Pointer down', 1, false)
  PointerEvents.create(pointerDownCube, {
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
  PointerEvents.create(pointerUpCube, {
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
  PointerEvents.create(primaryDownCube, {
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
  PointerEvents.create(primaryUpCube, {
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
  PointerEvents.create(secondaryDownCube, {
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
  PointerEvents.create(secondaryUpCube, {
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
    if (isPointerEventActive(pointerDownCube, InputAction.IA_POINTER, PointerEventType.PET_DOWN)) {
      PainterComponent.createOrReplace(pointerDownCube)
    }
    if (isPointerEventActive(pointerUpCube, InputAction.IA_POINTER, PointerEventType.PET_UP)) {
      PainterComponent.createOrReplace(pointerUpCube)
    }
    if (isPointerEventActive(primaryDownCube, InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)) {
      PainterComponent.createOrReplace(primaryDownCube)
    }
    if (isPointerEventActive(primaryUpCube, InputAction.IA_PRIMARY, PointerEventType.PET_UP)) {
      PainterComponent.createOrReplace(primaryUpCube)
    }
    if (isPointerEventActive(secondaryDownCube, InputAction.IA_SECONDARY, PointerEventType.PET_DOWN)) {
      PainterComponent.createOrReplace(secondaryDownCube)
    }
    if (isPointerEventActive(secondaryUpCube, InputAction.IA_SECONDARY, PointerEventType.PET_UP)) {
      PainterComponent.createOrReplace(secondaryUpCube)
    }
  })
}
