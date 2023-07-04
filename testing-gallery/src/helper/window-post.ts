import {
  Entity,
  InputAction,
  Material,
  MeshCollider,
  MeshRenderer,
  PointerEventType,
  PointerEvents,
  Schemas,
  TextShape,
  Transform,
  VideoPlayer,
  engine,
  executeTask,
  inputSystem
} from '@dcl/sdk/ecs'

import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { customInputSystem } from '../input'

type PostOption = {
  fontSize: number
  windowSize: { x: number; y: number }
  thickness: number
  backgroundColor: Color4
  borderColor: Color4
  fontColor: Color4
  title: string
}

const defaultPostOption: PostOption = {
  windowSize: { x: 1, y: 1 },
  thickness: 0.1,
  backgroundColor: Color4.create(0.0, 0.4, 0.8),
  borderColor: Color4.create(0.0, 0.4, 0.8),
  fontSize: 3,
  fontColor: Color4.White(),
  title: 'Untitled'
}

const PointerVideo = engine.defineComponent('PointerVideo', {
  collider: Schemas.Entity,
  src: Schemas.String
})

// this is not good
const callbacks: Map<Entity, { onPauseResume?: () => void; onPrevious?: () => void; onNext?: () => void }> = new Map()
let videoPlayerEntity: Entity | null = null
executeTask(async () => {
  videoPlayerEntity = engine.addEntity()
})
// this is not good

export function createPost(position: Vector3, options: Partial<PostOption> = {}) {
  const { windowSize, thickness, backgroundColor, fontColor, fontSize, title } = { ...defaultPostOption, ...options }

  // Root
  const parent = engine.addEntity()
  Transform.create(parent, { position })

  const extraInfoEntity = engine.addEntity()
  Transform.create(extraInfoEntity, { position: Vector3.create(0, windowSize.y - 0.5, 0), parent })
  TextShape.create(extraInfoEntity, { text: title, fontSize: 1, textColor: Color4.Magenta() })

  // Frame
  createBox(Vector3.create(0, 0, 0), Vector3.create(windowSize.x + 0.1, windowSize.y + 0.1, thickness / 4), parent)
  createBox(Vector3.create(0, 0, 0), Vector3.create(windowSize.x, windowSize.y, thickness / 2), parent, backgroundColor)

  // Interaction
  const colliderEntity = engine.addEntity()
  MeshCollider.setBox(colliderEntity)
  Transform.create(colliderEntity, { scale: Vector3.create(windowSize.x, windowSize.y, thickness), parent })

  PointerEvents.createOrReplace(colliderEntity, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          button: InputAction.IA_ACTION_4,
          hoverText: 'Next'
        }
      },
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          button: InputAction.IA_ACTION_3,
          hoverText: 'Previous'
        }
      },
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          button: InputAction.IA_PRIMARY,
          hoverText: 'Pause/Resume'
        }
      },
      {
        eventType: PointerEventType.PET_HOVER_ENTER,
        eventInfo: {}
      }
    ]
  })

  // Info text
  const labelEntity = engine.addEntity()
  Transform.create(labelEntity, { position: Vector3.create(0, 0, -thickness / 2), parent })
  TextShape.create(labelEntity, {
    text: '',
    textColor: fontColor,
    textWrapping: true,
    fontSize,
    width: windowSize.x,
    height: windowSize.y,
    paddingBottom: 0.1,
    paddingLeft: 0.1,
    paddingRight: 0.1,
    paddingTop: 0.1
  })

  // Info with image texture
  const textureEntity = engine.addEntity()
  Transform.create(textureEntity, {
    position: Vector3.create(0, 0, -thickness / 3),
    scale: Vector3.create(windowSize.x, windowSize.y, 1.0),
    parent
  })
  MeshRenderer.setPlane(textureEntity)

  // Info with video
  const pointerVideoEntity = engine.addEntity()
  PointerVideo.create(pointerVideoEntity)

  callbacks.set(colliderEntity, {})

  return {
    rotate(angle: number) {
      const transform = Transform.getMutable(parent)
      transform.rotation = Quaternion.multiply(transform.rotation, Quaternion.fromAngleAxis(angle, Vector3.Up()))
      return this
    },
    move(v: Vector3) {
      const transform = Transform.getMutable(parent)
      transform.position = Vector3.add(transform.position, v)
      return this
    },
    displayText(text: string, clearTexture: boolean = false) {
      TextShape.getMutable(labelEntity).text = text
      if (clearTexture) {
        Material.deleteFrom(textureEntity)
      }
      return this
    },
    displayVideo(source: string, clearText: boolean = false) {
      PointerVideo.getMutable(pointerVideoEntity).src = source
      Material.setPbrMaterial(textureEntity, {
        texture: {
          tex: {
            $case: 'videoTexture',
            videoTexture: {
              videoPlayerEntity: videoPlayerEntity!
            }
          }
        }
      })
      if (clearText) {
        TextShape.getMutable(labelEntity).text = ''
      }
      return this
    },
    displayImage(source: string, clearText: boolean = false) {
      Material.setPbrMaterial(textureEntity, {
        texture: {
          tex: {
            $case: 'texture',
            texture: {
              src: source
            }
          }
        },
        metallic: 0,
        roughness: 0
      })
      if (clearText) {
        TextShape.getMutable(labelEntity).text = ''
      }
      return this
    },
    onNext(f: () => void) {
      callbacks.get(colliderEntity)!.onNext = f
      return this
    },
    onPrevious(f: () => void) {
      callbacks.get(colliderEntity)!.onPrevious = f
      return this
    },
    onPauseResume(f: () => void) {
      callbacks.get(colliderEntity)!.onPauseResume = f
      return this
    }
  }
}

export function pointerVideoSystem() {
  for (const [_, value] of engine.getEntitiesWith(PointerVideo)) {
    if (
      value.src.length > 0 &&
      inputSystem.isTriggered(InputAction.IA_ANY, PointerEventType.PET_HOVER_ENTER, value.collider)
    ) {
      const videoPlayer = VideoPlayer.getOrCreateMutable(videoPlayerEntity!, {
        playing: true,
        loop: true,
        src: ''
      })
      videoPlayer.playing = true
      videoPlayer.src = value.src
    }
  }
}

export function postColliderSystem() {
  for (const [entity, value] of customInputSystem.getLastTriggered()) {
    const cbs = callbacks.get(entity)
    if (cbs && value.state == 1) {
      if (cbs.onNext && value.button === InputAction.IA_ACTION_4 && value.state == 1) {
        cbs.onNext()
      } else if (cbs.onPrevious && value.button === InputAction.IA_ACTION_3 && value.state == 1) {
        cbs.onPrevious()
      } else if (cbs.onPauseResume && value.button === InputAction.IA_PRIMARY && value.state == 1) {
        cbs.onPauseResume()
      }
    }
  }
}

function createBox(position: Vector3, scale: Vector3, parent: Entity, color?: Color4) {
  const meshEntity = engine.addEntity()
  Transform.create(meshEntity, { position, scale, parent })
  MeshRenderer.setBox(meshEntity)
  if (color) {
    Material.setBasicMaterial(meshEntity, { diffuseColor: color })
  }
  return meshEntity
}
