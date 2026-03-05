import { AudioSource, AudioStream, engine, Entity, Transform } from "@dcl/sdk/ecs";
import { Vector3 } from "@dcl/sdk/math";

interface PlaySoundProps {
    audioClipUrl: string
    loop?: boolean
    volume?: number
    duration_ms?: number
    position?: Vector3
    currentTime?: number
    pitch?: number
}

enum soundTypes {
    'sounds',
    'bgSounds',
    'music'
}

class AudioPlayer {
    private audioEntities: Entity[] = []
    private bgAudioEntity: Entity
    private musicEntity: Entity
    private barMusicEntity: Entity

    private _MAX_SOUND_ENTITIES = 10
    private currentAudioIndex = 0

    private fadeDuration = 2

    playingCentralPlazaBG = false
    private stopTimers = new Map<string, number>()

    constructor() {

        for (let i = 0; i < this._MAX_SOUND_ENTITIES; i++) {
            const entity = engine.addEntity()
            Transform.create(entity)
            this.audioEntities.push(entity)
        }

        this.bgAudioEntity = engine.addEntity()
        Transform.create(this.bgAudioEntity)

        this.musicEntity = engine.addEntity()
        Transform.create(this.musicEntity)

        this.barMusicEntity = engine.addEntity()
        Transform.create(this.barMusicEntity, {position: Vector3.create(45, 1, 9)})

    }

    private getAvailableSoundEntity() {
        this.currentAudioIndex += 1
        if (this.currentAudioIndex >= this._MAX_SOUND_ENTITIES) {
            this.currentAudioIndex = 0
        }

        return this.audioEntities[this.currentAudioIndex]
        // return pool.find(entity => !AudioSource.getOrNull(entity))
    }

    private playSound(props: PlaySoundProps, pool: soundTypes) {
        const { position, audioClipUrl, loop, volume, duration_ms, currentTime, pitch } = props

        let entity
        switch (pool) {
            case (soundTypes.sounds):
                entity = this.getAvailableSoundEntity()
                break
            case (soundTypes.bgSounds):
                entity = this.bgAudioEntity
                break
            case (soundTypes.music):
                entity = this.musicEntity
                break
        }

        // if (!entity) return

        // console.log("audio player entity: ", JSON.stringify(entity))
        this.stopSound(entity)

        if (position) {
            Transform.getMutable(entity).position = position
        }
        AudioSource.createOrReplace(entity, {
            audioClipUrl: audioClipUrl,
            playing: true,
            loop: loop,
            volume: volume || 1,
            global: !position,
            currentTime: currentTime ?? 0,
            pitch: pitch ?? 1
        })

        if (duration_ms) {
            // await delay_ms(duration_ms)
            // this.stopSound(entity)
            this.addDelayedStop(entity, duration_ms / 1000)
        }
        return entity
    }

    private addDelayedStop(entity: Entity, time_s: number) {
        this.stopTimers.set(`${entity}`, time_s)
        let systemName = `stop-${entity}`
        // console.log("creating audio system: ", systemName)

        engine.addSystem((dt: number) => {
            let time = this.stopTimers.get(`${entity}`)

            if (!time) {
                engine.removeSystem(systemName)
                return
            }

            time -= dt
            if (time <= 0) {
                // console.log("audio system timer finished")
                this.stopTimers.delete(`${entity}`)
                this.stopSound(entity)
            } else {
                this.stopTimers.set(`${entity}`, time)
            }

        }, undefined, systemName)
    }

    stopSound(entity: Entity) {
        engine.removeSystem(`stop-${entity}`)
        // console.log("Removing audio system: ", `stop-${entity}`)

        AudioSource.stopSound(entity)
        AudioSource.deleteFrom(entity)
    }

    playSingleSound(props: PlaySoundProps) {
        return this.playSound(props, soundTypes.sounds)
    }

    playMusic(props: PlaySoundProps) {
        this.playSound(props, soundTypes.music)
    }


    stopMusic() {
        this.stopSound(this.musicEntity)
        // this.stopBarMusic()
    }

    playBgSound(props: PlaySoundProps) {
        this.playSound({ loop: true, ...props }, soundTypes.bgSounds)
    }

    stopBgSound() {
        this.stopSound(this.bgAudioEntity)
        this.playingCentralPlazaBG = false
    }

}

export const audioPlayer = new AudioPlayer()