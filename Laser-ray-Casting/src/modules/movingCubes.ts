//-------------------------------------------------------
// This system moves all the cubes to the right and when

import { boxesCount, MovingCube, speed } from '../definitions'

// a limit is reached, teleports the cube to the left
export default function movingCubesSystem(dt: number) {
  const delta = speed * dt
  for (const [entity] of engine.getEntitiesWith(MovingCube, Transform)) {
    const transform = Transform.getMutable(entity)
    transform.position.x += delta
    if (transform.position.x >= 2 + boxesCount * 3) transform.position.x -= 2 + boxesCount * 3
  }
}
