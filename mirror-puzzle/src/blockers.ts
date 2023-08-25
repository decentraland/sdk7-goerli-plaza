import { Vector3 } from "@dcl/sdk/math";

export abstract class Blockers {
  // Blocked coordinates
  public static readonly BLOCKED: Vector3[] = [
    Vector3.create(1.5, 0, 14.5),
    Vector3.create(2.5, 0, 14.5),
    Vector3.create(3.5, 0, 14.5),
    Vector3.create(4.5, 0, 14.5),
    Vector3.create(5.5, 0, 14.5),
    Vector3.create(6.5, 0, 14.5),
    Vector3.create(7.5, 0, 14.5),
    Vector3.create(8.5, 0, 14.5),
    Vector3.create(9.5, 0, 14.5),
    Vector3.create(10.5, 0, 14.5),
    Vector3.create(11.5, 0, 14.5),
    Vector3.create(11.5, 0, 15.5),
    Vector3.create(11.5, 0, 16.5),
    Vector3.create(11.5, 0, 17.5),
    Vector3.create(10.5, 0, 17.5),
    Vector3.create(9.5, 0, 17.5),
    Vector3.create(8.5, 0, 17.5),
    Vector3.create(7.5, 0, 17.5),
    Vector3.create(6.5, 0, 17.5),
    Vector3.create(5.5, 0, 17.5),
    Vector3.create(4.5, 0, 17.5),
    Vector3.create(3.5, 0, 17.5),
    Vector3.create(2.5, 0, 17.5),
    Vector3.create(1.5, 0, 17.5),
    Vector3.create(2.5, 0, 2.5) // Ray Emitter
  ]
}