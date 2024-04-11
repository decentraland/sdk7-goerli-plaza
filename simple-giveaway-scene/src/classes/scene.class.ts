import { engine, Entity, GltfContainer, Material, MeshRenderer, TextShape, Transform } from "@dcl/sdk/ecs"
import { Color4, Quaternion, Vector3 } from "@dcl/sdk/math"
import { gameController } from "../controllers/game.controller"
import * as utils from '@dcl-sdk/utils'
import { onEnterScene, onLeaveScene } from "@dcl/sdk/src/players"

export class setUpScenes {
  private FloorBaseDirt: Entity
  private sign: Entity
  private signText: Entity
  public gameController: gameController
  private triggerBox: Entity
  constructor(gameController: gameController) {
    this.gameController = gameController
    this.FloorBaseDirt = engine.addEntity()
    this.sign = engine.addEntity()
    this.signText = engine.addEntity()
    this.triggerBox = engine.addEntity()
    GltfContainer.create(this.FloorBaseDirt, { src: 'assets/scene/models/FloorBaseDirt_01.glb' })
    GltfContainer.create(this.sign, { src: 'assets/scene/models/SignPost_wood.glb' })
    Transform.createOrReplace(this.FloorBaseDirt, {
      position: Vector3.create(8, 0, 8),
      scale: Vector3.create(1, 1, 1),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0)
    })
    Transform.createOrReplace(this.sign, {
      position: Vector3.create(8, 0, 8),
      scale: Vector3.create(4, 4, 4),
    })

    const text = 'Free Wearables \n HERE!'
    TextShape.create(this.signText, {
      text: text,
      textColor: Color4.White(),
      fontSize: 4

    })
    Transform.create(this.signText, {
      position: Vector3.create(8, 3.8, 9.3),
      scale: Vector3.create(1, 1, 1),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0)
    })
    onEnterScene((player) => {
      if (!player) return
      this.gameController.ui.startTimer()
    })

    onLeaveScene((userId) => {
      if (!userId) return
      this.gameController.ui.stopTimer()
    })
  }
}