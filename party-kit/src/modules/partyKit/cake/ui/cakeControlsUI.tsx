import { Color4 } from "@dcl/sdk/math"
import ReactEcs, { PositionUnit, UiEntity } from "@dcl/sdk/react-ecs"
import { getUiPositionY, isVisible } from "./cakeControls"


export function createControlsCakeUI() {    

    return (
        <UiEntity 
            uiTransform={{
                display: isVisible() ? 'flex' : 'none',
                justifyContent: 'center',
                width: '100%',
                height: '15%',
                positionType:'absolute',
                position: {bottom: getUiPositionY() + '%' as PositionUnit}
            }} 
            //uiBackground={{
            //    color: Color4.create(1, 0, 0, 0.5)
            //}}
        >
           
            <UiEntity uiTransform={{

                width: 1824 * 0.25,
                height: 582 * 0.25,
                alignSelf: 'flex-start',
                justifyContent: 'center',
                //borderRadius: 20,
                //borderWidth: 4,
                //borderColor: Color4.Black(),
                
            }}
            uiBackground={{
                texture: {src: "images/cake/Cake_Controlls_UI.png"},
                textureMode: 'stretch'   ,     
                //color: Color4.create(1, 0.8, 0.5, 1)
            }}>
                <UiEntity 
                    uiTransform={{

                        width: "12%",
                        height: "35%",
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        positionType:'absolute',
                        position: {left: '14.7%', bottom: '6%'}
                    }}
                    //uiBackground={{     
                    //    color: Color4.create(1, 1, 0.5, 0.5)
                    //}}
                >
                    {shadowText("<b>1</b>", 35)}
                </UiEntity>
            </UiEntity>
              
        
    </UiEntity>
    )
}

function shadowText(buttonText: string, fontSize: number = 40) {
    return (
        <UiEntity uiTransform={{
            width: "100%",
            height: "100%", 
            alignSelf: 'center',
            justifyContent: 'center',
        }}
        //uiBackground={{
        //    color: Color4.create(0, 1, 0, 0.0)
        //}}
        >
            <UiEntity uiText={{
                    value: buttonText,
                    fontSize: fontSize,
                    font: "sans-serif",
                    textAlign: 'middle-center',

                    color: Color4.fromHexString('#efc4a5ff')
                }}
                uiTransform={{
                    width: "100%",
                    height: "100%",
                    alignSelf: 'center',
                    positionType:'absolute',
                    position: {right: '2%', bottom: '5%'}
                }}
                />    
                <UiEntity uiText={{
                    value: buttonText,
                    fontSize: fontSize,
                    font: "sans-serif",
                    textAlign: 'middle-center',

                    color: Color4.create(0.1, 0, 0, 0.6)
                }}
                uiTransform={{
                    width: "100%",
                    height: "100%",
                    alignSelf: 'center',
                    positionType:'absolute',
                    position: {right: '0%', bottom: '3%'}
                }}
                />    
                  <UiEntity uiText={{
                    value: buttonText,
                    fontSize: fontSize,
                    textAlign: 'middle-center',
                    font: "sans-serif",

                    color: Color4.fromHexString('#3a1d0cff')
                }}
                uiTransform={{
                    width: "100%",
                    height: "100%",
                    alignSelf: 'center',
                    positionType:'absolute',
                    position: {right: '1%', bottom: '4%'}
                }}
                /> 
        </UiEntity>
    )
}