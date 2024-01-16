import {
  EasingFunction,
  Entity,
  GltfContainer,
  InputAction,
  PointerEventType,
  PointerEvents,
  Transform,
  Tween,
  engine
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'

export interface FloatingRockConfig {
  modelPath: string
  glowPath: string
  position?: Vector3
  rotation?: Quaternion
  scale?: Vector3
}

export class FloatingRock {
  public static instances: FloatingRock[] = []

  private floatingRockEntity: Entity | null = null
  private floatingRockGlow: Entity | null = null

  constructor(config: FloatingRockConfig) {
    this.floatingRockEntity = engine.addEntity()
    GltfContainer.create(this.floatingRockEntity, {
      src: config.modelPath
    })
    const transform = Transform.create(this.floatingRockEntity, {
      position: config.position ?? Vector3.Zero(),
      rotation: config.rotation ?? Quaternion.Identity(),
      scale: config.scale ?? Vector3.One()
    })
    PointerEvents.create(this.floatingRockEntity, {
      pointerEvents: [
        {
          eventType: PointerEventType.PET_DOWN,
          eventInfo: {
            button: InputAction.IA_POINTER,
            showFeedback: false,
            maxDistance: 16
          }
        }
      ]
    })

    this.floatingRockGlow = engine.addEntity()
    GltfContainer.create(this.floatingRockGlow, {
      src: config.glowPath
    })
    Transform.create(this.floatingRockGlow, {
      parent: this.floatingRockEntity,
      scale: Vector3.Zero()
    })

    const startPos = transform.position
    const endPos = Vector3.create(startPos.x, startPos.y + 0.25, startPos.z)

    const self = this.floatingRockEntity
    utils.toggles.addToggle(self, utils.ToggleState.On, function (value) {
      let start = value == utils.ToggleState.On ? startPos : endPos
      let end = value == utils.ToggleState.On ? endPos : startPos

      let duration = Math.random() * 2000 + 2000

      Tween.createOrReplace(self, {
        mode: Tween.Mode.Move({
          start: start,
          end: end
        }),
        duration: duration,
        easingFunction: EasingFunction.EF_EASEQUAD
      })

      utils.timers.setTimeout(() => {
        utils.toggles.flip(self)
      }, duration)
    })
    utils.toggles.flip(this.floatingRockEntity)

    FloatingRock.instances.push(this)
  }

  toggleGlow(isOn: boolean): void {
    if (this.floatingRockGlow === undefined || this.floatingRockGlow === null) return

    Transform.getMutable(this.floatingRockGlow).scale = isOn ? Vector3.One() : Vector3.Zero()
  }

  static GetFloatingRock(id: number): FloatingRock | null {
    for (let floatingRock of FloatingRock.instances) {
      if (floatingRock.floatingRockEntity == id) {
        return floatingRock
      }
    }
    return null
  }

  static ToggleGlowAll(isOn: boolean): void {
    FloatingRock.instances.forEach((floatingRock) => {
      floatingRock.toggleGlow(isOn)
    })
  }
}
