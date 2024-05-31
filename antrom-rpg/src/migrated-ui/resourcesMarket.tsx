import ReactEcs, { Input, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { canvasInfo } from '..'
import {
  ITEMS,
  InventoryItem,
  Items,
  RESOURCES_INVENTORY,
  RESOURCES_MARKET,
  ResourcesDataType,
  initialMarketResourcesData,
  resourcesMarketSprites
} from '../mocked-data/resourcesData'
import { Sprite, Tab, getUvs } from '../utils'
import { engine } from '@dcl/sdk/ecs'
import { MarketResources } from '../components/definitions'

const ASPECT_RATIO = 0.7
const WIDTH_FACTOR = 0.5
const HEIGTH_FACTOR = WIDTH_FACTOR * ASPECT_RATIO
const SIZE_ITEM_FACTOR = 0.1

let MutableMarketResources: ResourcesDataType

export function setupResourcesMarket() {
  const ResourcesMarketEntity = engine.addEntity()
  MarketResources.create(ResourcesMarketEntity, initialMarketResourcesData)
  ReactEcsRenderer.setUiRenderer(uiComponent)
  if (MarketResources.get(ResourcesMarketEntity)) {
    MutableMarketResources = MarketResources.getMutable(ResourcesMarketEntity)
  }
}

const uiComponent = () => (
  <UiEntity
    uiTransform={{
      width: canvasInfo.width,
      height: canvasInfo.height,
      display: MutableMarketResources.isVisible ? 'flex' : 'none',
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
            condition={MutableMarketResources.isSelling}
            trueSprite={resourcesMarketSprites.purchase_button}
            falseSprite={resourcesMarketSprites.purchase_button_clicked}
            callback={setSelling}
            callbackValue={false}
          />
          <Tab
            condition={MutableMarketResources.isSelling}
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
          uiText={{
            value: MutableMarketResources.balance.toString(),
            textAlign: 'middle-right'
          }}
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
          {MutableMarketResources.itemsArray.map((resource, index) => (
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
          display: MutableMarketResources.selectedItem ? 'flex' : 'none'
        }}
      >
        <UiEntity
          uiTransform={{
            width: '80%',
            height: '10%',
            flexDirection: 'row'
          }}
          uiText={{
            value: MutableMarketResources.selectedItem?.item
              ? MutableMarketResources.selectedItem.item.name
              : '',
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
            display: MutableMarketResources.selectedItem ? 'flex' : 'none'
          }}
        >
          <UiEntity
            uiTransform={{
              width: canvasInfo.width * WIDTH_FACTOR * 0.35 * 0.2,
              height: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              margin: { left: '4%', right: '9%' },
              display: MutableMarketResources.selectedItem ? 'flex' : 'none'
            }}
          >
            <Input
              onChange={(value) => {
                updatePrice(value)
              }}
              value={MutableMarketResources.selectedQuantity.toString()}
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
                uvs: MutableMarketResources.selectedItem
                  ? getUvs(MutableMarketResources.buttonMaxSprite)
                  : [],
                texture: {
                  src:
                    MutableMarketResources.selectedItem &&
                    MutableMarketResources.buttonMaxSprite
                      ? MutableMarketResources.buttonMaxSprite?.atlasSrc
                      : ''
                }
              }}
              onMouseDown={mouseDownMax}
              onMouseUp={() =>
                MutableMarketResources.selectedItem
                  ? mouseUpMax(MutableMarketResources.selectedItem)
                  : {}
              }
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
              uvs: MutableMarketResources.selectedItem?.item
                ? getUvs(MutableMarketResources.selectedItem.item.sprite)
                : [],
              texture: {
                src: MutableMarketResources.selectedItem?.item.sprite
                  ? MutableMarketResources.selectedItem.item.sprite.atlasSrc
                  : ''
              }
            }}
          />
          <UiEntity
            uiTransform={{
              positionType: 'relative',
              width: '30%',
              height: '10%',
              display: MutableMarketResources.isSelling ? 'flex' : 'none',
              margin: { top: '17.5%', right: '5%' }
            }}
            uiText={{
              textAlign: 'middle-right',
              value:
                MutableMarketResources.selectedItem &&
                MutableMarketResources.selectedItem.item.sellPrice
                  ? (
                      MutableMarketResources.selectedItem.item.sellPrice *
                      MutableMarketResources.selectedQuantity
                    ).toString()
                  : ''
            }}
          />
          <UiEntity
            uiTransform={{
              positionType: 'relative',
              width: '30%',
              height: '10%',
              display: MutableMarketResources.isSelling ? 'none' : 'flex',
              margin: { top: '17.5%', right: '10%' }
            }}
            uiText={{
              value: MutableMarketResources.totalPrice.toString(),
              textAlign: 'middle-right'
            }}
          />
        </UiEntity>
        <TradeButton inventoryItem={MutableMarketResources.selectedItem} />
      </UiEntity>
      <UiEntity
        uiTransform={{
          positionType: 'absolute',
          position: { top: '52%', right: '8%' },
          width: canvasInfo.width * WIDTH_FACTOR * 0.04,
          height: canvasInfo.width * WIDTH_FACTOR * 0.04 * ASPECT_RATIO,
          display: MutableMarketResources.selectedItem?.item.withMana
            ? 'flex'
            : 'none'
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
          !MutableMarketResources.isSelling
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
            MutableMarketResources.selectedItem?.item.id ===
            props.inventoryItem.item.id
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
          display: MutableMarketResources.isSelling ? 'flex' : 'none'
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

  if (MutableMarketResources.isSelling) {
    normalSprite = resourcesMarketSprites.sell_button
    clickedSprite = resourcesMarketSprites.sell_button_clicked
    unavailableSprite = resourcesMarketSprites.sell_button_unavailable
  } else {
    if (MutableMarketResources.selectedItem?.item.withMana) {
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
          uvs: getUvs(
            MutableMarketResources.tradeClicked ? clickedSprite : normalSprite
          ),
          texture: {
            src: clickedSprite.atlasSrc
          }
        }}
        onMouseDown={tradeDown}
        onMouseUp={() => (MutableMarketResources.tradeClicked = false)}
      />
    </UiEntity>
  )
}

function selectItem(props: { inventoryItem: InventoryItem }) {
  MutableMarketResources.selectedItem = props.inventoryItem
  MutableMarketResources.selectedQuantity = 1
  updatePrice()
}

function updatePrice(value?: string) {
  if (value) {
    const formattedValue = value.replace(' ', '')
    if (Number(formattedValue)) {
      MutableMarketResources.selectedQuantity = Number(formattedValue)
    } else {
      MutableMarketResources.selectedQuantity = 1
    }
  }

  let unitPrice: number | undefined

  if (MutableMarketResources.selectedItem) {
    if (MutableMarketResources.isSelling) {
      unitPrice = MutableMarketResources.selectedItem.item.sellPrice
    } else {
      unitPrice = MutableMarketResources.selectedItem.item.buyPrice
    }
    if (unitPrice) {
      MutableMarketResources.totalPrice =
        MutableMarketResources.selectedQuantity * unitPrice
    } else {
      MutableMarketResources.totalPrice = 0
    }
  }
}

function mouseDownMax() {
  MutableMarketResources.buttonMaxSprite =
    resourcesMarketSprites.max_button_clicked
}

function mouseUpMax(item: InventoryItem) {
  MutableMarketResources.buttonMaxSprite = resourcesMarketSprites.max_button
  if (MutableMarketResources.isSelling && item.amount) {
    MutableMarketResources.selectedQuantity = item.amount
  }
  if (!MutableMarketResources.isSelling && item.item.buyPrice) {
    MutableMarketResources.selectedQuantity = Math.floor(
      MutableMarketResources.balance / item.item.buyPrice
    )
  }
  updatePrice()
}

function setSelling(state: boolean) {
  if (MutableMarketResources.isSelling !== state) {
    MutableMarketResources.selectedItem = undefined
    MutableMarketResources.isSelling = state
    if (state) {
      MutableMarketResources.itemsArray = RESOURCES_INVENTORY
    } else {
      MutableMarketResources.itemsArray = RESOURCES_MARKET
    }
  }
}

function tradeDown() {
  if (MutableMarketResources.selectedItem) {
    if (MutableMarketResources.isSelling) {
      if (
        MutableMarketResources.selectedItem?.item.sellPrice &&
        MutableMarketResources.selectedItem.amount
      ) {
        if (
          MutableMarketResources.selectedItem.amount >=
          MutableMarketResources.selectedQuantity
        ) {
          MutableMarketResources.balance =
            MutableMarketResources.balance +
            MutableMarketResources.selectedItem.item.sellPrice *
              MutableMarketResources.selectedQuantity
        } else {
          return
        }
      }
    } else {
      if (MutableMarketResources.selectedItem.item.buyPrice) {
        if (
          MutableMarketResources.balance -
            MutableMarketResources.selectedItem.item.buyPrice *
              MutableMarketResources.selectedQuantity >=
          0
        ) {
          MutableMarketResources.balance =
            MutableMarketResources.balance -
            MutableMarketResources.selectedItem.item.buyPrice *
              MutableMarketResources.selectedQuantity
        } else {
          return
        }
      }
    }
    updateInventory()
  }
  MutableMarketResources.tradeClicked = true
}

function updateInventory() {
  const existingItemIndex = RESOURCES_INVENTORY.findIndex(
    (resourcesInventoryItem) =>
      resourcesInventoryItem.item.id ===
      MutableMarketResources.selectedItem?.item.id
  )
  const existingItem = RESOURCES_INVENTORY[existingItemIndex]

  if (MutableMarketResources.isSelling) {
    if (existingItem && existingItem.amount) {
      if (existingItem.amount - MutableMarketResources.selectedQuantity <= 0) {
        RESOURCES_INVENTORY.splice(existingItemIndex, 1)
      }
      existingItem.amount -= MutableMarketResources.selectedQuantity
    }
  } else {
    if (existingItem) {
      if (existingItem.amount) {
        existingItem.amount += MutableMarketResources.selectedQuantity
      } else {
        existingItem.amount = MutableMarketResources.selectedQuantity
      }
    } else {
      addItemToResourcesInventory()
    }
  }
}

function isUnavailable(): boolean {
  if (MutableMarketResources.selectedItem) {
    if (MutableMarketResources.isSelling) {
      if (
        MutableMarketResources.selectedItem.amount &&
        MutableMarketResources.selectedItem.amount >=
          MutableMarketResources.selectedQuantity
      ) {
        return false
      } else {
        return true
      }
    } else {
      if (MutableMarketResources.totalPrice > MutableMarketResources.balance) {
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
  MutableMarketResources.isVisible = !MutableMarketResources.isVisible
}

function addItemToResourcesInventory() {
  if (MutableMarketResources.selectedItem) {
    const key = MutableMarketResources.selectedItem.item.id
    if (key) {
      if (key in ITEMS) {
        RESOURCES_INVENTORY.push({
          item: ITEMS[key as Items],
          amount: MutableMarketResources.selectedQuantity
        })
      }
    }
  }
}
