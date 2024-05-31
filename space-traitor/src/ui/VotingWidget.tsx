import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Dropdown, Label, UiEntity } from '@dcl/sdk/react-ecs'
import { Player } from '../types'

type VotingWidgetProps = {
    visible: boolean
    players: string[]
    lockConfirmOption: boolean
    votingLeft: number
    onSelectPlayer: (index: number) => void
    selectedUserId: string | null

    onConfirm: () => void
}

{/* Fix Icon - UI - timer*/ }
function VotingWidget({ visible, players, lockConfirmOption, onSelectPlayer, votingLeft, selectedUserId, onConfirm }: VotingWidgetProps): ReactEcs.JSX.Element {
    return (
        <UiEntity
            uiTransform={{
                width: 800,
                height: 600,
                margin: '10% 50px 50% 30%',
                position: { top: '0%' },
                padding: { top: 4, bottom: 4, left: 4, right: 4 },
                display: visible ? 'flex' : 'none',
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
                    value={"Time To Vote"}
                    color={Color4.Red()}
                />
                {/* Label - Subtitle */}
                <Label
                    uiTransform={{
                        width: 13,
                        height: 13,
                        margin: { top: '20%', bottom: '0%', left: '50%', right: '50%' },
                        positionType: 'absolute',
                        position: { bottom: '0%', top: '0%', left: '0%' },
                    }}
                    fontSize={20}
                    font='sans-serif'
                    value={"Who's the traitor?"}
                    color={Color4.White()}
                />
                <UiEntity
                    uiTransform={{
                        width: 64,
                        height: 64,
                        margin: { top: '25%', bottom: '0%', left: '46%', right: '50%' },
                        positionType: 'absolute',
                        position: { bottom: '0%', top: '0%', left: '0%' },
                    }}
                    // PUT avatar texture
                    uiBackground={selectedUserId !== null ? {
                        textureMode: 'stretch',
                        avatarTexture: {
                            userId: selectedUserId || '0x0',
                        },
                    } : {}}
                />
                {/* Label - Waiting for others players */}
                <Label
                    uiTransform={{
                        width: 13,
                        height: 13,
                        margin: { top: '0%', bottom: '0%', left: '50%', right: '50%' },
                        positionType: 'absolute',
                        position: { bottom: '0%', top: '60%', left: '0%' },
                    }}
                    fontSize={20}
                    font='sans-serif'
                    value={"Waiting for others to vote"}
                    color={Color4.Red()}
                />
                {/* Label - Time */}
                <Label
                    uiTransform={{
                        width: 13,
                        height: 13,
                        margin: { top: '0%', bottom: '0%', left: '50%', right: '50%' },
                        positionType: 'absolute',
                        position: { bottom: '0%', top: '80%', left: '0%' },
                    }}
                    fontSize={20}
                    font='sans-serif'
                    value={`Voting time left: ${votingLeft}`}
                    color={Color4.White()}
                />
                {/* Dropdown - Players*/}
                <Dropdown
                    options={players}
                    onChange={onSelectPlayer}
                    uiTransform={{
                        width: '100px',
                        height: '40px',
                        position: { right: "0%", bottom: 0 },
                    }}
                />
                {/* Button - Confirm*/}
                <Button
                    value={'CONFIRM'}
                    variant='primary'
                    uiTransform={{
                        width: 100,
                        height: 40,
                        margin: 4,
                        position: { right: "0%", bottom: 0 },
                    }}
                    disabled={lockConfirmOption}
                    uiBackground={{
                        textureMode: 'center',
                    }}
                    onMouseDown={() => {
                        if (selectedUserId === null) {
                            return
                        }
                        onConfirm()
                    }}
                />
            </UiEntity>
        </UiEntity>
    )
}

export default VotingWidget

