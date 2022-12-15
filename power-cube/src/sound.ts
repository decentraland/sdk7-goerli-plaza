import { AudioSource, AvatarAttach, engine, Transform } from '@dcl/sdk/ecs'

export function createSound(src: string) {
  const entity = engine.addEntity()
  AvatarAttach.create(entity)
  Transform.create(entity)
  AudioSource.create(entity, { audioClipUrl: src })
  return entity
}
