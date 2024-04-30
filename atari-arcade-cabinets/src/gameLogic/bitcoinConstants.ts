import { Vector3, Color3 } from '@dcl/sdk/math'
import { PLANE_HEIGHT } from '../gameConfig'
import { BRICK_OFFSET_X, BRICK_SIZE, BRICK_OFFSET_Z } from './sharedConstants'

const BITCOIN_ORANGE = Color3.fromInts(247, 147, 26)

export const BITCOIN_BRICKS = [
  // Row 1
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z),
    color: BITCOIN_ORANGE
  },
  // Row 2
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: BITCOIN_ORANGE
  },
  // Row 3
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: BITCOIN_ORANGE
  },
  // Row 4
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: BITCOIN_ORANGE
  },
  // Row 5
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: BITCOIN_ORANGE
  },
  // Row 6
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: BITCOIN_ORANGE
  },
  // Row 7
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: BITCOIN_ORANGE
  },
  // Row 8
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: BITCOIN_ORANGE
  },
  // Row 9
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: BITCOIN_ORANGE
  },
  // Row 10
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: BITCOIN_ORANGE
  },
  // Row 11
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: BITCOIN_ORANGE
  },
  // Row 12
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: BITCOIN_ORANGE
  },
  // Row 13
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 32, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: BITCOIN_ORANGE
  },
  // Row 14
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 32, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: BITCOIN_ORANGE
  },
  // Row 15
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 32, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: BITCOIN_ORANGE
  },
  // Row 16
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 32, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: BITCOIN_ORANGE
  },
  // Row 17
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 32, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: BITCOIN_ORANGE
  },
  // Row 18
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 32, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: BITCOIN_ORANGE
  },
  // Row 19
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 32, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: BITCOIN_ORANGE
  },
  // Row 20
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 32, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: BITCOIN_ORANGE
  },
  // Row 21
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: BITCOIN_ORANGE
  },
  // Row 22
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: BITCOIN_ORANGE
  },
  // Row 23
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: BITCOIN_ORANGE
  },
  // Row 24
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: BITCOIN_ORANGE
  },
  // Row 25
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: BITCOIN_ORANGE
  },
  // Row 26
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: BITCOIN_ORANGE
  },
  // Row 27
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: BITCOIN_ORANGE
  },
  // Row 28
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: BITCOIN_ORANGE
  },
  // Row 29
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: BITCOIN_ORANGE
  },
  // Row 30
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: BITCOIN_ORANGE
  },
  // Row 31
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: BITCOIN_ORANGE
  },
  // Row 32
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 31),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 31),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 31),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 31),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 31),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 31),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 31),
    color: BITCOIN_ORANGE
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 31),
    color: BITCOIN_ORANGE
  }
]
