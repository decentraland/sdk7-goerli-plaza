export function circularSlider(time: number) {
  const callbacks: ((index: number) => void)[] = []
  let t = time
  let stateIndex = -1
  let pause = false

  return {
    system: (dt: number) => {
      if (!pause) {
        t += dt
      }

      if (t < time) {
        return
      }
      t = 0
      stateIndex += 1
      if (stateIndex >= callbacks.length) {
        stateIndex = 0
      }

      callbacks[stateIndex](stateIndex)
    },
    add(cb: (index: number) => void) {
      callbacks.push(cb)
      return this
    },
    addIter<T>(arr: T[], cb: (global_index: number, index: number, value: T) => void) {
      callbacks.push(...arr.map((v, i) => (global_index: number) => cb(global_index, i, v)))
      return this
    },
    addRange(
      start_included: number,
      end_included: number,
      step: number,
      cb: (global_index: number, index: number, value: number) => void
    ) {
      for (let j = start_included, i = 0; j <= end_included; j += step, i++) {
        callbacks.push((global_index) => cb(global_index, i, j))
      }
      return this
    },
    forceNext() {
      t = 0
      stateIndex += 1
      if (stateIndex >= callbacks.length) {
        stateIndex = 0
      }
      callbacks[stateIndex](stateIndex)
    },
    forcePrevious() {
      t = 0
      stateIndex -= 1
      if (stateIndex < 0) {
        stateIndex = callbacks.length - 1
      }
      callbacks[stateIndex](stateIndex)
    },
    togglePause() {
      pause = !pause
    }
  }
}
