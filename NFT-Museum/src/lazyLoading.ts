import { Vector3, Quaternion } from '@dcl/sdk/math'
import { Entity, Transform, engine } from '@dcl/sdk/ecs'
import * as utils from '@dcl-sdk/utils'
import { createVideoArt, videoCollection } from './Art/videoArt'
import { createKineticArt, kineticArtCollection } from './Art/kineticArt'
import { createImageArt, imageArtCollection } from './Art/imageArt'
import { createNFT, NFTdata } from './Art/nftArt'
import { createWearableReward, reward, rewardEntity } from './Rewards/rewards'


export let scene1active = true


export function createLazyArea(position: Vector3, scale: Vector3, parentPos: Entity, id: number,) {
  const entity = engine.addEntity()

  Transform.create(entity, {
    position: position,
    scale: scale,
    parent: parentPos
  })


  const box = engine.addEntity()
  Transform.create(box, { parent: parentPos, scale: scale })

  let createdNfts: Entity[] = []

  let createdVideos: Entity[] = []

  let createdKineticArt: Entity[] = []

  let createdImages: Entity[] = []

  utils.triggers.addTrigger(
    box,
    utils.LAYER_2,
    utils.LAYER_1,
    [{
      type: 'box',
      position: position,
      scale: scale
    }],
    function (onenter) {

      if (scene1active) {
        console.log(`ACTIVE`)
        console.log(`ENTERED ` + id)

        createdNfts = []
        createdVideos = []
        createdKineticArt = []
        createdImages = []

        for (const nft of NFTdata) {
          if (nft.room === id) {
            const nftArt = createNFT(nft)
            createdNfts.push(nftArt)
          }
        }
        for (const video of videoCollection) {
          if (video.room === id) {
            const videoData = (video.position, video.rotation, video.scale, video.image, video.video, video.hoverText, video.website, video.triggerScale, video.triggerPosition, video.audio, video.hasAlpha)
            const videoArt = createVideoArt(video.position, video.rotation, video.scale, video.image, video.video, video.hoverText, video.website, video.triggerScale, video.triggerPosition, video.audio, video.hasAlpha);
            if (videoArt !== null) {
              createdVideos.push(videoArt);
            } else {
              console.error('Failed to create video art entity.');
              return null
            }
          }
        }
        for (const kineticArt of kineticArtCollection) {
          if (kineticArt.room === id) {
            const kinetic = createKineticArt(kineticArt.position, kineticArt.rotation, kineticArt.scale, kineticArt.triggerPosition, kineticArt.triggerScale, kineticArt.modelPath, kineticArt.animationClip, kineticArt.audio, kineticArt.url, kineticArt.hoverText)
            createdKineticArt.push(kinetic)
          }
        }
        for (const imageArt of imageArtCollection) {
          if (imageArt.room === id) {
            const image = createImageArt(imageArt.position, imageArt.rotation, imageArt.scale, imageArt.image, imageArt.hoverText, imageArt.url, imageArt.hasAlpha)
            createdImages.push(image)
          }
        }
        if (id === 3) {
          createWearableReward()
        }

      }
    },
    () => {
      console.log('LEFT')
      for (const nft of createdNfts) {
        engine.removeEntity(nft)
      }
      for (const videoArt of createdVideos) {
        engine.removeEntity(videoArt)
      }
      for (const kinetic of createdKineticArt) {
        engine.removeEntity(kinetic)
      }
      for (const image of createdImages) {
        engine.removeEntity(image)
      }
      if (reward) {
        engine.removeEntity(rewardEntity)
      }

      createdNfts = []
      createdVideos = []
      createdKineticArt = []
      createdImages = []


    }
  )
  //utils.triggers.enableDebugDraw(true)

  return entity
}



export function creatAllLazyAreas() {
  const lazyParent = engine.addEntity()

  Transform.create(lazyParent, {
    position: Vector3.create(0, 0, 0),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1)
  })

  const lazyArea = engine.addEntity()
  Transform.create(lazyArea, {
    position: Vector3.create(0, 0, 0),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1),
    parent: lazyParent
  })

  const lazyArea2 = engine.addEntity()
  Transform.create(lazyArea2, {
    position: Vector3.create(10, 6, 8),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1),
    parent: lazyParent
  })


  const lazyArea3 = engine.addEntity()
  Transform.create(lazyArea3, {
    position: Vector3.create(10, 12.5, 8),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1),
    parent: lazyParent
  })

  createLazyArea(Vector3.create(6.65, 10.5, 8), Vector3.create(30, 10, 30), lazyArea3, 3)
  createLazyArea(Vector3.create(6.65, 5.5, 8), Vector3.create(26.2, 10, 32), lazyArea2, 2)
  createLazyArea(Vector3.create(8.5, 1.5, 16), Vector3.create(16.2, 10, 26), lazyArea, 1)

}
