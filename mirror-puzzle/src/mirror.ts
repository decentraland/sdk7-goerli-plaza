import { Sound } from './sound'
import { Entity, GltfContainer, InputAction, PointerEventType, PointerEvents, Transform, engine } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'
import { redrawRays } from './reflectedRay'

// Sounds
const mirrorMoveSound = new Sound('sounds/mirrorMove.mp3', false)

export interface MirrorConfig {
  selectorModelPath: string,
  mirrorModelPath: string,
  position?: Vector3,
  rotation?: Quaternion,
  scale?: Vector3,
}

export class Mirror {
  public static instances: Mirror[] = []

  public selectorEntity: Entity | null = null
  public mirrorEntity: Entity | null = null

  private isBusy: boolean = false

  constructor(config: MirrorConfig) {
    this.selectorEntity = engine.addEntity()
    GltfContainer.create(this.selectorEntity, {
      src: config.selectorModelPath
    })
    Transform.create(this.selectorEntity, {
      position: config.position ?? Vector3.Zero(),
      rotation: config.rotation ?? Quaternion.Identity(),
      scale: config.scale ?? Vector3.One(),
    })

    this.mirrorEntity = engine.addEntity()
    GltfContainer.create(this.mirrorEntity, {
      src: config.mirrorModelPath
    })
    Transform.create(this.mirrorEntity, {
      parent: this.selectorEntity
    })

    PointerEvents.create(this.selectorEntity, {
      pointerEvents: [
        {
          eventType: PointerEventType.PET_DOWN,
          eventInfo: {
            button: InputAction.IA_POINTER,
            showFeedback: false,
            maxDistance: 5
          }
        }
      ]
    })

    Mirror.instances.push(this)
  }

  rotateMirror(clockwise: boolean): void {
    if (this.isBusy || this.mirrorEntity === undefined || this.mirrorEntity === null) return

    this.isBusy = true
    // Rotate the mirror to its endPot over half a second
    const currentRot = Transform.getMutable(this.mirrorEntity).rotation
    const endRot = Quaternion.multiply(currentRot, Quaternion.fromEulerDegrees(0, clockwise ? 45 : -45, 0))
    mirrorMoveSound.playAudio()

    utils.tweens.startRotation(this.mirrorEntity, currentRot, endRot, 0.5, utils.InterpolationType.LINEAR, () => {
      utils.timers.setTimeout(
        function () {
          redrawRays() // Redraw
        },
        100
      )
    })

    utils.timers.setTimeout(() => {
      this.isBusy = false
    }, 600)
  }

  moveMirror(currentPos: Vector3, endPos: Vector3): void {
    if (this.isBusy || this.selectorEntity === undefined || this.selectorEntity === null) return

    this.isBusy = true
    // Slide the mirror to its endPos over half a second
    mirrorMoveSound.playAudio()
    utils.tweens.startTranslation(this.selectorEntity, currentPos, endPos, 0.5, utils.InterpolationType.LINEAR, () => {
      utils.timers.setTimeout(
        function () {
          redrawRays() // Redraw
        },
        100
      )
    })

    utils.timers.setTimeout(() => {
      this.isBusy = false
    }, 600)
  }

  static GetMirror(id: number): Mirror | null {
    for (let mirror of Mirror.instances) {
      if (mirror.selectorEntity == id) {
        return mirror
      }
    }
    return null
  }

  static OccupiedByMirror(position: Vector3): boolean {
    Mirror.instances.some((mirror) => {
      return Vector3.equals(position, Transform.getMutable(mirror.selectorEntity as Entity).position)
    })
    return false
  }
}
