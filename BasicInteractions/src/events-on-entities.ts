// Pointer Down Cube

import { InputAction, pointerEventsSystem } from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"
import { PainterComponent } from "./painter"
import { createMesh } from "./utils"

export function setupEventOnEntities() {
  const pointerDownCube = createMesh(Vector3.create(2, 1, 4), "Pointer down", 1, false)

  pointerEventsSystem.onPointerDown(
    pointerDownCube,
    function (cmd) {
      PainterComponent.createOrReplace(pointerDownCube)
    },
    {
      button: InputAction.IA_POINTER,
      hoverText: "Activate",
    }
  )

  // Pointer Up Cube

  const pointerUpCube = createMesh(Vector3.create(2, 1, 6), "Pointer up", 1, false)

  pointerEventsSystem.onPointerUp(
    pointerUpCube,
    function (cmd) {
      PainterComponent.createOrReplace(pointerUpCube)
    },
    {
      button: InputAction.IA_POINTER,
      hoverText: "Activate",
    }
  )

  //  Primary Down Cube (while pointing)
  const primaryDownCube = createMesh(Vector3.create(8, 1, 12), "Primary down", 1, false)

  pointerEventsSystem.onPointerDown(
    primaryDownCube,
    function (cmd) {
      PainterComponent.createOrReplace(primaryDownCube)
    },
    {
      button: InputAction.IA_PRIMARY,
      hoverText: "Activate",
    }
  )

  // Primary Up Cube
  const primaryUpCube = createMesh(Vector3.create(10, 1, 12), "Primary up", 1, false)

  pointerEventsSystem.onPointerUp(
    primaryUpCube,
    function (cmd) {
      PainterComponent.createOrReplace(primaryUpCube)
    },
    {
      button: InputAction.IA_PRIMARY,
      hoverText: "Activate",
    }
  )

  // Secondary Down Cube
  const secondaryDownCube = createMesh(Vector3.create(12, 1, 12), "Secondary down", 1, false)

  pointerEventsSystem.onPointerDown(
    secondaryDownCube,
    function (cmd) {
      PainterComponent.createOrReplace(secondaryDownCube)
    },
    {
      button: InputAction.IA_SECONDARY,
      hoverText: "Activate",
    }
  )

  // Secondary Up Cube
  const secondaryUpCube = createMesh(Vector3.create(14, 1, 12), "Secondary up", 1, false)

  pointerEventsSystem.onPointerUp(
    secondaryUpCube,
    function (cmd) {
      PainterComponent.createOrReplace(secondaryUpCube)
    },
    {
      button: InputAction.IA_SECONDARY,
      hoverText: "Activate",
    }
  )
}
