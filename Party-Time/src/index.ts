import { engine } from '@dcl/sdk/ecs'
import { buildScene } from './sceneFactory'
import { startParty } from './startParty'

// Changelog:
// renamed builderContent to sceneFactory
// simplified sign post text element
// divided startParty into seperate functions
// using systems

export function main() {
  // Add scene content
  const signpost = buildScene()
  signpost.text = 'Party at 9 PM\nGMT +3'

  // Time for the party to start
  const partyTime = new Date('2023-09-20T21:00:00+03:00') // 9 PM GMT+3
  const partyEnd = new Date('2023-09-20T23:59:59+03:00') // End time in GMT+3

  //function to call the API
  async function checkTime() {
    const response = await fetch('https://worldtimeapi.org/api/timezone/etc/gmt+3')

    const worldtime = await response.json()
    const timeNow = new Date(worldtime.datetime)

    // compare the party start time to the current hour
    if (timeNow.getHours() >= partyTime.getHours() && timeNow.getHours() <= partyEnd.getHours()) {
      startParty()
      console.log('PARTY TIME!')

      // stop checking for the party starting, it's already started!
      engine.removeSystem('loopSystem')
    }
  }

  // Fetches time API evey second
  let timer: number = 1
  function LoopSystem(dt: number) {
    timer -= dt
    if (timer <= 0) {
      timer = 1

      const now = new Date()
      const currentSecond = now.getSeconds()
      console.log('Current second:', currentSecond)
      checkTime()
    }
  }

  engine.addSystem(LoopSystem, 1, 'loopSystem')
}
