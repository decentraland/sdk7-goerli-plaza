import { Request, Response } from 'express'
import * as dcl from 'decentraland-crypto-middleware'
import { runChecks } from './security/securityChecks'
import { VALID_SIGNATURE_TOLERANCE_INTERVAL_MS, Metadata, VALID_PARCEL } from './security/utils'
import * as sqlite3 from 'sqlite3'
import { open } from 'sqlite'

require('dotenv').config()

const SERVER_PORT = process.env.PORT || 3006
const SERVER_BASE_URL = process.env.BASE_URL || ''

const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors({ origin: true }))
app.use(express.json())

const dbPromise = open({
  filename: './database.db',
  driver: sqlite3.Database
})

;(async () => {
  const db = await dbPromise
  await db.exec('CREATE TABLE IF NOT EXISTS Scores (id TEXT, name TEXT, score INTEGER)')
})()

app.get('/check-validity', async (req: Request & dcl.DecentralandSignatureData<Metadata>, res: Response) => {
  try {
    req.baseUrl = SERVER_BASE_URL
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
    req.baseUrl = SERVER_BASE_URL
    return dcl.express({ expiration: VALID_SIGNATURE_TOLERANCE_INTERVAL_MS })(req, res, async () => {
      try {
        await runChecks(req, VALID_PARCEL)

        const db = await dbPromise
        const scores = await db.all('SELECT * FROM Scores ORDER BY score DESC LIMIT 10')

        return res.status(200).send({
          valid: true,
          topTen: scores
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
    req.baseUrl = SERVER_BASE_URL
    return dcl.express({ expiration: VALID_SIGNATURE_TOLERANCE_INTERVAL_MS })(req, res, async () => {
      try {
        await runChecks(req, VALID_PARCEL)

        const newScore = req.body
        const db = await dbPromise
        await db.run('INSERT INTO Scores (id, name, score) VALUES (?, ?, ?)', [
          newScore.id,
          newScore.name,
          newScore.score
        ])

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

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT} - base URL: "${SERVER_BASE_URL}"`)
})
