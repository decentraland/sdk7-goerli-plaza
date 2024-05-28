import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'

const ASPECT_RATIO = 0.7
const WIDTH_FACTOR = 0.5
const HEIGTH_FACTOR = WIDTH_FACTOR * ASPECT_RATIO
const SIZE_ITEM_FACTOR = 0.1

let isVisible: boolean = true
let selectedWearable: number | undefined = undefined

export function setupResourcesMarket() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

const uiComponent = () => (
  <UiEntity
    uiTransform={{
      display: isVisible ? 'flex' : 'none'
    }}
  ></UiEntity>
)
