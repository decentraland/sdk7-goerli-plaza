import { AudioSource, Transform, engine } from "@dcl/sdk/ecs"

export class MusicPlayer {
    public musicPlayer = engine.addEntity()
    constructor() {
        Transform.createOrReplace(this.musicPlayer, { parent: engine.PlayerEntity })
    }
    playSong(song: string, vol?: number, noLoop?: boolean) {
        if (AudioSource.has(this.musicPlayer)) {
            AudioSource.getMutable(this.musicPlayer).playing = false
        }
        AudioSource.createOrReplace(this.musicPlayer, {
            audioClipUrl: 'sounds/' + song,
            loop: false,
            playing: true,
        })

        if (noLoop) {
            AudioSource.getMutable(this.musicPlayer).loop = false
        } else {
            AudioSource.getMutable(this.musicPlayer).loop = true
        }

        AudioSource.getMutable(this.musicPlayer).volume = vol ? vol : 1
        AudioSource.getMutable(this.musicPlayer).playing = true
    }

    silence() {
        AudioSource.getMutable(this.musicPlayer).playing = false
    }

}
