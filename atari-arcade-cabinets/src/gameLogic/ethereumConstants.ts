import { Vector3, Color3 } from '@dcl/sdk/math'
import { PLANE_HEIGHT } from '../gameConfig'
import { BRICK_OFFSET_X, BRICK_SIZE, BRICK_OFFSET_Z } from './sharedConstants'

const ETH_LIGHT = Color3.fromInts(138, 146, 178)
const ETH_MID = Color3.fromInts(98, 104, 143)
const ETH_DARK = Color3.fromInts(69, 74, 117)

export const ETHEREUM_BRICKS = [
  // Row 1
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z
    ),
    color: ETH_MID
  },
  // Row 2
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE
    ),
    color: ETH_MID
  },
  // Row 3
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 2
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 2
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 2
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 2
    ),
    color: ETH_MID
  },
  // Row 4
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 3
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 3
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 3
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 3
    ),
    color: ETH_MID
  },
  // Row 5
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 4
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 4
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 4
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 4
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 4
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 4
    ),
    color: ETH_MID
  },
  // Row 6
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 13,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 5
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 5
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 5
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 5
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 5
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 5
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 5
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 20,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 5
    ),
    color: ETH_MID
  },
  // Row 7
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 13,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 6
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 6
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 6
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 6
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 6
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 6
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 6
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 20,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 6
    ),
    color: ETH_MID
  },
  // Row 8
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 12,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 7
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 13,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 7
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 7
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 7
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 7
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 7
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 7
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 7
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 20,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 7
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 21,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 7
    ),
    color: ETH_MID
  },
  // Row 9
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 12,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 8
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 13,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 8
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 8
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 8
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 8
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 8
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 8
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 8
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 20,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 8
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 21,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 8
    ),
    color: ETH_MID
  },
  // Row 10
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 11,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 9
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 12,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 9
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 13,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 9
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 9
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 9
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 9
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 9
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 9
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 9
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 20,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 9
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 21,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 9
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 22,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 9
    ),
    color: ETH_MID
  },
  // Row 11
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 10,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 10
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 11,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 10
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 12,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 10
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 13,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 10
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 10
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 10
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 10
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 10
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 10
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 10
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 20,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 10
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 21,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 10
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 22,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 10
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 23,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 10
    ),
    color: ETH_MID
  },
  // Row 12
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 10,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 11
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 11,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 11
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 12,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 11
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 13,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 11
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 11
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 11
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 11
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 11
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 11
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 11
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 20,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 11
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 21,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 11
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 22,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 11
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 23,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 11
    ),
    color: ETH_MID
  },
  // Row 13
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 9,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 12
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 10,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 12
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 11,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 12
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 12,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 12
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 13,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 12
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 12
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 12
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 12
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 12
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 12
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 12
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 20,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 12
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 21,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 12
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 22,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 12
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 23,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 12
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 24,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 12
    ),
    color: ETH_MID
  },
  // Row 14
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 9,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 13
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 10,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 13
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 11,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 13
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 12,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 13
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 13,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 13
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 13
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 13
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 13
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 13
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 13
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 13
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 20,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 13
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 21,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 13
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 22,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 13
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 23,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 13
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 24,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 13
    ),
    color: ETH_MID
  },
  // Row 15
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 8,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 14
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 9,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 14
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 10,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 14
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 11,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 14
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 12,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 14
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 13,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 14
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 14
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 14
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 14
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 14
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 14
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 14
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 20,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 14
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 21,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 14
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 22,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 14
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 23,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 14
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 24,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 14
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 25,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 14
    ),
    color: ETH_MID
  },
  // Row 16
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 7,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 15
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 8,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 15
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 9,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 15
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 10,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 15
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 11,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 15
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 12,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 15
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 13,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 15
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 15
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 15
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 15
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 15
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 15
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 15
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 20,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 15
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 21,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 15
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 22,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 15
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 23,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 15
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 24,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 15
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 25,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 15
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 26,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 15
    ),
    color: ETH_MID
  },
  // Row 17
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 8,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 16
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 9,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 16
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 10,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 16
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 11,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 16
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 12,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 16
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 13,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 16
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 16
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 16
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 16
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 16
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 16
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 16
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 20,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 16
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 21,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 16
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 22,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 16
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 23,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 16
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 24,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 16
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 25,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 16
    ),
    color: ETH_DARK
  },
  // Row 18
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 9,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 17
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 10,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 17
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 11,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 17
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 12,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 17
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 13,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 17
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 17
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 17
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 17
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 17
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 17
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 17
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 20,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 17
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 21,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 17
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 22,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 17
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 23,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 17
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 24,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 17
    ),
    color: ETH_DARK
  },
  // Row 19
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 7,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 18
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 11,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 18
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 12,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 18
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 13,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 18
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 18
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 18
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 18
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 18
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 18
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 18
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 20,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 18
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 21,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 18
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 22,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 18
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 26,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 18
    ),
    color: ETH_MID
  },
  // Row 20
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 8,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 19
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 9,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 19
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 12,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 19
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 13,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 19
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 19
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 19
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 19
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 19
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 19
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 19
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 20,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 19
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 21,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 19
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 24,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 19
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 25,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 19
    ),
    color: ETH_MID
  },
  // Row 21
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 9,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 20
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 10,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 20
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 20
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 20
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 20
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 20
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 20
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 20
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 23,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 20
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 24,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 20
    ),
    color: ETH_MID
  },
  // Row 22
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 9,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 21
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 10,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 21
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 11,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 21
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 12,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 21
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 21
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 21
    ),
    color: ETH_DARK
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 21,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 21
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 22,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 21
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 23,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 21
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 24,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 21
    ),
    color: ETH_MID
  },
  // Row 23
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 10,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 22
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 11,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 22
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 12,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 22
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 13,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 22
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 22
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 22
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 20,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 22
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 21,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 22
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 22,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 22
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 23,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 22
    ),
    color: ETH_MID
  },
  // Row 24
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 11,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 23
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 12,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 23
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 13,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 23
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 23
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 23
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 23
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 23
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 20,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 23
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 21,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 23
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 22,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 23
    ),
    color: ETH_MID
  },
  // Row 25
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 12,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 24
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 13,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 24
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 24
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 24
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 24
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 24
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 24
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 24
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 20,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 24
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 21,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 24
    ),
    color: ETH_MID
  },
  // Row 26
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 12,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 25
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 13,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 25
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 25
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 25
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 25
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 25
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 25
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 25
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 20,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 25
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 21,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 25
    ),
    color: ETH_MID
  },
  // Row 27
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 13,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 26
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 26
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 26
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 26
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 26
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 26
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 26
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 20,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 26
    ),
    color: ETH_MID
  },
  // Row 28
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 27
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 27
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 27
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 27
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 27
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 27
    ),
    color: ETH_MID
  },
  // Row 29
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 14,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 28
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 28
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 28
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 28
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 28
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 19,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 28
    ),
    color: ETH_MID
  },
  // Row 30
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 15,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 29
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 29
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 29
    ),
    color: ETH_MID
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 18,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 29
    ),
    color: ETH_MID
  },
  // Row 31
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 16,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 30
    ),
    color: ETH_LIGHT
  },
  {
    position: Vector3.create(
      BRICK_OFFSET_X + BRICK_SIZE * 17,
      PLANE_HEIGHT,
      BRICK_OFFSET_Z - BRICK_SIZE * 30
    ),
    color: ETH_MID
  }
]
