import { WheelSpin } from './definitions'
import rotatorSystem from './modules/rotator'

function setup() {
  // Environment
  const stage = engine.addEntity()
  GltfContainer.create(stage, { src: 'models/Theatre.glb' })
  Transform.create(stage, {
    position: Vector3.create(8, 0, 8),
    scale: Vector3.create(0.9, 1, 0.9),
    rotation: Quaternion.fromEulerDegress(0, 270, 0)
  })

  createWheel(Vector3.create(6, 2, 11.1), 20, Vector3.Up())
  createWheel(Vector3.create(9.8, 2, 11.5), 30, Vector3.Down())

  engine.addSystem(rotatorSystem)
}

setup()

function createWheel(position: Vector3, speed: number, direction: Vector3) {
  const wheel = engine.addEntity()
  MeshRenderer.create(wheel, {
    mesh: {
      $case: 'cylinder',
      cylinder: {}
    }
  })
  MeshCollider.create(wheel, {
    mesh: {
      $case: 'cylinder',
      cylinder: {}
    }
  })
  Transform.create(wheel, {
    position,
    rotation: Quaternion.fromEulerDegress(90, 0, 0),
    scale: Vector3.create(1, 0.05, 1)
  })

  WheelSpin.create(wheel, {
    direction
  })

  Material.create(wheel, {
    texture: {
      tex: { $case: 'texture', texture: { src: 'materials/hypno-wheel.png' } }
    }
  })

  EventsSystem.onPointerDown(
    wheel,
    () => {
      const spin = WheelSpin.getMutable(wheel)
      if (!spin.active) {
        spin.active = true
      }
      spin.speed += speed
    },
    {
      button: InputAction.IA_POINTER,
      hoverText: 'Spin'
    }
  )
}
