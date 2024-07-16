import *  as  ui from 'dcl-ui-toolkit'
//import { REGISTRY } from 'src/registry'
import { CONFIG } from '../config'
import { REGISTRY } from '../registry'
import { TourState } from '../npc-tour/tourTypes'
import { startDay } from '../npc-tour/tourSetup'
import { PromptButton } from 'dcl-ui-toolkit/dist/ui-entities/prompts/Prompt/components/Button'
import { Transform, engine } from '@dcl/sdk/ecs'


const buttonPosSTART = -300
let buttonPosCounter = buttonPosSTART
let buttonPosY = 350
const buttonWidth = 121
const changeButtonWidth = 120
const changeButtonHeight = 16

function updateDebugButtonUI(testButton: PromptButton) {
    if (changeButtonWidth > 0) testButton.imageElement.uiTransform!.width = changeButtonWidth
    if (changeButtonHeight > 0) testButton.imageElement.uiTransform!.height = changeButtonHeight
    testButton.labelElement.fontSize! -= 5
}
function boolShortNameOnOff(val: boolean) {
    if (val) return "On"
    return "Off"
}
export async function createDebugUIButtons() {
    if (!CONFIG.TEST_CONTROLS_ENABLE) {
        console.log("debug buttons DISABLED")
        return
    }
    console.log("debug buttons")

    const myNPC = REGISTRY.myNPC
    if (!myNPC) throw new Error("myNPC not initlalized")

    let testButton: PromptButton | null = null

    const testControlsToggle = ui.createComponent(ui.CustomPrompt, { style: ui.PromptStyles.DARKLARGE, width: 1, height: 1, startHidden: false })

    // testControlsToggle.background.positionY = 350

    //testControls.background.visible = false
    testControlsToggle.closeIcon.hide()
    //testControls.addText('Who should get a gift?', 0, 280, Color4.Red(), 30)
    //const pickBoxText:ui.CustomPromptText = testControls.addText("_It's an important decision_", 0, 260)  
    const enableDisableToggle = testButton = testControlsToggle.addButton(
        {
            style: ui.ButtonStyles.RED,
            text: 'show:false',
            xPosition: buttonPosCounter,
            yPosition: buttonPosY,
            onMouseDown: () => {
                console.log("enableDisableToggle " + testControls.isVisible())
                if (testControls.isVisible()) {
                    testControls.hide()
                    testControls.isVisible() ? testControls.closeIcon.show() : testControls.closeIcon.hide()
                } else {
                    testControls.show()
                    testControls.isVisible() ? testControls.closeIcon.show() : testControls.closeIcon.hide()
                }
                enableDisableToggle.text = 'show:' + !testControls.isVisible()
            },
        }
    )

    if (changeButtonWidth > 0) testButton.imageElement.uiTransform!.width = changeButtonWidth
    if (changeButtonHeight > 0) testButton.imageElement.uiTransform!.height = changeButtonHeight

    buttonPosCounter += buttonWidth

    const testControls = ui.createComponent(ui.CustomPrompt, { style: ui.PromptStyles.DARKLARGE, width: 1, height: 1, startHidden: false })

    //testControls.hide()

    // testControls.background.positionY = 350

    //testControls.background.visible = false
    testControls.closeIcon.hide()
    //testControls.addText('Who should get a gift?', 0, 280, Color4.Red(), 30)
    //const pickBoxText:ui.CustomPromptText = testControls.addText("_It's an important decision_", 0, 260)  

    //type TourState = 'not-init'|'tour-not-ready'|'tour-npc-waiting'|'find-to-ask'|'ask-tour'|'touring'|'tour-completed'|'tour-declined'

    const testControlBtns = [
        {
            style: ui.ButtonStyles.RED,
            text: TourState.TOUR_OFF,
            onMouseDown: () => {
                REGISTRY.tourManager.setTourState(TourState.TOUR_OFF)
            },
        },
        {
            style: ui.ButtonStyles.RED,
            text: TourState.PLAYER_FIND_NPC,
            onMouseDown: () => {
                REGISTRY.tourManager.setTourState(TourState.PLAYER_FIND_NPC)
            },
        },
        {
            style: ui.ButtonStyles.RED,
            text: TourState.NPC_FIND_PLAYER_TO_START,
            onMouseDown: () => {
                REGISTRY.tourManager.setTourState(TourState.NPC_FIND_PLAYER_TO_START)
            },
        },
        {
            style: ui.ButtonStyles.RED,
            text: TourState.NPC_ASK_TOUR,
            onMouseDown: () => {
                REGISTRY.tourManager.setTourState(TourState.NPC_ASK_TOUR)
            },
        },
        {
            style: ui.ButtonStyles.RED,
            text: TourState.NPC_ASK_TOUR_ACCEPT,
            onMouseDown: () => {
                REGISTRY.tourManager.setTourState(TourState.NPC_ASK_TOUR_ACCEPT)
            },
        },
        {
            style: ui.ButtonStyles.RED,
            text: "G:SHOW",
            onMouseDown: () => {
                REGISTRY.GIFT.show()
            },
        },
        {
            style: ui.ButtonStyles.RED,
            text: "G:IDLE",
            onMouseDown: () => {
                REGISTRY.GIFT.playIdleAnimation()
            },
        },
        {
            style: ui.ButtonStyles.RED,
            text: "G:HIDE",
            onMouseDown: () => {
                REGISTRY.GIFT.hide()
            },
        },
        {
            style: ui.ButtonStyles.RED,
            text: "P:SHOW",
            onMouseDown: () => {
                REGISTRY.tourManager.getCurrentDayEndSegmentPortal().show()
            },
        },
        {
            style: ui.ButtonStyles.RED,
            text: "P:HIDE",
            onMouseDown: () => {
                REGISTRY.tourManager.getCurrentDayEndSegmentPortal().hide()
            },
        },
        {
            style: ui.ButtonStyles.RED,
            text: "P:T:SHOW",
            onMouseDown: () => {
                REGISTRY.tourManager.getCurrentDayEndSegmentPortal().enablePlayerCanEnter()
            },
        },
        {
            style: ui.ButtonStyles.RED,
            text: "P:T:HIDE",
            onMouseDown: () => {
                REGISTRY.tourManager.getCurrentDayEndSegmentPortal().disablePlayerCanEnter()
            },
        },
        {
            style: ui.ButtonStyles.RED,
            text: "Day_0",
            onMouseDown: () => {
                console.log("@@ DAY 0")
                startDay(0)
            },
        },
        {
            style: ui.ButtonStyles.RED,
            text: "Day_1",
            onMouseDown: () => {
                console.log("@@ DAY 1")
                startDay(1)
            },
        },
        {
            style: ui.ButtonStyles.RED,
            text: "G:Summon",
            onMouseDown: () => {
                const playerPosAbs = Transform.get(engine.CameraEntity).position
                REGISTRY.GIFT.placeAtEndOfSegment(playerPosAbs)
                REGISTRY.GIFT.show()
            },
        },
        {
            style: ui.ButtonStyles.RED,
            text: "MV:To NPC",
            onMouseDown: () => {
                REGISTRY.tourManager.moveToNPC()
            },
        },
        {
            style: ui.ButtonStyles.RED,
            text: "MV:To Origin",
            onMouseDown: () => {
                REGISTRY.tourManager.moveToOrigin()
            },
        }
    ]

    for (let i = 0; i < testControlBtns.length; i++) {
        updateDebugButtonUI(testControls.addButton({
            ...testControlBtns[i],
            xPosition: buttonPosCounter,
            yPosition: buttonPosY,
        }))
        buttonPosCounter += buttonWidth //next column
        if (i % 6 == 0) {
            // new row
            buttonPosY -= changeButtonHeight + 2
            buttonPosCounter = buttonPosSTART
        }
    }
}