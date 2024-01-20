import ReactEcs, { EntityPropTypes, JustifyType, PositionUnit, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from "@dcl/sdk/math"

type DigitSprite = {
    number: number,
    uvs: number[]
    spriteSheet: string
    size: number,
    margin: number,
    color?: Color4
}

export type CounterJustifyType = 'left' | 'center' | 'right'


export type CustomCounterProps = Omit<EntityPropTypes, 'uiTransform' | 'uiBackground'> & {
    children?: ReactEcs.JSX.Component
    customCounter: CustomCounter
    uiTransform?: Omit<NonNullable<EntityPropTypes['uiTransform']>, ''>
    uiBackground?: Omit<NonNullable<EntityPropTypes['uiBackground']>, ''>
}
export function UICounter(props: CustomCounterProps) {
    return (
        <UiEntity
            uiTransform={props.uiTransform}
            uiBackground={props.uiBackground}
        >
            <UiEntity
                uiTransform={{
                    width: "100%",
                    height: "100%",
                    positionType: 'absolute',
                    flexBasis: props.customCounter.size,
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: props.customCounter.justifyCounter
                }}
            >
                {props.customCounter.generateCounterDigitsUI()}
            </UiEntity>
        </UiEntity>
    )
}

export class CustomCounter {
    spriteSheet: string = "images/customCounter/number_sheet.png"
    rows: number
    cols: number
    currentNumber: number = 0
    digits: DigitSprite[]
    size: number = 64
    justifyCounter: JustifyType = "center"

    constructor(_rows: number, _cols: number, _size: number, _justifyType: CounterJustifyType, _imgPath: string,) {
        this.digits = []
        this.rows = _rows
        this.cols = _cols
        this.spriteSheet = _imgPath
        this.size = _size

        switch (_justifyType) {
            case 'left':
                this.justifyCounter = 'flex-end'
                break;
            case 'right':
                this.justifyCounter = 'flex-start'
                break;
            case 'center':
                this.justifyCounter = 'center'
                break;
            default:
                this.justifyCounter = 'flex-end'
                break;
        }


        this.digits.push({
            number: 0,
            uvs: this.getUVSingleNumber(0),
            spriteSheet: this.spriteSheet,
            size: this.size,
            margin: this.size * 0.33
        })
    }

    getUVSingleNumber(digit: number): number[] {

        let currentSpriteV = Math.floor(digit / this.rows)
        let currentSpriteU = digit % this.cols
        let stepU = 1 / this.rows
        let stepV = 1 / this.cols


        let left = currentSpriteU * stepU
        let right = (currentSpriteU + 1) * stepU
        let top = 1 - (currentSpriteV * stepV)
        let bottom = 1 - ((currentSpriteV + 1) * stepV)

        return [
            left, bottom,
            left, top,
            right, top,
            right, bottom
        ]

    }

    setNumber(_num: number) {

        this.digits = []
        this.currentNumber = _num

        let digits = _num.toString().split('');
        let realDigits = digits.map(Number)

        realDigits.reverse()
        let margin = this.size * 0.33

        for (let i = 0; i < realDigits.length; i++) {

            if ((i % 3) == 2) {
                margin = this.size * 0.1
            }
            else {
                margin = this.size * 0.33
            }

            this.digits.push({
                number: realDigits[i],
                uvs: this.getUVSingleNumber(realDigits[i]),
                spriteSheet: this.spriteSheet,
                size: this.size,
                margin: margin,

            })


        }
    }

    increaseNumberBy(_increment: number) {
        this.setNumber(this.currentNumber + _increment)
    }

    generateCounterDigitsUI() {
        return Array.from(this.digits).map((digit) => <this.DigitComponent value={digit} key={this.digits.indexOf(digit)} />)
    }

    DigitComponent(props: { value: DigitSprite; key: string | number }) {

        return (<UiEntity
            key={props.key}
            uiTransform={{
                width: props.value.size,
                height: props.value.size,
                maxHeight: props.value.size,
                maxWidth: props.value.size,
                minWidth: props.value.size,
                minHeight: props.value.size,
                margin: { left: -1 * props.value.margin },

            }}
            uiBackground={{
                textureMode: 'stretch',
                uvs: props.value.uvs,
                texture: {
                    src: props.value.spriteSheet,
                },
            }}
        >
        </UiEntity>
        )
    }

    // createCounterUI(){ 
    //     return (
    //         <UiEntity
    //             uiTransform={{
    //                 width:"100%",
    //                 height: "100%",
    //                 positionType: 'absolute',               
    //                 flexBasis: this.size,
    //                 flexDirection: 'row-reverse',
    //                 alignItems: 'center',
    //                 alignContent: 'center',
    //                 justifyContent: this.justifyCounter                   
    //             }}            
    //         >
    //             {this.generateCounterDigitsUI()}
    //         </UiEntity>      
    //     )
    // }   
}
