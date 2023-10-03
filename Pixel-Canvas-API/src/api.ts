// API key here
const apiKey = '6518855968885408010c01fc'
const urlRestAPI = 'https://goerliplasapixelcanv-9b7d.restdb.io/rest/pixel'

// Gets all pixel from database via GET API call
export function getDatabase(): Promise<any> {
  const url = urlRestAPI

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': apiKey,
      'cache-control': 'no-cache'
    }
  })
    .then((response) => response.json())
    .then((entries) => {
      // These are all entries in the database
      // console.log(entries);
      return entries
    })
    .catch((error) => {
      console.error('Error:', error)
      return
    })
}

// Creates new empty pixel data in the database
export function initDatabase(canvasWidth: number, canvasHeight: number, color: string): Promise<any> {
  const url = urlRestAPI
  const pixels = []

  // Create array of one colored pixels
  for (let x = 0; x < canvasWidth; x++) {
    for (let y = 0; y < canvasHeight; y++) {
      const pixelData = {
        posX: x,
        posY: y,
        color: color
      }
      pixels.push(pixelData)
    }
  }

  // Post whole array into Database at one
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': apiKey,
      'cache-control': 'no-cache'
    },
    body: JSON.stringify(pixels)
  })
    .then((response) => response.json())
    .then((data) => {
      // Data is all the created entries in the database
      return data
    })
    .catch((error) => {
      console.error('Error:', error)
      throw error
    })
}

// Update pixel database with new hex color code
export function updateDatabase(id: string, posX: number, posY: number, color: string) {
  const url = urlRestAPI
  const data = {
    posX: posX,
    posY: posY,
    color: color
  }

  // PUT overrides the pixel in database selected by id
  return fetch(url + '/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': apiKey,
      'cache-control': 'no-cache'
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => {
      // Returns the newly created pixel data
      return data
    })
    .catch((error) => {
      console.error('Error:', error)
      return
    })
}
