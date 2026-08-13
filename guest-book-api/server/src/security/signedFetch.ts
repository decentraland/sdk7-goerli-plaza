import type { NextFunction, Request, Response } from 'express'
import { RequestError, verify, Options } from '@dcl/crypto-middleware'

/**
 * Express middleware for ADR-44 signed-fetch requests.
 *
 * `@dcl/crypto-middleware` ships well-known-components and koa integrations but no express
 * one, which the legacy `decentraland-crypto-middleware` provided as `dcl.express()`. This is
 * a faithful port of that middleware, so the routes below behave exactly as before:
 *
 * - The signed path is `req.baseUrl + req.path`. The routes set `req.baseUrl` to `BASE_URL`
 *   before calling this, so a server mounted behind a proxy verifies the path the client
 *   actually signed. Using `req.path` alone would fail every request whenever `BASE_URL` is set.
 * - The verified data is assigned onto `req`, so handlers keep reading `req.auth` and
 *   `req.authMetadata`.
 * - `optional` skips the error response and continues unauthenticated.
 */
export function express(options: Options = {}) {
  return function (req: Request, res: Response, next: NextFunction) {
    verify(req.method, req.baseUrl + req.path, req.headers, options)
      .then((data) => {
        Object.assign(req, data)
        next()
      })
      .catch((err) => {
        if (options.optional) {
          return next()
        }

        const status = err instanceof RequestError ? err.statusCode : 500
        // Mirrors the library's own default formatter: 4xx echo the message so a client can
        // see why its signature was rejected, 5xx are masked so catalyst hostnames and
        // upstream errors are not echoed back.
        const body = options.onError
          ? options.onError(err)
          : { ok: false, message: status >= 500 ? 'Internal error' : err.message }

        res.status(status).send(body)
      })
  }
}
