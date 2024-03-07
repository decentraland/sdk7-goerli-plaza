import {
  engine,
  GltfContainer,
  Entity,
  InputAction,
  inputSystem,
  PointerEventType,
  PointerEvents,
  Transform,
  AudioSource,
  CameraModeArea,
  CameraType
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { setupUi } from './ui'

// Configuration
const Z_OFFSET = 1.5
const GROUND_HEIGHT = 0.55
const state = {
  grabbed: false
}

export function main() {
  // Force camera first person
  CameraModeArea.create(engine.RootEntity, {
    area: Vector3.create(32, 32, 32),
    mode: CameraType.CT_FIRST_PERSON
  })

  // Base
  const base = engine.addEntity()
  GltfContainer.create(base, { src: `models/baseLight.glb` })

  const crate1 = createCreate(Vector3.create(8, GROUND_HEIGHT, 8))

  const crate2 = createCreate(Vector3.create(4, GROUND_HEIGHT, 10))
}

// Sounds
const audioSourceEntity = engine.addEntity()

export function playSound(audio: string) {
  AudioSource.createOrReplace(audioSourceEntity, {
    audioClipUrl: audio,
    playing: true
  })
}

export function createCreate(Position: Vector3): Entity {
  const crate = engine.addEntity()
  Transform.create(crate, { position: Position })
  GltfContainer.create(crate, { src: `models/crate.glb` })

  PointerEvents.create(crate, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          button: InputAction.IA_PRIMARY,
          hoverText: 'Pick Up / Put Down',
          maxDistance: 5,
          showFeedback: true
        }
      }
    ]
  })

  return crate
}

const toggleGrabbed = () => {
  state.grabbed = !state.grabbed
  const sound = state.grabbed ? `sounds/put-down.mp3` : `sounds/pick-up.mp3`
  playSound(sound)

  return state.grabbed
}

export function grabbingSystem() {
  const objs = engine.getEntitiesWith(PointerEvents, Transform)
  for (const [entity] of objs) {
    const mutableTransform = Transform.getMutable(entity)
    if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN, entity)) {
      const grabbed = toggleGrabbed()

      if (grabbed) {
        mutableTransform.position = Vector3.Zero()
        mutableTransform.rotation = Quaternion.Zero()
        mutableTransform.position.z += Z_OFFSET
        mutableTransform.position.y = GROUND_HEIGHT
        mutableTransform.parent = engine.PlayerEntity
      } else {
        mutableTransform.parent = undefined
        const camera = Transform.getOrNull(engine.CameraEntity)
        if (!camera) return

        const forwardVector = Vector3.rotate(Vector3.scale(Vector3.Forward(), Z_OFFSET), camera.rotation)
        mutableTransform.position = Vector3.add(camera.position, forwardVector)
        mutableTransform.rotation.x = 0
        mutableTransform.rotation.z = 0
        mutableTransform.position.y = GROUND_HEIGHT
      }
    }
  }

  // UI with GitHub link
  setupUi()
}

engine.addSystem(grabbingSystem)
