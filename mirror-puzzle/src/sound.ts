import { AudioSource, Entity, Transform, engine } from '@dcl/sdk/ecs'

export class Sound {
  private sourceEntity: Entity | null = null

  constructor(audioClipUrl: string, loop: boolean) {
    this.sourceEntity = engine.addEntity()

    Transform.create(this.sourceEntity, {
      parent: engine.CameraEntity
    })

    AudioSource.create(this.sourceEntity, {
      audioClipUrl: audioClipUrl,
      loop: loop,
      playing: false
    })
  }

  playAudio(): void {
    if (this.sourceEntity === undefined || this.sourceEntity === null) return

    const audioSource = AudioSource.getMutable(this.sourceEntity)
    audioSource.playing = true
  }

  stopAudio(): void {
    if (this.sourceEntity === undefined || this.sourceEntity === null) return

    const audioSource = AudioSource.getMutable(this.sourceEntity)
    audioSource.playing = false
  }
}
