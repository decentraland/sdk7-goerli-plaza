import { engine } from '@dcl/sdk/ecs'

type StateSystem<T = unknown> = (dt: number, state: T) => void

export function addStateSystem<T>(fn: StateSystem<T>, initialState: T) {
  const state = { ...initialState }
  engine.addSystem((dt) => fn(dt, state))
}
