import {
  InputAction,
  pointerEventsSystem,
  engine,
  Transform,
  Entity,
  MeshRenderer,
  MeshCollider,
  Material,
  Schemas
} from '@dcl/ecs'
import { Quaternion, Vector3, Color4 } from '@dcl/ecs-math'
import * as utils from '@dcl-sdk/utils'
import { setupUi } from './ui'
import { EasingFunction, Tween } from '@dcl/sdk/ecs'

const openPos: Quaternion = Quaternion.create(0, 1, 0)
const closedPos: Quaternion = Quaternion.create(0, 0, 0)

export function main() {
  createWall(Vector3.create(5.75, 1, 3), Vector3.create(1.5, 2, 0.05))
  createWall(Vector3.create(3.25, 1, 3), Vector3.create(1.5, 2, 0.05))

  const doorPivotEntity = engine.addEntity()
  Transform.create(doorPivotEntity, {
    position: Vector3.create(4, 1, 3),
    rotation: closedPos
  })

  const doorEntity = createWall(Vector3.create(0.5, 0, 0), Vector3.create(1, 2, 0.05), doorPivotEntity)

  Material.setPbrMaterial(doorEntity, {
    albedoColor: Color4.Red(),
    metallic: 0.9,
    roughness: 0.1
  })

  // Add toggle actions to door
  utils.toggles.addToggle(doorPivotEntity, utils.ToggleState.Off, (value) => {
    if (value == utils.ToggleState.On) {
      // open
      Tween.createOrReplace(doorPivotEntity, {
        mode: Tween.Mode.Rotate({
          start: closedPos,
          end: openPos
        }),
        duration: 500,
        easingFunction: EasingFunction.EF_EASEINSINE
      })
    } else {
      // close
      Tween.createOrReplace(doorPivotEntity, {
        mode: Tween.Mode.Rotate({
          start: openPos,
          end: closedPos
        }),
        duration: 500,
        easingFunction: EasingFunction.EF_EASEINSINE
      })
    }
  })

  pointerEventsSystem.onPointerDown(
    {
      entity: doorEntity,
      opts: {
        button: InputAction.IA_PRIMARY,
        hoverText: 'Open / Close'
      }
    },
    () => {
      utils.toggles.flip(doorPivotEntity)
    }
  )

  // UI with GitHub link
  setupUi()
}

function createWall(position: Vector3, scale: Vector3, parent?: Entity) {
  const WallEntity = engine.addEntity()
  Transform.create(WallEntity, {
    position,
    scale,
    parent
  })
  MeshRenderer.setBox(WallEntity)
  MeshCollider.setBox(WallEntity)
  return WallEntity
}
