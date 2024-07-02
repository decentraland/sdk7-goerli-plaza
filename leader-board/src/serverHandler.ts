import { LeaderBoard } from './leaderboard'
import { executeTask } from '@dcl/sdk/ecs'
import { getPlayer } from '@dcl/sdk/src/players'
import { signedFetch } from '~system/SignedFetch'

// external servers being used by the project - Please change these to your own if working on something else!
const serverBaseUrl = 'http://localhost:3001/'  // running locally
// const serverBaseUrl = 'https://test.dclexplorer.com/leader-board/'

// get latest guestbook data from server
export function fetchScores(leaderboard: LeaderBoard) {
  executeTask(async () => {
    try {
      const response = await signedFetch({
        url: serverBaseUrl + 'get-scores',
        init: {
          headers: { 'Content-Type': 'application/json' },
          method: 'GET'
        }
      })

      if (!response.body) {
        throw new Error('Invalid response')
      }

      let json = await JSON.parse(response.body)

      console.log('Response received: ', json)

      if (!json.valid) {
        throw new Error('Does not pass validation check')
      }

      const allScores = await json.topTen

      leaderboard.updateBoard(allScores)
    } catch (e) {
      console.log('error fetching scores from server: ' + e)
    }
  })
}

// get player data
var userData: any

export function setUserData() {
  let response = getPlayer()
  userData = response!
}

setUserData()

// add data in guestbook
export function publishScore(score: number, leaderboard: LeaderBoard) {
  executeTask(async () => {
    if (!userData) {
      setUserData()
    }

    try {
      const response = await signedFetch({
        url: serverBaseUrl + 'publish-score',
        init: {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({
            id: userData.userId,
            name: userData.name,
            score: score
          })
        }
      })

      if (!response.body) {
        throw new Error('Invalid response')
      }

      let json = await JSON.parse(response.body)

      console.log('Response received: ', json)

      if (!json.valid) {
        throw new Error('Does not pass validation check')
      }

      console.log('published score')
      fetchScores(leaderboard)
    } catch (e) {
      console.log('error posting to server: ' + e)
    }
  })
}
