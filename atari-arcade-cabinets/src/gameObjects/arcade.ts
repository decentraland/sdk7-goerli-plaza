import { GltfContainer, Transform, engine, type Entity } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { ArcadeFlag, KnobFlag } from '../components/definitions'
import { CABINETS, Games } from '../gameLogic/sharedConstants'

export function createArcade(
  position: Vector3,
  rotation: Quaternion,
  game: Games
): void {

  const arcade: Entity = engine.addEntity()
  const cabinet: Entity = engine.addEntity()
  const knob: Entity = engine.addEntity()

  GltfContainer.create(cabinet, { src: CABINETS[game] })
  Transform.create(cabinet, { parent: arcade })
  Transform.create(arcade, { position, rotation })

  GltfContainer.create(knob, { src: 'models/knob.glb' })
  Transform.create(knob, {
    parent: cabinet,
    position: Vector3.create(0, 1.383, -0.397),
    rotation: Quaternion.fromAngleAxis(11.6, Vector3.Left())
  })
  KnobFlag.create(knob, { game })
  ArcadeFlag.create(arcade, { game })
}
