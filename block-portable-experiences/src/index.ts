import { engine, InputAction, inputSystem, Material, MeshCollider, pointerEventsSystem } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'

import { addPlatforms } from './platforms'
import { addChest } from './chest'
import { showUI } from './denyUI'
import { checkPortableExperience } from './peTracking'

export function main() {
  addPlatforms()
  checkPortableExperience()
  addChest()
}
