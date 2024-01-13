import { CONFIG } from '../config'
import { NpcAnimationNameType, REGISTRY } from '../registry'
import { RESOURCES } from '../resources'
import { TourState } from './tourTypes'
import { Vector3 } from '@dcl/ecs-math'
import { engine, MeshCollider, Transform, Material, AvatarModifierArea, AvatarModifierType, Entity, executeTask } from '@dcl/ecs'
import *  as  npc from 'dcl-npc-toolkit'
import { getUserData } from '~system/UserIdentity'

const ANIM_TIME_PADD = .2
const NPC_ANIMATIONS: NpcAnimationNameType = {
    IDLE: { name: "Idle", duration: -1 },
    WALK: { name: "Walk", duration: -1 },
    RUN: { name: "Run", duration: -1 },
    WAVE: { name: "Wave", duration: 2.46 + ANIM_TIME_PADD },
    HEART_WITH_HANDS: { name: "Heart_With_Hands", duration: 1.76 + ANIM_TIME_PADD },
    COME_ON: { name: "Come_On", duration: 1.96 + ANIM_TIME_PADD },
}

REGISTRY.npcAnimations = NPC_ANIMATIONS

let myNPC: Entity

export function setupNPC() {
    myNPC = npc.create(
        { position: Vector3.create(1, 0.1, 1) },
        {
            type: npc.NPCType.CUSTOM,
            model: 'models/whiteRabbit_Anim.glb',//'models/Placeholder_NPC_02.glb',
            onActivate: () => {
                console.log('NPC activated!', REGISTRY.tourManager.tourState)
                if (REGISTRY.tourManager.tourState == TourState.TOURING_START || REGISTRY.tourManager.tourState == TourState.TOURING) {
                    npc.talk(REGISTRY.tourManager.npc, REGISTRY.WhiteRabbitDialog, REGISTRY.tourManager.pickRandomDialog(REGISTRY.dialogKeepUpDialogIds));
                } else if (
                    REGISTRY.tourManager.tourState == TourState.NPC_FIND_PLAYER_TO_START || REGISTRY.tourManager.tourState == TourState.NPC_ASK_TOUR
                    || REGISTRY.tourManager.tourState == TourState.PLAYER_FIND_NPC
                ) {
                    REGISTRY.tourManager.npcStopWalking()
                    npc.talk(REGISTRY.tourManager.npc, REGISTRY.WhiteRabbitDialog, REGISTRY.tourManager.getNPCAskForTourDialog());
                    console.log("HEART")
                    npc.playAnimation(REGISTRY.tourManager.npc, REGISTRY.npcAnimations.HEART_WITH_HANDS.name, true, REGISTRY.npcAnimations.HEART_WITH_HANDS.duration);
                } else if (REGISTRY.tourManager.tourState == TourState.TOUR_COMPLETE) {
                    npc.talk(REGISTRY.tourManager.npc, REGISTRY.WhiteRabbitDialog, REGISTRY.tourManager.pickRandomDialog(REGISTRY.dialogSideCommentaryDialogIdsPostTourComplete));
                } else {
                    npc.talk(REGISTRY.tourManager.npc, REGISTRY.WhiteRabbitDialog, REGISTRY.tourManager.pickRandomDialog(REGISTRY.dialogSideCommentaryDialogIds));
                }
            },
            idleAnim: NPC_ANIMATIONS.IDLE.name,
            walkingAnim: NPC_ANIMATIONS.RUN.name,
            // walkingSpeed: 15,//11 on full scale seems tiny big faster. 15 is roughlly player run speed, 20 is roughly fast enough to keep out of player range
            faceUser: true,
            portrait: { path: 'images/whiteRabitPortrait.png', height: 250, width: 250, offsetX: 0 /*75*/ },
            darkUI: true,
            coolDownDuration: 3,
            hoverText: 'CHAT',
            onlyClickTrigger: false,
            onlyExternalTrigger: false,
            reactDistance: 5, //KEEP IT UNDER STOPPING DISTANCE
            continueOnWalkAway: true,
            // dialogCustomTheme: RESOURCES.textures.dialogAtlas,
            onWalkAway: () => {
                console.log('walked away')
            }
        }
    )

    const collider = engine.addEntity()
    MeshCollider.setBox(collider)
    Material.setPbrMaterial(collider, RESOURCES.materials.transparent)
    Transform.create(collider, {
        position: Vector3.create(0, 1, 0),
        scale: Vector3.create(.5, 2, .5),
        parent: myNPC
    })
    //engine.addEntity(collider)

    const hidePlayerModArea = engine.addEntity()

    executeTask(async () => {
        let user = await getUserData({})
        if (user !== null && CONFIG.NPC_HIDE_PLAYER_MODIFIER_ENABLED) {
            AvatarModifierArea.create(hidePlayerModArea, {
                area: Vector3.create(CONFIG.NPC_HIDE_PLAYER_WIDTH, 2, CONFIG.NPC_HIDE_PLAYER_WIDTH), //debug mode only hide when in car so can see player when walking around,
                excludeIds: [user.data?.userId || ''],
                modifiers: [AvatarModifierType.AMT_HIDE_AVATARS]
            })
            Transform.create(hidePlayerModArea, {
                position: Vector3.create(0, 1, 0),
                scale: Vector3.create(.5, 2, .5),
                parent: myNPC
            })
        }
    })
    //engine.addEntity(collider)
    REGISTRY.myNPC = myNPC

    // npc.getData(myNPC).dialog.text.hTextAlign = 'center'
}
/*
export let xmasTheme = new Texture('images/npcAtlas.png')

myNPC.dialog = new npc.DialogWindow(
  {
    path: 'images/elf_02.png',
    offsetX: 50,
    offsetY: 30,
    width: 256,
    height: 256,
    section: { sourceWidth: 256, sourceHeight: 256 },
  },
  false,
  undefined,
  xmasTheme
)
myNPC.dialog.panel.positionY = 20
myNPC.dialog.leftClickIcon.positionX = 340 - 40
myNPC.dialog.leftClickIcon.positionY = -80 + 40
myNPC.dialog.text.fontSize = 18
myNPC.dialog.text.color = Color4.Black()
*/