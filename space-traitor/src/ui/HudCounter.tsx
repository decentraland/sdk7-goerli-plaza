import { Schemas, engine } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Label, UiEntity } from '@dcl/sdk/react-ecs'

type HudCounterProps = {
    visible: boolean
    credits: number
}


{/* Fix Icon - UI*/ }
function HudCounter({ visible, credits }: HudCounterProps): ReactEcs.JSX.Element {
    return (
        <UiEntity
            uiTransform={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                positionType: 'absolute',
                position: { right: "5%", bottom: '30%' },
                display: visible ? 'flex' : 'none',
            }}
        >
            <UiEntity
                uiTransform={{
                    width: '217',
                    height: '105',
                }}
                uiBackground={{
                    textureMode: 'center',
                    texture: {
                        src: 'images/ui-counter-2.png',
                    },
                }}
            />
            <Label
                uiTransform={{
                    positionType: 'absolute',
                    position: { top: '38%', left: '45%' },
                }}
                value={`${credits}/8`}
                color={Color4.Purple()}
                fontSize={37}
            />

            {/* Fix Icon - UI*/}
            <UiEntity
                uiTransform={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    positionType: 'absolute',
                    position: { right: "100%", bottom: '2%' },
                }}
            >
                <UiEntity
                    uiTransform={{
                        width: '100',
                        height: '100',
                    }}
                    uiBackground={{
                        textureMode: 'stretch',
                        texture: {
                            src: 'images/tool2.png',
                        },
                    }}
                />
            </UiEntity>
        </UiEntity>
    )
}

export default HudCounter