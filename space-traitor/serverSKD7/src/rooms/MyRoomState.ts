import { Schema, Context, ArraySchema, MapSchema, type } from '@colyseus/schema'
import { EQUIPT_COUNT, FUSE_BOXES, GAME_DURATION, VOTING_TIME } from '../config'

export class Player extends Schema {
  @type('string') id: string
  @type('string') name: string
  @type('string') thumb: string | null
  @type('boolean') isTraitor: boolean
  @type('boolean') alive: boolean
  @type(['string']) votes: string[] = []
  @type('boolean') ready: boolean
  constructor(id: string, name: string, thumb?: string) {
    super()
    this.id = id
    this.name = name
    this.thumb = thumb ? thumb : null
    this.isTraitor = false
    this.alive = true
    this.ready = false
    
  }
  reset() {
    this.ready = false
    this.alive = false
    this.isTraitor = false
    
  }
}

export class Equiptment extends Schema {
  @type('number') id: number
  @type('boolean') broken: boolean
  constructor(id: number) {
    super()
    this.id = id
    this.broken = true
  }
  reset() {
    this.broken = true
  }
}

export class FuseBox extends Schema {
  @type('number') id: number
  @type('boolean') doorOpen: boolean
  @type('boolean') redCut: boolean
  @type('boolean') greenCut: boolean
  @type('boolean') blueCut: boolean
  @type('boolean') broken: boolean
  constructor(id: number) {
    super()
    this.id = id
    this.doorOpen = false
    this.redCut = false
    this.greenCut = false
    this.blueCut = false
    this.broken = false
  }
  reset() {
    this.doorOpen = false
    this.redCut = false
    this.greenCut = false
    this.blueCut = false
    this.broken = false
  }
}

export type JoinData = {
  thumb?: string
}

export type EquiptmentChange = {
  id: number
  broken: boolean
}

export type FuseChange = {
  id: number
  doorOpen?: boolean
  redCut?: boolean
  greenCut?: boolean
  blueCut?: boolean
}

export type Vote = {
  voter: string
  voted: string
}

export class MyRoomState extends Schema {
  @type('boolean') active: boolean
  @type('boolean') paused: boolean
  @type('number') fixCount: number
  @type('number') traitors: number
  @type('number') countdown: number
  @type('number') votingCountdown: number
  @type([FuseBox]) fuseBoxes = new ArraySchema<FuseBox>()
  @type([Equiptment]) toFix = new ArraySchema<Equiptment>()
  @type({ map: Player }) players = new MapSchema<Player>()

  constructor(boxCount: number = 4, equiptCount: number = 8) {
    super()
    this.active = false
    this.paused = false
    this.fixCount = 0
    this.traitors = 0
    this.countdown = GAME_DURATION
    this.votingCountdown = VOTING_TIME

    for (let i = 0; i <= FUSE_BOXES; i++) {
      this.fuseBoxes.push(new FuseBox(i))
      console.log("hey")
    }

    for (let j = 0; j <= EQUIPT_COUNT; j++) {
      this.toFix.push(new Equiptment(j))
    }
  }
}
