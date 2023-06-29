import {
  engine,
  GltfContainer,
  InputAction,
  Material,
  MeshCollider,
  MeshRenderer,
  pointerEventsSystem,
  Transform
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

import { WheelSpin } from './definitions'
import rotatorSystem from './modules/rotator'

export function main() {
  // Environment
  const stage = engine.addEntity()
  GltfContainer.create(stage, { src: 'models/Theatre.glb' })
  Transform.create(stage, {
    position: Vector3.create(8, 0, 8),
    scale: Vector3.create(0.9, 1, 0.9),
    rotation: Quaternion.fromEulerDegrees(0, 270, 0)
  })

  createWheel(Vector3.create(6, 2, 11.1), 20, Vector3.Up())
  createWheel(Vector3.create(9.8, 2, 11.5), 30, Vector3.Down())

  engine.addSystem(rotatorSystem)
}

function createWheel(position: Vector3, speed: number, direction: Vector3) {
  const wheel = engine.addEntity()
  MeshRenderer.setCylinder(wheel)
  MeshCollider.setCylinder(wheel)
  Transform.create(wheel, {
    position,
    rotation: Quaternion.fromEulerDegrees(90, 0, 0),
    scale: Vector3.create(1, 0.05, 1)
  })

  WheelSpin.create(wheel, {
    direction
  })

  Material.setBasicMaterial(wheel, {
    texture: Material.Texture.Common({ src: 'materials/hypno-wheel.png' })
  })

  pointerEventsSystem.onPointerDown(
    {
      entity: wheel,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Spin'
      }
    },
    () => {
      const spin = WheelSpin.getMutable(wheel)
      if (!spin.active) {
        spin.active = true
      }
      spin.speed += speed
    }
  )
}
