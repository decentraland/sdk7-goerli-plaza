import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'  
import { DiscoManager } from './modules/grid-floor/discoManager'
  
export function setupUI() {
    ReactEcsRenderer.setUiRenderer(() => [         
        createDebugUI(),          
    ])
}

function createDebugUI() {
    return (
        <UiEntity
            uiTransform={{
                width: "100%",
                height: "20%",
                flexDirection: 'column',
                positionType: 'absolute',
                position: {
                    bottom: "5%"
                }
            }}
        >
        <UiEntity
            uiTransform={{
                width: 300,
                height: 80,
                borderRadius: 20,
                alignSelf: 'center',
                positionType: 'absolute',
                position: {
                    bottom: 0
                }
            }}
            uiBackground={{
                color: Color4.create(0, 0, 0, 1),
            }}
        >
            <UiEntity
                uiTransform={{
                    display: (DiscoManager.getInstance().isDiscoActive) ? 'none' : 'flex',
                    width: '100%',
                    height: '100%',
                }}
                uiText={{
                    value: '<b>E</b> : Start Disco Mode',
                    fontSize: 24,
                    color: Color4.White()
                }}
            />
            <UiEntity
                uiTransform={{
                    display: (DiscoManager.getInstance().isDiscoActive) ? 'flex' : 'none',
                    width: '100%',
                    height: '100%',
                }}
                uiText={{
                    value: '<b>F</b> : Stop Disco Mode',
                    fontSize: 24,
                    color: Color4.White()
                }}
            />
                
        </UiEntity>
        </UiEntity>
    )
}
