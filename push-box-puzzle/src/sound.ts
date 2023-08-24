import { engine, Entity,AudioSource} from '@dcl/ecs'

export class Sound {

  static audioEntity:Entity

  constructor() {
    Sound.audioEntity = engine.addEntity()
    AudioSource.create(Sound.audioEntity, {
      audioClipUrl: 'sounds/statueMove.mp3',
      playing: false
  })
  }

  static play(): void {
    AudioSource.getMutable(this.audioEntity).playing = true
  }
}
