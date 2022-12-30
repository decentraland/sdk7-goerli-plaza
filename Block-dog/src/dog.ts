import {
  Entity,
  engine,
  Transform,
  GltfContainer,
  Animator,
  PointerEvents,
  PointerEventType,
  InputAction,
  pointerEventsSystem,
} from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"
import { CustomComponents, dogStates } from "./components"
import { changeState } from "./systems/dogAI"

export function createDog(position: Vector3): Entity {
  const dog = engine.addEntity()

  Transform.create(dog, {
    position: position,
    scale: { x: 1, y: 1, z: 1 },
    rotation: { x: 0, y: 0, z: 0, w: 1 },
  })

  GltfContainer.create(dog, {
    src: "models/BlockDog.glb",
  })

  Animator.create(dog, {
    states: [
      {
        name: "Walking",
        clip: "Walking",
        playing: false,
        loop: true,
        shouldReset: false,
      },
      {
        name: "Sitting",
        clip: "Sitting",
        playing: false,
        loop: false,
        shouldReset: true,
      },
      {
        name: "Standing",
        clip: "Standing",
        playing: false,
        loop: false,
        shouldReset: true,
      },
      {
        name: "Drinking",
        clip: "Drinking",
        playing: false,
        loop: true,
        shouldReset: true,
      },
      {
        name: "Idle",
        clip: "Idle",
        playing: false,
        loop: true,
        shouldReset: true,
      },
    ],
  })

  CustomComponents.NPC.create(dog, { state: dogStates.Idle, previousState: dogStates.Idle, changeTimer: 1 })

  pointerEventsSystem.onPointerDown(
    dog,
    () => {
      const currentState = CustomComponents.NPC.getMutable(dog)
      if (currentState.state === dogStates.Sit) {
        changeState(dog, dogStates.Idle)
      } else {
        changeState(dog, dogStates.Sit)
      }
    },
    {
      button: InputAction.IA_PRIMARY,
      hoverText: "Sit",
    }
  )

  return dog
}
