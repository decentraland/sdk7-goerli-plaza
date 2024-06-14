import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from "@dcl/sdk/math"


const uiComponent = () => [
  <UiEntity
    uiTransform={{
      width: 400,
      height: 230,
      margin: '16px 0 8px 270px',
      padding: 4,
    }}
    uiBackground={{ color: Color4.create(0.5, 0.8, 0.1, 0.6) }}
  >
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      uiBackground={{ color: Color4.fromHexString("#70ac76ff") }}
    >
      <Label
        value="LoremipsumLoremipsum LoremipsumLoremipsum Loremipsum LoremipsumLoremipsum LoremipsumLoremipsum Loremipsum LoremipsumLoremipsum LoremipsumLoremipsum Loremipsum LoremipsumLoremipsum LoremipsumLoremipsum Loremipsum"
        textWrap="wrap"
      />
      <Label value="LoremipsumLoremipsum LoremipsumLoremipsum Loremipsum LoremipsumLoremipsum LoremipsumLoremipsum Loremipsum LoremipsumLoremipsum LoremipsumLoremipsum Loremipsum LoremipsumLoremipsum LoremipsumLoremipsum Loremipsum"
        textWrap="nowrap"
      />
    </UiEntity>
  </UiEntity>]

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}