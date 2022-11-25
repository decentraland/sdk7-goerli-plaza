import * as comms from '~system/CommunicationsController'

declare const btoa: any
declare const atob: any

export function createCommsTransport(): Transport {
  dcl.subscribe('comms')
  dcl.onEvent((event) => {
    if (event.type === 'comms') {
      const bytes = new Uint8Array(
        atob((event.data as any).message)
          .split('')
          .map((c: string) => c.charCodeAt(0))
      )
      if ((ret as any).onmessage) (ret as any).onmessage(bytes)
    }
  })

  const type = 'comms'
  const ret = {
    type,
    send(message: Uint8Array): void {
      const b64Str = btoa(String.fromCharCode.apply(null, message as any))
      comms.send({ message: b64Str }).then().catch(dcl.error)
    },
    filter(message: TransportMessage): boolean {
      if (message.entity < 512) return false
      return !!message
    }
  }
  return ret
}

// Uncomment this line to enable the sync by comms. It's unstable, the `filter` function need to be tunned.
// ;(engine as any).addTransport(createCommsTransport())
