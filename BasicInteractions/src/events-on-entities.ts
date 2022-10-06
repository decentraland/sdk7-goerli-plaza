// Pointer Down Cube

import { EventDataType } from '~system/EngineAPI'
import { PainterComponent } from './painter'
import { createMesh } from './utils'

export function setupEventOnEntities() {
  const pointerDownCube = createMesh(Vector3.create(2, 1, 4), 'Pointer down', 1, false)
  PointerEvents.create(pointerDownCube, {
    pointerEvents: [
      {
        eventType: PointerEventType.DOWN,
        eventInfo: {
          button: ActionButton.POINTER,
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
        eventType: PointerEventType.UP,
        eventInfo: {
          button: ActionButton.POINTER,
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
        eventType: PointerEventType.DOWN,
        eventInfo: {
          button: ActionButton.PRIMARY,
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
        eventType: PointerEventType.UP,
        eventInfo: {
          button: ActionButton.PRIMARY,
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
        eventType: PointerEventType.DOWN,
        eventInfo: {
          button: ActionButton.SECONDARY,
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
        eventType: PointerEventType.UP,
        eventInfo: {
          button: ActionButton.SECONDARY,
          hoverText: 'Activate'
        }
      }
    ]
  })

  engine.addSystem(() => {
    if (isPointerEventActive(pointerDownCube, ActionButton.POINTER, PointerEventType.DOWN)) {
      PainterComponent.createOrReplace(pointerDownCube)
    }
    if (isPointerEventActive(pointerUpCube, ActionButton.POINTER, PointerEventType.UP)) {
      PainterComponent.createOrReplace(pointerUpCube)
    }
    if (isPointerEventActive(primaryDownCube, ActionButton.PRIMARY, PointerEventType.DOWN)) {
      PainterComponent.createOrReplace(primaryDownCube)
    }
    if (isPointerEventActive(primaryUpCube, ActionButton.PRIMARY, PointerEventType.UP)) {
      PainterComponent.createOrReplace(primaryUpCube)
    }
    if (isPointerEventActive(secondaryDownCube, ActionButton.SECONDARY, PointerEventType.DOWN)) {
      PainterComponent.createOrReplace(secondaryDownCube)
    }
    if (isPointerEventActive(secondaryUpCube, ActionButton.SECONDARY, PointerEventType.UP)) {
      PainterComponent.createOrReplace(secondaryUpCube)
    }
  })
}
