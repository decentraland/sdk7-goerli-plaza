import * as utils from '@dcl-sdk/utils'
import { Color4, Quaternion, Vector3 } from "@dcl/sdk/math"
import { Room } from "colyseus.js"
import { openDialogWindow } from "dcl-npc-toolkit"
import { movePlayerTo } from "~system/RestrictedActions"
import { Connection } from "./connection"
import { Dialogs } from "./dialogs"
import { Button } from "./entities/Button"
import { SpaceShip, playerIsTraitor, setPlayerIsAlive, setPlayerIsTraitor } from "./entities/SpaceShip"
import { Door } from "./entities/door"
import { CableColors, FuseBox, toggleBox, toggleCable } from "./entities/fuseBox"
import { MiniGameMachine } from "./minigames/MiniGameMachine"
import { MusicPlayer } from "./musicPlayer"
import { UI } from "./ui"
import { Voting } from "./voting"
import { Equiptment, FuseBox as FuseBoxSchema, MyRoomState, Player } from './types'


export let server: Room<MyRoomState>
export let ship: SpaceShip
export let fuse1: FuseBox
export let fuse2: FuseBox
export let fuse3: FuseBox
export let fuse4: FuseBox

export class GameController {

    public ui: UI
    public mainDoor: Door
    private doorBell: Button
    public musicPlayer: MusicPlayer
    public dialogs: Dialogs
    public connection: Connection
    public fuseBoxes: FuseBox[] = []
    public voting: Voting
    public miniGameMachine: MiniGameMachine
    constructor() {
        this.connection = new Connection(this)
        this.dialogs = new Dialogs(this)
        this.mainDoor = new Door(
            Vector3.create(4.5, 0, 4.3),
            Quaternion.fromEulerDegrees(0, 45 + 90, 0),
            'models/MainDoor.glb',
            Vector3.create(2, 0, -2)
        )
        this.doorBell = new Button('models/Green_SciFi_Button.glb',
            async () => {
                openDialogWindow(this.ui.satelliteUI, this.dialogs.MissionControlBrief, 0)
            }, 'Join Game',
            Vector3.create(2.5, 1, 5.7),
            Quaternion.fromEulerDegrees(0, 270 + 45, 90)
        )
        this.musicPlayer = new MusicPlayer()
        this.musicPlayer.playSong('sounds/Space-Traitor-1.mp3', 0.25)
        this.voting = new Voting(this)
        this.ui = new UI(this)
        this.miniGameMachine = new MiniGameMachine(this)
        this.connection.connect('my_room').then((room) => {
            console.log('Connected!')
            server = room
            ship = new SpaceShip(room, this)
            let dummyFUse = new FuseBox(
                999, Vector3.create(0, -10, 0), Quaternion.fromEulerDegrees(0, 0, 0), room
            )
            fuse1 = new FuseBox(
                0, Vector3.create(38.5, 1.5, 8.65), Quaternion.fromEulerDegrees(0, 0, 0),
                room
            )
            fuse2 = new FuseBox(
                1, Vector3.create(22, 1, 47.25), Quaternion.fromEulerDegrees(0, 180, 0),
                room
            )
            fuse3 = new FuseBox(
                2, Vector3.create(22, 5.5, 39), Quaternion.fromEulerDegrees(0, 180, 0),
                room
            )
            fuse4 = new FuseBox(
                3, Vector3.create(19, 1, 8.5), Quaternion.fromEulerDegrees(0, 0, 0),
                room
            )

            this.fuseBoxes.push(fuse1)
            this.fuseBoxes.push(fuse2)
            this.fuseBoxes.push(fuse3)
            this.fuseBoxes.push(fuse4)

            let sceneLoaded = true


            room.onMessage("server", (data: ServerMessage) => {
                console.log('Received message from server => ', data)
                switch (data.msg) {
                    case 'text':
                        onMessageText(data as ServerMessageText)
                        break;
                    case 'endvote':
                        onMessageEndvote(data as ServerMessageEndVote)

                        break;
                    case 'startvote':
                        onMessageStartvote(data as ServerMessageStartVote)
                        break;
                    case 'end':
                        onMessageEnd(data as ServerMessageEnd)
                        break;
                    case 'new':
                        onMessageNew(data as ServerMessageNew)
                        break;
                    case 'reset':
                        onMessageReset(data as ServerMessageReset)
                        break;
                }
            })

            const onMessageText = (data: ServerMessageText) => {
                this.ui.displayAnnouncement(data.text, Color4.Yellow(), 12000)
            }

            const onMessageNew = (data: ServerMessageNew) => {
                console.log('START game')
                this.newGame(room)
            }

            const onMessageEnd = (data: ServerMessageEnd) => {
                console.log('END game')
                this.finishGame(data.traitorWon)
            }

            const onMessageReset = (data: ServerMessageReset) => {
                console.log('RESET game')
                this.resetGame()
            }

            const onMessageStartvote = (data: ServerMessageStartVote) => {
                console.log('Starting Votes')
                if (!sceneLoaded) return
                this.musicPlayer.playSong('sounds/tyops_game-movie-suspense-theme.mp3', 0.5)
                ship.active = false
                this.voting.openVotingUI(room)
            }

            const onMessageEndvote = (data: ServerMessageEndVote) => {
                console.log('Ending votes')
                if (!sceneLoaded) return
                this.musicPlayer.playSong('sounds/Space-Traitor-3.mp3')
                this.voting.closeVotingUI(data.voted, data.wasTraitor)
                if (data.voted === this.connection.userData?.userId) {
                    movePlayerTo({
                        newRelativePosition: Vector3.create(1, 1, 1)
                    })
                    setPlayerIsAlive(false)
                    if (!playerIsTraitor) {
                        openDialogWindow(this.ui.satelliteUI, this.dialogs.MissionControlTips, 'dead')
                    }
                } else if (data.voted && !playerIsTraitor) {
                    room.state.players.forEach((player: Player) => {
                        if (player.userId == data.voted) {
                            if (player.isTraitor) {
                                openDialogWindow(this.ui.satelliteUI, this.dialogs.MissionControlTips, 'impostor')
                            } else {
                                openDialogWindow(this.ui.satelliteUI, this.dialogs.MissionControlTips, 'wrongVictim')
                            }
                        }
                    })
                }
                ship.active = true
            }

            room.state.fuseBoxes.onAdd((box: FuseBoxSchema) => {
                console.log('Added fusebox => ', box)
                const fuseBox = this.fuseBoxes[box.id];
                box.listen('doorOpen', (value: boolean) => {
                    console.log("door open")
                    if (!sceneLoaded) return
                    if (fuseBox) {
                        toggleBox(fuseBox, value, true);
                    } else {
                        console.error(`FuseBox with id ${box.id} is undefined`);
                    }
                })
                box.listen('redCut', (value: boolean) => {
                    console.log('red cut ', box.id, value)
                    if (!sceneLoaded) return
                    toggleCable(fuseBox, value, CableColors.Red)
                })
                box.listen('greenCut', (value: boolean) => {
                    console.log('green cut ', box.id, value)
                    if (!sceneLoaded) return
                    toggleCable(fuseBox, value, CableColors.Green)
                })
                box.listen('blueCut', (value: boolean) => {
                    console.log('blue cut ', box.id, value)
                    if (!sceneLoaded) return
                    toggleCable(fuseBox, value, CableColors.Blue)
                })
                box.listen('broken', (value: boolean) => {
                    console.log('broken ', box.id, value)
                    if (!sceneLoaded) return
                    if (playerIsTraitor) {
                        openDialogWindow(this.ui.robotUI, this.dialogs.EvilRobotTips, 0)
                    }
                })

            });


            room.state.toFix.onAdd((eqpt: Equiptment) => {
                console.log('added eqpt ', eqpt.id)
                eqpt.listen('broken', (value: boolean) => {
                    if (!sceneLoaded) return
                    console.log('eqpt broken ', eqpt.id, value)
                    ship.reactToSingleChanges({ msg: 'equiptmentChange', broken: value, id: eqpt.id })
                })
            })

            room.state.players.onAdd((player: Player) => {
                console.log('Added player => ', player.userId)
                player.listen('ready', (value: boolean) => {
                    console.log('player is ready ', player.userId, value)
                })
                player.listen('alive', (value: boolean) => {
                    console.log('player died ', player.userId, value)
                })
                if (player.id === this.connection.userData?.userId) {
                    player.listen('isTraitor', (value: boolean) => {
                        console.log('YOU ARE THE TRAITOR ', value)
                        setPlayerIsTraitor(value)
                        if (value) {
                            openDialogWindow(this.ui.robotUI, this.dialogs.EvilRobotBrief, 0)
                        }
                    })
                }
                player.votes.onAdd((voter: string) => {
                    console.log('player ', player.userId, ' has a new vote from ', voter)
                    if (room.state.paused) {
                        let votedPosition: number = 0
                        let votedPlayerFound: boolean = false
                        room.state.players.forEach((iteratedPlayer: Player) => {
                            if (iteratedPlayer.userId === player.userId) votedPlayerFound = true
                            if (iteratedPlayer.alive && !votedPlayerFound) votedPosition++
                        })

                        // TODO
                        // this.voting.updateVotingUI(votedPosition, 0, player.votes.length)
                    }
                })
            })

            room.state.listen('fixCount', (value: number) => {
                if (room.state.active) {
                    this.ui.fixCounter.set(value)
                }
            })

            room.state.players.onRemove((player: Player, _key: string) => {
                console.log('player left game ', player.userId)
            })

            room.state.listen('countdown', (value: number) => {
                if (!room.state.paused) {
                    this.ui.updateCountdown(value)
                }
            })

            room.state.listen('votingCountdown', (value: number) => {
                if (room.state.paused) {
                    this.voting.updateVotingTimer(value)
                }
            })

            // horrible hacks
            toggleCable(this.fuseBoxes[0], false, CableColors.Red)
            toggleCable(this.fuseBoxes[0], false, CableColors.Green)
            toggleCable(this.fuseBoxes[0], false, CableColors.Blue)
            ship.reactToSingleChanges({ msg: 'equiptmentChange', broken: false, id: 0 })
        })


    }
    async sendJoinRequest() {
        server.send('client', {
            msg: 'ready',
            sender: this.connection.userData?.userId ?? '0x0',
        } satisfies SceneMessageReadyData)
    }

    async newGame(room: Room) {

        this.resetGame()
        if (!this.connection.userData) {
            await this.connection.setUserData()
        }
        this.ui.stopTimer()
        this.ui.startUI(room.state.countdown)

        setPlayerIsAlive(false)
        room.state.players.forEach((player: Player) => {
            if (player.userId === this.connection.userData?.userId && player.alive) {
                setPlayerIsAlive(true)
            }
        })

        this.mainDoor.open()
        utils.timers.setTimeout(() => {
            this.mainDoor.close()
        }, 30000)

        this.musicPlayer.playSong('sounds/Space-Traitor-2.mp3', 0.25)

        this.ui.fixCounter.set(0)

        if (playerIsTraitor) {
            console.log('PLAYER IS TRAITOR')
        }
    }
    resetGame() {
        fuse1.reset()
        fuse2.reset()
        fuse3.reset()
        fuse4.reset()
        ship.resetShip()
    }
    finishGame(traitorWon: boolean) {
        ship.active = false
        this.mainDoor.close()
        movePlayerTo({
            newRelativePosition: Vector3.create(1, 1, 1)
        })
        setPlayerIsAlive(false)
        if (traitorWon && playerIsTraitor) {
            openDialogWindow(this.ui.robotUI, this.dialogs.EvilRobotTips, 3)
        } else if (traitorWon && !playerIsTraitor) {
            openDialogWindow(this.ui.satelliteUI, this.dialogs.MissionControlTips, 4)
        } else if (!traitorWon && playerIsTraitor) {
            openDialogWindow(this.ui.robotUI, this.dialogs.EvilRobotTips, 4)
        } else if (!traitorWon && !playerIsTraitor) {
            openDialogWindow(this.ui.satelliteUI, this.dialogs.MissionControlTips, 'fixed')
        }

    }


}