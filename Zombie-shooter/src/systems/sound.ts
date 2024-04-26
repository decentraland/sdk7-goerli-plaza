import { engine, AudioSource, Entity } from '@dcl/sdk/ecs'

export function playSound(entity: Entity, soundPath: string, rndPitch?: boolean) {
  AudioSource.stopSound(entity)
  AudioSource.playSound(entity, soundPath, true)

  if (rndPitch && AudioSource.has(entity)) {
    const pitch = Math.random() * 2 + 1.7

    AudioSource.getMutable(entity).pitch = pitch
  }
}
