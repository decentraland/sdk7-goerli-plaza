import { AudioSource, Entity, Transform, engine } from '@dcl/sdk/ecs'
import { Sounds } from '../gameLogic/sharedConstants'

export function createSound(audioClipUrl: Sounds): void {
  const sound: Entity = engine.addEntity()
  AudioSource.create(sound, { loop: false, audioClipUrl })
  Transform.create(sound, {
    position: Transform.get(engine.CameraEntity).position
  })
}

export function playSound(clip: Sounds): void {
  for (const [sound] of engine.getEntitiesWith(AudioSource)) {
    if (AudioSource.get(sound).audioClipUrl === clip) AudioSource.getMutable(sound).playing = true
  }
}
