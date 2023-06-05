import {
  Entity,
  AudioSource,
  engine,
  Transform,
  TextShape,
  TextAlignMode,
  Font,
  GltfContainer,
  InputAction,
  pointerEventsSystem,
  ColliderLayer
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math'
import { Song, SongButton } from '../definitions'
import * as utils from '@dcl-sdk/utils'

const buttonPositionClicked = Vector3.create(0, 0, 0.02)
const buttonPositionReleased = Vector3.create(0, 0, -0.04)

function play(entity: Entity) {
  if (AudioSource.get(entity).playing) {
    return
  }

  AudioSource.getMutable(entity).playing = true

  let initialPosition = 0

  utils.tweens.startTranslation(entity, buttonPositionReleased, buttonPositionClicked, 0.3)
}

function stop(entity: Entity) {
  if (!AudioSource.get(entity).playing) {
    return
  }

  AudioSource.getMutable(entity).playing = false

  let initialPosition = 0

  utils.tweens.startTranslation(entity, buttonPositionClicked, buttonPositionReleased, 0.3)
}

export function createSongButton(parent: Entity, x: number, y: number, song: Song) {
  // groups the button itself and label
  const buttonWrapper = engine.addEntity()
  Transform.create(buttonWrapper, {
    position: Vector3.create(x, y, 0.7),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    parent
  })

  const buttonLabel = engine.addEntity()
  Transform.create(buttonLabel, {
    position: Vector3.create(0.05, 0.053, -0.1),
    parent: buttonWrapper
  })

  TextShape.create(buttonLabel, {
    fontSize: 1,
    textAlign: TextAlignMode.TAM_TOP_LEFT,
    text: song.name,
    textColor: Color4.White(),
    font: Font.F_SANS_SERIF
  })

  const button = engine.addEntity()
  Transform.create(button, {
    position: Vector3.create(0, 0, -0.04),
    rotation: Quaternion.fromEulerDegrees(270, 0, 0),
    scale: Vector3.create(0.3, 0.3, 0.3),
    parent: buttonWrapper
  })
  GltfContainer.create(button, {
    src: 'models/Button.glb',
    visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
    invisibleMeshesCollisionMask: undefined
  })

  SongButton.create(button, {
    jukebox: parent
  })

  AudioSource.create(button, {
    playing: false,
    volume: 1,
    loop: true,
    audioClipUrl: song.src
  })

  pointerEventsSystem.onPointerDown(
    {
      entity: button,
      opts: {
        hoverText: 'Play',
        button: InputAction.IA_POINTER
      }
    },
    () => {
      const { jukebox } = SongButton.get(button)
      if (AudioSource.get(button).playing) {
        stop(button)
      } else {
        // If I play this song, the others should stop
        for (const [ent, songButton, ___, __] of engine.getEntitiesWith(SongButton, Transform, AudioSource)) {
          if (songButton.jukebox === jukebox) {
            stop(ent)
          }
        }
        play(button)
      }
    }
  )
}
