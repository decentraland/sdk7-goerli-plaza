import ReactEcs, { Input, Label, ReactEcsRenderer, UiEntity, Button } from "@dcl/sdk/react-ecs"
import { Color4, Scalar } from "@dcl/sdk/math"
import { GltfContainer, Transform, engine } from "@dcl/sdk/ecs"
import { GameController } from "../game.controller"


let timer = 1
export class BugClicker {
    public color: Color4 | undefined
    successNeeded = 5
    currentSuccesses = 0
    randomPositions = []
    leftBugPosition: number | undefined
    topBugPosition: number | undefined
    started: boolean | undefined
    visibleUi = false
    gameController: GameController
    onWinCallback: () => any
    constructor(gameController: GameController, onWinCallback: () => any) {
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
        return <UiEntity
            uiTransform={{
                width: 800,
                height: 600,
                margin: '10% 50px 50% 30%',
                position: { top: '0%' },
                padding: { top: 4, bottom: 4, left: 4, right: 4 },
                display: this.visibleUi ? 'flex' : 'none',
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
                        position: { bottom: '0%', top: this.topBugPosition, left: this.leftBugPosition },
                        positionType: 'absolute'

                    }}
                    onMouseDown={() => {
                        this.AddSuccess(1)
                    }}
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
                    value={"SUCCESS: " + this.currentSuccesses + "/" + this.successNeeded}
                    color={Color4.Yellow()}
                />
            </UiEntity>
        </UiEntity>


    }

}

