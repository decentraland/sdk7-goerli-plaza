import { Entity, Transform, engine } from '@dcl/sdk/ecs'
import { Color3, Quaternion, Vector3 } from '@dcl/sdk/math'
import { TriggerArea, triggerAreaEventsSystem } from '@dcl/sdk/triggers'
import { ArcadeFlag, ArcadeScreenFlag, ArcadeTriggerFlag, HasGameLoaded } from '../components/definitions'
import { loadPlayer, unloadPlayer } from '../player'
import { loadAtariBricks } from './atariMethods'
import { BITCOIN_BRICKS } from './bitcoinConstants'
import { DECENTRALAND_BRICKS } from './decentralandConstants'
import { ETHEREUM_BRICKS } from './ethereumConstants'
import { Games } from './sharedConstants'
import { loadBricks, unloadBricks, createWallsAndBackground, readyPlayerOne } from './sharedMethods'

/**
 * Get arcades and loads levels.
 */
export function loadAllLevels() {
  for (const [arcade] of engine.getEntitiesWith(ArcadeFlag)) {
    const game = ArcadeFlag.get(arcade).game
    if (Object.values(Games).includes(game as Games)) {
      setupArcade(arcade, game as Games)
    }

    // ######################## Decentraland Game ########################
    if (game === Games.G_DECENTRALAND) {
      loadLevel(game, DECENTRALAND_BRICKS)
    }

    // ######################## Atari Game ########################
    if (game === Games.G_ATARI) {
      loadLevel(game)
    }

    // ######################## Bitcoin Game ########################
    if (game === Games.G_BITCOIN) {
      loadLevel(game, BITCOIN_BRICKS)
    }

    // ######################## Ethereum Game ########################
    if (game === Games.G_ETHEREUM) {
      loadLevel(game, ETHEREUM_BRICKS)
    }
  }
}

/**
 * Setup arcade.
 *
 * @param arcade - The first input is an entity who will be parent of game's subentities.
 * @param game - The second input is a game (string value) from Games enum.
 *
 * @remarks This function create and setup all walls and billboards, in addition create the arcade transform and trigger to show/hide the game in each cabinet.
 */
function setupArcade(arcade: Entity, game: Games): void {
  const arcadeScreen = engine.addEntity()
  Transform.createOrReplace(arcadeScreen, {
    position: Vector3.create(-0.48, 1.37, -0.1),
    scale: Vector3.create(0.03, 0.03, 0.03),
    rotation: Quaternion.fromAngleAxis(75, Vector3.Left()),
    parent: arcade
  })
  ArcadeScreenFlag.create(arcadeScreen, { game })

  createWallsAndBackground(arcadeScreen)
  readyPlayerOne(arcadeScreen, game)

  const arcadeTrigger = engine.addEntity()
  Transform.createOrReplace(arcadeTrigger, {
    parent: arcade,
    position: Vector3.create(0, 0, -1),
    scale: Vector3.create(2, 2, 2)
  })
  ArcadeTriggerFlag.create(arcadeTrigger, { game })
  TriggerArea.setBox(arcadeTrigger)
}

/**
 * Return an entity who has been created to trigger that game.
 *
 * @param game - The input is a game (string value) from Games enum.
 * @returns trigger entity for that game.
 */
export function getArcadeTrigger(game: Games): Entity | undefined {
  for (const [trigger] of engine.getEntitiesWith(ArcadeTriggerFlag)) {
    if (ArcadeTriggerFlag.get(trigger).game === game) {
      return trigger
    }
  }
}

/**
 * Return an entity who has been created to be parent and transform game's elements (screen).
 *
 * @param game - The input is a game (string value) from Games enum.
 * @returns An entity to be parent for that game's elements.
 */
export function getBricksParent(game: Games): Entity | undefined {
  for (const [screen] of engine.getEntitiesWith(ArcadeScreenFlag))
    if (ArcadeScreenFlag.get(screen).game === game) {
      return screen
    }
}

/**
 * Load the game's elements according the inputs.
 *
 * @param game - The input is a game (string value) from Games enum.
 * @param bricks? - Optional input, it is an array of brick position and color to set the level if the bricks loading function needs it.
 */
function loadLevel(
  game: Games,
  bricks?: {
    position: Vector3.MutableVector3
    color: Color3.MutableColor3
  }[]
): void {
  const bricksParent = getBricksParent(game)
  const arcadeTrigger = getArcadeTrigger(game)

  if (arcadeTrigger && bricksParent) {
    triggerAreaEventsSystem.onTriggerEnter(arcadeTrigger, function () {
      if (!HasGameLoaded.getOrNull(engine.RootEntity)?.loaded) {
        if (game === Games.G_ATARI) {
          loadAtariBricks(game, bricksParent)
        } else {
          if (bricks) loadBricks(game, bricks, bricksParent)
        }
        loadPlayer(game)
      }
    })

    triggerAreaEventsSystem.onTriggerExit(arcadeTrigger, function () {
      unloadBricks(game)
      unloadPlayer()
    })
  }
}
