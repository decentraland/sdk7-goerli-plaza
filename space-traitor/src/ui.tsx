import { Vector3, Quaternion } from "@dcl/sdk/math"
import * as npc from 'dcl-npc-toolkit'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { NpcUtilsUi } from 'dcl-npc-toolkit'
import { GameController } from "./game.controller"
import { Entity } from "@dcl/sdk/ecs"
import { CreditCounter } from "./utils/coin.counter"
import * as utils from '@dcl-sdk/utils'

export class UI {
    public color: Color4
    public message: string = ''
    public gameController: GameController
    public satelliteUI: Entity
    public robotUI: Entity
    public timerCrytical: boolean = false
    public fixIcon_visible = false
    public fixUIBck_visible = false
    public fixCounter: CreditCounter
    private timeLeft: number = 0
    private timerId: number = 0
    private timerText: string = ''
    private timeCounter_visible = false
    private firstTime: boolean = true
    public announcement: string = ''
    public announcement_color: Color4 = Color4.White()
    public announcement_visible: boolean = false
    constructor(gameController: GameController) {
        this.gameController = gameController
        this.fixCounter = new CreditCounter()
        this.color = Color4.Red()
        this.satelliteUI = npc.create(
            {
                position: Vector3.create(9, 1, 8),
                rotation: Quaternion.fromEulerDegrees(0, 180, 0),
                scale: Vector3.create(1, 1, 1)
            },
            {
                type: npc.NPCType.CUSTOM,
                faceUser: true,
                portrait: 'images/radio3.png',
                onActivate: () => {
                },
                onWalkAway: () => {
                }
            }
        )
        this.robotUI = npc.create(
            {
                position: Vector3.create(9, 1, 8),
                rotation: Quaternion.fromEulerDegrees(0, 180, 0),
                scale: Vector3.create(1, 1, 1)
            },
            {
                type: npc.NPCType.CUSTOM,
                faceUser: true,
                portrait: 'images/robot2.png',
                onActivate: () => {
                },
                onWalkAway: () => {
                }
            }
        )
        const uiComponent = () => (
            [
                this.announcementUI(),
                NpcUtilsUi(),
                this.cornerUi(),
                this.fixUIBck(),
                this.timeCounter(),
                this.gameController.voting.mainUi(),
                this.gameController.miniGameMachine.bugClicker.mainUi(),
                this.gameController.miniGameMachine.switchTogglers.mainUi(),
                this.gameController.miniGameMachine.wordTyper.mainUi(),
            ]
        )
        ReactEcsRenderer.setUiRenderer(uiComponent)
    }
    cornerUi() {
        {/* Corner - UI - Conecction */ }
        return <UiEntity
            uiTransform={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                positionType: 'absolute',
                position: { right: "10%", bottom: '3%' },
            }}
        >
            <UiEntity
                uiTransform={{
                    width: '100',
                    height: '100',
                }}
                uiBackground={{ color: Color4.create(0, 0, 0, 0) }}
            />
            {/* Label - Title */}
            <Label
                uiTransform={{
                    position: { right: '30%', bottom: '20%' }
                }}
                value={this.message}
                fontSize={18}
                font='sans-serif'
                color={this.color}
            />
        </UiEntity>
    }
    fixUIBck() {
        {/* Fix Icon - UI*/ }
        return <UiEntity
            uiTransform={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                positionType: 'absolute',
                position: { right: "5%", bottom: '30%' },
                display: this.fixIcon_visible ? 'flex' : 'none',
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
                value={this.fixCounter.credits.toString() + '/8'}
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
                    display: this.fixIcon_visible ? 'flex' : 'none',
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
    }
    timeCounter() {
        {/* Fix Icon - UI - timer*/ }
        return <UiEntity
            uiTransform={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                positionType: 'absolute',
                position: { right: "5%", bottom: '45%' },
                display: this.timeCounter_visible ? 'flex' : 'none',
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
                value={this.timerText}
                color={Color4.Black()}
                fontSize={37}
            />
        </UiEntity>
    }
    announcementUI() {
        return <Label
            uiTransform={{
                width: 13,
                height: 13,
                margin: { top: '5%', bottom: '0%', left: '50%', right: '50%' },
                positionType: 'absolute',
                position: { bottom: '0%', top: '0%', left: '0%' },
                display: this.announcement_visible ? 'flex' : 'none',
            }}
            fontSize={40}
            font='sans-serif'
            value={this.announcement}
            color={this.announcement_color}
        />
    }
    displayAnnouncement(announcement: string, color: Color4, duration: number) {
        utils.timers.clearInterval(duration)
        console.log('OPEN ANNOUNCEMENT')
        this.announcement = announcement
        this.announcement_visible = true
        this.announcement_color = color
        utils.timers.setTimeout(() => {
            this.announcement_visible = false
        }, duration)

    }
    startUI(time: number) {
        this.fixUIBck_visible = true
        this.fixIcon_visible = true
        this.timeCounter_visible = true
        this.fixCounter.set(0)
        this.timeLeft = time
        this.timerCrytical = false
        if (this.firstTime == true) {
            this.firstTime = false
        }
    }
    updateCountdown(value: number) {
        this.timeLeft = value;
        this.timerId = utils.timers.setInterval(this.updateTime.bind(this), 1000);
    }
    updateTime() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (!this.timerCrytical && this.timeLeft < 90) {
            this.gameController.musicPlayer.playSong('sounds/Space-Traitor-3.mp3', 0.5)
            this.timerCrytical = true
        }
    }
    stopTimer() {
        utils.timers.clearInterval(this.timerId);
    }

}