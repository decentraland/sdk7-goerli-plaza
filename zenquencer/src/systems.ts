import { BEATS_LENGHT, NOTES_LENGHT } from './modules/zenquencer/gameConfig'
import { stones } from './modules/zenquencer/stones'

export function updateStones(dt: number) {
  for (let beat = 0; beat < BEATS_LENGHT; beat++) {
    for (let note = 0; note < NOTES_LENGHT; note++) {
      stones[beat][note].updateStatus()
    }
  }
}
