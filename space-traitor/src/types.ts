import { Quaternion, Vector3 } from "@dcl/sdk/math"

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
export type EquiptmentData = {
  position: Vector3
  rotation: Quaternion
  scale?: Vector3
  startBroken: boolean
}

export class Player extends Object {
  id: number
  name: string
  thumb: string | null
  isTraitor: boolean = false
  alive: boolean = true
  votes: number[] = []
  constructor(id: number, name: string, thumb?: string) {
    super()
    this.id = id
    this.name = name
    this.thumb = thumb ? thumb : null
  }
}
