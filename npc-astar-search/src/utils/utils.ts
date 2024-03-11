import { Entity, Transform } from "@dcl/sdk/ecs"
import { Quaternion, Vector3 } from "@dcl/sdk/math"
import { ReadOnlyVector3 } from "~system/EngineApi"

export abstract class Utils {

    static getForwardVectorQ(_rotation: Quaternion): Vector3 {
        return Vector3.create(
            2 * (_rotation.x * _rotation.z + _rotation.w * _rotation.y),
            2 * (_rotation.y * _rotation.z - _rotation.w * _rotation.x),
            1 - 2 * (_rotation.x * _rotation.x + _rotation.y * _rotation.y)
        )
    }

    static multiplyVectorByQuaternion(_quaternion: Quaternion, _vector: Vector3): Vector3 {
        const q = [_quaternion.w, _quaternion.x, _quaternion.y, _quaternion.z]
        const r = [0, _vector.x, _vector.y, _vector.z]
        const conj = [q[0], -1 * q[1], -1 * q[2], -1 * q[3]]
        const mul = (q: number[], r: number[]): number[] => {
            return [
                r[0] * q[0] - r[1] * q[1] - r[2] * q[2] - r[3] * q[3],
                r[0] * q[1] + r[1] * q[0] - r[2] * q[3] + r[3] * q[2],
                r[0] * q[2] + r[1] * q[3] + r[2] * q[0] - r[3] * q[1],
                r[0] * q[3] - r[1] * q[2] + r[2] * q[1] + r[3] * q[0]
            ]
        }
        const res = mul(mul(q, r), conj)
        return Vector3.create(res[1], res[2], res[3])
    }
}

export function pickRandom(str: string[]) {
    const val = str[Math.floor(Math.random() * str.length)]
    console.log("pickRandom", str, "returning", val)
    return val
}

export function inverseQuaternion(q: Quaternion): Quaternion {
    return Quaternion.create(-q.x, -q.y, -q.z, q.w)
}

export function turn(entity: Entity, target: ReadOnlyVector3) {
    const transform = Transform.getMutable(entity)
    const difference = Vector3.subtract(target, transform.position)
    const normalizedDifference = Vector3.normalize(difference)
    transform.rotation = Quaternion.lookRotation(normalizedDifference)
}

/** @public */
export type TransformConstructorArgs = {
    position: Vector3
    rotation: Quaternion
    scale: Vector3
    test: number
}

export declare class NPCLerpData {
    path: Vector3[]
    origin: number
    target: number
    fraction: number
    totalDuration: number
    speed: number[]
    loop: boolean
    type: NPCLerpType
    onFinishCallback?: () => void
    onReachedPointCallback?: () => void
    constructor(path: Vector3[], type?: NPCLerpType)
    setIndex(index: number): void
}

export declare enum NPCLerpType {
    SMOOTH_PATH = "smooth",
    RIGID_PATH = "rigid"
}