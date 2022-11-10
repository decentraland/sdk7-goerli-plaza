import { MoveAnimation, Song, SongButton } from '../definitions'

const buttonPositionClicked = Vector3.create(0, 0, 0.02)
const buttonPositionReleased = Vector3.create(0, 0, -0.04)

function play(entity: Entity) {
  if (AudioSource.get(entity).playing) {
    return
  }

  AudioSource.getMutable(entity).playing = true

  let initialPosition = 0
  const prevMove = MoveAnimation.getOrNull(entity)
  if (prevMove) {
    initialPosition = 1 - prevMove.currentPosition
  }

  MoveAnimation.createOrReplace(entity, {
    from: buttonPositionReleased,
    to: buttonPositionClicked,
    deltaMultiplier: 2,
    currentPosition: initialPosition
  })
}

function stop(entity: Entity) {
  if (!AudioSource.get(entity).playing) {
    return
  }

  AudioSource.getMutable(entity).playing = false

  let initialPosition = 0
  const prevMove = MoveAnimation.getOrNull(entity)
  if (prevMove) {
    initialPosition = 1 - prevMove.currentPosition
  }

  MoveAnimation.createOrReplace(entity, {
    to: buttonPositionReleased,
    from: buttonPositionClicked,
    deltaMultiplier: 2,
    currentPosition: initialPosition
  })
}

export function createSongButton(parent: Entity, x: number, y: number, song: Song) {
  // groups the button itself and label
  const buttonWrapper = engine.addEntity()
  Transform.create(buttonWrapper, {
    position: Vector3.create(x, y, 0.7),
    rotation: Quaternion.fromEulerDegress(0, 180, 0),
    parent
  })

  const buttonLabel = engine.addEntity()
  Transform.create(buttonLabel, {
    position: Vector3.create(0.05, 0.053, -0.1),
    rotation: Quaternion.fromEulerDegress(0, -180, 0),
    parent: buttonWrapper
  })

  TextShape.create(buttonLabel, {
    fontSize: 1,
    textAlign: TextAlignMode.TAM_TOP_LEFT,
    text: song.name,
    textColor: Color4.White(),
    font: Font.F_LIBERATION_SANS
  })

  const button = engine.addEntity()
  Transform.create(button, {
    position: Vector3.create(0, 0, -0.04),
    rotation: Quaternion.fromEulerDegress(270, 0, 0),
    scale: Vector3.create(0.3, 0.3, 0.3),
    parent: buttonWrapper
  })
  GltfContainer.create(button, { src: 'models/Button.glb' })

  SongButton.create(button, {
    jukebox: parent
  })

  AudioSource.create(button, {
    playing: false,
    volume: 1,
    loop: true,
    audioClipUrl: song.src
  })

  EventsSystem.onPointerDown(
    button,
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
    },
    {
      button: InputAction.IA_POINTER
    }
  )
}
