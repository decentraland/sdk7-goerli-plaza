import { GridPosition } from './tourTypes'
import * as TOUR_CONSTANTS from './tourConstants'
import { TourManager } from './tourManager'
import { Vector3 } from '@dcl/sdk/math'
import { Entity, Transform, engine } from '@dcl/sdk/ecs'
import * as utils from '@dcl-sdk/utils'

export function realDistance(pos1: Vector3, pos2: Vector3): number {
    if (!pos1) console.log("realDist pos1 is null")
    if (!pos2) console.log("realDist pos2 is null")
    const a = pos1.x - pos2.x
    const b = pos1.z - pos2.z
    return Math.sqrt(a * a + b * b)
}
export function toAbsGridPos(path: number[], offset: GridPosition) {
    return Vector3.create(
        path[0] * TOUR_CONSTANTS.CELL_WIDTH + (TOUR_CONSTANTS.CELL_WIDTH / 2) + offset[0] + TOUR_CONSTANTS.ABS_SHIFT_X
        , 0
        , path[1] * TOUR_CONSTANTS.CELL_WIDTH + (TOUR_CONSTANTS.CELL_WIDTH / 2) + offset[1] + TOUR_CONSTANTS.ABS_SHIFT_Z)
}
export function pathTo3D(path: number[][], offset: GridPosition) {
    const vecArr: Vector3[] = []

    for (const p in path) {
        vecArr.push(toAbsGridPos(path[p], offset))
    }
    return vecArr
}

export function placeAtEndOfSegment(entity: Entity, tourManager: TourManager) {
    //   if(!entity.alive) engine.addEntity(entity)
    const t = Transform.getMutable(entity)
    t.position = Vector3.clone(tourManager.getCurrentDayEndSegmentPositionAbs())

    utils.tweens.stopScaling(entity)
    utils.tweens.stopTranslation(entity)

    //entity.getComponent(Transform).scale.setAll(1)
}

export function showAtEndOfSegment(entity: Entity, tourManager: TourManager) {
    //   if(!entity.alive) engine.addEntity(entity)

    placeAtEndOfSegment(entity, tourManager)
    //   console.log("showAtEndOfSegment", entity.name)

}