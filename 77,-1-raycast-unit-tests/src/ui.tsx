import ReactEcs, { Label, UiEntity } from "@dcl/sdk/react-ecs"
import { Color4 } from "@dcl/sdk/math"

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
        value={"This scene tests the raycast using a testing framework. Please review the console status."}
        textAlign="middle-center"
        fontSize={44}
        color={Color4.Black()}
        font={'sans-serif'}
        uiBackground={{ color: { r: 1, g: 0.45, b: 0.85, a: 1 } }}
      />
    </UiEntity>
  )
}
