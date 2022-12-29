import { engine, AudioSource, Entity } from "@dcl/sdk/ecs"

type State = {
  t: number
}

export function playSounds(dt: number, state: State) {
  state.t += dt
  if (state.t < 4) {
    return
  }
  state.t = 0

  const entitiesWSound = engine.getEntitiesWith(AudioSource)
  for (const [entity] of entitiesWSound) {
    const audioSource = AudioSource.getMutable(entity)
    audioSource.volume = 1
    audioSource.pitch = Math.random() * 5
    audioSource.playing = true
  }
}

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
