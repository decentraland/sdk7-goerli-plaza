

import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, UiEntity } from '@dcl/sdk/react-ecs'

type BugClickerProps = {
    visible: boolean
    onSuccess: () => void
    successScore: number
    successNeeded: number
    topBugPosition: number
    leftBugPosition: number
}

function BugClicker({ visible, topBugPosition, leftBugPosition, successNeeded, successScore, onSuccess }: BugClickerProps): ReactEcs.JSX.Element {
    return (
        <UiEntity
            uiTransform={{
                width: 800,
                height: 600,
                margin: '10% 50px 50% 30%',
                position: { top: '0%' },
                padding: { top: 4, bottom: 4, left: 4, right: 4 },
                display: visible ? 'flex' : 'none',
                pointerFilter: 'block'
            }}
        >
            <UiEntity
                uiTransform={{
                    width: 800,
                    height: 600,
                    maxWidth: '100%',
                    maxHeight: '100%',
                    minHeight: '12%',
                    minWidth: '15%',
                    positionType: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                uiBackground={{
                    color: Color4.fromHexString('#342E39'),
                    textureMode: 'stretch'
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
                    fontSize={40}
                    font='sans-serif'
                    value={'CLICK THE BUGS!'}
                    color={Color4.Green()}
                />
                {/* Button - Bug */}
                <Button
                    value='bug'
                    variant="primary"
                    uiTransform={{
                        width: 30,
                        height: 30,
                        position: { bottom: '0%', top: topBugPosition, left: leftBugPosition },
                        positionType: 'absolute'

                    }}
                    onMouseDown={onSuccess}
                />
                {/* Label - Success */}
                <Label
                    uiTransform={{
                        width: 13,
                        height: 13,
                        margin: { top: '0%', bottom: '0%', left: '50%', right: '50%' },
                        positionType: 'absolute',
                        position: { bottom: '0%', top: '80%', left: '0%' },
                    }}
                    fontSize={40}
                    font='sans-serif'
                    value={`Success: ${successScore}/${successNeeded}`}
                    color={Color4.Yellow()}
                />
            </UiEntity>
        </UiEntity>
    )
}

export default BugClicker