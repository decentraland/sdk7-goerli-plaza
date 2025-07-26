import { Entity, GltfContainer, Transform, TransformType, engine } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { OnlyInScene } from './onlyRenderInScene'

export class Translocator {
  entity: Entity = engine.addEntity()
  isFired: boolean = false
  blueGlow: Entity = engine.addEntity()
  orangeGlow: Entity = engine.addEntity()

  constructor(transform: TransformType) {
    Transform.create(this.entity, transform)
    GltfContainer.create(this.entity, {
      src: 'assets/scene/Models/translocator.glb'
    })

    // Glow setup
    Transform.create(this.blueGlow, {
      parent: this.entity
    })
    GltfContainer.create(this.blueGlow, {
      src: 'assets/scene/Models/blueGlow.glb'
    })

    Transform.create(this.orangeGlow, {
      parent: this.entity
    })
    GltfContainer.create(this.orangeGlow, {
      src: 'assets/scene/Models/orangeGlow.glb'
    })

    OnlyInScene.create(this.entity)

    this.setGlow(false)
  }

  // Switches between the glows
  setGlow(isFired: boolean): void {
    this.isFired = isFired
    if (isFired) {
      Transform.getMutable(this.blueGlow).scale = Vector3.Zero()
      Transform.getMutable(this.orangeGlow).scale = Vector3.One()
    } else {
      Transform.getMutable(this.blueGlow).scale = Vector3.One()
      Transform.getMutable(this.orangeGlow).scale = Vector3.Zero()
    }
  }
}
