import { engine } from "@dcl/sdk/ecs"
import ReactEcs, { Label, TextAlignType, UiEntity } from "@dcl/sdk/react-ecs"
import { Color4 } from "@dcl/sdk/math"

const vars = { dt: 0 }

engine.addSystem((d) => {
  if (vars.dt === undefined) throw new Error('dt was undefined')
  if (d === undefined) throw new Error('d was undefined')
  vars.dt = d
})

const Monster = (props: { index: number }) => {

  const textAlign: TextAlignType[] = ['top-left', 'top-center', 'top-right', 'middle-left', 'middle-center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right']
  return (< Label
    uiTransform={{ width: 80 + Math.random() * 100, height: 20 + props.index * 3 }}
    value={Math.random().toString(36)}
    textAlign={textAlign[props.index % textAlign.length]}
    fontSize={12 + props.index}
    color={Color4.Black()}
    font={'sans-serif'}
    uiBackground={{ color: { r: 0, g: Math.random(), b: Math.random(), a: 1 } }}
  />
  )
}

const Column = () => {
  const amount = (3 + Math.random() * 10) | 0
  const monsters = new Array(amount).fill(null).map((_, i) => <Monster index={i} />)

  return (
    <UiEntity
      uiTransform={{
        width: 100 + vars.dt * 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      uiBackground={{ color: { r: 1, g: 0.45, b: 0.85, a: Math.random() } }}
    >
      <Label
        uiTransform={{ width: 80, height: 20 }}
        value={"Amount:" + monsters.length}
        textAlign={'bottom-center'}
        fontSize={15}
        color={Color4.Black()}
        font={'sans-serif'}
        uiBackground={{ color: { r: 1, g: 0.45, b: 0.85, a: 1 } }}
      />
      {...monsters}
    </UiEntity>
  )
}

export const ui = () => {
  if (typeof vars.dt == 'undefined') debugger
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
        value={"Delta time:" + vars.dt.toFixed(4)}
        textAlign={'bottom-center'}
        fontSize={12}
        color={Color4.Black()}
        font={'sans-serif'}
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
