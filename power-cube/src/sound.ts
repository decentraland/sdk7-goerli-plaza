import { AudioSource, AvatarAttach, engine, Transform } from '@dcl/sdk/ecs'

export function createSound(src: string) {
  const entity = engine.addEntity()
  Transform.create(entity)
  AudioSource.create(entity, { audioClipUrl: src, playing: false })
  return entity
}
