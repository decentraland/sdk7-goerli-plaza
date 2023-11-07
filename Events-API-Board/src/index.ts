import { Quaternion } from '@dcl/sdk/math'
import { createEventBoard } from './eventBoards'
import { setupUi } from './ui'

export async function main() {
  const board_1 = createEventBoard(0, 4, {
    position: { x: 9.5, y: 3, z: 9.3 },
    rotation: Quaternion.fromEulerDegrees(0, -120, 0)
  })

  const board_2 = createEventBoard(1, 4, {
    position: { x: 6.5, y: 3, z: 9.3 },
    rotation: Quaternion.fromEulerDegrees(0, 120, 0)
  })

  const board_3 = createEventBoard(2, 4, {
    position: { x: 8, y: 3, z: 6.7 },
    rotation: Quaternion.fromEulerDegrees(0, 0, 0)
  })

  // UI with GitHub link
  setupUi()
}
