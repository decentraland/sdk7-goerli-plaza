import *  as  npc from 'dcl-npc-toolkit'
import { ITourManager } from "./npc-tour/tourManagerInterface"
import { GrandGiftBox } from "./sceneItems/grandGift"
import { Entity } from '@dcl/sdk/ecs'


export type NpcAnimationNameDef = {
    name: string
    duration: number
    autoStart?: boolean
}
export type NpcAnimationNameType = {
    IDLE: NpcAnimationNameDef
    WALK: NpcAnimationNameDef
    RUN: NpcAnimationNameDef
    WAVE: NpcAnimationNameDef
    HEART_WITH_HANDS: NpcAnimationNameDef
    COME_ON: NpcAnimationNameDef
}

export class Registry {
    myNPC!: Entity
    bannerEntity!: Entity
    tourManager!: ITourManager
    leavingQuestAreaUI!: any
    GIFT!: GrandGiftBox

    //TODO manage better
    debugCubeEnt: Entity[] = []
    crumbCubeEnt: Entity[] = []

    npcAnimations!: NpcAnimationNameType
    WhiteRabbitDialog!: npc.Dialog[]
    dialogKeepUpDialogIds!: string[]
    dialogSideCommentaryDialogIds!: string[]
    dialogSideCommentaryDialogIdsPostTourComplete!: string[]

}

export const REGISTRY = new Registry()

export function initRegistry() {

}