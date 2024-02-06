import { UIAnimatedSprite, SpriteAnimation } from "../ui_components/UIAnimatedSprite"
import ReactEcs from "@dcl/sdk/react-ecs"




export let mySprite = new SpriteAnimation("images/spriteAnimation/walk_anim_sprite.png", 4, 2, 20)

export function createSpriteAnimationUI() {
  return (
    <UIAnimatedSprite
      spriteAnimator={mySprite}
      uiTransform={{
        width: 120,
        height: 240,
        positionType: 'absolute',
        position: { top: '4%', left: '23%' }
      }}
    />
  )
}

