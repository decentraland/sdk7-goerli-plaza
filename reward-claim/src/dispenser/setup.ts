import { Animator, engine, GltfContainer, Transform } from "@dcl/sdk/ecs"
import { createDispenser } from "./dispenser"
import { ClaimConfig } from "./claiming/claimConfig"
import { Vector3, Quaternion } from "@dcl/sdk/math"
import { initDispenserUi } from "./claiming/ui/dispenserUi"

export function setupDispenser(){
    
    initDispenserUi()
    if (Date.now() <= new Date("2025-11-03 00:00 UTC").getTime()) {
        
        const dispenserBase = createDispenser(
            ClaimConfig.campaign.CAMPAIGN_TEST, 
            ClaimConfig.campaign.CAMPAIGN_TEST.campaignKeys.key, 
            {
                position: { x: 4, y: 0, z: 8 },
                rotation: Quaternion.fromEulerDegrees(0, 150, 0),
                scale: Vector3.scale(Vector3.One(), 1.1)
            },
            'models/dispenser/Dispenser.glb',
            'models/dispenser/Button.glb',
            'Button',
            'models/dispenser/balloons.glb',
            true
        )
    }
    
}
