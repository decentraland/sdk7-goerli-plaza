import { engine, Entity, AudioSource } from '@dcl/ecs'
import { Transform } from '@dcl/sdk/ecs'

export class Sound {
  static statueMoveAudioEntity: Entity
  static powerUpAudioEntity: Entity
  static completeAudioEntity: Entity

  constructor() {
    Sound.statueMoveAudioEntity = engine.addEntity()
    Transform.create(Sound.statueMoveAudioEntity)
    AudioSource.create(Sound.statueMoveAudioEntity, {
      audioClipUrl: 'assets/scene/Audio/statueMove.mp3',
      playing: false
    })

    Sound.powerUpAudioEntity = engine.addEntity()
    Transform.create(Sound.powerUpAudioEntity)
    AudioSource.create(Sound.powerUpAudioEntity, {
      audioClipUrl: 'assets/scene/Audio/powerup.mp3',
      playing: false
    })

    Sound.completeAudioEntity = engine.addEntity()
    Transform.create(Sound.completeAudioEntity)
    AudioSource.create(Sound.completeAudioEntity, {
      audioClipUrl: 'assets/scene/Audio/complete.mp3',
      playing: false
    })
  }

  static playStatueMove(): void {
    Transform.getMutable(this.statueMoveAudioEntity).position = Transform.get(engine.CameraEntity).position
    AudioSource.getMutable(this.statueMoveAudioEntity).playing = true
  }

  static playPowerup(): void {
    Transform.getMutable(this.powerUpAudioEntity).position = Transform.get(engine.CameraEntity).position
    AudioSource.getMutable(this.powerUpAudioEntity).playing = true
  }

  static playComplete(): void {
    Transform.getMutable(this.completeAudioEntity).position = Transform.get(engine.CameraEntity).position
    AudioSource.getMutable(this.completeAudioEntity).playing = true
  }
}
