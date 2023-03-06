import { AudioSource, engine, InputAction, NftShape, pointerEventsSystem } from '@dcl/sdk/ecs'
import { } from '@dcl/sdk/math'
//import { createCube } from './cube'
import { GameControllerComponent } from './components/gameController'
import { createCone } from './cone'
import { createNft } from './nft'
import { moveSystem } from './systems/moveZombie'
import { zombieSpawnSystem } from './systems/zombieSpawner'
import { createText } from './text'

export * from '@dcl/sdk'

const _LIVES = 5
const _WINNING_SCORE = 15
const _SPAWN_INTERVAL = 3


engine.addSystem(moveSystem)

export const coneEntity = createCone()

createText(coneEntity, 'Click Cone to Play')

pointerEventsSystem.onPointerDown(
	coneEntity,
	function () {
		console.log('STARTING GAME')

		if (GameControllerComponent.has(coneEntity)) {
		  if (!GameControllerComponent.get(coneEntity).spawnActive) {
			const controller = GameControllerComponent.getMutable(coneEntity)
			controller.spawnActive = true
			controller.livesLeft = _LIVES
			controller.score = 0
	  
			// clear NFTs
			const nfts = engine.getEntitiesWith(NftShape)
			for (const [entity] of nfts) {
			  engine.removeEntity(entity)
			}
		  } else return
		} else {
		  GameControllerComponent.create(coneEntity, {
			spawnActive: true,
			livesLeft: _LIVES,
			score: 0,
			spawnCountDown: 0,
			spawnInterval: _SPAWN_INTERVAL,
			winningScore: _WINNING_SCORE,
			maxZombies: 10
		  })
		}
	  
		for (let i = _LIVES; i >= 0; i--) {
		  createNft(i)
		}
	  
		if (AudioSource.has(coneEntity)) {
		  const source = AudioSource.getMutable(coneEntity)
		  source.playing = true
		} else {
		  AudioSource.create(coneEntity, {
			audioClipUrl: 'sounds/ambient.mp3',
			loop: true,
			playing: true,
		  })
		}
	},
	{
	  button: InputAction.IA_PRIMARY,
	  hoverText: 'Start game'
	}
  )

  engine.addSystem(zombieSpawnSystem)
