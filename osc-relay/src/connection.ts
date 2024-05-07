//
// IMPORTANT :
// - include `noLib: false` to your tsconfig.json file, under "compilerOptions"
//
///<reference lib="es2015.symbol" />
///<reference lib="es2015.symbol.wellknown" />
///<reference lib="es2015.collection" />
///<reference lib="es2015.iterable" />

import { Color4 } from '@dcl/sdk/math'
import { Room } from 'colyseus.js'
import { getRealm } from '~system/Runtime'
import { GameController } from './game.controller'
import { getUserData } from "~system/UserIdentity";
import * as Colyseus from "colyseus.js";

export class Connection {
  private gameController: GameController
  private userData: any

  constructor(gameController: GameController) {
    this.gameController = gameController
  }
  async setUserData() {
    this.userData = await getUserData({})
  }
  async connect(roomName: string, options: any = {}) {
    const { realmInfo } = await getRealm({})
    //
    // make sure users are matched together by the same "realm".
    //
    if (realmInfo?.isPreview) {
      options.realm = 'test'
    } else {
      options.realm = realmInfo?.realmName
    }

    if (!this.userData) {
      await this.setUserData()
    }
    options.userData = this.userData

    console.log('data sent:', options)

    // const ENDPOINT = "wss://hept-j.colyseus.dev";

    const ENDPOINT = 'ws://127.0.0.1:2567'
    //realmInfo?.isPreview
    // ? 'ws://localhost:2567' // local environment
    // : 'wss://l9tio3.colyseus.dev' // production environment
    console.log("Connecting to", ENDPOINT)
    if (realmInfo?.isPreview) {
      this.addConnectionDebugger(ENDPOINT)
      console.log("is preview")
    }
    let client = new Colyseus.Client('ws://127.0.0.1:2567');

    try {
      //
      // Docs: https://docs.colyseus.io/client/client/#joinorcreate-roomname-string-options-any
      const room = await client.joinOrCreate<any>(roomName, options)
      console.log(room)
      if (realmInfo?.isPreview) {
        this.updateConnectionDebugger(room)
      }

      // return room
    } catch (error) {
      this.updateConnectionMessage(`Error: ${error}`, Color4.Red())
      throw error
    }
  }
  addConnectionDebugger(endpoint: string) {
    this.updateConnectionMessage(`Connecting to ${endpoint}`, Color4.Black())
  }
  updateConnectionMessage(value: string, color: Color4) {
    this.gameController.ui.message = value
    this.gameController.ui.color = color
  }
  updateConnectionDebugger(room: Room) {
    this.updateConnectionMessage('Connected.', Color4.Green())
    room.onLeave(() => this.updateConnectionMessage('Connection lost', Color4.Red()))
  }
}