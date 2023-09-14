import { TextShape, engine } from '@dcl/sdk/ecs'
import { buildScene } from './sceneFactory'
import { startParty } from './startParty'

export function main() {
  // Add scene content
  const signpost = buildScene()

  // Time for the party to start in GMT+3
  // getHours() converts time into players local time
  const partyStart = new Date('2023-09-20T20:00:00+03:00').getHours()
  const partyEnd = new Date('2023-09-20T23:59:59+03:00').getHours()

  // Function to call the API
  async function checkTime() {

    const response = await fetch('https://worldtimeapi.org/api/timezone/etc/gmt+3')

    const worldtime = await response.json()
    const timeNow = new Date(worldtime.datetime).getHours()
    
    // Debug
    console.log('\nParty Start: ', partyStart, '\nParty End: ', partyEnd, '\nTime now: ', timeNow)

    // Before Party
    if (timeNow < partyStart) {
      updateSignpost('Party starts\n in ' + (partyStart - timeNow) + ' hours.\n' +
      'At ' + formatAMPM(partyStart))
    }
    // While Party
    else if (timeNow >= partyStart && timeNow <= partyEnd) {
      // Note that we compare just hours not date, so party is daily.
      startParty()
      console.log('PARTY TIME!')
      updateSignpost('PARTY TIME!\n' + formatAMPM(partyStart) + ' to ' + formatAMPM(partyEnd))

      // Stop checking for the party starting, it's already started!
      engine.removeSystem('loopSystem')
    }
    // After Party
    else if (timeNow > partyEnd) {
      updateSignpost('Party Ended\nNext in ' + (24 - timeNow + partyStart) + ' hours\n At ' + formatAMPM(partyStart))
    }

  }
  checkTime()

  // Fetches time API evey 10 seconds
  let timer: number = 10
  function LoopSystem( dt: number ) {
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
    if(signpostEntity) {
      const signpost = TextShape.getMutable(signpostEntity)
      signpost.text = text
    }
  }

  function formatAMPM(hours: number) {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const strTime = hours + ' ' + ampm;
    return strTime;
  }
}
