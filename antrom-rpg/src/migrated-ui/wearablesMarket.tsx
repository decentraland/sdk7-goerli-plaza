import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { canvasInfo } from '..'
import { wearablesMarketSprites } from '../mocked-data/wearablesMarketSprites'
import { getUvs } from '../utils'
import { InventoryItem } from '../mocked-data/resourcesData'

const ASPECT_RATIO = 0.57
const WIDTH_FACTOR = 0.5
const HEIGTH_FACTOR = WIDTH_FACTOR * ASPECT_RATIO
const SIZE_ITEM_FACTOR = 0.1

let selectedItem: InventoryItem | undefined = undefined
let isVisible: boolean = true
let selectedWearable: number | undefined = undefined
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

function ItemButton(props: { inventoryItem: InventoryItem }) {
  return (
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        display: 'flex'
      }}
      uiBackground={{
        textureMode: 'stretch',
        uvs: getUvs(props.inventoryItem.item.sprite),
        texture: { src: props.inventoryItem.item.sprite.atlasSrc }
      }}
      onMouseDown={() => selectItem(props)}
    >
      <UiEntity
        uiTransform={{
          positionType: 'absolute',
          width: '115%',
          height: '115%',
          position: { left: '-5%', top: '-5%' },
          display:
            selectedItem?.item.id === props.inventoryItem.item.id
              ? 'flex'
              : 'none'
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

function selectItem(props: { inventoryItem: InventoryItem }) {
  selectedItem = props.inventoryItem
}

function tradeDown() {
  tradeClicked = true
}
