import { LeaderBoard } from './leaderboard'
import { executeTask } from '@dcl/sdk/ecs'
import { UserData, getUserData } from '~system/UserIdentity'
import { signedFetch } from '~system/SignedFetch'

// external servers being used by the project - Please change these to your own if working on something else!
// const fireBaseServer = 'http://localhost:5001/dcl-leaderboard-d4629/us-central1/app/'  // running firebase function locally
const fireBaseServer = 'https://us-central1-dcl-leaderboard-d4629.cloudfunctions.net/app/'

// get latest guestbook data from server
export function fetchScores(leaderboard: LeaderBoard) {
  executeTask(async () => {
    try {
      const response = await signedFetch({
        url: fireBaseServer + 'get-scores',
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
var userData: UserData

export async function setUserData() {
  let response = await getUserData({})
  userData = response.data!
}

executeTask(setUserData)

// add data in guestbook
export function publishScore(score: number, leaderboard: LeaderBoard) {
  executeTask(async () => {
    if (!userData) {
      await setUserData()
    }

    try {
      const response = await signedFetch({
        url: fireBaseServer + 'publish-score',
        init: {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({
            id: (await userData).userId,
            name: (await userData).displayName,
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
