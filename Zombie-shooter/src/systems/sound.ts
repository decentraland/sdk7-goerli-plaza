import { engine, AudioSource, Entity } from '@dcl/sdk/ecs'



export function playSound(entity: Entity, soundPath: string, rndPitch?: boolean) {

  AudioSource.playSound(entity, soundPath, true)

  if (rndPitch && AudioSource.has(entity)) {
    const pitch = Math.random() * 2 + 1.5

    AudioSource.getMutable(entity).pitch = pitch
  }
}
