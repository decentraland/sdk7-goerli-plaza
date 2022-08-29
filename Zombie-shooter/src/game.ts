import { circularSystem } from './systems/circular'
import { playSounds } from './systems/sound'
import { addStateSystem } from './helper/systemWithState'
//import { createCube } from './cube'
import { createCone } from './cone'
import { createNft } from './nft'
import { createText } from './text'
import { createZombie } from './zombie'
import { moveSystem, onMoveZombieFinish } from './systems/moveZombie'
import { addClickBehavior } from './systems/clickable'
import { MoveTransformComponent } from './components/moveTransport'
import { GameControllerComponent } from './components/gameController'


const _LIVES = 5
const _WINNING_SCORE = 15
const _SPAWN_INTERVAL = 3

// const zombie = createZombie(3)
// const _cubeEntity = createCube(2, 2, 8)
// addStateSystem(playSounds, { t: 0 })
// engine.addSystem(circularSystem)
engine.addSystem(moveSystem)



export const coneEntity = createCone()

addClickBehavior(coneEntity, ()=>{
	dcl.log("STARTING GAME")


	if(GameControllerComponent.has(coneEntity)){
		if(!GameControllerComponent.get(coneEntity).spawnActive){
			let controller = GameControllerComponent.getMutable(coneEntity)
			controller.spawnActive = true
			controller.livesLeft = _LIVES
			controller.score = 0


			// clear NFTs
			const nfts = engine.getEntitiesWith(engine.baseComponents.NFTShape)
			for (const [entity, nftShape] of nfts){
				engine.removeEntity(entity)
			}

		} else return
	
	} else {
		GameControllerComponent.create(coneEntity,
			{
				spawnActive: true,
				livesLeft: _LIVES,
				score: 0,
				spawnCountDown: 0,
				spawnInterval: _SPAWN_INTERVAL,
				winningScore: _WINNING_SCORE,
				maxZombies: 10
			})
	}

	for ( let i =_LIVES; i >= 0 ; i-- )
	{
		const _nftEntity = createNft(i)

	}

	if(engine.baseComponents.AudioSource.has(coneEntity)){
		const source = engine.baseComponents.AudioSource.getMutable(coneEntity)
		source.playing = true
	} else {
		engine.baseComponents.AudioSource.create(coneEntity,
			{
				audioClipUrl: "/sounds/ambient.mp3",
				loop: true,
				playing: true,
				pitch: 1,
				volume: 1
			})
	}

	

})

const textEntity = createText("Click Cone to Play")

//  engine.baseComponents.Transform.getMutable(textEntity).parent = coneEntity

// engine.baseComponents.Billboard.create(textEntity, {x: true, y: true, z: true})

// const simpleCube = createCube(8, 2, 8)
// engine.baseComponents.Transform.getMutable(simpleCube).parent = coneEntity

// engine.baseComponents.Billboard.create(simpleCube, {x: true, y: true, z: true})
// engine.baseComponents.CameraModeArea.create(coneEntity, {mode: CameraModeValue.THIRD_PERSON, area: {x:6, y: 6, z: 6}})

// engine.baseComponents.AvatarModifierArea.create(coneEntity, {  modifiers: [2]	 , area: {x:10, y: 10, z: 10}, excludeIds: [] })

// engine.baseComponents.AvatarModifierArea.create(coneEntity, {  modifiers: [PBAvatarModifierArea_Modifier.HIDE_AVATARS] , area: {x:10, y: 10, z: 10}, excludeIds: [] })

