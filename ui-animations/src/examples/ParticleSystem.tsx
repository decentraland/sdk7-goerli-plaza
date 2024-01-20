import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs"
import { SpriteAnimation, UIAnimatedSprite } from "../ui_components/UIAnimatedSprite"
import { ParticleEmitter } from "../ui_components/UIParticle"
import { AnimatedButton, UIButton } from "../ui_components/UIButton"
import { Color4 } from "@dcl/sdk/math"

let coinSprite = new SpriteAnimation("images/particleSystem/coin-sprite.png", 4, 2, 20)
export let coinEmitter = new ParticleEmitter()


export function createParticleUI() {
  return (
    <UiEntity
      uiTransform={{
        width: "100%",
        height: "100%"
      }}
    >
      {coinEmitter.generateParticleUI(
        <UIAnimatedSprite
          spriteAnimator={coinSprite}
          uiTransform={{
            width: '100%',
            height: '100%',
            positionType: 'absolute'
          }}
        />
      )}
    </UiEntity>
  )
}


//Test the particle system with a spawning button

let buttonSpawn = new AnimatedButton(
  "Spawn Particle",
  20,
  Color4.Black(),
  () => {
    buttonSpawn.successAnimation()
    coinEmitter.spawnSingle(85, 45, 45, 80)
  }
)

export function createParticleTestButton() {
  return (
    <UiEntity
      uiTransform={{
        width: "100%",
        height: "100%",
        positionType: 'absolute'
      }}
    >
      <UIButton
        button={buttonSpawn}
        uiTransform={{
          width: '10%',
          height: '10%',
          positionType: 'absolute',
          position: { left: '85%', top: '45%' }
        }}
        uiBackground={{
          textureMode: 'nine-slices',
          texture: { src: 'images/easingPopup/stone_ui_bg.png' },
          textureSlices: {
            top: 0.42,
            bottom: 0.52,
            left: 0.42,
            right: 0.48
          }
        }}
      />
    </UiEntity>
  )
}