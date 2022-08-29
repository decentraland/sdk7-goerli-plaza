import { getProvider } from '@decentraland/web3-provider'

getProvider()
  .then((...result) =>
    dcl.log('Value of web3-provider.getProvider', Object.keys(result[0]))
  )
  .catch((err) => dcl.error('web3-provider.getProvider error', err))
