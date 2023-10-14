import { Vector3, Quaternion } from "@dcl/sdk/math";
import { buildScene } from "./environment";
import { GuestBook } from "./guestbook";

export function main() {
  buildScene()

  new GuestBook(
    {
      position: Vector3.create(8, 0, 10),
      rotation: Quaternion.fromEulerDegrees(0, 300, 0)
    }
  )
}
