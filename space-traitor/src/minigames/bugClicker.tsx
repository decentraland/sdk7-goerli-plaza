import { engine } from "@dcl/sdk/ecs"
import { Color4, Scalar } from "@dcl/sdk/math"
import ReactEcs from "@dcl/sdk/react-ecs"
import { GameController } from "../game.controller"
import BugClickerUi from "../ui/minigames/BugClicker"


let timer = 1
export class BugClicker {
    public color: Color4 | undefined
    successNeeded = 5
    currentSuccesses = 0
    randomPositions = []
    leftBugPosition: number = 0
    topBugPosition: number = 0
    started: boolean | undefined
    visibleUi = false
    gameController: GameController
    onWinCallback: () => void
    constructor(gameController: GameController, onWinCallback: () => void) {
        this.gameController = gameController
        this.onWinCallback = onWinCallback
        engine.addSystem(this.update)
    }
    update = (dt: number) => {
        timer -= dt
        if (timer <= 0) {
            timer = 1
            this.leftBugPosition = Scalar.randomRange(50, 680)
            this.topBugPosition = Scalar.randomRange(50, 550)
        }
    }
    Reset() {
        this.currentSuccesses = 0
        this.started = false
    }

    Start() {
        this.started = true
        this.visibleUi = true
    }

    Stop() {
        this.Reset()
    }
    Win() {
        this.visibleUi = false
        this.Stop()
        this.onWinCallback()
    }
    AddSuccess(newSuccesses: number) {
        if (newSuccesses <= 0) return

        this.currentSuccesses += newSuccesses

        if (this.currentSuccesses == this.successNeeded) {
            this.Win()
            return
        }
    }

    mainUi() {
        return <BugClickerUi
            visible={this.visibleUi}
            topBugPosition={this.topBugPosition}
            leftBugPosition={this.leftBugPosition}
            successNeeded={this.successNeeded}
            successScore={this.currentSuccesses}
            onSuccess={() => this.AddSuccess(1)}
        />
    }

}

