// Check weather API
export async function getWeather(lat: number, lon: number) {
  // WEATHER API ID & KEY
  const appId: string = 'bb6063b3'
  const APIkey: string = '2e55a43d3e62d76f145f28aa7e3990e9'

  // fully constructed URL for weather API
  const callUrl: string =
    'http://api.weatherunlocked.com/api/current/' + lat + ',%20' + lon + '?app_id=' + appId + '&app_key=' + APIkey

  try {
    console.log('getting new weather')
    const response = await fetch(callUrl)
    const json = await response.json()
    return JSON.stringify(json)
  } catch (error) {
    console.log('failed to reach URL', error)
  }
}
