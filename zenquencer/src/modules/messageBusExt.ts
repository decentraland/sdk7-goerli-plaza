import { Observer } from '@dcl/sdk/internal/Observable'
import { MessageBus } from '@dcl/sdk/message-bus'
import { IEvents } from '@dcl/sdk/observables'

export class MessageBusExt extends MessageBus {
  /**if enabled, will skip the msg bus aka the "on" and fire immeidatly when "emit" called */
  isMultiplayerEnabledAll: boolean = false
  //TODO define it per message type...
  //isMultiplayerEnabledInst: Record<string,boolean>={}
  cbLookup: Record<any, (value: any, sender: string) => void> = {}
  constructor() {
    super()
  }
  on(message: string, callback: (value: any, sender: string) => void): Observer<IEvents['comms']> {
    const result = super.on(message, callback)
    this.cbLookup[message] = callback
    return result
  }
  emit(message: string, payload: Record<any, any>) {
    if (!this.isMultiplayerEnabledAll) {
      if (this.cbLookup[message]) {
        this.cbLookup[message](payload, 'me')
      } else {
        console.log('MessageBusExt', 'WARNING', 'emit: no callback for message', message)
      }
    } else {
      super.emit(message, payload)
    }
  }
}
