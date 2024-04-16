import { ColliderLayer, GltfContainer, InputAction, Transform, TransformType, engine, pointerEventsSystem } from "@dcl/sdk/ecs";
import { Quaternion, Vector3 } from "@dcl/sdk/math";
import { openExternalUrl } from "~system/RestrictedActions";

// Socials GLB Models:
const discordShape = 'models/social_media/discord.glb'
const homepageShape = 'models/social_media/homepage.glb'
const telegramShape = 'models/social_media/telegram.glb'
const xShape = 'models/social_media/x.glb'
const instagramShape = 'models/social_media/x.glb'


const defaultScale = Vector3.create(0.8, 0.8, 0.8) // model size


// Socials URLs
export const discordUrl = 'https://linktr.ee/lowpolymodelsworld'
export const homepageUrl = 'https://www.lowpolymodelsworld.com/'
export const telegramUrl = 'https://linktr.ee/lowpolymodelsworld'
export const xUrl = 'https://twitter.com/LowPolyModelsW'
export const instagramUrl = 'https://www.instagram.com/LowPolyModelsW/'
export let linktreeURL = 'https://linktr.ee/lowpolymodelsworld'


// Socials Hover Text 
const discordHoverText = 'Discord'
const homepageHoverText = 'Website'
const telegramHoverText = 'Telegram'
const xHoverText = 'X'
const instagramHoverText = 'Instagram'


/// Positions
// South social links
const Xsouth = {
    position: Vector3.create(3, 1.92, 2.75),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: defaultScale
}
const discordSouth = {
    position: Vector3.create(4.5, 1.92, 2.75),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: defaultScale
}
const homepageSouth = {
    position: Vector3.create(6, 1.92, 2.75),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: defaultScale
}
const instagramSouth = {
    position: Vector3.create(7.5, 1.92, 2.75),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: defaultScale
}
const telegramSouth = {
    position: Vector3.create(9, 1.92, 2.75),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: defaultScale
}


// North social links
const Xnorth = {
    position: Vector3.create(9, 1.92, 29.25),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: defaultScale
}
const discordNorth = {
    position: Vector3.create(7.5, 1.92, 29.25),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: defaultScale
}
const homepageNorth = {
    position: Vector3.create(6, 1.92, 29.25),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: defaultScale
}
const instagramNorth = {
    position: Vector3.create(4.5, 1.92, 29.25),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: defaultScale
}
const telegramNorth = {
    position: Vector3.create(3, 1.92, 29.25),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: defaultScale
}



export function createSocialLink(
    position: TransformType,
    modelPath: string,
    hoverText: string,
    url: string
) {
    const entity = engine.addEntity()
    Transform.create(entity, {
        position: position.position,
        rotation: position.rotation,
        scale: position.scale,
        parent: position.parent
    })
    GltfContainer.create(entity, {
        src: modelPath,
        invisibleMeshesCollisionMask: ColliderLayer.CL_POINTER || ColliderLayer.CL_PHYSICS
    })
    pointerEventsSystem.onPointerDown(
        {
            entity: entity,
            opts: {
                button: InputAction.IA_POINTER,
                hoverText: hoverText,
            },
        },
        function () {
            console.log('clicked artwork');
            openExternalUrl({
                url: url
            });
        }
    );
}

export function createSocials() {
    createSocialLink(
        Xsouth,
        xShape,
        xHoverText,
        xUrl
    )
    createSocialLink(
        Xnorth,
        xShape,
        xHoverText,
        xUrl
    )
    createSocialLink(
        discordSouth,
        discordShape,
        discordHoverText,
        discordUrl
    )
    createSocialLink(
        discordNorth,
        discordShape,
        discordHoverText,
        discordUrl
    )
    createSocialLink(
        homepageNorth,
        homepageShape,
        homepageHoverText,
        homepageUrl
    )
    createSocialLink(
        homepageSouth,
        homepageShape,
        homepageHoverText,
        homepageUrl
    )
    createSocialLink(
        instagramNorth,
        instagramShape,
        instagramHoverText,
        instagramUrl
    )
    createSocialLink(
        instagramSouth,
        instagramShape,
        instagramHoverText,
        instagramUrl
    )
    createSocialLink(
        telegramSouth,
        telegramShape,
        telegramHoverText,
        telegramUrl
    )
    createSocialLink(
        telegramNorth,
        telegramShape,
        telegramHoverText,
        telegramUrl
    )

}
