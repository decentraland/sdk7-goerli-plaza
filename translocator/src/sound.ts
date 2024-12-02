import { AudioSource, AvatarAnchorPointType, AvatarAttach, Entity, Transform, engine } from '@dcl/sdk/ecs'

export class Sound {
  entity: Entity

  constructor(audioUrl: string) {
    this.entity = engine.addEntity()
    Transform.create(this.entity,
      {
        parent: engine.PlayerEntity
      }
    )

    AudioSource.create(this.entity, {
      audioClipUrl: audioUrl,
      loop: false,
      playing: false
    })
  }
}
