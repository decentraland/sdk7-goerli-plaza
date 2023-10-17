import { Request, Response } from 'express'
import * as dcl from 'decentraland-crypto-middleware'
import { runChecks } from './security/securityChecks'
import { VALID_SIGNATURE_TOLERANCE_INTERVAL_MS, Metadata } from './security/utils'

export const VALID_PARCEL: number[] = [1, 1]

const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors({ origin: true }))

exports.app = functions.https.onRequest(app)

var admin = require('firebase-admin')

var serviceAccount = require('../permission.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

let scores = db.collection('Scores')

let topTen = scores.orderBy('score', 'desc').limit(10)

app.get('/check-validity', async (req: Request & dcl.DecentralandSignatureData<Metadata>, res: Response) => {
  try {
    //req.baseUrl = '/dcl-leaderboard-d4629/us-central1/app' // Here the url path that when running firebase function locally, change it to your own server
    req.baseUrl = '/app' // Here the url path that after deploy
    return dcl.express({ expiration: VALID_SIGNATURE_TOLERANCE_INTERVAL_MS })(req, res, async () => {
      try {
        await runChecks(req, VALID_PARCEL)
        return res.status(200).send({ valid: true, msg: 'Valid request' })
      } catch (error) {
        return res.status(400).send({ valid: false, error: error })
      }
    })
  } catch (error) {
    return res.status(400).send({ valid: false, error: error })
  }
})

app.get('/get-scores', async (req: Request & dcl.DecentralandSignatureData<Metadata>, res: Response) => {
  try {
    //req.baseUrl = '/dcl-leaderboard-d4629/us-central1/app' // Here the url path that when running firebase function locally, change it to your own server
    req.baseUrl = '/app' // Here the url path that after deploy
    return dcl.express({ expiration: VALID_SIGNATURE_TOLERANCE_INTERVAL_MS })(req, res, async () => {
      try {
        await runChecks(req, VALID_PARCEL)

        let response: any = []
        await topTen.get().then((queryResult: { docs: any }) => {
          for (let doc of queryResult.docs) {
            response.push(doc.data())
          }
        })
        return res.status(200).send({
          valid: true,
          topTen: response
        })
      } catch (error) {
        return res.status(500).send({
          valid: false,
          message: error
        })
      }
    })
  } catch (error) {
    return res.status(500).send({
      valid: false,
      message: error
    })
  }
})

app.post('/publish-score', async (req: Request & dcl.DecentralandSignatureData<Metadata>, res: Response) => {
  try {
    //req.baseUrl = '/dcl-leaderboard-d4629/us-central1/app' // Here the url path that when running firebase function locally, change it to your own server
    req.baseUrl = '/app' // Here the url path that after deploy
    return dcl.express({ expiration: VALID_SIGNATURE_TOLERANCE_INTERVAL_MS })(req, res, async () => {
      try {
        await runChecks(req, VALID_PARCEL)

        let newScore = req.body
        await scores.doc('/' + Math.floor(Math.random() * 100000) + '/').create({
          id: newScore.id,
          name: newScore.name,
          score: newScore.score
        })

        return res.status(200).send({
          valid: true,
          message: 'Published score!'
        })
      } catch (error) {
        return res.status(500).send({
          valid: false,
          message: error
        })
      }
    })
  } catch (error) {
    return res.status(500).send({
      valid: false,
      message: error
    })
  }
})
