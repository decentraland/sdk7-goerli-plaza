import {
  RPCSendableMessage,
  MessageDict,
  requirePayment,
  signMessage,
  convertMessageToObject,
  sendAsync,
  getUserAccount
} from '@decentraland/EthereumController'

getUserAccount()
  .then((userAccount) => {
    dcl.log(`Value of EthereumController.getUserAccount is  ${userAccount}`)

    requirePayment('0xade6bcf67d357aec9d0caedc3c6ead', 10, 'MANA')
      .then((...result) => {
        dcl.log('Value of EthereumController.requirePayment is ', result)
      })
      .catch((err) => dcl.error('EthereumController.requirePayment error ', err))

    // signMessage({ test: 'yes' })
    //   .then((...result) => {
    //     dcl.log('Value of EthereumController.signMessage is ', result)
    //   })
    //   .catch((err) => dcl.error('EthereumController.signMessage error ', err))

    convertMessageToObject('{"test":"meiowfmiwoemfoerifmoeirf"}')
      .then((...result) => {
        dcl.log(
          'Value of EthereumController.convertMessageToObject is ',
          result
        )
      })
      .catch((err) =>
        dcl.error('EthereumController.convertMessageToObject error ', err)
      )

    sendAsync({
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_gasPrice',
      params: []
    })
      .then((...result) => {
        dcl.log('Value of EthereumController.sendAsync is ', result)
      })
      .catch((err) => dcl.error('EthereumController.sendAsync error ', err))
  })
  .catch((err) => dcl.error('EthereumController.getUserAccount error ', err))

// export type RPCSendableMessage = {
//   jsonrpc: '2.0'
//   id: number
//   method: string
//   params: any[]
// }

// export interface MessageDict {
//   [key: string]: string
// }

// /**
//  * Requires a generic payment in ETH or ERC20.
//  * @param  {string} [toAddress] - NFT asset id.
//  * @param  {number} [amount] - Exact amount of the order.
//  * @param  {string} [currency] - ETH or ERC20 supported token symbol
//  */
// export function requirePayment(toAddress: string, amount: number, currency: string): Promise<any>

// /**
//  * Takes a dictionary, converts it to string with correct format and signs it.
//  * @param  {messageToSign} [MessageDict] - Message in an object format.
//  * @return {object} - Promise of message and signature in an object.
//  */
// export function signMessage(
//   message: MessageDict
// ): Promise<{ message: string; hexEncodedMessage: string; signature: string }>

// /**
//  * Takes a message string, parses it and converts to object.
//  * @param  {message} [string] - Message in a string format.
//  * @return {object} - Promise of message as a MessageDict.
//  * @internal
//  */
// export function convertMessageToObject(message: string): Promise<MessageDict>

// /**
//  * Used to build a Ethereum provider
//  */
// export function sendAsync(message: RPCSendableMessage): Promise<any>

// /**
//  * Returns the user's public key (address)
//  */
// export function getUserAccount(): Promise<string>
