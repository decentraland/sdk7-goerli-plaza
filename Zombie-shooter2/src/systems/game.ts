import { GameControllerComponent } from '../components/gameController'
import { createCone } from '../factory/cone'
import { createNft } from '../factory/nft'
import { playSound } from '../factory/sound'
import { createZombie } from '../factory/zombie'

const _LIVES = 5
const _WINNING_SCORE = 15
const _SPAWN_INTERVAL = 3

const gameEntity = engine.addEntity()
const coneStarterEntity = createCone()

export function ensureGameController() {
  if (GameControllerComponent.has(gameEntity)) {
    return GameControllerComponent.getMutable(gameEntity)
  } else {
    return GameControllerComponent.create(gameEntity)
  }
}

function triggerGameStart() {
  const gameController = ensureGameController()

  if (gameController.spawnActive) {
    gameController.spawnActive = true
    gameController.livesLeft = _LIVES
    gameController.score = 0

    // clear NFTs
    const nfts = engine.getEntitiesWith(engine.baseComponents.NFTShape)
    for (const [entity, _nftShape] of nfts) {
      engine.removeEntity(entity)
    }

    for (let i = _LIVES; i >= 0; i--) {
      createNft(i)
    }
    return
  }

  Object.assign(gameController, {
    spawnActive: true,
    livesLeft: _LIVES,
    score: 0,
    spawnCountDown: 0,
    spawnInterval: _SPAWN_INTERVAL,
    winningScore: _WINNING_SCORE,
    maxZombies: 10
  })

  for (let i = _LIVES; i >= 0; i--) {
    createNft(i)
  }

  if (engine.baseComponents.AudioSource.has(gameEntity)) {
    const source = engine.baseComponents.AudioSource.getMutable(gameEntity)
    source.playing = true
  } else {
    engine.baseComponents.AudioSource.create(gameEntity, {
      audioClipUrl: '/sounds/ambient.mp3',
      loop: true,
      playing: true,
      pitch: 1,
      playedAtTimestamp: Date.now(),
      volume: 1
    })
  }
}

export function gameLogicSystem(dt: number) {
  const gameController = ensureGameController()

  if (engine.baseComponents.OnPointerDownResult.has(coneStarterEntity)) {
    triggerGameStart()
  }

  if (gameController.spawnActive) {
    if (gameController.livesLeft <= 0) {
      lose()
    } else if (gameController.score >= gameController.winningScore) {
      win()
    }

    gameController.spawnCountDown -= dt
    if (gameController.spawnCountDown < 0) {
      gameController.spawnCountDown = gameController.spawnInterval
      const zombie = spawnZombie()
      dcl.log('SPAWNING NEW ZOMBIE ', zombie)
      playSound(zombie, 'sounds/pickUp.mp3', true)
    }
  }
}

function spawnZombie() {
  const xPos = 2 + Math.random() * 10
  return createZombie(xPos)
}

// how do I pass the controller component as a param to this function????
function lose() {
  dcl.log('GAME OVER!!')
  endGame()
}

function win() {
  dcl.log('YOU WIN!!')
  endGame()
}

function endGame() {
  ensureGameController().spawnActive = false

  if (engine.baseComponents.AudioSource.has(gameEntity)) {
    engine.baseComponents.AudioSource.getMutable(gameEntity).playing = false
  }
}
