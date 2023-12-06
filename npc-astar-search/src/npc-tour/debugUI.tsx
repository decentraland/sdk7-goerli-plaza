
import { MeshCollider, TextShape, Transform, engine } from "@dcl/sdk/ecs"
import { CONFIG } from "../config"
import { REGISTRY } from '../registry'
import { GridPosition } from './tourTypes'
import { Color3, Color4, Quaternion, Vector3 } from "@dcl/sdk/math"
import *  as  ui from 'dcl-ui-toolkit'


let currentShowDebugInfo = engine.addEntity()
let currentShowDebugInfoText = TextShape.create(currentShowDebugInfo)
let debugAnnouncement: ui.Announcement

function formatTime(val: any) {
    if (val) {
        const date = new Date(val * 1000)
        return date.toLocaleString()
    }
}
function formatTimeDiff(timea: any, timeb: any) {
    if (timea && timeb) {
        return ((timeb - timea) / 60).toFixed(2) + "-min"
    }
    return "?-1?"
}

export async function loadShowTourDebugUI() {
    /*
    currentShowDebugInfo.addComponent(new Billboard(true,true,false))
    //currentShow.setParent(S1)
    
    currentShowDebugInfo.addComponent(currentShowDebugInfoText)
    currentShowDebugInfo.addComponent(
      new Transform({
        position: CONFIG.DEBUG_3D_PANEL_POSITION,
        rotation: Quaternion.Euler(0, 180, 0), 
        scale: new Vector3(2, 3, 2), 
      })
    )
  */

    let currentShowDebugInfoBG = engine.addEntity()
    //currentShowDebugInfo.addComponent(new Billboard(true,true,false))
    //currentShow.setParent(S1)
    MeshCollider.setPlane(currentShowDebugInfoBG)
    Transform.create(currentShowDebugInfoBG, {
        position: Vector3.create(0, 0, .1),
        rotation: Quaternion.fromEulerDegrees(0, 180, 0),
        scale: Vector3.create(7.5, 1, 1),
        parent: currentShowDebugInfo
    })
    //currentShowDebugInfoBG.addComponent(RESOUR)
    currentShowDebugInfoText.text = 'XX'
    // currentShowDebugInfoText.visible = true
    currentShowDebugInfoText.fontSize = 2
    // currentShowText.font = new Font(Fonts.SanFrancisco_Heavy)
    currentShowDebugInfoText.textWrapping = true
    currentShowDebugInfoText.width = 9
    currentShowDebugInfoText.textColor = Color4.Black()
    currentShowDebugInfoText.outlineColor = Color3.White()
    currentShowDebugInfoText.outlineWidth = 0.01

    CONFIG.DEBUG_2D_PANEL_ENABLED = true

    debugAnnouncement = ui.createComponent(ui.Announcement,
        {
            value: '',
            color: Color4.create(.5, .5, .5, .5),
            size: 18,
            duration: -1,
            startHidden: true
        }
    )
}

export function updateDebugTourInfo(
    debugData: {
        astarNpcLoc: GridPosition,
        astarCurPlayerPos: GridPosition
    }) {
    if (REGISTRY.tourManager === undefined) {
        console.log("updateDebugStageInfo ERROR, REGISTRY.tourManager is null!!!")
        return
    }

    // if (!currentShowDebugInfo.alive && CONFIG.IN_PREVIEW) {
    //     /*if(CONFIG.DEBUG_3D_PANEL_ENABLED) engine.addEntity(currentShowDebugInfo)
    //     if(CONFIG.DEBUG_2D_PANEL_ENABLED && !debug2dUI.uiText.visible){
    //       debug2DBG.visible = true
    //       debug2dUI.show()
    //     }*/
    // }

    if (!CONFIG.IN_PREVIEW) {
        return;
    }

    let text = ""
    if (
        REGISTRY.tourManager !== undefined
    ) {
        const currDatData = REGISTRY.tourManager.getCurrentDayData()
        text += "day:" + REGISTRY.tourManager.day + ";tourState:" + REGISTRY.tourManager.tourState + ";triesToday:" + REGISTRY.tourManager.triesToday
        if (currDatData !== undefined) {
            ";segment:" + currDatData.currSegment + ";completed:" + currDatData.completed
        }
        text += "\n"
            + ";astarNpcLoc:" + debugData.astarNpcLoc
            + ";astarCurPlayerPos:" + debugData.astarCurPlayerPos
    } else {
        //log("updateDebugStageInfo. cannot get artist data updateDebugStageInfo",validDayAndArtistId,validDays,validDayArtists) 
    }
    currentShowDebugInfoText.text = text

    if (CONFIG.DEBUG_2D_PANEL_ENABLED) debugAnnouncement.value = text// debug2dUI.set(text)
}