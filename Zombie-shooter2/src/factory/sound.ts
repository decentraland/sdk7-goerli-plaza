import { Entity, AudioSource } from '@dcl/sdk/ecs'

export function playSound(entity: Entity, soundPath: string, rndPitch?: boolean) {
  const pitch = rndPitch ? Math.random() * 3 + 0.3 : 1

  if (AudioSource.has(entity)) {
    const source = AudioSource.getMutable(entity)
    ;(source.audioClipUrl = soundPath), (source.loop = false)
    source.playing = true
    source.pitch = pitch
  } else {
    AudioSource.create(entity, {
      audioClipUrl: soundPath,
      loop: false,
      pitch: pitch,
      playing: true
    })
  }
}
