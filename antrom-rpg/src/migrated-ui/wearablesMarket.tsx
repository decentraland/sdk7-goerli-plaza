import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { canvasInfo } from '..'
import {
  HEIGTH_FACTOR,
  WEARABLES_TO_SHOW,
  WIDTH_FACTOR,
  Wearable,
  WearablesDataType,
  initialWearablesData,
  wearablesMarketSprites
} from '../mocked-data/wearablesData'
import { Sprite, getUvs } from '../utils'
import { engine } from '@dcl/sdk/ecs'
import { WearablesResources } from '../components/definitions'

let wearablesToShow: Wearable[]
let scrollPosition: number = 0

let isVisible: boolean = true
let selectedWearable: Wearable | undefined = undefined
let backgroundSprite: Sprite = wearablesMarketSprites.background
let clickedPurchaseSprite: Sprite = wearablesMarketSprites.purchase_clicked
let purchaseSprite: Sprite = wearablesMarketSprites.purchase
let buttonSprite: Sprite | undefined = purchaseSprite
let leftButton: Sprite = wearablesMarketSprites.left_unavailable
let rightButton: Sprite = wearablesMarketSprites.right_unavailable

let MutableAppretienceWearablesData: WearablesDataType

export function setupWearableMarket(
  wearablesArray: Wearable[],
  backgroundSprite?: Sprite,
  purchaseButtonSprite?: Sprite,
  clickedPurchaseButtonSprite?: Sprite
) {
  const AppretienceWearablesEntity = engine.addEntity()
  WearablesResources.create(AppretienceWearablesEntity, initialWearablesData)
  ReactEcsRenderer.setUiRenderer(uiComponent)
  if (WearablesResources.get(AppretienceWearablesEntity)) {
    MutableAppretienceWearablesData = WearablesResources.getMutable(
      AppretienceWearablesEntity
    )
  }

  ReactEcsRenderer.setUiRenderer(uiComponent)
  wearablesToShow = wearablesArray
  if (wearablesArray.length > WEARABLES_TO_SHOW) {
    rightButton = wearablesMarketSprites.right
  }
  if (backgroundSprite) {
  }
  if (purchaseButtonSprite) {
    purchaseSprite = purchaseButtonSprite
  }
  if (clickedPurchaseButtonSprite) {
    clickedPurchaseSprite = clickedPurchaseButtonSprite
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
      <UiEntity
        uiTransform={{
          width: '32%',
          height: '100%',
          positionType: 'absolute',
          flexDirection: 'column',
          alignItems: 'center',
          position: { right: 0, top: 0 }
        }}
      >
        <UiEntity
          uiTransform={{
            display: selectedWearable ? 'flex' : 'none',
            width: '100%',
            height: '20%',
            margin: { top: '12%', bottom: '12%' }
          }}
          uiText={{
            value: selectedWearable ? selectedWearable.name : '',
            fontSize: 15,
            textAlign: 'middle-center'
          }}
        />
        <UiEntity
          uiTransform={{
            display: selectedWearable ? 'flex' : 'none',
            width: canvasInfo.width * WIDTH_FACTOR * 0.12,
            height: canvasInfo.width * WIDTH_FACTOR * 0.12
          }}
          uiBackground={{
            textureMode: 'stretch',
            uvs: getUvs(selectedWearable ? selectedWearable.sprite : undefined),
            texture: {
              src: selectedWearable ? selectedWearable.sprite.atlasSrc : ''
            }
          }}
        />
        <UiEntity
          uiTransform={{
            display: selectedWearable ? 'flex' : 'none',
            margin: { top: '25%' },
            width: canvasInfo.width * WIDTH_FACTOR * 0.2,
            height: canvasInfo.width * WIDTH_FACTOR * 0.2 * 0.2
          }}
          uiBackground={{
            textureMode: 'stretch',
            uvs: getUvs(buttonSprite),
            texture: {
              src: buttonSprite ? buttonSprite.atlasSrc : ''
            }
          }}
          onMouseDown={tradeDown}
          onMouseUp={tradeUp}
        />
      </UiEntity>
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
  buttonSprite = clickedPurchaseSprite
}
function tradeUp() {
  buttonSprite = purchaseSprite
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
