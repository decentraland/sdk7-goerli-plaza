import { engine } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

// how many sprites in each row
let countU = 4
// how many rows of sprites
let countV = 2

//width of each sprite grid-cell
let stepU = 1 / countU

//height of each sprite grid-cell
let stepV = 1 / countV

// iterators to address each sprite by coords
let currentSpriteU = 0
let currentSpriteV = 0

// sprite animation system's counter and update frequency
let elapsed = 0
let freq = 0.08

const uiComponent = () => (
  <UiEntity
    uiTransform={{
      width: 240,
      height: 480,
      margin: '16px 0 8px 270px',
      padding: 4,
      position: { top: '40%', left: 120 }
    }}
    uiBackground={{ color: Color4.create(0.5, 0.8, 0.1, 0) }}
  >
    <UiEntity
      //Fire spritesheet
      uiTransform={{
        width: '100%',
        height: '100%',
        margin: '0 0'
      }}
      uiBackground={{
        textureMode: 'stretch',
        //
        // for UV coord guidance check images/uv_on_sdk7_ui.png
        // below is the logic for mapping the UV of each sprite dynamically by currentSpriteU and currentSpriteV
        //
        uvs: [
          currentSpriteU * stepU, 1 - ((currentSpriteV + 1) * stepV),
          currentSpriteU * stepU, 1 - (currentSpriteV * stepV),
          (currentSpriteU + 1) * stepU, 1 - (currentSpriteV * stepV),
          (currentSpriteU + 1) * stepU, 1 - ((currentSpriteV + 1) * stepV)
        ],
        texture: {
          src: 'images/walk_anim_sprite.png',
        },
      }}
      uiText={{ value: '', fontSize: 18 }}
    />
  </UiEntity>
)

// system to step along each sprite in each row with the given frequency
export function SpriteAnimSystem(dt: number) {

  elapsed += dt
  if (elapsed >= freq) {

    currentSpriteU += 1

    if (currentSpriteU >= countU) {
      currentSpriteU = 0
      currentSpriteV += 1
    }

    if (currentSpriteV >= countV) {

      currentSpriteU = 0
      currentSpriteV = 0
    }

    elapsed = 0
  }
}


