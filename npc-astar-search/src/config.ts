import { Vector3 } from "@dcl/sdk/math"
import { PreviewModeResponse, isPreviewMode } from "~system/EnvironmentApi"


export const ENV = "prd"

const DEBUG_FLAGS: Record<string, boolean> = {
    "local": true,
    "prd": true
}
const DEBUG_SHOW_ASTAR_OBSTICLES_FLAG: Record<string, boolean> = {
    "local": true,
    "prd": true
}

const TOUR_DEFAULT_NON_EVENT_DAY = 4

const TOUR_DEFAULT_DAY_VALS: Record<string, number> = {
    "local": 0,
    "prd": TOUR_DEFAULT_NON_EVENT_DAY
}

const ParcelCountX: number = 20
const ParcelCountZ: number = 20
export class Config {
    sizeXParcels: number = ParcelCountX
    sizeZParcels: number = ParcelCountZ
    sizeTourXParcels: number = ParcelCountX + 4
    sizeTourZParcels: number = ParcelCountZ + 4
    sizeX!: number
    sizeY!: number
    sizeZ!: number
    TEST_CONTROLS_ENABLE: boolean = true

    IN_PREVIEW: boolean = false
    FORCE_PREVIEW_ENABLED: boolean = true

    //puts a small bubble around the npc, so cannot be hidden by players
    NPC_HIDE_PLAYER_MODIFIER_ENABLED = true
    NPC_HIDE_PLAYER_WIDTH = .2

    TOUR_DEFAULT_DAY = TOUR_DEFAULT_DAY_VALS[ENV]//4 testing

    DEBUG_ACTIVE_SCENE_TRIGGER_ENABLED = DEBUG_FLAGS[ENV]
    DEBUG_PORTAL_TRIGGER_ENABLED = DEBUG_FLAGS[ENV]

    DEBUG_2D_PANEL_ENABLED = DEBUG_FLAGS[ENV]
    DEBUG_UI_ANNOUNCE_ENABLED = DEBUG_FLAGS[ENV]

    DEBUG_SHOW_NPC_PATH = DEBUG_FLAGS[ENV] //if npc path is lit up
    DEBUG_SHOW_ASTAR_OBSTICLES = DEBUG_SHOW_ASTAR_OBSTICLES_FLAG[ENV]

    center!: Vector3
    centerGround!: Vector3
    init() {
        this.sizeX = ParcelCountX * 16
        this.sizeZ = ParcelCountZ * 16
        this.sizeY = (Math.log((ParcelCountX * ParcelCountZ) + 1) * Math.LOG2E) * 20// log2(n+1) x 20 //Math.log2( ParcelScale + 1 ) * 20
        this.center = Vector3.create(this.sizeX / 2, this.sizeY / 2, this.sizeZ / 2)
        this.centerGround = Vector3.create(this.sizeX / 2, 0, this.sizeZ / 2)
    }
}

export const CONFIG = new Config()

export function initConfig() {
    console.log('stage', CONFIG, "initConfig() with ")// + DEFAULT_ENV)
    CONFIG.init()

    isPreviewMode({}).then((val: PreviewModeResponse) => {
        console.log("IN_PREVIEW", CONFIG.IN_PREVIEW, val)
        CONFIG.IN_PREVIEW = val.isPreview || CONFIG.FORCE_PREVIEW_ENABLED
    })
    return CONFIG
}