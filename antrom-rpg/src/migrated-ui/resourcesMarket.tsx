import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Input, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { canvasInfo } from '..'
import { Sprite, antromSprites } from '../mocked-data/atlasSprites'
import {
  InventoryItem,
  RESOURCES_INVENTORY,
  RESOURCES_MARKET
} from '../mocked-data/resourcesData'
import { Tab, getUvs } from '../utils'

const ASPECT_RATIO = 0.7
const WIDTH_FACTOR = 0.5
const HEIGTH_FACTOR = WIDTH_FACTOR * ASPECT_RATIO
const SIZE_ITEM_FACTOR = 0.1

let withMana: boolean = false
let tradeClicked: boolean = false
let isSelling: boolean = true
let itemsArray: InventoryItem[] = RESOURCES_INVENTORY
let totalPrice: number = 0
let buttonMaxSprite: Sprite = antromSprites.resources_market_max_button

let selectedItem: InventoryItem | undefined = undefined
let selectedQuantity: number = 1

export function setupResourcesMarket() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

const uiComponent = () => (
  <UiEntity
    uiTransform={{
      width: canvasInfo.width,
      height: canvasInfo.height,
      display: 'flex',
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
        uvs: getUvs(antromSprites.resources_market_background),
        texture: { src: antromSprites.resources_market_background.atlasSrc }
      }}
    >
      <UiEntity
        uiTransform={{
          width: canvasInfo.width * WIDTH_FACTOR * 0.42,
          height: '66.5%',
          flexDirection: 'column',
          alignItems: 'center',
          margin: { top: '13%', left: '12.1%' }
        }}
      >
        <UiEntity
          uiTransform={{
            width: '90%',
            height: '8.5%',
            flexDirection: 'row',
            margin: { bottom: '4%', left: '-8%' }
          }}
          uiBackground={{}}
        >
          <Tab
            condition={isSelling}
            trueSprite={antromSprites.resources_market_purchase_button}
            falseSprite={antromSprites.resources_market_purchase_button_clicked}
            callback={setSelling}
            callbackValue={false}
          />
          <Tab
            condition={isSelling}
            trueSprite={antromSprites.resources_market_sell_button_clicked}
            falseSprite={antromSprites.resources_market_sell_button}
            callback={setSelling}
            callbackValue={true}
          />
        </UiEntity>
        <UiEntity
          uiTransform={{
            width: '80%',
            height: '5%',
            flexDirection: 'row',
            margin: { right: '10%' }
          }}
          uiText={{ value: '105', textAlign: 'middle-right' }}
        />
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 'auto',
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: { top: '1%' }
          }}
        >
          {itemsArray.map((resource, index) => (
            <UiEntity
              key={index}
              uiTransform={{
                width: canvasInfo.width * WIDTH_FACTOR * SIZE_ITEM_FACTOR,
                height: canvasInfo.width * WIDTH_FACTOR * SIZE_ITEM_FACTOR,
                margin: { right: '8.75%', bottom: '4%', top: '1.5%' }
              }}
            >
              <ItemButton inventoryItem={resource} />
            </UiEntity>
          ))}
        </UiEntity>
      </UiEntity>
      <UiEntity
        uiTransform={{
          width: canvasInfo.width * WIDTH_FACTOR * 0.35,
          height: '60%',
          flexDirection: 'column',
          alignItems: 'center',
          margin: { top: '17.5%', left: '2%' },
          display: selectedItem ? 'flex' : 'none'
        }}
      >
        <UiEntity
          uiTransform={{
            width: '80%',
            height: '10%',
            flexDirection: 'row'
          }}
          uiText={{
            value: selectedItem ? selectedItem.item.name : '',
            textAlign: 'middle-center',
            fontSize: 16
          }}
        />
        <UiEntity
          uiTransform={{
            width: canvasInfo.width * WIDTH_FACTOR * 0.35,
            height: '50%',
            flexDirection: 'row',
            alignItems: 'flex-start',
            margin: { top: '25%' },
            display: selectedItem ? 'flex' : 'none'
          }}
        >
          <UiEntity
            uiTransform={{
              width: canvasInfo.width * WIDTH_FACTOR * 0.35 * 0.2,
              height: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              margin: { left: '4%', right: '9%' },
              display: selectedItem ? 'flex' : 'none'
            }}
          >
            <Input
              onChange={(value) => {
                updatePrice(value)
              }}
              value={selectedQuantity.toString()}
              uiTransform={{
                width: '100%',
                height: '20%',
                margin: { top: '90%', bottom: '20%' }
              }}
            ></Input>
            <UiEntity
              uiTransform={{
                positionType: 'relative',
                width: '100%',
                height: '20%'
              }}
              uiBackground={{
                textureMode: 'stretch',
                uvs: selectedItem ? getUvs(buttonMaxSprite) : [],
                texture: {
                  src: selectedItem ? buttonMaxSprite.atlasSrc : ''
                }
              }}
              onMouseDown={() =>
                selectedItem ? mouseDownMax(selectedItem) : nonFunction
              }
              onMouseUp={mouseUpMax}
            />
          </UiEntity>
          <UiEntity
            uiTransform={{
              positionType: 'relative',
              width: canvasInfo.width * WIDTH_FACTOR * 0.35 * 0.33,
              height: canvasInfo.width * WIDTH_FACTOR * 0.35 * 0.33,
              margin: { top: '2%' }
            }}
            uiBackground={{
              textureMode: 'stretch',
              uvs: selectedItem ? getUvs(selectedItem.item.sprite) : [],
              texture: {
                src: selectedItem ? selectedItem.item.sprite.atlasSrc : ''
              }
            }}
          />
          <UiEntity
            uiTransform={{
              positionType: 'relative',
              width: '30%',
              height: '10%',
              display: isSelling ? 'flex' : 'none',
              margin: { top: '17.5%', right: '5%' }
            }}
            uiText={{
              textAlign: 'middle-right',
              value:
                selectedItem && selectedItem.item.sellPrice
                  ? (selectedItem.item.sellPrice * selectedQuantity).toString()
                  : ''
            }}
          />
          <UiEntity
            uiTransform={{
              positionType: 'relative',
              width: '30%',
              height: '10%',
              display: isSelling ? 'none' : 'flex',
              margin: { top: '17.5%', right: '5%' }
            }}
            uiText={{
              value: totalPrice.toString(),
              textAlign: 'middle-right'
            }}
          />
        </UiEntity>
        <TradeButton inventoryItem={selectedItem} />
      </UiEntity>
      <UiEntity
        uiTransform={{
          positionType: 'absolute',
          position: { top: '52.5%', right: '9%' },
          width: '2.5%',
          height: '3%',
          display: withMana ? 'flex' : 'none'
        }}
        uiBackground={{
          textureMode: 'stretch',
          uvs: getUvs(antromSprites.mana_coin),
          texture: {
            src: antromSprites.mana_coin.atlasSrc
          }
        }}
      />
    </UiEntity>
  </UiEntity>
)

function ItemButton(props: { inventoryItem: InventoryItem }) {
  return (
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%'
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
          uvs: getUvs(antromSprites.resources_market_selected_frame),
          texture: {
            src: antromSprites.resources_market_selected_frame.atlasSrc
          }
        }}
      />
    </UiEntity>
  )
}

function TradeButton() {
  let normalSprite: Sprite
  let clickedSprite: Sprite

  if (isSelling) {
    normalSprite = antromSprites.resources_market_sell_button
    clickedSprite = antromSprites.resources_market_sell_button_clicked
  } else {
    if (withMana) {
      normalSprite = antromSprites.resources_market_purchase_with_mana_button
      clickedSprite =
        antromSprites.resources_market_purchase_with_mana_button_clicked
    } else {
      normalSprite = antromSprites.resources_market_purchase_button
      clickedSprite = antromSprites.resources_market_purchase_button_clicked
    }
  }
  return (
    <UiEntity
      uiTransform={{
        positionType: 'relative',
        width: '50%',
        height: '10%'
      }}
      uiBackground={{
        textureMode: 'stretch',
        uvs: getUvs(tradeClicked ? clickedSprite : normalSprite),
        texture: {
          src: clickedSprite.atlasSrc
        }
      }}
      onMouseDown={() => (tradeClicked = true)}
      onMouseUp={() => (tradeClicked = false)}
    ></UiEntity>
  )
}

function selectItem(props: { inventoryItem: InventoryItem }) {
  selectedItem = props.inventoryItem
  if (props.inventoryItem.item.manaPrice) {
    withMana = true
  } else {
    withMana = false
  }
}

function updatePrice(value: string) {
  const formattedValue = value.replace(' ', '')
  if (Number(formattedValue)) {
    selectedQuantity = Number(formattedValue)
  } else {
    selectedQuantity = 1
  }
  if (isSelling && selectedItem?.item.sellPrice) {
    totalPrice = selectedItem.item.sellPrice * selectedQuantity
  }
  if (selectedItem?.item.buyPrice) {
    totalPrice = selectedQuantity * selectedItem.item.buyPrice
    return
  }
  if (selectedItem?.item.manaPrice) {
    totalPrice = selectedQuantity * selectedItem.item.manaPrice
    return
  }
}

function mouseDownMax(item: InventoryItem) {
  if (item.amount) {
    selectedQuantity = item.amount
  }
  buttonMaxSprite = antromSprites.resources_market_max_button_clicked
}

function mouseUpMax() {
  buttonMaxSprite = antromSprites.resources_market_max_button
}

function nonFunction() {}

function setSelling(state: boolean) {
  if (isSelling !== state) {
    selectedItem = undefined
    isSelling = state
    if (state) {
      itemsArray = RESOURCES_INVENTORY
    } else {
      itemsArray = RESOURCES_MARKET
    }
  }
}
