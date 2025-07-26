import {
  Entity,
  GltfContainer,
  TextAlignMode,
  TextShape,
  Transform,
  TransformTypeWithOptionals,
  engine
} from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'

export class LeaderBoard {
  currentData: LeaderBoardRow[] = []

  constructor(transform: TransformTypeWithOptionals, size: number) {
    const smallStoneWall = engine.addEntity()
    GltfContainer.create(smallStoneWall, {
      src: 'assets/scene/Models/FenceStoneTallSmall_01/FenceStoneTallSmall_01.glb'
    })
    Transform.create(smallStoneWall, transform)

    const titleText = engine.addEntity()
    Transform.create(titleText, {
      position: Vector3.create(0, 2.2, -0.5),
      rotation: Quaternion.fromEulerDegrees(0, -90, 0),
      scale: Vector3.create(0.5 / transform.scale!.z, 0.5 / transform.scale!.y, 0.5 / transform.scale!.x),
      parent: smallStoneWall
    })
    TextShape.create(titleText, {
      text: 'Player Score',
      fontSize: 20,
      textColor: Color4.White(),
      width: 20,
      height: 10,
      textAlign: TextAlignMode.TAM_MIDDLE_CENTER
    })

    for (let i = 0; i < size; i++) {
      this.currentData.push(new LeaderBoardRow(titleText, i, '----', '----'))
    }
  }

  updateBoard(scoreData: any[]) {
    for (let i = 0; i < this.currentData.length; i++) {
      if (i < scoreData.length) {
        // update score data
        this.currentData[i].updateValue(scoreData[i].name, scoreData[i].score.toString())
      } else {
        // create empty line
        this.currentData[i].updateValue('----', '----')
      }
    }
  }
}

export class LeaderBoardRow {
  nameText: Entity
  scoreText: Entity

  constructor(parent: Entity, index: number, name: string, score: string) {
    this.nameText = engine.addEntity()
    Transform.create(this.nameText, {
      position: Vector3.create(-5, index * -1 - 2.7, -0.5),
      parent: parent
    })
    TextShape.create(this.nameText, {
      text: name,
      fontSize: 5,
      textColor: Color4.White(),
      width: 20,
      height: 10,
      textAlign: TextAlignMode.TAM_MIDDLE_LEFT
    })

    this.scoreText = engine.addEntity()
    Transform.create(this.scoreText, {
      position: Vector3.create(5, index * -1 - 2.7, -0.5),
      parent: parent
    })
    TextShape.create(this.scoreText, {
      text: score,
      fontSize: 5,
      textColor: Color4.Green(),
      width: 20,
      height: 10,
      textAlign: TextAlignMode.TAM_MIDDLE_RIGHT
    })
  }

  updateValue(name: string, score: string) {
    TextShape.getMutable(this.nameText).text = name
    TextShape.getMutable(this.scoreText).text = score
  }
}
