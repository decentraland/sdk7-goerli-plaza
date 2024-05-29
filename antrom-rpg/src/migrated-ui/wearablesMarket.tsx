import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { canvasInfo } from '..'
import {
  APPRENTICE_WEARABLES,
  Wearable,
  Wearables,
  wearablesMarketSprites
} from '../mocked-data/wearablesData'
import { getUvs } from '../utils'
import { Color4 } from '@dcl/sdk/math'

const ASPECT_RATIO = 0.57
const WIDTH_FACTOR = 0.5
const HEIGTH_FACTOR = WIDTH_FACTOR * ASPECT_RATIO
const ITEM_SIZE_FACTOR = 0.12

const wearablesArray = Object.values(APPRENTICE_WEARABLES)

let isVisible: boolean = true
let selectedWearable: Wearable | undefined = undefined
let tradeClicked: boolean = false

export function setupWearableMarket() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

const uiComponent = () => (
  <UiEntity
    uiTransform={{
      width: canvasInfo.width,
      height: canvasInfo.height,
      display: isVisible ? 'flex' : 'none',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <UiEntity
      uiTransform={{
        width: canvasInfo.width * WIDTH_FACTOR,
        height: canvasInfo.width * HEIGTH_FACTOR,
        flexDirection: 'row',
        alignItems: 'flex-start'
      }}
      uiBackground={{
        textureMode: 'stretch',
        uvs: getUvs(wearablesMarketSprites.background),
        texture: { src: wearablesMarketSprites.background.atlasSrc }
      }}
    >
      {' '}
      <UiEntity
        uiTransform={{
          width: '40%',
          height: 'auto',
          flexDirection: 'row',
          position: { top: '14.5%', left: '11%' },
          flexWrap: 'wrap'
        }}
        uiBackground={{ color: Color4.create(1, 0, 0, 0.1) }}
      >
        {wearablesArray.map((wearable, index) => (
          <UiEntity
            key={index}
            uiTransform={{
              width: canvasInfo.width * WIDTH_FACTOR * 0.12,
              height: canvasInfo.width * WIDTH_FACTOR * 0.12,
              margin: { right: '9.25%', bottom: '0%' }
            }}
            uiBackground={{ color: Color4.create(0, 0, 1, 0.1) }}
          >
            <WearableButton wearable={wearable} />
          </UiEntity>
        ))}
      </UiEntity>
      <UiEntity
        uiTransform={{
          position: { right: '2%', top: '10%' },
          positionType: 'absolute',
          width: canvasInfo.width * WIDTH_FACTOR * 0.04,
          height: canvasInfo.width * WIDTH_FACTOR * 0.04
        }}
        uiBackground={{
          textureMode: 'stretch',
          uvs: getUvs(wearablesMarketSprites.exit_icon),
          texture: {
            src: wearablesMarketSprites.exit_icon.atlasSrc
          }
        }}
        onMouseDown={changeVisibility}
      />
    </UiEntity>
  </UiEntity>
)

function changeVisibility() {
  isVisible = !isVisible
}

function WearableButton(props: { wearable: Wearable }) {
  return (
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        display: 'flex'
      }}
      uiBackground={{
        textureMode: 'stretch',
        uvs: getUvs(props.wearable.sprite),
        texture: { src: props.wearable.sprite.atlasSrc }
      }}
      onMouseDown={() => selectWearable(props)}
    >
      <UiEntity
        uiTransform={{
          positionType: 'absolute',
          width: '115%',
          height: '115%',
          position: { left: '-7.5%', top: '-7.5%' },
          display: selectedWearable?.id === props.wearable.id ? 'flex' : 'none'
        }}
        uiBackground={{
          textureMode: 'stretch',
          uvs: getUvs(wearablesMarketSprites.selected_frame),
          texture: {
            src: wearablesMarketSprites.selected_frame.atlasSrc
          }
        }}
      />
    </UiEntity>
  )
}

function selectWearable(props: { wearable: Wearable }) {
  selectedWearable = props.wearable
}

function tradeDown() {
  tradeClicked = true
}
