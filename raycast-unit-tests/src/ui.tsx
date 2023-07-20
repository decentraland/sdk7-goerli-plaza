import ReactEcs, { Label } from "@dcl/sdk/react-ecs"
import { Color4 } from "@dcl/sdk/math"

export const ui = () => {
  return (
    <Label
      uiTransform={{
        width: "100%",
        height: "100%",
        margin: { left: 300 },
        padding: { top: 100, right: 100, bottom: 100, left: 100 },
      }}
      value={"This scene tests the raycast using\na testing framework.\nPlease review the console messages."}
      textAlign="middle-center"
      fontSize={44}
      color={Color4.White()}
      font={'monospace'}
      uiBackground={{ color: { r: 0, g: 0, b: 0, a: 0.8 } }}
    />
  )
}
