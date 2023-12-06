import *  as  npc from 'dcl-npc-toolkit'
import { REGISTRY } from "../registry"
import { TourState } from './tourTypes'
import * as utils from '@dcl-sdk/utils'

let autoCloseDialog = false

const followWhiteRabbitButtons = [
    {
        label: "Yes", goToDialog: "follow-yes", triggeredActions: () => {
            npc.playAnimation(REGISTRY.myNPC, REGISTRY.npcAnimations.COME_ON.name, true, REGISTRY.npcAnimations.COME_ON.duration)
            autoCloseDialog = true
            // utils.timers.setTimeout(() => {
            //     /*
            //     autoCloseDialog = false
            //     if(REGISTRY.tourManager.npc.dialog.isDialogOpen){
            //       log("dialog open.closing.fired ")
            //       if(autoCloseDialog){
            //         //TODO FIX AUTO CLOSE, NEED TO TO detect if it the Come On window still or not
            //         REGISTRY.tourManager.npc.dialog.closeDialogWindow()
            //         if( REGISTRY.tourManager.tourState != TourState.TOURING
            //           && REGISTRY.tourManager.tourState != TourState.TOURING_WAITING_4_PLAYER ){
            //           REGISTRY.tourManager.setTourState(TourState.TOURING_START)
            //         }else{
            //           //is it the keep up one???
            //           //debugger
            //         }
            //       }else{
            //         log("dialog open.closing.not acted upon ")
            //       }

            //     }else{
            //       log("dialog already closed")
            //     }*/
            // }, 5000)
        }
    },
    { label: "No", goToDialog: "follow-no" }
]

const askFollowWhiteRabbitDialog = {
    name: "ask-follow-white-rabbit-q",
    text: "Follow the White Rabbit?",
    //offsetX: 60,
    isQuestion: true,
    skipable: false,
    buttons: followWhiteRabbitButtons,
}

const WhiteRabbitDialog: npc.Dialog[] = [
    {
        name: "ask-follow-white-rabbit-over",
        //text: "I know where there is secret party.",
        text: "Want to train with me?", //first encounter/challenge
        //offsetX: 60,
        isQuestion: false,
        skipable: false,
    },
    askFollowWhiteRabbitDialog,
    {
        name: "ask-follow-white-rabbit-training",
        //text: "I know where there is secret party.",
        text: "Want to train with me for the up coming festival?", //first encounter/challenge
        //offsetX: 60,
        isQuestion: false,
        skipable: false,
    },
    askFollowWhiteRabbitDialog,
    {
        name: "ask-follow-white-rabbit-first",
        //text: "I know where there is secret party.",
        text: "I bet you cannot keep up with me!", //first encounter/challenge
        //offsetX: 60,
        isQuestion: false,
        skipable: false,
    },
    askFollowWhiteRabbitDialog,
    {
        name: "ask-follow-white-rabbit-next-day", //if came back 
        //text: "I know where there is secret party.",
        text: "You were pretty fast last time but I was faster.  Do you think you can keep up this time?",
        //offsetX: 60,
        isQuestion: false,
        skipable: false,
    },
    askFollowWhiteRabbitDialog,
    {
        name: "ask-follow-white-rabbit-try-again", //if tried but stopped/lost rabbit
        //text: "I know where there is secret party.",
        text: "I lost you back there.  You think you can keep up this time?",
        //offsetX: 60,
        isQuestion: false,
        skipable: false,
    },
    askFollowWhiteRabbitDialog,

    {
        name: "through-here-tour",
        text: "Through here",
        isEndOfDialog: true,
        //timeOn:3,
        triggeredByNext: () => {
            //REGISTRY.tourManager.setTourState(TourState.TOURING_START)
        },
    },
    {
        name: "follow-yes",
        text: "Come On!",
        isEndOfDialog: true,
        //timeOn:3,
        triggeredByNext: () => {
            if (REGISTRY.tourManager.tourState !== TourState.TOURING) {
                REGISTRY.tourManager.setTourState(TourState.TOURING_START)
            }
        },
    },
    {
        name: "follow-no",
        text: "Okay, I'll be around if you want to go!",
        isEndOfDialog: true,
        triggeredByNext: () => {
            REGISTRY.tourManager.setTourState(TourState.NPC_ASK_TOUR_DECLINE)
            //REGISTRY.tourManager.setTourState(TourState.PLAYER_FIND_NPC) 
        },
    },
    {
        name: "keep-up",
        text: "Keep Up!",
        isEndOfDialog: true,
        triggeredByNext: () => {
            //REGISTRY.myNPC.playAnimation(REGISTRY.npcAnimations.WAVE,false,3)
        },
    },
    {
        name: "its-this-way",
        text: "It is this way!",
        isEndOfDialog: true,
        triggeredByNext: () => {
            //REGISTRY.myNPC.playAnimation(REGISTRY.npcAnimations.WAVE,false,3)
        },
    },
    {
        name: "awesome-festival",
        text: "This festival is awesome!",
        isEndOfDialog: true,
        triggeredByNext: () => {
            //REGISTRY.myNPC.playAnimation(REGISTRY.npcAnimations.WAVE,false,3)
        },
    },
    {
        name: "see-the-potties",
        text: "Did you see those porta potties yet?",
        isEndOfDialog: true,
        triggeredByNext: () => {
            //REGISTRY.myNPC.playAnimation(REGISTRY.npcAnimations.WAVE,false,3)
        },
    },
    {
        name: "tour-how-was-it",
        text: "How was the party?",
        isEndOfDialog: true,
        triggeredByNext: () => {
            //REGISTRY.myNPC.playAnimation(REGISTRY.npcAnimations.WAVE,false,3)
        },
    },

    {
        name: "tour-forgot-where",
        text: "Did you forget where the party is?",
        isEndOfDialog: true,
        triggeredByNext: () => {
            //REGISTRY.myNPC.playAnimation(REGISTRY.npcAnimations.WAVE,false,3)
        },
    },

    {
        name: "left-quest-area",
        text: "It was just getting fun!  Come find me to play again.",
        isEndOfDialog: true,
        isQuestion: false,
        skipable: false,
        triggeredByNext: () => {
            npc.playAnimation(REGISTRY.myNPC, REGISTRY.npcAnimations.WAVE.name, true, REGISTRY.npcAnimations.WAVE.duration)
        },
    },
    {
        name: "end-of-the-tour-day-0",
        text: "That was fun!  See you tomorrow!",
        isEndOfDialog: true,
        isQuestion: false,
        skipable: false,
        triggeredByNext: () => {
            npc.playAnimation(REGISTRY.myNPC, REGISTRY.npcAnimations.WAVE.name, true, REGISTRY.npcAnimations.WAVE.duration)
        },
    },
    {
        name: "end-of-the-tour-day-1",
        text: "That was fun!  See you tomorrow!",
        isEndOfDialog: true,
        isQuestion: false,
        skipable: false,
        triggeredByNext: () => {
            npc.playAnimation(REGISTRY.myNPC, REGISTRY.npcAnimations.WAVE.name, true, REGISTRY.npcAnimations.WAVE.duration)
        },
    },
    {
        name: "end-of-the-tour-day-2",
        text: "That was fun!  See you tomorrow!",
        isEndOfDialog: true,
        isQuestion: false,
        skipable: false,
        triggeredByNext: () => {
            npc.playAnimation(REGISTRY.myNPC, REGISTRY.npcAnimations.WAVE.name, true, REGISTRY.npcAnimations.WAVE.duration)
        },
    },
    {
        name: "end-of-the-tour-day-3",
        //text: "Day3-last-That was fun!  The party is this way.  Follow me!  Do not forget to grab your prize before following.",
        text: "That was fun!  Follow me!  I have one more cool thing to show you!",
        isEndOfDialog: true,
        isQuestion: false,
        skipable: false,
        triggeredByNext: () => {
            npc.playAnimation(REGISTRY.myNPC, REGISTRY.npcAnimations.WAVE.name, true, REGISTRY.npcAnimations.WAVE.duration)
        },
    },
    {
        name: "end-of-the-tour-day-4",//test day
        //text: "Day3-last-That was fun!  The party is this way.  Follow me!  Do not forget to grab your prize before following.",
        text: "That was fun!  I cannot wait to see how you do during the Festival!",
        isEndOfDialog: true,
        isQuestion: false,
        skipable: false,
        triggeredByNext: () => {
            npc.playAnimation(REGISTRY.myNPC, REGISTRY.npcAnimations.WAVE.name, true, REGISTRY.npcAnimations.WAVE.duration)
        },
    },
];


const keepUpDialogIds: string[] = ["keep-up", "its-this-way"]
const sideCommentaryDialogIds: string[] = ["awesome-festival", "see-the-potties"]
//after showed you where
const sideCommentaryDialogIdsPostTourComplete: string[] = ["awesome-festival", "see-the-potties", "tour-forgot-where", "tour-how-was-it"]

export function initDialogs() {
    REGISTRY.WhiteRabbitDialog = WhiteRabbitDialog
    REGISTRY.dialogKeepUpDialogIds = keepUpDialogIds
    REGISTRY.dialogSideCommentaryDialogIds = sideCommentaryDialogIds
    REGISTRY.dialogSideCommentaryDialogIdsPostTourComplete = sideCommentaryDialogIdsPostTourComplete
}