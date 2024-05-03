import { Entity, Material, MeshRenderer, Transform, TransformType, engine } from '@dcl/sdk/ecs'
import { Color3, Color4 } from '@dcl/sdk/math'
import {
  ArcadeScreenFlag,
  CollisionFlag,
  HasGameLoaded,
  PaddleFlag,
  PlayerElementsFlag
} from '../components/definitions'

export function createPaddle(transform: Partial<TransformType>, color: Color3): void {
  const paddle: Entity = engine.addEntity()
  Transform.create(paddle, transform)
  const transformMutable = Transform.getMutable(paddle)
  for (const [screen] of engine.getEntitiesWith(ArcadeScreenFlag)) {
    if (ArcadeScreenFlag.getOrNull(screen)?.game === HasGameLoaded.getOrNull(engine.RootEntity)?.game) {
      transformMutable.parent = screen
    }
  }
  Material.setPbrMaterial(paddle, { albedoColor: Color4.fromColor3(color) })
  MeshRenderer.create(paddle, { mesh: { $case: 'box', box: { uvs: [] } } })

  PaddleFlag.create(paddle, {})
  CollisionFlag.create(paddle, {})
  PlayerElementsFlag.create(paddle, {})
}
