import { gameController } from './controllers/game.controller'
import { setUpScene } from './functions/scene.function'


export function main() {
  setUpScene()
  const newGame = new gameController()
}
