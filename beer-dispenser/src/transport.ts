// import {MessageBus} from '@dcl/sdk/messageBus'

// declare const btoa: any
// declare const atob: any

// export function createCommsTransport(): Transport {
//   const bus = new MessageBus()

//   const type = 'comms'
//   const ret = {
//     type,
//     send(message: Uint8Array): void {
//       const b64Str = btoa(String.fromCharCode.apply(null, message as any))
//       bus.emit(b64Str)
//     },
//     filter(message: TransportMessage): boolean {
//       if (message.entity < 512) return false
//       return !!message
//     }
//   }
//   return ret
// }

// Uncomment this line to enable the sync by comms. It's unstable, the `filter` function need to be tunned.
// ;(engine as any).addTransport(createCommsTransport())
