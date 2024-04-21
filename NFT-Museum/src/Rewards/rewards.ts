import { ColliderLayer, engine, GltfContainer, Transform, pointerEventsSystem, InputAction } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math';
import { CONFIG } from './config';
import { claimToken } from "./claim";
import { ClaimConfig } from "./claimConfig";
import * as utils from '@dcl-sdk/utils'
import { confirmationUI } from '../UI/reward.ui';

// Lazy Loading: room: 3
const dispenserModel = 'models/dispenser.glb'
const dispenserPosition = Vector3.create(14.55, 19.53, 16)
const dispenserScale = Vector3.create(0.8, 0.8, 0.8)
const dispenserHoverText = 'Claim Reward'

export const rewardImage = 'images/wearable.png'
export const rewardName = 'Patch Pants'

export let reward = false
export let rewardClaimed = false

export let rewardEntity = engine.addEntity()

export function createWearableReward() {

  if (!rewardClaimed) {

    console.log('creating wearable reward')
    CONFIG.init()

    Transform.create(rewardEntity, {
      position: dispenserPosition,
      scale: dispenserScale
    })

    GltfContainer.create(rewardEntity, {
      src: dispenserModel,
      invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
      visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
    })

    utils.perpetualMotions.startRotation(rewardEntity, Quaternion.fromEulerDegrees(0, 25, 0))

    pointerEventsSystem.onPointerDown(
      {
        entity: rewardEntity,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: dispenserHoverText,
          maxDistance: 16
        }
      },
      function () {
        confirmationUI(rewardImage, rewardName);
        let camp = ClaimConfig.campaign.CAMPAIGN_TEST
        claimToken(camp, camp.campaignKeys.KEY_0)
        console.log('claimed Wearable gift')
        utils.timers.setTimeout(() => { engine.removeEntity(rewardEntity), reward = false }, 1000)
        rewardClaimed = true
      }
    )
    return rewardEntity
  }
  else {
    console.log('reward already collected')
  }
}

