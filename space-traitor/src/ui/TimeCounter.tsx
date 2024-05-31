import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Label, UiEntity } from '@dcl/sdk/react-ecs'

type TimeCounterProps = {
    visible: boolean
    text: string
}

{/* Fix Icon - UI - timer*/ }
function TimeCounter({ visible, text }: TimeCounterProps): ReactEcs.JSX.Element {
    return (
        <UiEntity
            uiTransform={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                positionType: 'absolute',
                position: { right: "5%", bottom: '45%' },
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
                value={text}
                color={Color4.Black()}
                fontSize={37}
            />
        </UiEntity>
    )
}

export default TimeCounter
