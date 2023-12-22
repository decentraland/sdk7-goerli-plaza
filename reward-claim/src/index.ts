import { GltfContainer, InputAction, MeshCollider, MeshRenderer, Transform, engine, pointerEventsSystem } from '@dcl/sdk/ecs'
import { CONFIG } from './config'
import { Vector3 } from '@dcl/sdk/math'
import { claimToken } from './claim/claim'
import { ClaimConfig } from './claim/claimConfig'
import { setupUi } from './claim/ui'
import { randomCrateSpawn } from './crate'

export function main() {
  CONFIG.init()

  setupUi()

  // UI test - comment this line out
  //openUI('images/scene-thumbnail.png', 'Wearable Name')

  let dispenser = engine.addEntity()
  Transform.create(dispenser, {
    position: Vector3.create(8, 1, 8)
  })

  MeshRenderer.setBox(dispenser)
  MeshCollider.setBox(dispenser)

  pointerEventsSystem.onPointerDown(
    {
      entity: dispenser,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Claim'
      }
    },
    function () {
      let camp = ClaimConfig.campaign.CAMPAIGN_TEST

      claimToken(camp, camp.campaignKeys.KEY_0)
    }
  )



  let airDropTrigger = engine.addEntity()
  Transform.create(airDropTrigger, {
    position: Vector3.create(12, 1, 8)
  })

  MeshRenderer.setBox(airDropTrigger)
  MeshCollider.setBox(airDropTrigger)

  pointerEventsSystem.onPointerDown(
    {
      entity: airDropTrigger,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Air Drop'
      }
    },
    function () {
      let camp = ClaimConfig.campaign.CAMPAIGN_TEST
      randomCrateSpawn(camp, camp.campaignKeys.KEY_0)

    }
  )


  // floor

  let floor = engine.addEntity()

  GltfContainer.create(floor, { src: 'models/baseLight.glb' })

}
