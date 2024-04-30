import * as functions from 'firebase-functions'
import * as express from 'express'
import * as cors from 'cors'
import * as admin from 'firebase-admin'
const app = express()

app.use(cors({ origin: true }))

const serviceAccount = require('../keys.json')
app.get('/hello-world', (req, res) => {
  return res.status(200).send('Hello World!')
})

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://giorgio-1a3d9-default-rtdb.firebaseio.com'
})

const db = admin.firestore()
const userCollection = db.collection('rewardScene')

app.post('/add-user', async (req, res) => {
  const newUser = req.body
  const timestamp = Date.now()
  try {
    const existingUserQuery = await userCollection.where('id', '==', newUser.id).get()
    if (!existingUserQuery.empty) {
      const existingUserData = existingUserQuery.docs[0].data()
      const updatedVisits = existingUserData.visits + 1
      await userCollection.doc(newUser.id).update({ visits: updatedVisits })
      existingUserData.visits = updatedVisits
      return res.status(200).json(existingUserData)
    } else {
      await userCollection.doc(newUser.id).create({
        id: newUser.id,
        wearable: 0,
        timeStamp: timestamp,
        visits: 1
      })
      return res.status(200).send('User Registered!')
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
})

app.post('/update-wearable', async (req, res) => {
  try {
    const userId = req.body.id
    const userRef = userCollection.doc(userId)
    const userDoc = await userRef.get()
    if (!userDoc.exists) {
      return res.status(404).send('User not found')
    }
    const userData = userDoc.data()
    if (!userData) {
      return res.status(500).send('User data not available')
    }
    let currentWearable = userData.wearable
    let timestamp = userData.timeStamp
    const currentTime = Date.now()
    const timeDifference = currentTime - timestamp
    const hoursDifference = timeDifference / (1000 * 60 * 60)
    if (hoursDifference < 24 && currentWearable !== 0) {
      return res.status(400).json('Less than 24 hours have passed')
    }
    timestamp = currentTime
    if (currentWearable === 0) {
      currentWearable = 1
      console.log('Wearable 1 was sent')
    } else if (currentWearable === 1) {
      currentWearable = 2
      console.log('Wearable 2 was sent')
    } else if (currentWearable === 2) {
      currentWearable = 3
      console.log('Wearable 3 was sent')
    } else {
      return res.status(400).json('The user already has the maximum wearable')
    }
    await userRef.update({ wearable: currentWearable, timeStamp: timestamp })
    return res.status(200).json('Wearable updated successfully')
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
})

app.post('/getUserData', async (req, res) => {
  const userId = req.body.id
  try {
    const userQuery = await userCollection.doc(userId).get()
    if (userQuery.exists) {
      const userData = userQuery.data()
      return res.status(200).json(userData)
    } else {
      return res.status(404).send('User not found')
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
})

exports.app = functions.https.onRequest(app)
