import ReactEcs, { Input, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { canvasInfo } from '..'
import {
  ITEMS,
  InventoryItem,
  Items,
  RESOURCES_INVENTORY,
  RESOURCES_MARKET
} from '../mocked-data/resourcesData'
import { resourcesMarketSprites } from '../mocked-data/resourcesMarketSprites'
import { Sprite, Tab, getUvs } from '../utils'

const ASPECT_RATIO = 0.7
const WIDTH_FACTOR = 0.5
const HEIGTH_FACTOR = WIDTH_FACTOR * ASPECT_RATIO
const SIZE_ITEM_FACTOR = 0.1

let isVisible: boolean = true
let balance: number = 200
let withMana: boolean = false
let tradeClicked: boolean = false
let isSelling: boolean = true
let itemsArray: InventoryItem[] = RESOURCES_INVENTORY
let totalPrice: number = 0
let buttonMaxSprite: Sprite = resourcesMarketSprites.max_button

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
        uvs: getUvs(resourcesMarketSprites.background),
        texture: { src: resourcesMarketSprites.background.atlasSrc }
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
            trueSprite={resourcesMarketSprites.purchase_button}
            falseSprite={resourcesMarketSprites.purchase_button_clicked}
            callback={setSelling}
            callbackValue={false}
          />
          <Tab
            condition={isSelling}
            trueSprite={resourcesMarketSprites.sell_button_clicked}
            falseSprite={resourcesMarketSprites.sell_button}
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
          uiText={{ value: balance.toString(), textAlign: 'middle-right' }}
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
            />
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
              onMouseDown={mouseDownMax}
              onMouseUp={() => (selectedItem ? mouseUpMax(selectedItem) : {})}
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
              margin: { top: '17.5%', right: '10%' }
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
          position: { top: '52%', right: '8%' },
          width: canvasInfo.width * WIDTH_FACTOR * 0.04,
          height: canvasInfo.width * WIDTH_FACTOR * 0.04 * ASPECT_RATIO,
          display: withMana ? 'flex' : 'none'
        }}
        uiBackground={{
          textureMode: 'stretch',
          uvs: getUvs(resourcesMarketSprites.mana_coin),
          texture: {
            src: resourcesMarketSprites.mana_coin.atlasSrc
          }
        }}
      />
      <UiEntity
        uiTransform={{
          position: { right: '3%', top: '23%' },
          positionType: 'absolute',
          width: canvasInfo.width * WIDTH_FACTOR * 0.04,
          height: canvasInfo.width * WIDTH_FACTOR * 0.04
        }}
        uiBackground={{
          textureMode: 'stretch',
          uvs: getUvs(resourcesMarketSprites.exit_icon),
          texture: {
            src: resourcesMarketSprites.exit_icon.atlasSrc
          }
        }}
        onMouseDown={changeVisibility}
      />
    </UiEntity>
  </UiEntity>
)

function ItemButton(props: { inventoryItem: InventoryItem }) {
  return (
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        display:
          (props.inventoryItem.amount && props.inventoryItem.amount > 0) ||
          !isSelling
            ? 'flex'
            : 'none'
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
          uvs: getUvs(resourcesMarketSprites.selected_frame),
          texture: {
            src: resourcesMarketSprites.selected_frame.atlasSrc
          }
        }}
      />
      <UiEntity
        uiTransform={{
          positionType: 'absolute',
          width: '100%',
          height: '100%',
          display: isSelling ? 'flex' : 'none'
        }}
        uiText={{
          value: props.inventoryItem.amount
            ? props.inventoryItem.amount.toString()
            : '',
          textAlign: 'bottom-right',
          fontSize: 20
        }}
      />
    </UiEntity>
  )
}

function TradeButton() {
  let normalSprite: Sprite
  let clickedSprite: Sprite
  let unavailableSprite: Sprite

  if (isSelling) {
    normalSprite = resourcesMarketSprites.sell_button
    clickedSprite = resourcesMarketSprites.sell_button_clicked
    unavailableSprite = resourcesMarketSprites.sell_button_unavailable
  } else {
    if (withMana) {
      normalSprite = resourcesMarketSprites.purchase_with_mana_button
      clickedSprite = resourcesMarketSprites.purchase_with_mana_button_clicked
      unavailableSprite = resourcesMarketSprites.purchase_button_unavailable
    } else {
      normalSprite = resourcesMarketSprites.purchase_button
      clickedSprite = resourcesMarketSprites.purchase_button_clicked
      unavailableSprite = resourcesMarketSprites.purchase_button_unavailable
    }
  }
  return (
    <UiEntity
      uiTransform={{
        positionType: 'relative',
        width: '50%',
        height: '10%'
      }}
    >
      <UiEntity
        uiTransform={{
          positionType: 'relative',
          width: '100%',
          height: '100%',
          display: isUnavailable() ? 'flex' : 'none'
        }}
        uiBackground={{
          textureMode: 'stretch',
          uvs: getUvs(unavailableSprite),
          texture: {
            src: unavailableSprite.atlasSrc
          }
        }}
      />
      <UiEntity
        uiTransform={{
          positionType: 'relative',
          width: '100%',
          height: '100%',
          display: !isUnavailable() ? 'flex' : 'none'
        }}
        uiBackground={{
          textureMode: 'stretch',
          uvs: getUvs(tradeClicked ? clickedSprite : normalSprite),
          texture: {
            src: clickedSprite.atlasSrc
          }
        }}
        onMouseDown={tradeDown}
        onMouseUp={() => (tradeClicked = false)}
      />
    </UiEntity>
  )
}

function selectItem(props: { inventoryItem: InventoryItem }) {
  selectedItem = props.inventoryItem
  selectedQuantity = 1
  updatePrice()
  if (props.inventoryItem.item.manaPrice) {
    withMana = true
  } else {
    withMana = false
  }
}

function updatePrice(value?: string) {
  if (value) {
    const formattedValue = value.replace(' ', '')
    if (Number(formattedValue)) {
      selectedQuantity = Number(formattedValue)
    } else {
      selectedQuantity = 1
    }
  }

  let unitPrice: number | undefined

  if (selectedItem) {
    if (isSelling) {
      unitPrice = selectedItem.item.sellPrice
    } else if (selectedItem.item.buyPrice) {
      unitPrice = selectedItem.item.buyPrice
    } else {
      unitPrice = selectedItem.item.manaPrice
    }
  }
  if (unitPrice) {
    totalPrice = selectedQuantity * unitPrice
  } else {
    totalPrice = 0
  }
}

function mouseDownMax() {
  buttonMaxSprite = resourcesMarketSprites.max_button_clicked
}

function mouseUpMax(item: InventoryItem) {
  buttonMaxSprite = resourcesMarketSprites.max_button
  if (isSelling && item.amount) {
    selectedQuantity = item.amount
  }
  if (!isSelling && item.item.buyPrice) {
    selectedQuantity = Math.floor(balance / item.item.buyPrice)
  }
  updatePrice()
}

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

function tradeDown() {
  if (selectedItem) {
    if (isSelling) {
      if (selectedItem.item.sellPrice && selectedItem.amount) {
        if (selectedItem.amount >= selectedQuantity) {
          balance = balance + selectedItem.item.sellPrice * selectedQuantity
        } else {
          return
        }
      }
    } else {
      if (selectedItem.item.buyPrice) {
        if (balance - selectedItem.item.buyPrice * selectedQuantity >= 0) {
          balance = balance - selectedItem.item.buyPrice * selectedQuantity
        } else {
          return
        }
      }
    }
    updateInventory()
  }
  tradeClicked = true
}

function updateInventory() {
  const existingItemIndex = RESOURCES_INVENTORY.findIndex(
    (resourcesInventoryItem) =>
      resourcesInventoryItem.item.id === selectedItem?.item.id
  )
  const existingItem = RESOURCES_INVENTORY[existingItemIndex]

  if (isSelling) {
    if (existingItem && existingItem.amount) {
      if (existingItem.amount - selectedQuantity <= 0) {
        RESOURCES_INVENTORY.splice(existingItemIndex, 1)
      }
      existingItem.amount -= selectedQuantity
    }
  } else {
    if (existingItem) {
      if (existingItem.amount) {
        existingItem.amount += selectedQuantity
      } else {
        existingItem.amount = selectedQuantity
      }
    } else {
      addItemToResourcesInventory()
    }
  }
}

function isUnavailable(): boolean {
  if (selectedItem) {
    if (isSelling) {
      if (selectedItem.amount && selectedItem.amount >= selectedQuantity) {
        return false
      } else {
        return true
      }
    } else {
      if (totalPrice > balance && !withMana) {
        return true
      } else {
        return false
      }
    }
  } else {
    return false
  }
}

function changeVisibility() {
  isVisible = !isVisible
}

function addItemToResourcesInventory() {
  if (selectedItem) {
    const key = selectedItem.item.id
    if (key in ITEMS) {
      RESOURCES_INVENTORY.push({
        item: ITEMS[key as Items],
        amount: selectedQuantity
      })
    }
  }
}
