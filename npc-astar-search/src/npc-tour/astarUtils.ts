import { CONFIG } from "../config"
import Astar from "../fast-astar/Astar"
import Grid from "../fast-astar/Grid"
import { REGISTRY } from "../registry"
import { GridPosition } from "./tourTypes"

import * as TOUR_CONSTANTS from './tourConstants'
import { RESOURCES } from "../resources"

import { toAbsGridPos } from "./tourUtils"
import { ITourManager } from "./tourManagerInterface"
import { Entity, GltfContainer, Material, MeshRenderer, PBMaterial_PbrMaterial, Transform, TransformType, engine } from "@dcl/sdk/ecs"
import { Quaternion, Vector3 } from "@dcl/sdk/math"
import { inverseQuaternion, turn } from "../utils/utils"

export type AstarResult = {
    reachable: boolean
    path: number[][]
}

export function findAStarPath(startPos: GridPosition, destPos: GridPosition): AstarResult {
    console.log("start", startPos, "dest", destPos)

    const start = Date.now()

    //grid.createGrid()

    // Create a grid
    let grid = new Grid({
        //16x16 parcel * # parcels
        //col:CONFIG.sizeX*16,                  // col
        //row:CONFIG.sizeY*16,                   // row
        row: CONFIG.sizeTourXParcels,
        col: CONFIG.sizeTourZParcels,
        render: function () {       // Optional, this method is triggered when the grid point changes
            //log("render calls",this)
        }
    })

    // Add obstacles to the grid
    TOUR_CONSTANTS.OBSTACLE_ARRAY.forEach((item: any) => {
        try {
            grid.set(item, 'value', 2)    // Values greater than 0 are obstacles
        } catch (e) {
            console.log("obsticleArray - failed setting", item)
        }
    })

    // Pass the grid as a parameter to the Astar object
    let astar = new Astar(grid)
    //debugger 
    console.log("grid.start", grid.get(startPos), "grid.dest", grid.get(destPos))

    const res: AstarResult = { reachable: true, path: [] }
    if (grid.get(destPos) !== undefined && grid.get(destPos).value <= 0) {

        const path = astar.search(
            startPos,                   // start
            destPos,                   // end
            {                        // option
                rightAngle: false,    // default:false,false == Allow diagonal
                optimalResult: true   // default:true,In a few cases, the speed is slightly slower
            }
        )
        res.path = path

        res.reachable = path && path.length > 0

        //shift path so not running into signs
        //Y shift up 2 might be simpliest
        for (const p in path) {
            //Y
            console.log("findpath", path[p])
            //path[p][1] += 2 
        }
    } else {
        res.reachable = false
    }
    console.log('Result', 'time', (Date.now() - start), "ms", "result", res)

    return res
}

export function posEqual(val1: GridPosition, val2: GridPosition) {
    const val1Null = val1 === undefined || val1 === null
    const val2Null = val2 === undefined || val2 === null
    if (val1Null && !val2Null) return false
    if (val2Null && !val1Null) return false
    return val1[0] == val2[0] && val1[1] == val2[1]
}

export function posPartialEqual(val1: GridPosition, val2: GridPosition) {
    return val1[0] == val2[0] || val1[1] == val2[1]
}

export function findAstarMultiTargetPath(startPos: GridPosition, pathSeedPoints: number[][], startIdx: number): AstarResult {
    console.log("findAstarMultiTargetPath.enter", pathSeedPoints)
    const allFullPath = []

    let startPosLast = startPos

    let counter = startIdx
    for (let x = 0; x < pathSeedPoints.length; x++) {
        const target = pathSeedPoints[counter]
        if (!posEqual(target, startPosLast)) {
            const result = findAStarPath(startPosLast, target)
            if (result.reachable) {
                for (const q in result.path) {
                    //debugger
                    if (allFullPath.length == 0 || !posEqual(allFullPath[allFullPath.length - 1], result.path[q])) {
                        allFullPath.push(result.path[q])
                    } else {
                        console.log("astarMultiTarget...start and lastPath elem are same skipping...", allFullPath[allFullPath.length - 1], result.path[q])
                    }
                }
                startPosLast = result.path[result.path.length - 1]
                console.log("astarMultiTarget.appending", allFullPath, "new startPosLast", startPosLast)
            } else {
                console.log("astarMultiTarget.not reachable", startPosLast, result)
            }
        } else {
            console.log("astarMultiTarget...start and target are same skipping...", startPosLast, target)
        }
        counter++
        if (counter >= pathSeedPoints.length) {
            counter = 0//loop around
        }
    }
    //TODO solve this!!!
    const REDUCE_STRAIGHT_SEGMENTS = false

    console.log("findAstarMultiTargetPath.result", allFullPath)

    return { reachable: true, path: allFullPath }
    //tourManager.followPath(result)
}

export function findNeareset(curPos: GridPosition, pathPoints: number[][]): GridPosition {
    let nearest: GridPosition = pathPoints[0]

    let cloestestDist = 9999999

    //const curPosV = new Vector2(curPos[0],curPos[1])
    //const ptv = new Vector2()

    for (const p in pathPoints) {
        const pt = pathPoints[p]

        //ptv.set(pt[0],pt[1])

        //ptv.subtract(curPosV)

        const absArg = Math.pow(pt[0] - curPos[0], 2) + Math.pow(pt[1] - curPos[1], 2)
        const distArg = Math.abs(absArg)
        //if(pt[0] == 18) debugger
        const dist = distArg > 0 ? Math.sqrt(distArg) : 0
        if (dist < cloestestDist) {
            nearest = pt
            cloestestDist = dist
        }
        console.log("findNeareset", curPos, pt, "dist:", dist, distArg)
    }

    console.log("findNeareset.winner", curPos, cloestestDist, nearest)

    //pathPoints[ Math.floor(Math.random() * pathPoints.length ) ]
    return nearest
}

export function debugDrawPath(result: AstarResult, pathSeedPointsRel: GridPosition[], entArr: Entity[] = [], opts: { shape?: string, feet?: boolean, material?: PBMaterial_PbrMaterial, highlightSeedPoints?: boolean, scaleToUse?: Vector3, offsetY?: number }) {
    //clear it
    //entArr.length=0
    const offsetY = opts && opts.offsetY !== undefined ? opts.offsetY : 0
    if (result.reachable && result.path && result.path.length > 0) {
        let counter = 0

        const isFeet = opts.feet !== undefined && opts.feet

        let lastEnt = undefined
        for (const p in result.path) {
            const item = result.path[p]
            let ent = entArr[counter] //new Entity()

            if (ent == undefined) {
                ent = engine.addEntity()
                entArr.push(ent)
                if (opts.shape) {
                    GltfContainer.create(ent,
                        {
                            src: opts.shape
                        }
                    )
                } else {
                    MeshRenderer.setBox(ent)
                }
            }

            let scaleToUse = Vector3.create(.1, .1, .1)
            if (counter == 0) {
                Material.setPbrMaterial(ent, RESOURCES.materials.emissiveBoxMat)
                scaleToUse = Vector3.create(.1, 2, .1)
            } else if (result.path.length - 1 == counter) {
                Material.setPbrMaterial(ent, RESOURCES.materials.emissiveBoxMatOutline)
                scaleToUse = Vector3.create(.1, 2, .1)
            } else {
                if (opts.material !== undefined) Material.setPbrMaterial(ent, opts.material)
            }
            let xOff = 0
            if (opts.scaleToUse !== undefined) scaleToUse = Vector3.clone(opts.scaleToUse)
            if (counter % 2 == 1 && isFeet) {
                scaleToUse.x *= -1
                xOff = 3
            }

            Transform.createOrReplace(ent, {
                position: Vector3.create(
                    item[0] * TOUR_CONSTANTS.CELL_WIDTH + (TOUR_CONSTANTS.CELL_WIDTH / 2) + TOUR_CONSTANTS.ABS_SHIFT_X
                    , .5 + offsetY
                    , item[1] * TOUR_CONSTANTS.CELL_WIDTH + (TOUR_CONSTANTS.CELL_WIDTH / 2) + + TOUR_CONSTANTS.ABS_SHIFT_Z
                ),
                scale: scaleToUse
            })
            // if (!ent.alive) engine.addEntity(ent)

            if (isFeet) {
                let t = Transform.getMutable(ent)
                if (lastEnt !== undefined) {
                    turn(ent, Transform.get(lastEnt).position)
                } else {
                    turn(ent, getNpcTransform().position)
                    t.rotation = inverseQuaternion(t.rotation)
                }
            }
            lastEnt = ent
            counter++
        }

        if (opts.highlightSeedPoints) {
            for (const p in pathSeedPointsRel) {
                const item = pathSeedPointsRel[p]
                let ent = entArr[counter] //new Entity()

                if (ent == undefined) {
                    ent = engine.addEntity()
                    entArr.push(ent)
                    MeshRenderer.setBox(ent)
                }
                let scaleToUse = Vector3.create(.1, 2, .1)

                Transform.createOrReplace(ent, {
                    position: Vector3.create(
                        item[0] * TOUR_CONSTANTS.CELL_WIDTH + (TOUR_CONSTANTS.CELL_WIDTH / 2) + TOUR_CONSTANTS.ABS_SHIFT_X
                        , .5 + offsetY
                        , item[1] * TOUR_CONSTANTS.CELL_WIDTH + (TOUR_CONSTANTS.CELL_WIDTH / 2) + + TOUR_CONSTANTS.ABS_SHIFT_Z),
                    scale: scaleToUse
                })
                Material.setPbrMaterial(ent, RESOURCES.materials.rabbitCheckPoints)
                // if (!ent.alive) { } engine.addEntity(ent)
                counter++
            }
        }
        for (let x = counter; x < entArr.length; x++) {
            // if (entArr[x].alive) engine.removeEntity(entArr[x])
            engine.removeEntity(entArr[x])
        }
    } else {
        //clear it
        for (const p in entArr) {
            // if (entArr[p].alive) engine.removeEntity(entArr[p])
            engine.removeEntity(entArr[p])
        }
    }
}

// const camera = Transform.get(engine.CameraEntity)

// function getAbsCurrentPlayerPosition(): GridPosition {
//     return [Math.floor(camera.position.x), Math.floor(camera.position.z)]
// }
// function _getCurrentPlayerPositionAtarRel2D(): GridPosition {
//     return [camera.position.x / TOUR_CONSTANTS.CELL_WIDTH, camera.position.z / TOUR_CONSTANTS.CELL_WIDTH]
// }
/*
function getNpcPositionAtarRel2D():GridPosition{
  const pos = getNpcTransform().position
  return [Math.floor(pos.x/TOUR_CONSTANTS.CELL_WIDTH),Math.floor(pos.z/TOUR_CONSTANTS.CELL_WIDTH)]
  return [pos.x/TOUR_CONSTANTS.CELL_WIDTH,pos.z/TOUR_CONSTANTS.CELL_WIDTH]
}*/


export function getAstarCurrentPlayerPosition(): GridPosition {
    const pos = [
        Math.max(0, Math.floor(Transform.get(engine.CameraEntity).position.x / TOUR_CONSTANTS.CELL_WIDTH) + TOUR_CONSTANTS.REL_CAMERA_SHIFT_X)
        , Math.max(0, Math.floor(Transform.get(engine.CameraEntity).position.z / TOUR_CONSTANTS.CELL_WIDTH) + TOUR_CONSTANTS.REL_CAMERA_SHIFT_Z) //+ TOUR_CONSTANTS.ABS_SHIFT_Z
    ]
    //log("getAstarCurrentPlayerPosition()",pos)
    return pos
}
export function getNpcTransform(): TransformType {
    return Transform.get(REGISTRY.tourManager.getFollowThing())
}
export function getAstarNpcPosition(): GridPosition {
    const pos = getNpcTransform().position
    const _pos = [
        Math.floor(pos.x / TOUR_CONSTANTS.CELL_WIDTH + TOUR_CONSTANTS.REL_CAMERA_SHIFT_X)
        , Math.floor(pos.z / TOUR_CONSTANTS.CELL_WIDTH + TOUR_CONSTANTS.REL_CAMERA_SHIFT_Z)]
    //log("getAstarNpcPosition()",_pos)
    return _pos
}

//const pathPoints = astarMultiTarget(pathSeedPointsRel[0],pathSeedPointsRel)

//solve white rabit path full circle
//const tourPath = findRabitPathFromNearest( getAstarCurrentPlayerPosition(),pathSeedPointsRel )

