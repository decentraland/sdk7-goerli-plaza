import { InputAction, MeshCollider, MeshRenderer, Transform, engine, pointerEventsSystem } from "@dcl/sdk/ecs";
import { CONFIG } from "./config";
import { Vector3 } from "@dcl/sdk/math";
import { claimToken } from "./claim-dropin/claim";
import { ClaimConfig } from "./claim-dropin/claimConfig";
import { setupUi } from "./claim-dropin/ui";


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
}