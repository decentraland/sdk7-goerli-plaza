import { SceneItemDef } from "../sceneItems/sceneItem"
import { GridPosition } from "./tourTypes"
import { Vector3 } from "@dcl/ecs-math"

const ENV = "mini"

const CELL_WIDTH_VALS: Record<string, number> = {
    "mini": 1.3,
    "full": 16
}
const REL_CAMERA_SHIFT_X_VALS: Record<string, number> = {
    "mini": 0,
    "full": 8
}
const REL_CAMERA_SHIFT_Z_VALS: Record<string, number> = {
    "mini": 0,
    "full": 2
}
export const CELL_WIDTH = CELL_WIDTH_VALS[ENV]//16 //2
export const PATH_OFFSET = CELL_WIDTH > 4 ? [2.4, 2.4] : [0, 0]  //2.4 moves it out of way of benches and screens

//0-1 perect of cell_width
export const OBSTACLE_SCALE = 1

export const REL_CAMERA_SHIFT_X = REL_CAMERA_SHIFT_X_VALS[ENV]//8
export const REL_CAMERA_SHIFT_Z = REL_CAMERA_SHIFT_Z_VALS[ENV]//0//2
export const ABS_SHIFT_X = -1 * REL_CAMERA_SHIFT_X_VALS[ENV] * 16
export const ABS_SHIFT_Z = -1 * REL_CAMERA_SHIFT_Z_VALS[ENV] * 16

export const TOUR_NOT_READY_HIDE_NPC_POSITION = Vector3.create(2, -9, 2)//make these invisible eventually
export const TOUR_NOT_READY_HIDE_NPC_SCALE = Vector3.create(.5, .5, .5)
export const TOUR_NPC_POSITION_VANISH_POS = Vector3.create(2, -4, 2)
export const NPC_FIND_PLAYER_TO_START_MIN_DIST = 3
export const NPC_FIND_PLAYER_RECALC_DIST = 8//6//if too far from current target, redo it
// export const DEBUG_BOX_SHAPE =new BoxShape()
export const TOUR_LAST_DAY_TELEPORT_COORDS = { x: -62, y: 70 }//"-62,70" //tower of babel

export const OBSTACLE_ARRAY: number[][] = []

// DEBUG_BOX_SHAPE.withCollisions = false

const PORTAL_SHAPE_GREEN = 'models/WR_Green_Teleporter.glb'// new ConeShape()
const PORTAL_SHAPE_MAGENTA = 'models/WR_Magenta_Teleporter.glb'

export const PORTAL_DEF_GREEN: SceneItemDef = {
    shape: PORTAL_SHAPE_GREEN,
    show: { name: "Teleport_Open", duration: 1, autoStart: true },
    idle: { name: "Teleport_Loop", duration: -1, autoStart: false },
    close: { name: "Teleport_Close", duration: 2 }
}

const PORTAL_DEF_MAGENTA: SceneItemDef = {
    shape: PORTAL_SHAPE_MAGENTA,
    show: { name: "Teleport_Open", duration: 1, autoStart: true },
    idle: { name: "Teleport_Loop.001", duration: -1, autoStart: false },
    close: { name: "Teleport_Close", duration: 1 }
}

const SHOE_PRINT = "models/WR_shoeprint.glb"

export const BREADCRUMB_SHAPE = SHOE_PRINT//DEBUG_BOX_SHAPE//new GLTFShape("")
export const NPC_DEFAULT_WALK_SPEED = 2
//export const USE_NPC_FOLLOW = true

export const NPC_MAX_AWAY_DISTANCE = CELL_WIDTH == 16 + 0 ? 34 : 8//35//4//37 //37 keeps on edge of shortest possible draw distance of 40
export const NPC_ACTIVATE_BREADCRUMB_DIST = NPC_MAX_AWAY_DISTANCE + 2
export const NPC_TOO_FAR_AWAY = NPC_ACTIVATE_BREADCRUMB_DIST

export const NPC_ACTIVATE_DISTANCE = NPC_MAX_AWAY_DISTANCE - (CELL_WIDTH == 16 + 0 ? 6 : 3)//35//4//37 //37 keeps on edge of shortest possible draw distance of 40

//workaround moved here to avoid cyclic deps
//track dispensers by campaignId

//offset for base of scene in world if not 0,0
export const xOffset = 0//-73
export const yOffset = 0//50

export const roadsArray = [
    [8, 2], [9, 2], [14, 2], [15, 2], [16, 2], [17, 2], [18, 2], [19, 2], [20, 2], [21, 2],
    [8, 3], [9, 3], [14, 3], [15, 3], [21, 3],
    [8, 4], [9, 4], [14, 4], [15, 4], [21, 4],
    [8, 5], [9, 5], [14, 5], [15, 5], [21, 5],
    [8, 6], [9, 6], [14, 6], [15, 6], [21, 6],
    [8, 7], [9, 7], [14, 7], [15, 7], [16, 7], [17, 7], [18, 7], [19, 7], [20, 7], [21, 7],
    [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [15, 8], [16, 8], [17, 8], [18, 8],
    [5, 9], [18, 9],
    [5, 10], [18, 10],
    [5, 11], [18, 11],
    [5, 12], [18, 12],
    [5, 13], [18, 13],
    [5, 14], [18, 14],
    [5, 15], [18, 15],
    [5, 16], [18, 16],
    [5, 17], [6, 17], [7, 17], [8, 17], [9, 17], [10, 17], [11, 17], [12, 17], [13, 17], [14, 17], [15, 17], [16, 17], [17, 17], [18, 17], [19, 17], [20, 17], [21, 17],
    [2, 18], [3, 18], [4, 18], [5, 18], [6, 18], [7, 18], [8, 18], [9, 18], [13, 18], [18, 18],
    [5, 19], [9, 19], [13, 19], [18, 19],
    [5, 20], [9, 20], [13, 20], [18, 20],
    [5, 21], [9, 21], [13, 21], [18, 21]
]

//points to walk, bottom left to top left to top right to bottom right
//let astar connect them into a curve
export const pathSeedPointsAbs = [
    [8, 3],
    [8, 8],
    [5, 8],
    [5, 18],
    [9, 17],
    [13, 21],
    [13, 17],
    [18, 17],
    [18, 8],
    [21, 7],
    [21, 2],
    [14, 2],
    [14, 8]
]

export const _PATH_SEED_POINT_REL: GridPosition[] = []