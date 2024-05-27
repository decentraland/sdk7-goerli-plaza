import { Room } from "colyseus.js";
import { GameController, server } from "./game.controller";
import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { UiEntity, Label, Button, Dropdown } from "@dcl/sdk/react-ecs";
import * as utils from '@dcl-sdk/utils'
import { openDialogWindow } from "dcl-npc-toolkit";

export class Voting {
    gameController: GameController
    playerVoted: boolean = false
    votingTimeLeft: number = 0
    votingUI_visible = false
    label_waitingPlayers_visible = false
    playerIsTraitor: boolean = false
    playerIsAlive: boolean = true
    i = 0
    offset = 30
    playerName: string = ''
    playerThumb: any = ''
    room: any
    votingPlayers: { name: string, thumb: string }[] = [];
    lock_confirm_button: boolean = false
    selectedPlayerIndex: number = -1;
    constructor(gameController: GameController) {
        this.gameController = gameController
    }
    selectOption(index: number, playerName: string) {
        this.selectedPlayerIndex = index; // Almacenar el índice del jugador seleccionado
        this.playerName = playerName; // Actualizar el nombre del jugador seleccionado
        this.playerThumb = this.votingPlayers[index].thumb;
    }
    
    mainUi() {
        return <UiEntity
            uiTransform={{
                width: 800,
                height: 600,
                margin: '10% 50px 50% 30%',
                position: { top: '0%' },
                padding: { top: 4, bottom: 4, left: 4, right: 4 },
                display: this.votingUI_visible ? 'flex' : 'none',
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
                    uiBackground={{
                        textureMode: 'center',
                        texture: {
                            src: this.playerThumb,
                        },
                    }}
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
                    value={'Voting time left:' + this.votingTimeLeft.toString()}
                    color={Color4.White()}
                />
                {/* Dropdown - Players*/}
                <Dropdown
                    options={this.votingPlayers.map(player => player.name)}
                    onChange={(index) => this.selectOption(index, this.votingPlayers[index].name)}
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
                    disabled={this.lock_confirm_button}
                    uiBackground={{ 
                        textureMode: 'center',
                    }}
                    onMouseDown={() => {
                        if(this.playerName === ''){
                            return
                        }
                        this.lock_confirm_button = true
                        if (!this.playerIsAlive) return
                        this.vote(this.playerName, this.room)
                    }}
                />
            </UiEntity>
        </UiEntity>
    }

    openVotingUI(room: Room) {
        this.lock_confirm_button = false
        console.log("openVotingUI is running")
        this.room = room
        this.playerVoted = false
        this.votingTimeLeft = room.state.votingCountdown
        room.state.players.forEach((player: any) => {
            if (player.ready && player.alive) {
                this.votingPlayers.push({ name: player.name, thumb: player.thumb });
                this.playerName = player.name
                this.playerThumb = player.thumb
            }

            this.i++ 
            this.offset -= 50
        })
        this.votingUI_visible = true
    }
    updateVotingUI(
        voted: number,
        voter: number,
        votes: number,
        thumb: string | null
    ) {
        // add player icon
        this.playerThumb = thumb
    }
    updateVotingTimer(timeLeft: number) {
        this.votingTimeLeft = timeLeft

    }
    closeVotingUI(playerToKick: string | null, isTraitor: boolean) {
        this.lock_confirm_button = false
        this.votingUI_visible = false
        if (!playerToKick) {
            this.gameController.ui.displayAnnouncement('No one was kicked', Color4.Red(), 15000)
        } else {
            this.gameController.ui.displayAnnouncement(playerToKick + 'was ejected out into space', Color4.Red(), 15000)
            utils.timers.setTimeout(() => {
                if (isTraitor) {
                    openDialogWindow(this.gameController.ui.satelliteUI, this.gameController.dialogs.MissionControlTips, 5)
                } else {
                    if (this.playerIsTraitor) {
                        openDialogWindow(this.gameController.ui.robotUI, this.gameController.dialogs.EvilRobotTips, 2)
                    }
                }
            }, 3000)
        }
    }
    vote(votedPlayer: string, room: Room) {
        if (this.playerVoted) {
            return
        }
        this.playerVoted = true
        room.send('vote', {
            voter: this.gameController.connection.userData.data.displayName,
            voted: votedPlayer,
        })
        this.label_waitingPlayers_visible = true
    }

}

