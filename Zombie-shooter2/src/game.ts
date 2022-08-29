import { createText } from './factory/text'
import { moveSystem } from './systems/moveZombie'
import { gameLogicSystem } from './systems/game'
import { zombieKiller } from './systems/zombieKiller'

engine.addSystem(zombieKiller)

engine.addSystem(moveSystem)
engine.addSystem(gameLogicSystem)

createText('Click Cone to Play')
