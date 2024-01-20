import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs"
import { UIPopup, UIPopupAnimation } from "../ui_components/UIPopup"
import { Color4 } from "@dcl/sdk/math"


const lableFontSize = 20
export function exampleLabelsUI() {

    return (
        <UiEntity
            uiTransform={{
                width: "100%",
                height: "100%",
                positionType: "absolute"
            }} >

            <UiEntity uiText={{ value: "Sprite", fontSize: lableFontSize, textAlign: 'middle-center' }} uiTransform={{ positionType: 'absolute', width: '5%', height: "3%", position: { top: '3%', left: '15%' } }} />
            <UiEntity uiText={{ value: "AnimatedSprite", fontSize: lableFontSize, textAlign: 'middle-center' }} uiTransform={{ positionType: 'absolute', width: '5%', height: "3%", position: { top: '3%', left: '23%' } }} />
            <UiEntity uiText={{ value: "Spinner", fontSize: lableFontSize, textAlign: 'middle-center' }} uiTransform={{ positionType: 'absolute', width: '5%', height: "3%", position: { top: '3%', left: '32%' } }} />
            <UiEntity uiText={{ value: "Custom Counter", fontSize: lableFontSize, textAlign: 'middle-center' }} uiTransform={{ positionType: 'absolute', width: '5%', height: "3%", position: { top: '3%', left: '43%' } }} />
            <UiEntity uiText={{ value: "Button Animations", fontSize: lableFontSize, textAlign: 'middle-center' }} uiTransform={{ positionType: 'absolute', width: '5%', height: "3%", position: { top: '3%', left: '57%' } }} />
            <UiEntity uiText={{ value: "Animated Popup", fontSize: lableFontSize, textAlign: 'middle-center' }} uiTransform={{ positionType: 'absolute', width: '5%', height: "3%", position: { top: '3%', left: '72%' } }} />
            <UiEntity uiText={{ value: "Card Flip", fontSize: lableFontSize, textAlign: 'middle-center' }} uiTransform={{ positionType: 'absolute', width: '5%', height: "3%", position: { top: '3%', left: '87%' } }} />
            <UiEntity uiText={{ value: "Particle System", fontSize: lableFontSize, textAlign: 'middle-center' }} uiTransform={{ positionType: 'absolute', width: '5%', height: "3%", position: { top: '40%', left: '87%' } }} />
            <UiEntity uiText={{ value: "Progress Bar", fontSize: lableFontSize, textAlign: 'middle-center' }} uiTransform={{ positionType: 'absolute', width: '5%', height: "3%", position: { top: '70%', left: '87%' } }} />


        </UiEntity>
    )
}