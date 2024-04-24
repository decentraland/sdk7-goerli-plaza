import { Entity, Transform, engine } from "@dcl/sdk/ecs"
import * as utils from '@dcl-sdk/utils'
import { Vector3 } from "@dcl/sdk/math"
import { MoveScaleAction } from "./transformActions"
import ReactEcs, { PositionUnit, UiEntity } from "@dcl/sdk/react-ecs"

export enum animations {
  SCALEUPFROM = 'scaleupfrom'
}

export type AnimProps = {
  children?: ReactEcs.JSX.Component[]
  animator: UIAnimator
}

export function AnimatedContainer(props: AnimProps) {
  return <UiEntity uiTransform={{
    width: props.animator.width(),
    height: props.animator.height(),
    positionType: 'absolute',
    position: {
      bottom: props.animator.positionBottom(),
      left: props.animator.positionLeft()
    },
  }}>
    {props.children}
  </UiEntity>
}



export class UIAnimator {
  scaleEntity: Entity
  posEntity: Entity
  runner: utils.actions.SequenceRunner
  sequences: Map<string, utils.actions.SequenceBuilder>

  constructor(posX: number, posY: number, scaleX: number, scaleY: number) {
    this.scaleEntity = engine.addEntity()
    this.posEntity = engine.addEntity()
    Transform.create(this.scaleEntity, {
      scale: Vector3.create(scaleX, scaleY, 0),
    })
    Transform.create(this.posEntity, {
      position: Vector3.create(posX, posY, 0),
    })
    this.sequences = new Map<string, utils.actions.SequenceBuilder>
    this.addAnimationSequence(
      "idle",
      new utils.actions.SequenceBuilder()
        .then(new MoveScaleAction(this, posX, posY, scaleX, scaleY, 0.1, utils.InterpolationType.LINEAR)))

    this.runner = new utils.actions.SequenceRunner(engine, this.sequences.get("idle"), () => { })
  }

  addAnimationSequence(name: string, actionSequence: utils.actions.SequenceBuilder) {
    this.sequences.set(name, actionSequence)
  }

  playAnimation(sequenceName: string) {

    let anim = this.sequences.get(sequenceName)

    if (anim) {
      this.runner.startSequence(anim)
    }
    else {
      console.log("NO ANIMATION SEQUENCE FOUND WITH THE NAME: " + sequenceName)
    }

  }

  width(): PositionUnit {
    return (Transform.get(this.scaleEntity).scale.x + '%' as PositionUnit)
  }
  height(): PositionUnit {
    return (Transform.get(this.scaleEntity).scale.y + '%' as PositionUnit)
  }
  positionLeft(): PositionUnit {
    return (Transform.get(this.posEntity).position.x + '%' as PositionUnit)
  }
  positionBottom(): PositionUnit {
    return (Transform.get(this.posEntity).position.y + '%' as PositionUnit)
  }
}