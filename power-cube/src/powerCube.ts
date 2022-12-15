import {
  engine,
  GltfContainer,
  InputAction,
  PBPointerHoverFeedback,
  PointerEventType,
  PointerHoverFeedback,
  Schemas,
  Transform
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

export const PowerCube = engine.defineComponent(
  {
    isGrabbed: Schemas.Boolean
  },
  2003
)

export function createPowerCube(position: Vector3, gltfSrc: string) {
  const entity = engine.addEntity()

  const phf: PBPointerHoverFeedback = {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          button: InputAction.IA_PRIMARY,
          hoverText: 'Pick Up / Put Down',
          maxDistance: 5
        }
      }
    ]
  }
  PointerHoverFeedback.create(entity, phf)

  // const triggerBox = new utils.TriggerBoxShape(Vector3.One(), Vector3.Zero())
  // this.addComponent(new utils.TriggerComponent(triggerBox, { layer: 1 }))

  Transform.create(entity, { position })
  GltfContainer.create(entity, { src: gltfSrc })
  PowerCube.create(entity)
  return entity
}
