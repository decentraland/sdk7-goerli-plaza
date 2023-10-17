import express, { Request, Response } from 'express'
import cors from 'cors'
import dcl, { express as dclExpress } from 'decentraland-crypto-middleware'

import { runChecks } from './security/securityChecks'
import { VALID_SIGNATURE_TOLERANCE_INTERVAL_MS, Metadata } from './utils'

export const VALID_PARCEL: number[] = [1, 1]

const port = 8080 // default port to listen

const app = express()

app.use(cors({ origin: true }))

app.get(
  '/check-validity',
  dclExpress({ expiration: VALID_SIGNATURE_TOLERANCE_INTERVAL_MS }),
  async (req: Request & dcl.DecentralandSignatureData<Metadata>, res: Response) => {
    try {
      await runChecks(req, VALID_PARCEL)
      return res.status(200).send({ valid: true, msg: 'Valid request' })
    } catch (error) {
      console.log(error)
      return res.status(400).send({ valid: false, error: `Can't validate your request` })
    }
  }
)

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
