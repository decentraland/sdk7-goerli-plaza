import { Schema, Context, type, MapSchema } from "@colyseus/schema";

export const PASSWORD = 'papafrita'

export class Director extends Schema {
  @type('string') id: string
  @type('string') name: string
  @type('boolean') active: boolean
  constructor(id: string) {
    super()
    this.id = id
    this.active = true
  }
}

export class Viewer extends Schema {
  @type('string') id: string
  @type('string') name: string
  @type('boolean') active: boolean
  constructor(id: string, name: string) {
    super()
    this.id = id
    this.name = name
    this.active = true
  }
}

export class MyRoomState extends Schema {
  @type('string') mySynchronizedProperty: string = 'Hello world'

  @type('number') fader1: number = 0
  @type('number') fader2: number = 0
  @type('number') fader3: number = 0
  @type('number') fader4: number = 0
  @type(Director) director: Director
  @type({ map: Viewer }) audience = new MapSchema<Viewer>()
}

