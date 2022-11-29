import { Vector3 } from "@dcl/sdk/math";

  type Vector3Type = {
   x: number; y: number; z: number 
 }

export class Vector3Wrapper {
 
 static copyFrom(src: Vector3Type, dest: Vector3.MutableVector3) {
    src.x = dest.x
    src.y = dest.y
    src.z = dest.z
  }
}