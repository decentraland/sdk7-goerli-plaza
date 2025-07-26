import { ColliderLayer, GltfContainer, InputAction, Transform, engine, pointerEventsSystem } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { openExternalUrl } from '~system/RestrictedActions'

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

// Socials GLB Models:
const discordShape = 'assets/scene/Models/social_media/discord.glb'
const homepageShape = 'assets/scene/Models/social_media/homepage.glb'
const telegramShape = 'assets/scene/Models/social_media/telegram.glb'
const xShape = 'assets/scene/Models/social_media/x.glb'
const instagramShape = 'assets/scene/Models/social_media/x.glb'

const defaultScale = Vector3.create(0.8, 0.8, 0.8) // model size

export function createSocials() {
  const socialLinkPositions: SocialLinkParams[] = [
    // South social links
    {
      position: Vector3.create(3, 1.92, 2.75),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: defaultScale,
      modelPath: xShape,
      hoverText: xHoverText,
      url: xUrl
    },
    {
      position: Vector3.create(4.5, 1.92, 2.75),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: defaultScale,
      modelPath: discordShape,
      hoverText: discordHoverText,
      url: discordUrl
    },
    {
      position: Vector3.create(6, 1.92, 2.75),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: defaultScale,
      modelPath: homepageShape,
      hoverText: homepageHoverText,
      url: homepageUrl
    },
    {
      position: Vector3.create(7.5, 1.92, 2.75),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: defaultScale,
      modelPath: instagramShape,
      hoverText: instagramHoverText,
      url: instagramUrl
    },
    {
      position: Vector3.create(9, 1.92, 2.75),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: defaultScale,
      modelPath: telegramShape,
      hoverText: telegramHoverText,
      url: telegramUrl
    },

    /// North social links
    {
      position: Vector3.create(9, 1.92, 29.25),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: defaultScale,
      modelPath: xShape,
      hoverText: xHoverText,
      url: xUrl
    },
    {
      position: Vector3.create(7.5, 1.92, 29.25),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: defaultScale,
      modelPath: discordShape,
      hoverText: discordHoverText,
      url: discordUrl
    },
    {
      position: Vector3.create(6, 1.92, 29.25),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: defaultScale,
      modelPath: homepageShape,
      hoverText: homepageHoverText,
      url: homepageUrl
    },
    {
      position: Vector3.create(4.5, 1.92, 29.25),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: defaultScale,
      modelPath: instagramShape,
      hoverText: instagramHoverText,
      url: instagramUrl
    },
    {
      position: Vector3.create(3, 1.92, 29.25),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: defaultScale,
      modelPath: telegramShape,
      hoverText: telegramHoverText,
      url: telegramUrl
    }
  ]

  for (const params of socialLinkPositions) {
    createSocialLink(params)
  }
}

export function createSocialLink(params: SocialLinkParams) {
  const entity = engine.addEntity()
  Transform.create(entity, {
    position: params.position,
    rotation: params.rotation,
    scale: params.scale
  })
  GltfContainer.create(entity, {
    src: params.modelPath,
    invisibleMeshesCollisionMask: ColliderLayer.CL_POINTER | ColliderLayer.CL_PHYSICS
  })
  pointerEventsSystem.onPointerDown(
    {
      entity: entity,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: params.hoverText
      }
    },
    function () {
      console.log('clicked artwork')
      openExternalUrl({
        url: params.url
      })
    }
  )
}

interface SocialLinkParams {
  position: Vector3
  rotation: Quaternion
  scale: Vector3
  modelPath: string
  hoverText: string
  url: string
}
