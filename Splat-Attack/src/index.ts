/**   SPLAT DEMO
 *  this file outlines the standard use of the splat module & all included
 *  components. the splat module allows you to create an interactive surface
 *  that players can paint with different colours of splat objects. you can
 *  find a detailed description of each component within its file.
 *
 */

import { Entity, engine, Transform, MeshRenderer } from '@dcl/sdk/ecs'
import { SplatSurface } from './splat-attack/splat-surface.ui'

export function main() {
  //create scene floor object
  const entity: Entity = engine.addEntity()
  Transform.create(entity, {
    position: { x: 16, y: 0, z: 16 },
    scale: { x: 32, y: 0, z: 32 }
  })
  MeshRenderer.setBox(entity)

  //place splat surface (this lets the player paint the surface)
  SplatSurface.Move({ x: 8, y: 0, z: 8 })
  SplatSurface.Scale({ x: 1, y: 1, z: 1 })
}
