type State = {
  t: number
}

export function playSounds(dt: number, state: State) {
  state.t += dt
  if (state.t < 4) {
    return
  }
  state.t = 0

const entitiesWSound = engine.getEntitiesWith(engine.baseComponents.AudioSource)
for (const [entity] of entitiesWSound) {
  const audioSource = AudioSource.getMutable(entity)
  audioSource.volume = 1
  audioSource.pitch = Math.random() * 5
  audioSource.playing = true
}
}
