import { engine } from '@dcl/sdk/ecs'

import { setupUi, SpriteAnimSystem } from './ui'

engine.addSystem(SpriteAnimSystem)

export function main() {
  // draw UI
  setupUi()
}
