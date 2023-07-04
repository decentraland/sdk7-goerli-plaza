import { engine } from '@dcl/sdk/ecs'
import { createInputSystem } from './system'

export const customInputSystem = createInputSystem(engine)
