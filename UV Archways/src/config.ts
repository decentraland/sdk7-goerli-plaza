import { Vector3 } from "@dcl/sdk/math"

const parcelCountX: number = 2
const parcelCountZ: number = 28
export class Config {
    sizeX!: number
    sizeY!: number
    sizeZ!: number

    showFullVideoDebugPanel: boolean = true

    center!: Vector3
    centerGround!: Vector3

    init() {
        this.sizeX = parcelCountX * 16
        this.sizeZ = parcelCountZ * 16
        this.sizeY = (Math.log((parcelCountX * parcelCountZ) + 1) * Math.LOG2E) * 20
        this.center = Vector3.create(this.sizeX / 2, this.sizeY / 2, this.sizeZ / 2)
        this.centerGround = Vector3.create(this.sizeX / 2, 0, this.sizeZ / 2)
    }
}



export const CONFIG = new Config()
CONFIG.init()