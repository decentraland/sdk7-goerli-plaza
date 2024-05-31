import * as utils from '@dcl-sdk/utils'
import { Entity } from "@dcl/sdk/ecs"
import { Color4, Quaternion, Vector3 } from "@dcl/sdk/math"
import ReactEcs, { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import * as npc from 'dcl-npc-toolkit'
import { NpcUtilsUi } from 'dcl-npc-toolkit'
import { GameController } from "./game.controller"
import Announcement from "./ui/Announcement"
import CornerStatus from "./ui/CornerStatus"
import HudCounter from "./ui/HudCounter"
import TimeCounter from "./ui/TimeCounter"
import { CreditCounter } from "./utils/coin.counter"

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
        return <CornerStatus message={this.message} color={this.color} />
    }
    fixUIBck() {
        return <HudCounter visible={this.fixUIBck_visible} credits={this.fixCounter.credits} />
    }
    timeCounter() {
        return <TimeCounter visible={this.timeCounter_visible} text={this.timerText} />
    }
    announcementUI() {
        return <Announcement visible={this.announcement_visible} text={this.announcement} color={this.announcement_color} />
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