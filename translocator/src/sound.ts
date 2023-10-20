import { AudioSource, AvatarAnchorPointType, AvatarAttach, Entity, Transform, engine } from "@dcl/sdk/ecs"

export class Sound {
    entity: Entity

    constructor(audioUrl: string) {
        this.entity = engine.addEntity()
        Transform.create(this.entity)

        AudioSource.create(this.entity, {
            audioClipUrl: audioUrl,
            loop: false,
            playing: false
        })

        AvatarAttach.create(this.entity, { // Play the sound wherever the player is standing
            anchorPointId: AvatarAnchorPointType.AAPT_POSITION
        })
    }
}
