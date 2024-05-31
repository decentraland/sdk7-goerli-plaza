import * as utils from '@dcl-sdk/utils';
import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { Button, Dropdown, Label, UiEntity } from "@dcl/sdk/react-ecs";
import { Room } from "colyseus.js";
import { openDialogWindow } from "dcl-npc-toolkit";
import { GameController } from "./game.controller";
import VotingWidget from './ui/VotingWidget';
import { MyRoomState, Player } from './types';

export class Voting {
    gameController: GameController
    playerVoted: boolean = false
    votingTimeLeft: number = 0
    votingUI_visible = false
    label_waitingPlayers_visible = false
    playerIsTraitor: boolean = false
    i = 0
    offset = 30
    selectedPlayer: Player | null = null
    room: Room<MyRoomState> | null = null
    votingPlayers: Player[] = [];
    votingPlayerOptions: string[] = [];
    lock_confirm_button: boolean = false
    constructor(gameController: GameController) {
        this.gameController = gameController
    }
    selectOption(index: number) {
        this.selectedPlayer = this.votingPlayers[index]
    }

    mainUi() {
        return (
            <VotingWidget
                visible={this.votingUI_visible}
                players={this.votingPlayerOptions}
                lockConfirmOption={this.playerVoted}
                votingLeft={this.votingTimeLeft}
                onSelectPlayer={(player) => this.selectOption(player)}
                selectedUserId={this.selectedPlayer?.userId || null}
                onConfirm={() => this.onConfirm()}
            />
        )
    }

    onConfirm() {
        this.vote(this.selectedPlayer?.userId!, this.room!)
    }

    openVotingUI(room: Room<MyRoomState>) {
        console.log("openVotingUI is running")
        this.room = room
        this.playerVoted = false
        this.votingTimeLeft = room.state.votingCountdown

        this.votingPlayers = Array.from(room.state.players.values()).filter(player => player.alive)
        this.votingPlayerOptions = this.votingPlayers.map(player => player.displayName)

        this.offset = room.state.players.size * -50
        this.votingUI_visible = true
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
            msg: 'vote',
            voter: this.gameController.connection.userData?.userId ?? '',
            voted: votedPlayer,
        } satisfies SceneMessageVote)
    }

}

