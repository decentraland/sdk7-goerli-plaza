import { executeTask } from '@dcl/sdk/ecs'
import { UserData, getUserData } from '~system/UserIdentity'
import { closeUi, displaySignature } from './ui'
import { signedFetch } from '~system/SignedFetch'

// external servers being used by the project - Please change these to your own if working on something else!
// const fireBaseServer = 'http://localhost:5001/dcl-guestbook-e4ae4/us-central1/app/'  // running firebase function locally
const fireBaseServer = 'https://us-central1-dcl-guestbook-e4ae4.cloudfunctions.net/app/' // after deploy

const linesPerGuestBookPage = 8
var signatureList: any[]

// get latest guestbook data from server
export function fetchSignatures() {
  executeTask(async () => {
    try {
      const response = await signedFetch({
        url: fireBaseServer + 'get-signatures',
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

      let allSignatures = json.allSignatures

      console.log(allSignatures)

      let signaturePage = 0
      signatureList = ['']
      for (let i = 0; i < allSignatures.length; i++) {
        signatureList[signaturePage] = signatureList[signaturePage].concat(allSignatures[i].name)
        signatureList[signaturePage] = signatureList[signaturePage].concat(' - ')
        const lines = signatureList[signaturePage].split('\n')
        if (lines[lines.length - 1].length > 20) {
          signatureList[signaturePage] = signatureList[signaturePage].concat('\n')
        }

        if (lines.length >= linesPerGuestBookPage) {
          signaturePage += 1
          signatureList.push('')
          //guestBookPage
        }
      }

      displaySignature(signatureList[0], false, signatureList.length > 1)
    } catch (e) {
      console.log('error fetching signatures from server: ' + e)

      displaySignature('Failed to fetch signatures', false, false)
    }
  })
}

export function getSignaturePage(page: number) {
  return signatureList[page]
}

export function getSignatureTotalPage() {
  return signatureList.length
}

// get player data
var userData: UserData

export async function setUserData() {
  let response = await getUserData({})
  userData = response.data!
}

executeTask(setUserData)

// add data in guestbook
export function signGuestbook() {
  executeTask(async () => {
    if (!userData) {
      await setUserData()
    }

    try {
      const response = await signedFetch({
        url: fireBaseServer + 'add-signature',
        init: {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({
            id: (await userData).userId,
            name: (await userData).displayName
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

      closeUi()
      console.log('signed guestbook')
    } catch (e) {
      console.log('error posting to server: ' + e)
    }
  })
}
