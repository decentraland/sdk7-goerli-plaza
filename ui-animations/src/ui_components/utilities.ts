import { Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'

export function getRandomHexColor(): string {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export function onelerp(v0: number, v1: number, t: number): number {
  return (1 - t) * v0 + t * v1
}

export function calculateBezier(start: Vector3, end: Vector3, inter1: Vector3, inter2: Vector3, t: number): Vector3 {
  var a = Vector3.lerp(start, inter1, t)
  var b = Vector3.lerp(inter1, inter2, t)
  var c = Vector3.lerp(inter2, end, t)
  var d = Vector3.lerp(a, b, t)
  var e = Vector3.lerp(b, c, t)
  return Vector3.lerp(d, e, t)
}

export function smoothPath(controlPoints: Vector3[], smoothness: number): Vector3[] {
  if (controlPoints.length < 4 || smoothness == 0) {
    return [Vector3.Zero(), Vector3.Zero()]
  }
  let path = []

  for (let t = 0; t <= 1; t += 1 / smoothness) {
    console.log(
      'bezier: ' +
        calculateBezier(controlPoints[0], controlPoints[3], controlPoints[1], controlPoints[2], t).x +
        ' , Time: ' +
        t
    )
    path.push(calculateBezier(controlPoints[0], controlPoints[3], controlPoints[1], controlPoints[2], t))
  }
  return path
}

export function pitchShift(currentPitch: number, shift: number): number {
  return Math.pow(2.0, shift / 12.0) * currentPitch
}

export function rotate2D(angle: number, x: number, y: number, centerX: number, centerY: number): [number, number] {
  angle = angle % 360
  // if (angle > 180)
  // angle -= 360;
  let A = (angle * Math.PI) / 180
  let CosA = Math.cos(A)
  let SinA = Math.sin(A)
  let cx = centerX
  let cy = centerY
  let X = x - cx
  let Y = y - cy
  let NX = X * CosA - Y * SinA
  let NY = Y * CosA + X * SinA
  x = NX + cx
  y = NY + cy

  return [x, y]
}

export function rotateUVs(angle: number): number[] {
  let UV00 = rotate2D(angle, 0, 0, 0.5, 0.5)
  let UV01 = rotate2D(angle, 0, 1, 0.5, 0.5)
  let UV11 = rotate2D(angle, 1, 1, 0.5, 0.5)
  let UV10 = rotate2D(angle, 1, 0, 0.5, 0.5)

  return [UV00[0], UV00[1], UV01[0], UV01[1], UV11[0], UV11[1], UV10[0], UV10[1]]
}
