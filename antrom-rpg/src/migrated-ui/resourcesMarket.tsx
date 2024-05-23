import { Color4 } from '@dcl/sdk/math'
import ReactEcs, {
  Button,
  ReactEcsRenderer,
  UiEntity
} from '@dcl/sdk/react-ecs'
import { canvasInfo } from '..'
import { antromSprites } from '../mocked-data/atlasSprites'
import { Dialog, DialogButton } from '../mocked-data/dialogsData'
import { getUvs } from '../utils'
import { Coords } from '@dcl/sdk/ecs'
import { InventoryItem, RESOURCES_MARKET } from '../mocked-data/resourcesData'

const ASPECT_RATIO = 0.7
const WIDTH_FACTOR = 0.5
const HEIGTH_FACTOR = WIDTH_FACTOR * ASPECT_RATIO
const SIZE_ITEM_FACTOR = 0.1
let selected_resource: string = ''

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
            width: '100%',
            height: '8.5%',
            flexDirection: 'row',
            margin: { bottom: '4%' }
          }}
          uiBackground={{
            color: Color4.create(1, 0, 1, 0.5)
          }}
          uiText={{ value: 'sell/purchase', textAlign: 'middle-center' }}
        />
        <UiEntity
          uiTransform={{
            width: '80%',
            height: '5%',
            flexDirection: 'row',
            margin: { right: '10%' }
          }}
          uiBackground={{
            color: Color4.create(1, 0, 0, 0.5)
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
          {RESOURCES_MARKET.map((resource, index) => (
            <UiEntity
              key={index}
              uiTransform={{
                width: canvasInfo.width * WIDTH_FACTOR * SIZE_ITEM_FACTOR,
                height: canvasInfo.width * WIDTH_FACTOR * SIZE_ITEM_FACTOR,
                margin: { right: '8.75%', bottom: '4%', top: '1.5%' }
              }}
            >
              <ItemButton item={resource} />
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
          margin: { top: '17.5%', left: '2%' }
        }}
        uiBackground={{
          color: Color4.create(0, 1, 0, 0.5)
        }}
      ></UiEntity>
    </UiEntity>
  </UiEntity>
)

function ItemButton(props: { item: InventoryItem }) {
  return (
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%'
      }}
      uiBackground={{
        textureMode: 'stretch',
        uvs: getUvs(props.item.item.sprite),
        texture: { src: props.item.item.sprite.atlasSrc }
      }}
      onMouseDown={() => (selected_resource = props.item.item.id)}
    >
      <UiEntity
        uiTransform={{
          positionType: 'absolute',
          width: '115%',
          height: '115%',
          position: { left: '-5%', top: '-5%' },
          display: selected_resource === props.item.item.id ? 'flex' : 'none'
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
