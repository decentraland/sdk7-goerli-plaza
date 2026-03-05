import { Color4 } from "@dcl/sdk/math"
import ReactEcs, { PositionUnit, UiEntity } from "@dcl/sdk/react-ecs"
import { calculateTextWidth, getNotificationPositionIndex, getNotificationPositionX, getNotificationText1, getNotificationText2, isNotificationVisible, isVisible } from "./cakeNotification"


export function createCakeNotificationListUI() {
    return (
        <UiEntity uiTransform={{
            display: isVisible() ? 'flex' : 'none',
            width: '20%',
            height: '70%',
            flexDirection: 'column',
            alignItems: 'flex-end',
            positionType:'absolute',
            position: {top: '10%', right: '1%'}
        }}
        //uiBackground={{
        //    color: Color4.create(1, 0, 0, 0.5)
        //}}
        >
            {createNotificationCakeUI(0)}
            {createNotificationCakeUI(1)}
            {createNotificationCakeUI(2)}
            {createNotificationCakeUI(3)}
            {createNotificationCakeUI(4)}
            {createNotificationCakeUI(5)}
            {createNotificationCakeUI(6)}
            {createNotificationCakeUI(7)}
            {createNotificationCakeUI(8)}
            {createNotificationCakeUI(9)}
            {createNotificationCakeUI(10)}
            {createNotificationCakeUI(11)}
        </UiEntity>
    )
}

function createNotificationCakeUI(index: number) {    

    return (
           
        <UiEntity uiTransform={{

            display: isNotificationVisible(index) ? 'flex' : 'none',
            width: (calculateTextWidth(getNotificationText1(index)) + calculateTextWidth(getNotificationText2(index)) + 81 + 40),
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
            //borderRadius: 20,
            //borderWidth: 4,
            //borderColor: Color4.Black(),
            positionType:'absolute',
            position: {
                top: 55 * getNotificationPositionIndex(index),
                right: getNotificationPositionX(index) + '%' as PositionUnit
            },
            padding: {
                left: 20, right: 20
            }
        }}
        uiBackground={{
            texture: {src: "images/cake/Cake_Notify.png"},
            textureMode: 'nine-slices',
            textureSlices: {
                top: 0,
                bottom: 0,
                left: 0.3,
                right: 0.3
            }
            //color: Color4.create(1, 0.8, 0.5, 1)
        }}>
            <UiEntity 
                uiTransform={{
                    width: calculateTextWidth(getNotificationText1(index)),
                    height: "100%", 
                    alignSelf: 'flex-start',
                    justifyContent: 'center',
                }}
                //uiBackground={{
                //    color: Color4.create(0, 1, 0, 0.6)
                //}}
                >
                {shadowText(getNotificationText1(index), '#2EE7F2', 20)}
            </UiEntity>
            <UiEntity 
                uiTransform={{
                    width: 81,
                    height: 45, 
                    alignSelf: 'center',
                    //margin: {left: 3, right: 3, top: 3, bottom: 3}
                }}
                uiBackground={{
                    texture: {src: "images/cake/cake_throw_icon.png"},
                    textureMode: 'stretch',
                }}
            />
            <UiEntity 
                uiTransform={{
                    width: calculateTextWidth(getNotificationText2(index)),
                    height: "100%", 
                    alignSelf: 'flex-start',
                    justifyContent: 'center',
                }}
                //uiBackground={{
                //    color: Color4.create(0, 0, 1, 0.6)
                //}}
                >
                {shadowText(getNotificationText2(index), '#FFCC00', 20)}
            </UiEntity>
        </UiEntity>
                
    )
}

function shadowText(buttonText: string, color: string = '#3a1d0cff', fontSize: number = 40) {
    return (
        <UiEntity uiTransform={{
            width: "100%",
            height: "100%", 
            alignSelf: 'center',
            justifyContent: 'center',
        }}
        >
            <UiEntity 
                //uiText={{
                //    value: buttonText,
                //    fontSize: fontSize,
                //    font: "sans-serif",
                //    textAlign: 'middle-center',
                //    textWrap: 'nowrap',
                //    color: Color4.fromHexString('#efc4a5ff')
                //    //color: Color4.create(0.937, 0.768, 0.647, 1)
                //}}
                //uiTransform={{
                //    width: "100%",
                //    height: "100%",
                //    alignSelf: 'center',
                //    positionType:'absolute',
                //    position: {right: '2%', bottom: '5%'}
                //}}
            />    
            <UiEntity 
                //uiText={{
                //    value: buttonText,
                //    fontSize: fontSize,
                //    font: "sans-serif",
                //    textAlign: 'middle-center',
                //    textWrap: 'nowrap',
                //    color: Color4.create(0.1, 0, 0, 0.6)
                //}}
                //uiTransform={{
                //    width: "100%",
                //    height: "100%",
                //    alignSelf: 'center',
                //    positionType:'absolute',
                //    position: {right: '0%', bottom: '3%'}
                //}}
            />    
            <UiEntity 
                uiText={{
                    value: buttonText,
                    fontSize: fontSize,
                    textAlign: 'middle-center',
                    font: "sans-serif",
                    textWrap: 'nowrap',
                    color: Color4.fromHexString(color)
                    //color: Color4.create(0.227, 0.113, 0.047, 0.6)
                }}
                uiTransform={{
                    width: "100%",
                    height: "100%",
                    alignSelf: 'center',
                    positionType:'absolute',
                    //position: {right: '1%', bottom: '4%'}
                }}
            /> 
        </UiEntity>
    )
}