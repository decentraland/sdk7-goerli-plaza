import { gameController } from './controllers/game.controller'
import { setupUi } from './ui'

export function main() {
  const newGame = new gameController()

  setupUi()
}
