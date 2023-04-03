import { engine, InputAction, pointerEventsSystem, Schemas, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { createWall, setMaterial } from './factory'
import { transformComponent } from './systems'

// export all the functions required to make the scene work
export * from '@dcl/sdk'

// Define component to have the state of the door
const DoorComponent = engine.defineComponent('DoorComponent',
  {
    open: Schemas.Boolean
  }
)

// Create the walls
createWall(Vector3.create(9.75, 1, 8), Vector3.create(1.5, 2.01, 0.1))
createWall(Vector3.create(6.25, 1, 8), Vector3.create(1.5, 2.01, 0.1))

// Create the doors
const parentDoor = engine.addEntity()
Transform.create(parentDoor, {
  position: Vector3.create(8, 1, 8)
})

const leftDoor = createWall(Vector3.create(0.5, 0, 0), Vector3.create(1.1, 2, 0.05), parentDoor)
const rightDoor = createWall(Vector3.create(-0.5, 0, 0), Vector3.create(1.1, 2, 0.05), parentDoor)

// Set material to the doors
setMaterial(leftDoor)
setMaterial(rightDoor)

// Door initial state, open=false
DoorComponent.create(parentDoor, { open: false })

// Register event when you click on one of the doors
pointerEventsSystem.onPointerDown(leftDoor, onDoorClicked, { button: InputAction.IA_PRIMARY, hoverText: "Open / Close" })
pointerEventsSystem.onPointerDown(rightDoor, onDoorClicked, { button: InputAction.IA_PRIMARY, hoverText: "Open / Close" })

// Callback when click the doors
// Open both doors at the same time
function onDoorClicked() {
  const leftDoorClosed = Vector3.create(0.5, 0, 0)
  const leftDoorOpen = Vector3.create(1.25, 0, 0)
  const rightDoorClosed = Vector3.create(-0.5, 0, 0)
  const rightDoorOpen = Vector3.create(-1.25, 0, 0)

  const door = DoorComponent.getMutable(parentDoor)
  door.open = !door.open
  const leftDoorNextPosition = door.open ? leftDoorOpen : leftDoorClosed
  const rightDoorNextPosition = door.open ? rightDoorOpen : rightDoorClosed

  // Register systems to move the doors in 0.5 seconds
  transformComponent(leftDoor, { position: leftDoorNextPosition }, 0.5)
  transformComponent(rightDoor, { position: rightDoorNextPosition }, 0.5)
}
