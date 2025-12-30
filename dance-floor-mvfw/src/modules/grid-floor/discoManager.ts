import { EasingFunction, engine, Entity, GltfContainer, Transform, Tween, TweenLoop, TweenSequence, VisibilityComponent } from "@dcl/sdk/ecs"
import { applyPattern, createGrid, Grid, GRID_ANIMATION_STATE, gridMainSystem, highlightRandomCell, highlightRandomPattern, setGridAnimationState, startRotationAnimation, stopRotationAnimation, updateMatrixMovement, startShrinking } from "./grid"
import { Quaternion, Vector3 } from "@dcl/sdk/math"
import { Cell, resetGridCell, setColor } from "./cell"
import { checkersPattern1, checkersPattern2, circleZoomPattern1, circleZoomPattern2, circleZoomPattern3, ringsPattern1, ringsPattern2, thirtyEightPattern } from "./patterns"

export class DiscoManager {
    private static instance: DiscoManager
    grid: Entity
    discoBall: Entity
    switchTime: number = 0
    switchInterval: number = 5
    isDiscoActive: boolean = false
    _nextAnimationIndexes: GRID_ANIMATION_STATE[] = []
    _currentAnimationIndex: GRID_ANIMATION_STATE = GRID_ANIMATION_STATE.IDLE

    static getInstance(): DiscoManager {
        if (!DiscoManager.instance) {
            DiscoManager.instance = new DiscoManager()
        }
        return DiscoManager.instance
    }

    private constructor() {

        // -- Spawn Grid --
        this.grid = createGrid({
            position: Vector3.create(8, 0.1, 8)
        }, 14, 14, Quaternion.fromEulerDegrees(0, 0, 0))


        engine.addSystem(gridMainSystem)
        setGridAnimationState(GRID_ANIMATION_STATE.IDLE)
        //switch time
        engine.addSystem((dt: number) => {
            if (this.isDiscoActive) {
                this.switchTime += dt
                if (this.switchTime >= this.switchInterval) {
                    this.setRandomState()
                    //console.log("switching to " + this.getState())
                    this.switchTime = 0
                }


                const gridGrp = engine.getEntitiesWith(Grid, Transform)

                for (const [grid, gridData] of gridGrp) {

                    if (gridData.isRotating) {
                        const gridDataMutable = Grid.getMutable(grid)
                        gridDataMutable.rotationAngle += dt * 10

                        const gridTransform = Transform.getMutable(grid)
                        gridTransform.rotation = Quaternion.fromEulerDegrees(0, gridDataMutable.rotationAngle, 0)

                        if (gridDataMutable.rotationAngle > 360) {
                            gridDataMutable.rotationAngle -= 360
                        }

                    }


                    switch (gridData.animationState) {
                        case GRID_ANIMATION_STATE.IDLE:
                            break
                        case GRID_ANIMATION_STATE.RANDOM_HIGHLIGHT: {
                            const gridDataMutable = Grid.getMutable(grid)
                            gridDataMutable.elapsedTime += dt
                            if (gridDataMutable.elapsedTime > gridDataMutable.sparklingFrequency) {
                                highlightRandomCell()
                                gridDataMutable.elapsedTime = 0
                            }
                            break
                        }
                        case GRID_ANIMATION_STATE.RANDOM_PATTERN: {
                            const gridDataMutable = Grid.getMutable(grid)
                            gridDataMutable.elapsedTime += dt
                            if (gridDataMutable.elapsedTime > gridDataMutable.frequency) {
                                highlightRandomPattern()
                                gridDataMutable.elapsedTime = 0
                            }
                            break
                        }
                        case GRID_ANIMATION_STATE.MATRIX_MOVEMENT: {
                            const gridDataMutable = Grid.getMutable(grid)
                            gridDataMutable.elapsedTime += dt

                            if (gridDataMutable.elapsedTime > gridDataMutable.matrixFrequency) {
                                //highlihtRandomPattern()
                                updateMatrixMovement()
                                gridDataMutable.elapsedTime = 0
                            }
                            break
                        }
                        case GRID_ANIMATION_STATE.WAVE_MOVEMENT: {
                            const gridDataMutable = Grid.getMutable(grid)
                            gridDataMutable.elapsedTime += dt

                            if (gridDataMutable.elapsedTime > gridDataMutable.matrixFrequency) {
                                //highlihtRandomPattern()
                                updateMatrixMovement()
                                gridDataMutable.elapsedTime = 0
                            }
                            break
                        }
                        case GRID_ANIMATION_STATE.FIXED_PATTERN: {
                            const gridDataMutable = Grid.getMutable(grid)
                            gridDataMutable.elapsedTime += dt
                            if (gridDataMutable.elapsedTime > gridDataMutable.frequency) {
                                applyPattern(grid, thirtyEightPattern, true, true)
                                gridDataMutable.elapsedTime = 0
                            }
                            //this.hideDiscoBall()
                            break
                        }
                        case GRID_ANIMATION_STATE.CHECKERS_PATTERN: {
                            const gridDataMutable = Grid.getMutable(grid)
                            gridDataMutable.elapsedTime += dt
                            if (gridDataMutable.elapsedTime > gridDataMutable.frequency) {
                                gridDataMutable.phaseOn = !gridDataMutable.phaseOn
                                applyPattern(grid, gridDataMutable.phaseOn ? checkersPattern1 : checkersPattern2, false, true)
                                gridDataMutable.elapsedTime = 0
                            }
                            break
                        }
                        case GRID_ANIMATION_STATE.RINGS_PATTERN: {
                            const gridDataMutable = Grid.getMutable(grid)
                            gridDataMutable.elapsedTime += dt
                            if (gridDataMutable.elapsedTime > gridDataMutable.frequency) {
                                gridDataMutable.phaseOn = !gridDataMutable.phaseOn
                                applyPattern(grid, gridDataMutable.phaseOn ? ringsPattern1 : ringsPattern2, true, true)
                                gridDataMutable.elapsedTime = 0
                            }
                            break
                        }
                        case GRID_ANIMATION_STATE.CIRCLE_ZOOM_PATTERN: {
                            const gridDataMutable = Grid.getMutable(grid)
                            gridDataMutable.elapsedTime += dt
                            if (gridDataMutable.elapsedTime > gridDataMutable.circleFrequency) {
                                gridDataMutable.circleZoomPhase += 1
                                if (gridDataMutable.circleZoomPhase > 2) {
                                    gridDataMutable.circleZoomPhase = 0
                                }
                                let pattern = circleZoomPattern1
                                if (gridDataMutable.circleZoomPhase == 1) pattern = circleZoomPattern2
                                if (gridDataMutable.circleZoomPhase == 2) pattern = circleZoomPattern3
                                applyPattern(grid, pattern, true, false, 240)
                                gridDataMutable.elapsedTime = 0
                            }
                            break
                        }
                    }
                }
            }
        })


        this.discoBall = engine.addEntity()
        Transform.create(this.discoBall, {
            position: Vector3.add(Vector3.create(0, 12, 0), Transform.get(this.grid).position),
            rotation: Quaternion.create(),
            scale: Vector3.create(2, 2, 2)
        })
        GltfContainer.create(this.discoBall, {
            src: "assets/scene/Models/discoBall.glb"
        })

        Tween.setRotateContinuous(this.discoBall, Quaternion.fromEulerDegrees(0, -90, 0), 12)
        VisibilityComponent.create(this.discoBall, {
            visible: true
        })
    }

    hideDiscoBall() {
        VisibilityComponent.getMutable(this.discoBall).visible = false
    }
    showDiscoBall() {
        VisibilityComponent.getMutable(this.discoBall).visible = true
    }

    startDisco() {
        this.isDiscoActive = true
        startRotationAnimation()
        this.showDiscoBall()
        // VisibilityComponent.getMutable(this.discoBall).visible= true
        // DiscoLight.getMutable(this.discoBall).active = true
        // LightSource.getMutable(this.discoBall).active = true
    }

    stopDisco() {
        this.isDiscoActive = false
        stopRotationAnimation()
        this.hideDiscoBall()
        this.shrinkAllCells()
        // VisibilityComponent.getMutable(this.discoBall).visible= false
        // DiscoLight.getMutable(this.discoBall).active = false
        // LightSource.getMutable(this.discoBall).active = false
    }

    clearGrid() {
        let gridData = Grid.getMutable(this.grid)
        for (let i = 0; i < gridData.gridLnX; i++) {
            for (let j = 0; j < gridData.gridLnY; j++) {
                const cell = gridData.cells[j][i]
                if (cell) {
                    setColor(cell, 'default')
                    Cell.getMutable(cell).playerEntered = false
                    Cell.getMutable(cell).highlighted = false
                }
            }
        }
    }

    shrinkAllCells() {
        let gridData = Grid.getMutable(this.grid)
        for (let i = 0; i < gridData.gridLnX; i++) {
            for (let j = 0; j < gridData.gridLnY; j++) {
                const cell = gridData.cells[j][i]
                if (cell) startShrinking(cell, 400)
            }
        }
    }

    getState(): GRID_ANIMATION_STATE {
        return Grid.get(this.grid).animationState
    }

    setState(state: GRID_ANIMATION_STATE) {

        setGridAnimationState(state)
    }

    setRandomState() {
        //console.log("states available: " + Object.keys(GRID_ANIMATION_STATE).length /2 )
        // const randomState = 1 + Math.floor(Math.random() * ((Object.keys(GRID_ANIMATION_STATE).length/2) -1) )
        const randomState = this.getRandomState()
        //this.resetGrid()
        this.clearGrid()
        setGridAnimationState(randomState)
    }

    getRandomState(): GRID_ANIMATION_STATE {
        if (this._nextAnimationIndexes.length === 0) {
            this._nextAnimationIndexes = []
            for (let i = 1; i < Math.floor(Object.keys(GRID_ANIMATION_STATE).length / 2); i++) {
                this._nextAnimationIndexes.push(i);
            }
            this._nextAnimationIndexes = shuffle(this._nextAnimationIndexes)

        }

        this._currentAnimationIndex = this._nextAnimationIndexes[0];
        //console.log("Current Block Index: " + this._currentBlockIndex)    

        this._nextAnimationIndexes.shift();
        //this._nextBlockIndexes.push(Math.floor(Math.random() * (_TETROMINOS.length - 0.5)));

        if (this._nextAnimationIndexes.length === 0) {
            this._nextAnimationIndexes = []
            for (let i = 1; i < Math.floor(Object.keys(GRID_ANIMATION_STATE).length / 2); i++) {
                this._nextAnimationIndexes.push(i);
            }
            this._nextAnimationIndexes = shuffle(this._nextAnimationIndexes)


        }

        return this._currentAnimationIndex
        //this.nextBlockDisplay.displayBlock(_TETROMINOS[this._nextBlockIndexes[0]].schema, _COLORS[_TETROMINOS[this._nextBlockIndexes[0]].color])

    }

    resetGrid() {
        const gridGrp = engine.getEntitiesWith(Grid, Transform)

        for (const [grid, gridData] of gridGrp) {

            for (let i = 0; i < gridData.gridLnX; i++) {
                for (let j = 0; j < gridData.gridLnY; j++) {
                    const cell = gridData.cells[j][i]
                    if (cell) {
                        resetGridCell(cell, i, j)
                    }
                }
            }
        }
    }
}


function shuffle(array: number[]): number[] {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
};