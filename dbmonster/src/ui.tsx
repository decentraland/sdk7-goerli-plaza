import { YGDisplay, YGJustify, YGAlign, TextAlignMode, Font, engine } from "@dcl/sdk/ecs"
import ReactEcs, { Label, UiEntity } from "@dcl/sdk/react-ecs"
import { Color4 } from "@dcl/sdk/math"

let dt = 0

engine.addSystem((d) => {
  dt = d
})

const Monster = (props: { index: number }) => (
  <Label
    // key={props.index.toString()}
    uiTransform={{ width: 80 + Math.random() * 100, height: 20 + props.index * 3 }}
    value={Math.random().toString(36)}
    textAlign={props.index % TextAlignMode.TAM_BOTTOM_RIGHT}
    fontSize={12 + props.index}
    color={Color4.Black()}
    font={Font.F_SANS_SERIF}
    uiBackground={{ color: { r: 0, g: Math.random(), b: Math.random(), a: 1 } }}
  />
)

const Column = () => {
  const amount = (3 + Math.random() * 10) | 0
  const monsters = new Array(amount).fill(null).map((_, i) => <Monster index={i} />)

  return (
    <UiEntity
      uiTransform={{
        width: 100 + dt * 200,
        display: YGDisplay.YGD_FLEX,
        justifyContent: YGJustify.YGJ_CENTER,
        alignItems: YGAlign.YGA_CENTER,
      }}
      uiBackground={{ color: { r: 1, g: 0.45, b: 0.85, a: Math.random() } }}
    >
      <Label
        uiTransform={{ width: 80, height: 20 }}
        value={"Amount:" + monsters.length}
        textAlign={TextAlignMode.TAM_BOTTOM_CENTER}
        fontSize={15}
        color={Color4.Black()}
        font={Font.F_SANS_SERIF}
        uiBackground={{ color: { r: 1, g: 0.45, b: 0.85, a: 1 } }}
      />
      {...monsters}
    </UiEntity>
  )
}

export const ui = () => {
  return (
    <UiEntity
      uiTransform={{
        width: "100%",
        height: "100%",
        margin: { left: 300 },
        padding: { top: 10, right: 10, bottom: 10, left: 10 },
      }}
      uiBackground={{ color: { r: 0, g: 0, b: 0, a: 0.8 } }}
    >
      <Label
        uiTransform={{ width: 80, height: 20 }}
        value={"Delta time:" + dt.toFixed(4)}
        textAlign={TextAlignMode.TAM_BOTTOM_CENTER}
        fontSize={12}
        color={Color4.Black()}
        font={Font.F_SANS_SERIF}
        uiBackground={{ color: { r: 1, g: 0.45, b: 0.85, a: 1 } }}
      />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
    </UiEntity>
  )
}
