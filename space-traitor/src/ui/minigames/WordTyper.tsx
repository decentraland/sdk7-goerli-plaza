

import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Input, Label, UiEntity } from '@dcl/sdk/react-ecs'

type WordTyperProps = {
    visible: boolean
    currentChallengeWord: string

    currentValue: string
    onValueChange: (value: string) => void

    onSuccess: () => void
    successScore: number
    successNeeded: number
}

function WordTyper({ visible, currentChallengeWord, onSuccess, successNeeded, successScore, onValueChange, currentValue }: WordTyperProps): ReactEcs.JSX.Element {
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
                    value={"TYPE THE NEXT WORD: \n" + currentChallengeWord}
                    fontSize={30}
                    font='sans-serif'
                    color={Color4.Green()}
                />
                {/* Input - Word */}
                <Input
                    uiTransform={{
                        position: {
                            left: '0%',
                            top: '20%',
                        },
                        width: '300px',
                        height: '70px',
                    }}
                    textAlign='middle-center'
                    fontSize={18}
                    placeholder={'Type Word Here'}
                    color={Color4.White()}
                    placeholderColor={Color4.Gray()}
                    onSubmit={(value: string) => {
                        if (value.localeCompare(currentChallengeWord) === 0) {
                            onSuccess()
                        }
                    }}
                    value={currentValue}
                    onChange={(value: string) => {
                        onValueChange(value)
                    }}
                ></Input>
                <Button value='Submit' variant="primary" onMouseDown={() => {
                    if (currentValue.localeCompare(currentChallengeWord) === 0) {
                        onSuccess()
                    }
                }} />
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
                    value={"SUCCESS: " + successScore + "/" + successNeeded}
                    color={Color4.Yellow()}
                />
            </UiEntity>
        </UiEntity>
    )
}

export default WordTyper