import { engine } from '@dcl/sdk/ecs'
import { syncEntity } from '@dcl/sdk/network'
import { SeqNumbers, StoneStatus } from './components'
import { addZenquencer } from './modules/zenquencer/zenquencer'
import { updateStones } from './systems'
import { setupUi } from './ui'
export * from '@dcl/sdk'

export function main() {
  syncEntity(engine.RootEntity, [SeqNumbers.componentId])

  addZenquencer()

  let id = 0
  for (const [stoneEntity] of engine.getEntitiesWith(StoneStatus)) {
    syncEntity(stoneEntity, [StoneStatus.componentId], id)
    id++
  }
  engine.addSystem(updateStones)

  setupUi()
}
