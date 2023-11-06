import { Vector3 } from '@dcl/sdk/math'
import { ClickableDog } from './clickableDog'
import { buildScene } from './environment'
import { LeaderBoard } from './leaderboard'
import * as utils from '@dcl-sdk/utils'
import { fetchScores, publishScore } from './serverHandler'

export function main() {
  buildScene()

  const leaderboard = new LeaderBoard(
    {
      position: Vector3.create(1, 0, 9.5),
      scale: Vector3.create(1.8453333377838135, 1.8453333377838135, 6)
    },
    5
  )

  fetchScores(leaderboard)

  // update board every 5 seconds
  utils.timers.setInterval(() => {
    fetchScores(leaderboard)
  }, 5000)

  new ClickableDog(
    {
      position: Vector3.create(7.5, 0, 13)
    },
    (count: number) => {
      publishScore(count, leaderboard)
    }
  )
}
