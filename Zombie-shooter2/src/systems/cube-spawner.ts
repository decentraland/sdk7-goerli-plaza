import { CubeIdentifierComponent } from '../components/cube'
import { createCube } from '../factory/cube'

const { OnPointerDownResult } = engine.baseComponents

export function spawnerSystem() {
  const clickedCubes = engine.getEntitiesWith(CubeIdentifierComponent, OnPointerDownResult)
  for (const [_entity, _cube, pointerDownResult] of clickedCubes) {
    dcl.log(pointerDownResult.timestamp)
    createCube(Math.random() * 8 + 1, Math.random() * 8, Math.random() * 8 + 1, false)
  }
}
