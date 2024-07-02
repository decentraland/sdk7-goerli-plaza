
const serverBaseUrl = 'https://test.dclexplorer.com/simple-giveaway-scene/'
// const serverBaseUrl = 'http://localhost:3012/'

export async function addUser(publickey: string | undefined) {
  try {
    const lead = serverBaseUrl + 'add-user'
    console.log('making a call to: ', lead)

    const response = await fetch(lead, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: publickey })
    })

    const json = await response.json()
    return json
  } catch (e) {
    console.log('error fetching scores from server ', e)
  }
}
export async function updatePlayerData(publickey: string | undefined) {
  try {
    const lead = serverBaseUrl + 'update-wearable'
    console.log('making a call to: ', lead)

    const response = await fetch(lead, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: publickey })
    })

    return response
  } catch (e) {
    console.log('error fetching scores from server ', e)
  }
}

export async function getPlayerData(publickey: string | undefined) {
  try {
    const lead = serverBaseUrl + 'getUserData'
    console.log('making a call to: ', lead)

    const response = await fetch(lead, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: publickey })
    })

    const json = await response.json()
    return json
  } catch (e) {
    console.log('error fetching scores from server ', e)
  }
}
