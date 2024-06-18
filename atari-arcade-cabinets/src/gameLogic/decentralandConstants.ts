import { Vector3, Color3 } from '@dcl/sdk/math'
import { PLANE_HEIGHT } from '../gameConfig'
import { BRICK_OFFSET_X, BRICK_SIZE, BRICK_OFFSET_Z } from './sharedConstants'

export const DECENTRALAND_BRICKS = [
  // Row 1
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z),
    color: Color3.fromInts(255, 78, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z),
    color: Color3.fromInts(255, 78, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z),
    color: Color3.fromInts(255, 70, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z),
    color: Color3.fromInts(255, 70, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z),
    color: Color3.fromInts(255, 57, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z),
    color: Color3.fromInts(255, 57, 85)
  },
  // Row 2
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: Color3.fromInts(246, 88, 83)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: Color3.fromInts(255, 83, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: Color3.fromInts(255, 83, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: Color3.fromInts(255, 78, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: Color3.fromInts(255, 78, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: Color3.fromInts(255, 70, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: Color3.fromInts(255, 70, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: Color3.fromInts(255, 57, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: Color3.fromInts(255, 57, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: Color3.fromInts(255, 51, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: Color3.fromInts(255, 51, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE),
    color: Color3.fromInts(246, 46, 82)
  },
  // Row 3
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: Color3.fromInts(255, 104, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: Color3.fromInts(255, 84, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: Color3.fromInts(255, 84, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: Color3.fromInts(255, 77, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: Color3.fromInts(255, 77, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: Color3.fromInts(255, 70, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: Color3.fromInts(255, 70, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: Color3.fromInts(255, 57, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: Color3.fromInts(255, 57, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: Color3.fromInts(255, 50, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: Color3.fromInts(255, 50, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 2),
    color: Color3.fromInts(255, 43, 84)
  },
  // Row 4
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: Color3.fromInts(255, 84, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: Color3.fromInts(255, 84, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: Color3.fromInts(255, 77, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: Color3.fromInts(255, 77, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: Color3.fromInts(255, 70, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: Color3.fromInts(255, 70, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: Color3.fromInts(255, 57, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: Color3.fromInts(255, 57, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: Color3.fromInts(255, 50, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: Color3.fromInts(255, 50, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: Color3.fromInts(255, 43, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 3),
    color: Color3.fromInts(255, 43, 84)
  },
  // Row 5
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 117, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 104, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 104, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 85, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 84, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 84, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 77, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 77, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 70, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 70, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 57, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 57, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 50, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 50, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 4),
    color: Color3.fromInts(255, 43, 84)
  },
  // Row 6
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 117, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 117, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 104, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 104, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 84, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 84, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 77, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 77, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 70, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 70, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 57, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 57, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 50, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 50, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 43, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 5),
    color: Color3.fromInts(255, 43, 84)
  },
  // Row 7
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 129, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 124, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 124, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 117, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 117, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 84, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 84, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 70, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 70, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 57, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 57, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 51, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 51, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 6),
    color: Color3.fromInts(255, 44, 84)
  },
  // Row 8
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 129, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 129, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 124, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 124, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 117, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 117, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 84, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 84, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 70, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 57, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 51, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 51, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 44, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 7),
    color: Color3.fromInts(255, 44, 84)
  },
  // Row 9
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 136, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 136, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 130, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 130, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 124, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 124, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 117, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 117, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 104, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 104, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 57, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 57, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 50, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 8),
    color: Color3.fromInts(255, 50, 84)
  },
  // Row 10
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(247, 139, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 136, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 136, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 130, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 130, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 124, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 124, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 117, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 117, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 104, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 104, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 57, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 57, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 50, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 50, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 9),
    color: Color3.fromInts(255, 44, 81)
  },
  // Row 11
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 149, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 142, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 142, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 136, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 136, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 130, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 130, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 124, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 124, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 103, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 103, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 57, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 57, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 10),
    color: Color3.fromInts(255, 50, 84)
  },
  // Row 12
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 149, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 142, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 142, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 136, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 136, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 130, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 130, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 124, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 124, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 103, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 103, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 57, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 57, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 11),
    color: Color3.fromInts(255, 50, 84)
  },
  // Row 13
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 155, 89)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 155, 89)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 149, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 149, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 142, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 142, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 136, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 136, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 136, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 136, 88)
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
    color: Color3.fromInts(187, 33, 159)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 104, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 104, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 104, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 78, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 70, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 70, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 57, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 32, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 12),
    color: Color3.fromInts(255, 57, 85)
  },
  // Row 14
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 155, 89)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 155, 89)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 149, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 149, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 142, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 142, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 136, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 136, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 136, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.White()
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
    color: Color3.fromInts(187, 33, 159)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(187, 33, 159)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 104, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 104, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 104, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 104, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 202, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 87, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 78, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 70, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 70, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 57, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 32, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 13),
    color: Color3.fromInts(255, 57, 85)
  },
  // Row 15
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 161, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 161, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 155, 89)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 155, 89)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 149, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 149, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 142, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 142, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.White()
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
    color: Color3.fromInts(201, 35, 144)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(201, 35, 144)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(201, 35, 144)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 104, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 104, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 97, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 97, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 84, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 84, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 77, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 77, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 71, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 71, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 32, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 14),
    color: Color3.fromInts(255, 64, 85)
  },
  // Row 16
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 161, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 161, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 155, 89)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 155, 89)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 149, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 149, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 142, 88)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.White()
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
    color: Color3.fromInts(201, 35, 144)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(201, 35, 144)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(201, 35, 144)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(201, 35, 144)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 104, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 104, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 97, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 97, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 84, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 84, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 77, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 77, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 71, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 71, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 64, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 32, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 15),
    color: Color3.fromInts(255, 64, 85)
  },
  // Row 17
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(255, 168, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(255, 168, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(255, 161, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(255, 161, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(255, 155, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(255, 155, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.White()
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
    color: Color3.fromInts(216, 36, 128)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(216, 36, 128)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(216, 36, 128)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(216, 36, 128)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(216, 36, 128)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(255, 118, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(255, 112, 96)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(255, 112, 96)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(255, 84, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(255, 84, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(255, 78, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(255, 78, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(255, 70, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 32, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 16),
    color: Color3.fromInts(255, 70, 85)
  },
  // Row 18
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(255, 168, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(255, 168, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(255, 161, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(255, 161, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(255, 155, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.White()
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
    color: Color3.fromInts(216, 36, 128)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(216, 36, 128)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(216, 36, 128)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(216, 36, 128)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(216, 36, 128)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(216, 36, 128)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(255, 110, 87)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(255, 112, 96)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(255, 84, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(255, 84, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(255, 78, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(255, 78, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(255, 70, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 32, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 17),
    color: Color3.fromInts(255, 70, 85)
  },
  // Row 19
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.fromInts(255, 175, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.fromInts(255, 175, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.fromInts(255, 167, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.fromInts(255, 167, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.White()
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
    color: Color3.fromInts(230, 37, 111)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.fromInts(230, 37, 111)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.fromInts(230, 37, 111)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.fromInts(230, 37, 111)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.fromInts(230, 37, 111)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.fromInts(230, 37, 111)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.fromInts(230, 37, 111)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.fromInts(255, 117, 87)
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
    color: Color3.fromInts(189, 33, 156)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.fromInts(255, 105, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.fromInts(255, 84, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.fromInts(255, 84, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.fromInts(255, 78, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 32, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 18),
    color: Color3.fromInts(255, 78, 86)
  },
  // Row 20
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.fromInts(255, 175, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.fromInts(255, 175, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.fromInts(255, 167, 90)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.White()
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
    color: Color3.fromInts(230, 37, 111)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.fromInts(230, 37, 111)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.fromInts(230, 37, 111)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.fromInts(230, 37, 111)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.fromInts(230, 37, 111)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.fromInts(230, 37, 111)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.fromInts(230, 37, 111)
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
    color: Color3.fromInts(189, 33, 156)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.fromInts(189, 33, 156)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.fromInts(255, 84, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.fromInts(255, 84, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.fromInts(255, 78, 85)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 32, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 19),
    color: Color3.fromInts(255, 78, 85)
  },
  // Row 21
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.fromInts(255, 180, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.White()
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
    color: Color3.fromInts(245, 40, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.fromInts(245, 40, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.fromInts(245, 40, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.fromInts(245, 40, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.fromInts(245, 40, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.fromInts(245, 40, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.White()
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
    color: Color3.fromInts(209, 36, 135)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.fromInts(209, 36, 135)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.fromInts(209, 36, 135)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.fromInts(255, 105, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.fromInts(255, 91, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 20),
    color: Color3.fromInts(255, 84, 85)
  },
  // Row 22
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.White()
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
    color: Color3.fromInts(245, 40, 96)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.fromInts(245, 40, 96)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.fromInts(245, 40, 96)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.fromInts(245, 40, 96)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.fromInts(245, 40, 96)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.White()
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
    color: Color3.fromInts(209, 36, 135)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.fromInts(209, 36, 135)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.fromInts(209, 36, 135)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.fromInts(209, 36, 135)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.fromInts(255, 98, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 21),
    color: Color3.fromInts(255, 98, 86)
  },
  // Row 23
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 2, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(254, 195, 108)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(255, 189, 91)
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
    color: Color3.fromInts(230, 37, 113)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(230, 37, 113)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(230, 37, 113)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(230, 37, 113)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(230, 37, 113)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(255, 104, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(255, 97, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(255, 97, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 31, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 22),
    color: Color3.fromInts(247, 88, 83)
  },
  // Row 24
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.fromInts(255, 189, 91)
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
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.fromInts(230, 37, 113)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.fromInts(230, 37, 113)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.fromInts(230, 37, 113)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.fromInts(230, 37, 113)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.fromInts(230, 37, 113)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.fromInts(230, 37, 113)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.fromInts(255, 97, 86)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 23),
    color: Color3.fromInts(255, 97, 86)
  },
  // Row 25
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 3, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.White()
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
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.fromInts(249, 40, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.fromInts(249, 40, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.fromInts(249, 40, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.fromInts(249, 40, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.fromInts(249, 40, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.fromInts(249, 40, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.fromInts(249, 40, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 30, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 24),
    color: Color3.fromInts(253, 103, 85)
  },
  // Row 26
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 4, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.fromInts(255, 189, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.fromInts(255, 189, 91)
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
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.White()
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
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.White()
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.fromInts(249, 40, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.fromInts(249, 40, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.fromInts(249, 40, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.fromInts(249, 40, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.fromInts(249, 40, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.fromInts(249, 40, 91)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 29, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 25),
    color: Color3.fromInts(249, 40, 91)
  },
  // Row 27
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 5, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 28, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 26),
    color: Color3.fromInts(252, 154, 101)
  },
  // Row 28
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 6, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 27, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 27),
    color: Color3.fromInts(252, 154, 101)
  },
  // Row 29
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 7, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 26, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 28),
    color: Color3.fromInts(255, 40, 84)
  },
  // Row 30
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 8, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 9, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 24, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: Color3.fromInts(255, 40, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 25, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 29),
    color: Color3.fromInts(255, 40, 84)
  },
  // Row 31
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 10, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: Color3.fromInts(255, 41, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 11, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: Color3.fromInts(255, 41, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 12, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: Color3.fromInts(255, 41, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: Color3.fromInts(255, 41, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: Color3.fromInts(255, 41, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: Color3.fromInts(255, 41, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: Color3.fromInts(255, 41, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: Color3.fromInts(255, 41, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: Color3.fromInts(255, 41, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: Color3.fromInts(255, 41, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: Color3.fromInts(255, 41, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 21, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: Color3.fromInts(255, 41, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 22, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: Color3.fromInts(255, 41, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 23, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 30),
    color: Color3.fromInts(255, 41, 84)
  },
  // Row 32
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 13, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 31),
    color: Color3.fromInts(255, 41, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 14, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 31),
    color: Color3.fromInts(255, 41, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 15, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 31),
    color: Color3.fromInts(255, 41, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 16, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 31),
    color: Color3.fromInts(255, 41, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 17, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 31),
    color: Color3.fromInts(255, 41, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 18, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 31),
    color: Color3.fromInts(255, 41, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 19, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 31),
    color: Color3.fromInts(255, 41, 84)
  },
  {
    position: Vector3.create(BRICK_OFFSET_X + BRICK_SIZE * 20, PLANE_HEIGHT, BRICK_OFFSET_Z - BRICK_SIZE * 31),
    color: Color3.fromInts(255, 41, 84)
  }
]
