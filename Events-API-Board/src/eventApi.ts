export async function getEvents() {
  const events: any[] = []
  const url = 'https://events.decentraland.org/api/events/?limit=5'

  try {
    const response = await fetch(url)
    const json = await response.json()

    console.log(json)

    for (const event of json.data) {
      if (event.live) {
        events.push(event)
      }
    }
    if (events.length < 3 && json.data.length >= 3) {
      let eventIndex = events.length
      while (events.length < 3) {
        events.push(json.data[eventIndex])
        eventIndex += 1
      }
    }

    console.log(events)
    return events
  } catch (error) {
    console.log('error getting event data ', error)
  }
}
