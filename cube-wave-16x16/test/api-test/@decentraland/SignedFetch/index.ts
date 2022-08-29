import {
  FlatFetchResponse,
  BodyType,
  FlatFetchInit,
  signedFetch
} from '@decentraland/SignedFetch'

signedFetch(
  'https://peer-ap1.decentraland.org/comms/status?includeLayers=true',
  { responseBodyType: 'json' }
)
  .then((...result) => dcl.log('Value of SignedFetch.signedFetch', result))
  .catch((err) => dcl.error('SignedFetch.signedFetch error', err))

signedFetch('https://peer-ap1.decentraland.org/comms/badurl?includeLayers=true')
  .then((...result) => dcl.log('Value of SignedFetch.signedFetch (2)', result))
  .catch((err) => dcl.error('SignedFetch.signedFetch error (2)', err))
// export type FlatFetchResponse = {
//   ok: boolean
//   status: number
//   statusText: string
//   headers: Record<string, string>
//   json?: any
//   text?: string
// }

// export type BodyType = 'json' | 'text'

// export type FlatFetchInit = RequestInit & { responseBodyType?: BodyType }

// export function signedFetch(url: string, init?: FlatFetchInit): Promise<FlatFetchResponse>
