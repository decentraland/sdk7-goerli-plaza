import { Entity, GltfContainer, Transform, engine } from "@dcl/sdk/ecs"

export class ReflectedRay {
  public static instances: ReflectedRay[] = []

  public reflectedRayEntity: Entity | null = null

  constructor(modelPath: string) {
    this.reflectedRayEntity = engine.addEntity()
    GltfContainer.create(this.reflectedRayEntity, {
      src: modelPath
    })
    Transform.create(this.reflectedRayEntity)

    ReflectedRay.instances.push(this)
  }

  remove(): void {
    if (this.reflectedRayEntity === undefined || this.reflectedRayEntity === null) return

    engine.removeEntity(this.reflectedRayEntity)
  }

  static removeAll(): void {
    while (ReflectedRay.instances.length > 0) {
      const reflectedRay = ReflectedRay.instances.pop()
      if (reflectedRay !== undefined && reflectedRay !== null) reflectedRay.remove()
    }
  }
}
