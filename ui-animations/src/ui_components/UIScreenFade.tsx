import { Color4 } from "@dcl/sdk/math"
import { Entity, Schemas, engine } from '@dcl/sdk/ecs'
import ReactEcs, { EntityPropTypes, UiEntity } from '@dcl/sdk/react-ecs'


export class ScreenFade {
    color: Color4 = Color4.fromHexString('#222222bb')
    visible: boolean = false
    opacity: number = 0
    constructor(_color: Color4) {
        this.color = _color

    }

    show() {
        this.visible = true
    }
    hide() {
        this.visible = false
    }

    toggle() {
        this.visible = !this.visible
    }
}

export type ScreenFadeProps = EntityPropTypes & {
    children?: ReactEcs.JSX.Component[]
    fadeObject: ScreenFade

}

export function UIScreenFade(props: ScreenFadeProps) {

    return <UiEntity
        uiTransform={{
            width: "100%",
            height: "100%",
            display: props.fadeObject.visible ? 'flex' : 'none'
        }}
        uiBackground={{
            color: props.fadeObject.color

        }}
    >

        {props.children}

    </UiEntity>
}

