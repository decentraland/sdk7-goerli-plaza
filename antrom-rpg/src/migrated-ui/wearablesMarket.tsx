import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { canvasInfo } from '..'
import {
  APPRENTICE_WEARABLES,
  HEIGTH_FACTOR,
  WEARABLES_TO_SHOW,
  WIDTH_FACTOR,
  Wearable,
  Wearables,
  wearablesMarketSprites
} from '../mocked-data/wearablesData'
import { Sprite, getUvs } from '../utils'
import { Color4 } from '@dcl/sdk/math'

let wearablesToShow: Wearable[]
let scrollPosition: number = 0

let isVisible: boolean = true
let selectedWearable: Wearable | undefined = undefined
let tradeClicked: boolean = false
let backgroundSprite: Sprite = wearablesMarketSprites.background
let buttonSprite: Sprite = wearablesMarketSprites.purchase
let clickedButtonSprite: Sprite = wearablesMarketSprites.purchase_clicked
let leftButton: Sprite = wearablesMarketSprites.left_unavailable
let rightButton: Sprite = wearablesMarketSprites.right_unavailable

export function setupWearableMarket(
  wearablesArray: Wearable[],
  backgroundSprite?: Sprite,
  purchaseButtonSprite?: Sprite,
  purchaseClickedButtonSprite?: Sprite
) {
  ReactEcsRenderer.setUiRenderer(uiComponent)
  wearablesToShow = wearablesArray
  if (wearablesArray.length > WEARABLES_TO_SHOW) {
    rightButton = wearablesMarketSprites.right
  }
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
        uvs: getUvs(backgroundSprite),
        texture: { src: backgroundSprite.atlasSrc }
      }}
    >
      {' '}
      <UiEntity
        uiTransform={{
          width: '55%',
          height: 'auto',
          flexDirection: 'row',
          position: { top: '14.5%', left: '11%' },
          flexWrap: 'wrap'
        }}
      >
        {wearablesToShow
          .slice(scrollPosition * (WEARABLES_TO_SHOW - 1), WEARABLES_TO_SHOW)
          .map((wearable, index) => (
            <UiEntity
              key={index}
              uiTransform={{
                width: canvasInfo.width * WIDTH_FACTOR * 0.12,
                height: canvasInfo.width * WIDTH_FACTOR * 0.12,
                margin: { right: '10.2%', bottom: '4.5%' }
              }}
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
      <UiEntity
        uiTransform={{
          position: { left: '6%', top: '47%' },
          positionType: 'absolute',
          width: canvasInfo.width * WIDTH_FACTOR * 0.04,
          height: canvasInfo.width * WIDTH_FACTOR * 0.04
        }}
        uiBackground={{
          textureMode: 'stretch',
          uvs: getUvs(leftButton),
          texture: {
            src: leftButton.atlasSrc
          }
        }}
        onMouseDown={scrollLeft}
        onMouseUp={upScrollButtons}
      />
      <UiEntity
        uiTransform={{
          position: { left: '59.5%', top: '47%' },
          positionType: 'absolute',
          width: canvasInfo.width * WIDTH_FACTOR * 0.04,
          height: canvasInfo.width * WIDTH_FACTOR * 0.04
        }}
        uiBackground={{
          textureMode: 'stretch',
          uvs: getUvs(rightButton),
          texture: {
            src: rightButton.atlasSrc
          }
        }}
        onMouseDown={scrollRight}
        onMouseUp={upScrollButtons}
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

function scrollRight() {
  if (scrollPosition < Math.floor(wearablesToShow.length / WEARABLES_TO_SHOW)) {
    rightButton = wearablesMarketSprites.right_clicked
    scrollPosition++
  }
}

function scrollLeft() {
  if (scrollPosition > 0) {
    leftButton = wearablesMarketSprites.left_clicked
    scrollPosition--
  }
}

function upScrollButtons() {
  rightButton = wearablesMarketSprites.right
  leftButton = wearablesMarketSprites.left

  if (scrollPosition === 0) {
    leftButton = wearablesMarketSprites.left_unavailable
  }

  if (
    scrollPosition * WEARABLES_TO_SHOW >=
    Math.floor(wearablesToShow.length / WEARABLES_TO_SHOW)
  ) {
    rightButton = wearablesMarketSprites.right_unavailable
  }
}
