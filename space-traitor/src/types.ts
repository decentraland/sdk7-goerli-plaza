import { Schema, ArraySchema, MapSchema, type } from '@colyseus/schema'

export class Player extends Schema {
  @type('string') id: string = ''
  @type('string') userId: string = ''
  @type('string') displayName: string = ''
  @type('boolean') isTraitor: boolean = false
  @type('boolean') alive: boolean = true
  @type(['string']) votes: ArraySchema<string> = new ArraySchema<string>();
  @type('boolean') ready: boolean = false
}

export class Equiptment extends Schema {
  @type('number') id: number = 0
  @type('boolean') broken: boolean = true
}

export class FuseBox extends Schema {
  @type('number') id: number = 0
  @type('boolean') doorOpen: boolean = false
  @type('boolean') redCut: boolean = false
  @type('boolean') greenCut: boolean = false
  @type('boolean') blueCut: boolean = false
  @type('boolean') broken: boolean = false
}


export class MyRoomState extends Schema {
  @type('boolean') active: boolean = false
  @type('boolean') paused: boolean = false
  @type('number') fixCount: number = 0
  @type('number') traitors: number = 0
  @type('number') countdown: number = 0
  @type('number') votingCountdown: number = 0
  @type([FuseBox]) fuseBoxes = new ArraySchema<FuseBox>()
  @type([Equiptment]) toFix = new ArraySchema<Equiptment>()
  @type({ map: Player }) players: MapSchema<Player> = new MapSchema<Player>()
}
