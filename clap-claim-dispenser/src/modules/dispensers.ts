import { EasingFunction, engine, Entity, GltfContainer, Material, MaterialTransparencyMode, MeshRenderer, Schemas, Transform, Tween, TweenLoop, TweenSequence } from "@dcl/sdk/ecs"
import { Color3, Color4, Quaternion, Vector3 } from "@dcl/sdk/math"
import * as utils from "@dcl-sdk/utils"
import { TriggerArea, triggerAreaEventsSystem } from '@dcl/sdk/triggers'
import { ClaimConfig, ClaimConfigInstType } from "./claiming/claimConfig"
import { initClapToClaim } from "./clapToClaim"
import { hideClapToast, showClapToast } from "./claiming/ui/clapToClaimUi"

export const DispenserComponent = engine.defineComponent('dispenser-component', {
    isActive: Schemas.Boolean,
    campaignId: Schemas.String,
    campaignKey: Schemas.String,
    startDate: Schemas.Optional(Schemas.String),
    endDate: Schemas.Optional(Schemas.String)
})

export function initDispensers() {
    initClapToClaim()

    createDispenserWithWearable(
        Vector3.create(8, 0, 8), Quaternion.fromEulerDegrees(0, 0, 0),
        "assets/scene/Models/jacket25_wearable.glb",
        ClaimConfig.campaign.Jacket
    );

}

function createDispenserWithWearable(position: Vector3, rotation: Quaternion, wearableSrc: string, campaign: ClaimConfigInstType) {
    const dispenser = engine.addEntity();
    Transform.create(dispenser, {
        position: position,
        rotation: rotation,
        scale: Vector3.create(1.5, 1.5, 1.5),
    });
    GltfContainer.create(dispenser, { src: "assets/scene/Models/dispenser.glb" });

    const wearable = engine.addEntity();
    Transform.create(wearable, {
        position: Vector3.Zero(),
        rotation: Quaternion.create(),
        scale: Vector3.One(),
        parent: dispenser
    });
    GltfContainer.create(wearable, { src: wearableSrc });

    applyWearableTween(wearable);


    // Create a dispenser component to track the active state and campaign info
    // The campaign id and key are used to identify which reward when claiming
    DispenserComponent.create(dispenser, {
        isActive: false,
        campaignId: campaign.campaign,
        campaignKey: campaign.campaignKeys.key,
        startDate: campaign.startDate?.toUTCString(),
        endDate: campaign.endDate?.toUTCString()
    });

    const wearableClaimArea = engine.addEntity()
    Transform.create(wearableClaimArea, {
        position: Vector3.add(Vector3.rotate(Vector3.scale(Vector3.Forward(), 2), rotation), position),
        scale: Vector3.create(2, 2, 2),
    });

    TriggerArea.setShpere(wearableClaimArea)
    Transform.getMutable(wearableClaimArea).scale = Vector3.create(2, 2, 2)
    triggerAreaEventsSystem.onTriggerEnter(wearableClaimArea, () => {
        DispenserComponent.getMutable(dispenser).isActive = true
        showClapToast()
    })
    triggerAreaEventsSystem.onTriggerExit(wearableClaimArea, () => {
        DispenserComponent.getMutable(dispenser).isActive = false
        hideClapToast()
    })

    //const wearableClaimAreaPlatform = engine.addEntity()
    //Transform.create(wearableClaimAreaPlatform, {
    //    position: Transform.get(wearableClaimArea).position,
    //    rotation: Quaternion.fromEulerDegrees(90, 0, 180),
    //    scale: Vector3.create(2, 2, 0.1),
    //});
    //MeshRenderer.setPlane(wearableClaimAreaPlatform)
    //Material.setPbrMaterial(wearableClaimAreaPlatform, {
    //    texture: Material.Texture.Common({
    //        src: 'assets/scene/Models/Clap Here.png',
    //    }),
    //    transparencyMode: MaterialTransparencyMode.MTM_ALPHA_BLEND
    //})
}

function applyWearableTween(entity: Entity) {
    Tween.create(entity, {
        mode: Tween.Mode.Rotate({
            start: Quaternion.fromEulerDegrees(0, -30, 0),
            end: Quaternion.fromEulerDegrees(0, 30, 0),
        }),
        duration: 5000,
        easingFunction: EasingFunction.EF_EASESINE,
    });

    TweenSequence.create(entity, {
        loop: TweenLoop.TL_RESTART,
        sequence: [
            {
                mode: Tween.Mode.Rotate({
                    start: Quaternion.fromEulerDegrees(0, 30, 0),
                    end: Quaternion.fromEulerDegrees(0, -30, 0),
                }),
                duration: 5000,
                easingFunction: EasingFunction.EF_EASESINE,
            },
        ],
    });
}