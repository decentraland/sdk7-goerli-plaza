import { TextShape, engine } from '@dcl/sdk/ecs'
import { buildScene } from './sceneFactory'
import { startParty } from './startParty'

export function main() {
  // Add scene content
  const signpost = buildScene()

  // Time for the party to start
  const partyStart = new Date('2023-10-31T19:00:00+03:00') // GMT+3
  const partyEnd = new Date('2023-11-01T02:00:00+03:00') // GMT+3

  // Function to call the API
  async function checkTime() {
    const response = await fetch('https://worldtimeapi.org/api/timezone/etc/gmt+3') // GMT+3

    const worldtime = await response.json()
    const timeNow = new Date(worldtime.datetime)

    // Debug
    console.log('\nParty Start: ', partyStart, '\nTime now: ', timeNow, '\nParty End: ', partyEnd)

    // Before Party
    if (timeNow < partyStart) {
      // Calculate the time difference in milliseconds
      const timeDiff = partyStart.getTime() - timeNow.getTime()
      // Calculate the number of days
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
      // Calculate the number of hours left after subtracting the days
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      updateSignpost(
        `Party starts \n in ${days} days \n and ${hours} hours. \n At ${formatAMPM(partyStart.getHours())}`
      )
    }
    // While Party
    else if (timeNow >= partyStart && timeNow <= partyEnd) {
      startParty()
      console.log('PARTY TIME!')
      updateSignpost('PARTY TIME!\n' + formatAMPM(partyStart.getHours()) + ' to ' + formatAMPM(partyEnd.getHours()))

      // Stop checking for the party starting, it's already started!
      engine.removeSystem('loopSystem')
    }
    // After Party
    else if (timeNow > partyEnd) {
      // Calculate the time difference in milliseconds
      const timeDiff = timeNow.getTime() - partyEnd.getTime()
      // Calculate the number of days
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
      // Calculate the number of hours left after subtracting the days
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

      updateSignpost(`Party ended\n${days} days\nand ${hours} hours ago`)
    }
  }
  checkTime()

  // Fetches time API evey 10 seconds
  let timer: number = 10
  function LoopSystem(dt: number) {
    timer -= dt
    if (timer <= 0) {
      timer = 10
      checkTime()
    }
  }
  engine.addSystem(LoopSystem, 1, 'loopSystem')

  function updateSignpost(text: string) {
    // We get signpost by name set in sceneFactory.ts
    const signpostEntity = engine.getEntityOrNullByName('signpost')
    if (signpostEntity) {
      const signpost = TextShape.getMutable(signpostEntity)
      signpost.text = text
    }
  }

  function formatAMPM(hours: number) {
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'

    const strTime = hours + ' ' + ampm
    return strTime
  }
}
