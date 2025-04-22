import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { PhotoMural } from './photoMural'

export function main() {
    new PhotoMural({
        sceneCoords: ["143,-76", "143,-79"],
        transform: {
            position: Vector3.create(8, 0.7, 8),
            rotation: Quaternion.fromEulerDegrees(0, 45, 0)
        }
    })
}
