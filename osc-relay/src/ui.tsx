import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { GameController } from './game.controller'

export class UI {
    public color: Color4
    public message : string = ''
    constructor() {
        this.color = Color4.Red()
        const uiComponent = () => (
            [
                this.mainUi(),
            ]
        )
        ReactEcsRenderer.setUiRenderer(uiComponent)

    }
    mainUi() {
        return <UiEntity
            uiTransform={{
                width: 520,
                height: 200,
                margin: '10% 50px 50% 40%',
                position: { top: '40%' },
                padding: { top: 4, bottom: 4, left: 4, right: 4 },
            }}
            uiBackground={{ color: Color4.create(0.5, 0.5, 0.5, 0.6) }}
        >
            <UiEntity
                uiTransform={{
                    width: 520,
                    height: 200,
                    maxWidth: '100%',
                    maxHeight: '100%',
                    minHeight: '12%',
                    minWidth: '15%',
                    positionType: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                uiBackground={{
                    textureMode: 'stretch',
                }}
            >
                {/* Label - Title */}
                <Label
                    uiTransform={{
                        width: 13,
                        height: 13,
                        margin: { top: '9%', bottom: '0%', left: '50%', right: '50%' },
                        positionType: 'absolute',
                        position: { bottom: '0%', top: '0%', left: '0%' },
                    }}
                    value={this.message}
                    fontSize={18}
                    font='sans-serif'
                    color={this.color}
                />
            </UiEntity>
        </UiEntity>
    }
}



