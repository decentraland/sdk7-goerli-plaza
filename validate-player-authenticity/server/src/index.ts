import express, { Request, Response } from 'express'
import cors from 'cors'
import dcl, { express as dclExpress } from 'decentraland-crypto-middleware'

import { runChecks } from './security/securityChecks'
import { VALID_SIGNATURE_TOLERANCE_INTERVAL_MS, Metadata, VALID_PARCEL } from './utils'

import * as dotenv from 'dotenv'
dotenv.config()

const SERVER_PORT = process.env.PORT || 3004
const SERVER_BASE_URL = process.env.BASE_URL || ''

const app = express()

app.use(cors({ origin: true }))

app.get('/check-validity', async (req: Request & dcl.DecentralandSignatureData<Metadata>, res: Response) => {
  try {
    req.baseUrl = SERVER_BASE_URL;
    return dcl.express({ expiration: VALID_SIGNATURE_TOLERANCE_INTERVAL_MS })(req, res, async () => {
      try {
        await runChecks(req, VALID_PARCEL);
        return res.status(200).send({ valid: true, msg: 'Valid request' });
      } catch (error) {
        return res.status(400).send({ valid: false, error: error });
      }
    });
  } catch (error) {
    return res.status(400).send({ valid: false, error: error });
  }
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT} - base URL: "${SERVER_BASE_URL}"`);
});