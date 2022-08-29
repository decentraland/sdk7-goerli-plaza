export function addSystem<T>(fn: (dt: number, state: T) => void, initialState: T) {
  const state = { ...initialState }
  engine.addSystem((dt: number) => fn(dt, state))
}
