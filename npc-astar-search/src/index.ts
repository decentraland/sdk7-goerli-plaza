import { Quaternion, Vector3 } from "@dcl/sdk/math"
import { CONFIG, initConfig } from "./config"
import { Transform, engine, executeTask } from "@dcl/sdk/ecs"
import { initRegistry } from "./registry"
import { setupNPC } from "./npc-tour/npcSetup"
import { initDialogs } from "./npc-tour/npcDialog"
import { loadShowTourDebugUI } from "./npc-tour/debugUI"
import { initAstarGrids, setupTour } from "./npc-tour/tourSetup"
import { createDebugUIButtons } from "./ui/ui-hud-debugger"
import { setupUi } from "./ui"

const basePosition = Vector3.create(CONFIG.sizeX / 2 - 6 * 16, 0, CONFIG.sizeZ / 2)// CONFIG.centerGround.clone()////.add(new Vector3(16,.5,16))//new Vector3(16*11 ,0,16*11)//

export function main() {
    initConfig()
    init()
    setupUi()
}

async function init() {
    console.log("init called")
    // create the entity
    const baseScene = engine.addEntity()
    const sizeUpScale = Vector3.One() //new Vector3(1,.05,1) //Vector3.One() 
    // add a transform to the entity
    Transform.create(baseScene,
        {
            position: basePosition,
            scale: sizeUpScale,//.scale(.01),
            rotation: Quaternion.fromEulerDegrees(0, 180, 0)
        })

    initRegistry()
    setupNPC()
    initDialogs()

    //async this
    executeTask(async () => {
        loadShowTourDebugUI()

        try {
            createDebugUIButtons()
        } catch (e) {
            console.log("createDebugUIButtons failed!!!", e)
        }

        initAstarGrids()
        await setupTour()
    })
}