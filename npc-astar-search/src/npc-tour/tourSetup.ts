import { CONFIG } from '../config'
import { REGISTRY } from '../registry'
import { DayPathData, GridPosition, TourState } from './tourTypes'
import * as TOUR_CONSTANTS from './tourConstants'
import { TourManager } from './tourManager'
import { LeavingQuestAreaUI } from './leavingTourUI'
import { findAstarMultiTargetPath, findAStarPath, findNeareset, getAstarCurrentPlayerPosition, getAstarNpcPosition, getNpcTransform } from './astarUtils'
import { NpcProximitySystem, NpcTourSystem } from './npcTourSystem'
import { Portal } from '../sceneItems/portal'
import { GrandGiftBox } from '../sceneItems/grandGift'
import { Quaternion, Vector3 } from '@dcl/ecs-math'
import { MeshCollider, MeshRenderer, Transform, engine } from '@dcl/ecs'


const DAY_PATHS: DayPathData[] = [
    {
        day: 0,
        isEventDay: true,
        currSegment: 0,
        segmentsAbs: [
            [
                [16, 8] //start at mainstage south east side (lower right)
                , [21, 7], [21, 2], [14, 2], [14, 8], [9, 8], [5, 8]//around ozzfest 
            ], //run to/from
            //[] //run to/from
            [
                [5, 17], [6, 17], [18, 17], [18, 21]//,[-53,67]//all the way to top
            ]
        ],
        segmentsRel: [

        ],
        completed: false,
        dropLootBox: true,
        portals: {},
    },
    {
        day: 1,
        isEventDay: true,
        currSegment: 0,
        segmentsAbs: [
            [
                [2, 8], [8, 8], [8, 2]
            ],
            [
                [9, 3], [9, 4], [9, 8], [14, 8]//lower left corner
            ],
            [
                [16, 8], [17, 8], [18, 8]
            ],
            [
                [21, 7], [21, 6], [21, 2]
            ]
            //[] //run to/from 
        ],
        segmentsRel: [

        ],
        completed: false,
        isLastDay: false,
        dropLootBox: true,
        portals: {}
    },
]

export function initAstarGrids() {
    const xOffset = TOUR_CONSTANTS.xOffset
    const yOffset = TOUR_CONSTANTS.yOffset

    for (const p in TOUR_CONSTANTS.pathSeedPointsAbs) {
        const itm = TOUR_CONSTANTS.pathSeedPointsAbs[p]
        TOUR_CONSTANTS._PATH_SEED_POINT_REL.push([itm[0] - xOffset, itm[1] - yOffset])
    }
    for (const p in DAY_PATHS) {
        const dayP = DAY_PATHS[p]

        for (const x in dayP.segmentsAbs) {
            const itm = dayP.segmentsAbs[x]

            const arr: GridPosition[] = []
            dayP.segmentsRel.push(arr)

            for (const y in itm) {
                arr.push([itm[y][0] - xOffset, itm[y][1] - yOffset])
            }

        }
    }

    const ABS_SHIFT_X = TOUR_CONSTANTS.ABS_SHIFT_X

    const obsticleArray: number[][] = TOUR_CONSTANTS.OBSTACLE_ARRAY

    function hasItem(arr: number[][], itm: number[]) {
        const result = arr.filter((val: number[]) => val[0] == itm[0] && val[1] == itm[1])
        //debugger 
        return result.length > 0
    }

    for (let x = 0; x < CONFIG.sizeTourXParcels; x++) {
        for (let z = 0; z < CONFIG.sizeTourZParcels; z++) {
            const itm = [x, z]
            const itmAbs = [x + xOffset, z + yOffset]
            if (!hasItem(TOUR_CONSTANTS.roadsArray, itmAbs)) {
                obsticleArray.push(itm)
            }
        }
    }

    if (CONFIG.DEBUG_SHOW_ASTAR_OBSTICLES) {
        //OBJ_BOX_SHAPE.visible = false
        // Add obstacles to the grid
        obsticleArray.forEach(item => {
            const obstaclesEnt = engine.addEntity()
            MeshRenderer.setBox(obstaclesEnt)
            MeshCollider.setBox(obstaclesEnt)
            Transform.createOrReplace(obstaclesEnt,
                {
                    position: Vector3.create(
                        item[0] * TOUR_CONSTANTS.CELL_WIDTH + (TOUR_CONSTANTS.CELL_WIDTH / 2) + ABS_SHIFT_X
                        , 0
                        , item[1] * TOUR_CONSTANTS.CELL_WIDTH + (TOUR_CONSTANTS.CELL_WIDTH / 2) + + TOUR_CONSTANTS.ABS_SHIFT_Z),
                    scale: Vector3.create(TOUR_CONSTANTS.CELL_WIDTH * TOUR_CONSTANTS.OBSTACLE_SCALE, 1, TOUR_CONSTANTS.CELL_WIDTH * TOUR_CONSTANTS.OBSTACLE_SCALE)

                }
            )
        })
    }
}

//leavingQuestAreaUI.show()

// const REWARD_SHAPE = new BoxShape()
// REWARD_SHAPE.withCollisions = true

const grandGiftPosVisible = {
    //position: Vector3.create(55.03883743286133, .465, 32.57284927368164),//centred but close to street
    //position: Vector3.create(50.5, .65, 36.57284927368164),//centred closer to tree
    position: Vector3.create(9, 0, 2), //in front of elf
    //rotation: new Quaternion(0, 0, 0, 1),//tree
    rotation: Quaternion.Zero(),//elf
    scale: Vector3.create(1, 1, 1),
    test: 0
}

const grandGiftPosHidden = {
    //position: Vector3.create(55.03883743286133, .465, 32.57284927368164),//centred but close to street
    //position: Vector3.create(50.5, 0, 36.57284927368164),//centred closer to tree
    //position: Vector3.create(2 , -3 , 2), //in front of elf
    position: Vector3.create(9, -1, 2), //in front of elf 
    //rotation: new Quaternion(0, 0, 0, 1),//tree
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),//elf
    //scale: Vector3.create(.1, .01, .1),
    //scale: Vector3.create(1,1,1),
    scale: Vector3.create(.005, .005, .005),
    test: 0
}

export async function setupTour() {
    if (REGISTRY.myNPC === undefined) {
        throw new Error("npc not inistalized")
    }
    const tourManager = new TourManager(REGISTRY.myNPC, DAY_PATHS)
    REGISTRY.tourManager = tourManager
    REGISTRY.leavingQuestAreaUI = LeavingQuestAreaUI;

    const DAYS_GIFT = new GrandGiftBox(
        'grandGift',
        grandGiftPosHidden,
        grandGiftPosVisible,
        undefined
    )
    REGISTRY.GIFT = DAYS_GIFT

    const npcProximitySystem = new NpcProximitySystem()
    const npcTourSystem = new NpcTourSystem()
}

function findFollowThingPathFromNearest(curPos: GridPosition, pathPoints: number[][]): GridPosition {
    //find nearest of them
    const nearestPoint = findNeareset(curPos, pathPoints)
    return nearestPoint
}

function astarMultiTarget(startPos: GridPosition, pathSeedPoints: number[][], startIdx: number) {
    const res = findAstarMultiTargetPath(startPos, pathSeedPoints, startIdx);
    //res.path.
    console.log("astarMultiTarget.method.followPath.calling")
    REGISTRY.tourManager.followPath(res, false)
}

//const pathPoints = astarMultiTarget(pathSeedPointsRel[0],pathSeedPointsRel)

//solve white rabit path full circle
//const tourPath = findRabitPathFromNearest( getAstarCurrentPlayerPosition(),pathSeedPointsRel )


if (CONFIG.DEBUG_SHOW_ASTAR_OBSTICLES) {
    /*
    const testCube = new Entity()
    testCube.addComponent(new BoxShape())
    testCube.addComponent(new Transform({
      position: Vector3.create(5,3,5),
      scale: Vector3.One().scale(1)
    }))
  
    engine.addEntity(testCube)
    testCube.addComponent(new OnPointerDown(()=>{
      log("testClicked")
      const startPos = getAstarNpcPosition()
      const destPos = getAstarCurrentPlayerPosition()
  
      startAstar(startPos,destPos,true)
      
    },{
      hoverText:"test astar"
    }))*/
}

function initMultiTargetAstarTour(tourManager: TourManager) {
    const xOffset = TOUR_CONSTANTS.xOffset
    const yOffset = TOUR_CONSTANTS.yOffset

    const startPos = getAstarNpcPosition()//getAstarCurrentPlayerPosition()

    //const absPlayerPos = getAbsCurrentPlayerPosition()

    //move it close to start, dont want that
    //followThing.getComponent(Transform).position.x = absPlayerPos[0]-.5
    //followThing.getComponent(Transform).position.z = absPlayerPos[1]-.5

    //find nearest seed point, astar it there then do loop
    const nearestPoint = findFollowThingPathFromNearest(startPos, TOUR_CONSTANTS._PATH_SEED_POINT_REL)
    console.log("nearestPoint", "startPos", startPos, "nearestPoint", nearestPoint, (nearestPoint[0] + xOffset), (nearestPoint[1] + yOffset), "index", TOUR_CONSTANTS._PATH_SEED_POINT_REL.indexOf(nearestPoint))
    const destPos = getAstarCurrentPlayerPosition()

    //order them


    astarMultiTarget(startPos, TOUR_CONSTANTS._PATH_SEED_POINT_REL, TOUR_CONSTANTS._PATH_SEED_POINT_REL.indexOf(nearestPoint),)

    tourManager.setTourState(TourState.TOURING)

}

//PORTAL_SHAPE.withCollisions = false

export function startDay(day: number) {
    const METHOD_NAME = "startDay"
    console.log(METHOD_NAME, "day", day, "tourScheduleSetup", day, "was", REGISTRY.tourManager.day)
    if (REGISTRY.tourManager.enabled && day === REGISTRY.tourManager.day) {
        console.log(METHOD_NAME, "day", day, "tourScheduleSetup", "day already started!", day, " ", REGISTRY.tourManager.day)
        return;
    }

    //TODO LET THEM FINISH, REGISTER NEXT TOUR DAY AS COMPLETION, ENDING OF OTHER
    REGISTRY.tourManager.disableTour()
    REGISTRY.tourManager.day = day
    REGISTRY.tourManager.setTourState(TourState.PLAYER_FIND_NPC)
    REGISTRY.tourManager.enableTour()
    REGISTRY.tourManager.initRunAwayForDay()

    //REGISTRY.tourManager.updateBoothDay( day )
    //REGISTRY.tourManager.updateDayModels( day )

    const curDayData = REGISTRY.tourManager.getCurrentDayData()
    const alreadyCompletedOnce = curDayData !== undefined && curDayData.completed


}

export const _PORTAL = new Portal("testportal", TOUR_CONSTANTS.PORTAL_DEF_GREEN)
_PORTAL.placeAtEndOfSegment(Vector3.create(2, 4, 3))
_PORTAL.hide(false, 0, false)