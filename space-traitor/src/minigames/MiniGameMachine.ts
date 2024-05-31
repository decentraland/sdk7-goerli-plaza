import { Scalar } from "@dcl/sdk/math"
import { GameController } from "../game.controller"
import { BugClicker } from "./bugClicker"
import { SwitchTogglers } from "./switchToggler"
import { WordTyper } from "./wordTyper"

export class MiniGameMachine {
    public gameController: GameController
    public bugClicker: BugClicker
    public switchTogglers: SwitchTogglers
    public wordTyper: WordTyper
    public onWinCallback: () => void = () => { };
    constructor(gameController: GameController) {
        this.gameController = gameController
        this.bugClicker = new BugClicker(this.gameController, this.onWinCallback)
        this.switchTogglers = new SwitchTogglers(this.gameController, this.onWinCallback)
        this.wordTyper = new WordTyper(this.gameController, this.onWinCallback)
    }
    setOnWinCallback(callback: () => void) {
        this.onWinCallback = callback;
        this.bugClicker.onWinCallback = callback;
        this.switchTogglers.onWinCallback = callback;
        this.wordTyper.onWinCallback = callback;
    }
    Start() {
        // Randomize instantiated MiniGame type
        let randomNumber = Math.floor(Scalar.randomRange(0, 3))
        switch (randomNumber) {
            case 1:
                this.bugClicker.Start()
                break
            case 2:
                this.switchTogglers.Start()
                break
            default:
                // 0
                this.wordTyper.Start()
                break
        }
    }
}