import { Vector3 } from '@dcl/sdk/math'

export class Vector3Wrapper {
  static copyFrom(src: Vector3.MutableVector3, dest: Vector3.ReadonlyVector3) {
    src.x = dest.x
    src.y = dest.y
    src.z = dest.z
  }
}
