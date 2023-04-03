import {
  engine,
  GltfContainer,
  InputAction,
  PBPointerEvents,
  PointerEventType,
  PointerEvents,
  Schemas,
  Transform,
} from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"
import { triggerAreaSystem } from "./utils/triggerArea"

export const PowerCube = engine.defineComponent('PowerCube',
  {
    isGrabbed: Schemas.Boolean,
  }
)

export function createPowerCube(position: Vector3, gltfSrc: string) {
  const entity = engine.addEntity()

  const phf: PBPointerEvents = {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          button: InputAction.IA_PRIMARY,
          hoverText: "Pick Up / Put Down",
          maxDistance: 5,
        },
      },
    ],
  }
  PointerEvents.create(entity, phf)

  triggerAreaSystem.addTriggerBox(entity)
  // const triggerBox = new utils.TriggerBoxShape(Vector3.One(), Vector3.Zero())
  // this.addComponent(new utils.TriggerComponent(triggerBox, { layer: 1 }))

  Transform.create(entity, { position })
  GltfContainer.create(entity, { src: gltfSrc })
  PowerCube.create(entity)
  return entity
}
