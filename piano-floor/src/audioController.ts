import { engine, AudioSource, Entity } from '@dcl/sdk/ecs'
import resources from './resources'

export const notes = [
  'c3',
  'd3',
  'e3',
  'f3',
  'g3',
  'a3',
  'b3',
  'c4',
  'd4',
  'e4',
  'f4',
  'g4',
  'a4',
  'b4',
  'cSharp3',
  'dSharp3',
  'fSharp3',
  'gSharp3',
  'aSharp3',
  'cSharp4',
  'dSharp4',
  'fSharp4',
  'gSharp4',
  'aSharp4'
]

export class AudioController {
  public static baseSoundUrl = 'sounds/whiteKeys/c4.mp3'
  public static calculatePitch = (note: string): number => {
    const pitchMap: { [key: string]: number } = {
      c3: 60,
      d3: 62,
      e3: 64,
      f3: 65,
      g3: 67,
      a3: 69,
      b3: 71,
      c4: 72,
      d4: 74,
      e4: 76,
      f4: 77,
      g4: 79,
      a4: 81,
      b4: 83,
      cSharp3: 61,
      dSharp3: 63,
      fSharp3: 66,
      gSharp3: 68,
      aSharp3: 70,
      cSharp4: 73,
      dSharp4: 75,
      fSharp4: 78,
      gSharp4: 80,
      aSharp4: 82
    }
    const noteString = `c${note}`
    return pitchMap[note] || 1.0
  }

  public getSoundPathForNote = (note: string): string => {
    const isBlackKey = note.includes('Sharp')
    const baseSoundUrl = note.includes('Sharp') ? resources.sounds.blackKeys.aSharp3 : resources.sounds.whiteKeys.c4
    console.log('Note:', note)
    console.log('Base Sound URL:', baseSoundUrl)
    return baseSoundUrl
  }

  constructor() {
    this.setupAudio()
  }

  public setupAudio() {
    notes.forEach((note) => {
      const soundEntity = engine.addEntity()
      AudioSource.create(soundEntity, {
        audioClipUrl: this.getSoundPathForNote(note),
        loop: false,
        playing: false,
        pitch: AudioController.calculatePitch(note)
      })
    })
  }

  public playSound(note: string) {
    const soundEntities = Array.from(engine.getEntitiesWith(AudioSource))
    if (soundEntities.length > 0) {
      const audioSource = AudioSource.getMutable(soundEntities[0][0])
      audioSource.pitch = AudioController.calculatePitch(note)
      audioSource.playing = true
    }
  }

  public createAudioEntity(note: string, isBlackKey: boolean): Entity {
    const audioEntity = engine.addEntity()
    const baseSoundUrl = isBlackKey ? 'sounds/blackKeys/aSharp3.mp3' : 'sounds/whiteKeys/c4.mp3'

    AudioSource.create(audioEntity, {
      audioClipUrl: baseSoundUrl,
      loop: false,
      playing: true,
      pitch: AudioController.calculatePitch(note)
    })
    return audioEntity
  }
}
