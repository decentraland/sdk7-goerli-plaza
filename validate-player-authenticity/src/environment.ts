import {
  ColliderLayer,
  engine,
  Entity,
  GltfContainer,
  MeshCollider,
  MeshRenderer,
  Transform,
  VisibilityComponent
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

export class Scene {
  theFountainOfBrokenDreams: Entity
  grimReaperStatue: Entity
  forestMaidenStatue: Entity

  constructor() {
    const scene = engine.addEntity()
    Transform.create(scene, {
      position: Vector3.Zero()
    })

    const floor = engine.addEntity()
    GltfContainer.create(floor, {
      src: 'assets/scene/Models/FloorFantasyRocks_03.glb'
    })
    MeshRenderer.setBox(floor)
    MeshCollider.setBox(floor, ColliderLayer.CL_POINTER)
    Transform.create(floor, {
      position: Vector3.create(8, 0, 8),
      parent: scene
    })

    const swampVineTreeLamp = engine.addEntity()
    GltfContainer.create(swampVineTreeLamp, {
      src: 'assets/scene/Models/Tree_Lamp_01.glb'
    })
    Transform.create(swampVineTreeLamp, {
      position: Vector3.create(2.5, 0, 12.5),
      parent: scene
    })

    const curlyMagicBeanSprout = engine.addEntity()
    GltfContainer.create(curlyMagicBeanSprout, {
      src: 'assets/scene/Models/Vegetation_05.glb'
    })
    Transform.create(curlyMagicBeanSprout, {
      position: Vector3.create(2.5, 0, 2),
      parent: scene
    })

    this.theFountainOfBrokenDreams = engine.addEntity()
    GltfContainer.create(this.theFountainOfBrokenDreams, {
      src: 'assets/scene/Models/Fountain_02.glb'
    })
    Transform.create(this.theFountainOfBrokenDreams, {
      position: Vector3.create(8, 0, 7.5),
      rotation: Quaternion.create(8.860399791456633e-16, 0.7071068286895752, -8.429368847373553e-8, 0.7071067690849304),
      parent: scene
    })

    this.grimReaperStatue = engine.addEntity()
    GltfContainer.create(this.grimReaperStatue, {
      src: 'assets/scene/Models/Statue_01.glb'
    })
    Transform.create(this.grimReaperStatue, {
      position: Vector3.create(11.5, 0, 4.5),
      rotation: Quaternion.create(
        -6.607980366029839e-16,
        -0.2902846336364746,
        3.460462139059928e-8,
        0.9569403529167175
      ),
      scale: Vector3.create(2, 2, 2),
      parent: scene
    })
    VisibilityComponent.create(this.grimReaperStatue, {
      visible: false
    })

    this.forestMaidenStatue = engine.addEntity()
    GltfContainer.create(this.forestMaidenStatue, {
      src: 'assets/scene/Models/GirlForestStatue_01.glb'
    })
    Transform.create(this.forestMaidenStatue, {
      position: Vector3.create(11.5, 0, 11.5),
      rotation: Quaternion.create(
        7.395715713020418e-16,
        0.9238795638084412,
        -1.1013501222123523e-7,
        -0.38268348574638367
      ),
      scale: Vector3.create(1.5, 1.5, 1.5),
      parent: scene
    })
    VisibilityComponent.create(this.forestMaidenStatue, {
      visible: false
    })
  }

  public passedValidation(): void {
    VisibilityComponent.getMutable(this.forestMaidenStatue).visible = true
    VisibilityComponent.getMutable(this.grimReaperStatue).visible = false
  }

  public failedValidation(): void {
    VisibilityComponent.getMutable(this.forestMaidenStatue).visible = false
    VisibilityComponent.getMutable(this.grimReaperStatue).visible = true
  }
}
