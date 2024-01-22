import ReactEcs, { EntityPropTypes, UiEntity } from '@dcl/sdk/react-ecs'
import { AnimatedContainer, UIAnimator } from './UIAnimation'
import * as utils from '@dcl-sdk/utils'
import { MoveScaleAction, CallbackAction } from './transformActions'
import { UISprite } from './UISprite'


export class CardFlipAnimation {
  animator: UIAnimator
  cardVisible: boolean = false

  constructor() {
    this.animator = new UIAnimator(0, 0, 100, 100)
    this.animator.addAnimationSequence(
      "flip",
      new utils.actions.SequenceBuilder()
        .then(new MoveScaleAction(this.animator.entity, 50, 20, 0, 110, 0.1, utils.InterpolationType.EASEINQUAD))
        .then(new CallbackAction(() => { this.cardVisible = !this.cardVisible }))
        .then(new MoveScaleAction(this.animator.entity, 0, 0, 100, 100, 0.2, utils.InterpolationType.EASEOUTQUAD))
    )
  }

  playAnimation(animationName: string) {
    this.animator.playAnimation(animationName)
  }
}

export type CardFlipProps = EntityPropTypes & {
  sideA: ReactEcs.JSX.Element
  sideB: ReactEcs.JSX.Element
  cardFlipAnimator: CardFlipAnimation

}
export function UICardFlip(props: CardFlipProps) {

  return (
    <UiEntity
      uiTransform={props.uiTransform}
      onMouseDown={() => {
        props.cardFlipAnimator.playAnimation("flip")
      }}
    >
      <AnimatedContainer animator={props.cardFlipAnimator.animator}  >
        <UiEntity
          uiTransform={{
            width: '100%',
            height: '100%',
            display: props.cardFlipAnimator.cardVisible ? 'none' : 'flex'
          }}>
          {props.sideA}
        </UiEntity>
        <UiEntity
          uiTransform={{
            width: '100%',
            height: '100%',
            display: props.cardFlipAnimator.cardVisible ? 'flex' : 'none'
          }} >
          {props.sideB}
        </UiEntity>

      </AnimatedContainer>
    </UiEntity>
  )

}



