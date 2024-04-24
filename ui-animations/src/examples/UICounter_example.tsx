import ReactEcs from '@dcl/sdk/react-ecs'
import { UICounter, CustomCounter } from '../ui_components/UICounter'



export let counter = new CustomCounter(4, 4, 64, 'center', "images/customCounter/number_sheet.png")

// system to test the custom counter
export function CounterTestSystem(dt: number) {
    counter.increaseNumberBy(8)

    if (counter.currentNumber > 9999) counter.setNumber(0)
}

export function createCustomCounterUI() {
    return (
        <UICounter customCounter={counter}
            uiTransform={{
                width: '20%',
                height: '10%',
                positionType: 'absolute',
                position: { left: '36%', top: "8%" }
            }}
        />
    )
}