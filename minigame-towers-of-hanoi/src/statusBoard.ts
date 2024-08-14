import { engine, Entity, TextAlignMode, TextShape, Transform } from "@dcl/sdk/ecs"
import { GameData, gameDataEntity } from "./game"
import { Quaternion, Vector3 } from "@dcl/sdk/math"
import { backSign } from "./environment"

let movesEntity: Entity
let timeEntity: Entity
let playerNameEntity: Entity

export function initStatusBoard() {
    movesEntity = engine.addEntity()
    timeEntity = engine.addEntity()
    playerNameEntity = engine.addEntity()

    Transform.create(movesEntity, {
        parent: backSign,
        position: Vector3.create(-2.75, 5.05, 0.2),
        rotation: Quaternion.fromEulerDegrees(0, 180, 0)
    })

    Transform.create(timeEntity, {
        parent: backSign,
        position: Vector3.create(-1.4, 5.05, 0.2),
        rotation: Quaternion.fromEulerDegrees(0, 180, 0)
    })

    Transform.create(playerNameEntity, {
        parent: backSign,
        position: Vector3.create(1.9, 5.25, 0.2),
        rotation: Quaternion.fromEulerDegrees(0, 180, 0)
    })

    let elapsedTime = 0
    const gameLoopFreq = 1

    engine.addSystem((dt: number) => {
        elapsedTime += dt

        if (elapsedTime >= gameLoopFreq) {
            elapsedTime = 0
            updateTexts()
        }
    })
}

function updateTexts() {
    const gameData = GameData.getOrNull(gameDataEntity)

    if (!gameData) return

    const gameElapsedTime = ((gameData.levelFinishedAt || Date.now()) - gameData.levelStartedAt) / 1000
    const minutes = Math.floor(gameElapsedTime / 60)
    const seconds = Math.round(gameElapsedTime) - minutes * 60

    TextShape.createOrReplace(playerNameEntity, {
        text: `${gameData.playerName}`,
        fontSize: 3,
        textAlign: TextAlignMode.TAM_TOP_LEFT
    })

    if (gameData.currentLevel > 0) {
        TextShape.createOrReplace(timeEntity, {
            text: `${minutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:${seconds.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`,
            fontSize: 3
        })
    } else {
        TextShape.createOrReplace(timeEntity, {
            text: '',
            fontSize: 3
        })

    }

    TextShape.createOrReplace(movesEntity, {
        text: `${gameData.moves}`,
        fontSize: 3
    })
}