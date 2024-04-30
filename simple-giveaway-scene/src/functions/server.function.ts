export async function addUser(publickey: string | undefined) {
  const url = 'https://us-central1-giorgio-1a3d9.cloudfunctions.net/app'
  try {
    const lead = url + '/add-user'
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
  const url = 'https://us-central1-giorgio-1a3d9.cloudfunctions.net/app'
  try {
    const lead = url + '/update-wearable'
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
  const url = 'https://us-central1-giorgio-1a3d9.cloudfunctions.net/app'
  try {
    const lead = url + '/getUserData'
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
