import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { BANNER, BannerPosition, BannerType } from './bannerConstants'
import { canvasInfo } from '..'
import { engine } from '@dcl/sdk/ecs'

export function setupBanner(type: BannerType, position?: BannerPosition) {
  ReactEcsRenderer.setUiRenderer(() => uiComponent(type, position))
}

let isVisible = true
const uiComponent = (type: BannerType, position?: BannerPosition) => (
  <Banner type={type} position={position} />
)

function Banner(props: { type: BannerType; position?: BannerPosition }) {
  let width_factor = 0.33
  let aspect_ratio = 0.216

  if (props.type === 'level-up') {
    aspect_ratio = 1
  }

  let top_position = canvasInfo.height * 0.02
  if (props.position === 'center-mid') {
    top_position =
      (canvasInfo.height - canvasInfo.width * width_factor * aspect_ratio) / 2
  }

  return (
    <UiEntity
      uiTransform={{
        display: isVisible ? 'flex' : 'none',
        position: {
          left: (canvasInfo.width - canvasInfo.width * width_factor) / 2,
          top: top_position
        },
        width: canvasInfo.width * width_factor,
        height: canvasInfo.width * width_factor * aspect_ratio
      }}
      uiBackground={{
        textureMode: 'stretch',
        texture: {
          src: BANNER[props.type]
        }
      }}
    />
  )
}

const TIME = 100
let timer: number = 0
export function bannerSystem(dt: number) {
  if (TIME - timer < 0) {
    isVisible = false
    timer = 0
    engine.removeSystem(bannerSystem)
  } else {
    timer = timer + dt
  }
}
