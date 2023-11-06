import { engine } from '@dcl/sdk/ecs'
import { getWeather } from './api'
import { createClouds, createHouse, createLightning } from './factory'
import { WeatherManager, mapWeather, weather } from './weatherManager'
import {
  checkWeatherSystem,
  lighningSystem,
  loopWeatherSystem,
  precipitationSystem,
  rotateSystem,
  spawnSystem
} from './systems'

// Parameters
const mode: string = 'api' // `api`, `static`, `loop`
const staticWeather: string = 'snow' // `sun`, `cloudy`, `light rain`, `heavy rain`, `thunder`, `snow`
const lat = 51
const lon = -95
const rainSpeed = 4
const snowSpeed = 1

// Controlls entities in scene to react on weather condition
export let weatherManager: WeatherManager = new WeatherManager(mode, lat, lon, rainSpeed, snowSpeed)

export async function main() {
  // Add entities to manager
  const house = createHouse()
  const clouds = createClouds()
  const lightning = createLightning()
  weatherManager.add(house, clouds, lightning)

  if (mode == 'api') {
    // Get weather from API
    const response = await getWeather(lat, lon)
    const newWeather = mapWeather(response)
    weatherManager.update(newWeather)

    // checkWeatherSystem loads new data every 100 sec
    engine.addSystem(checkWeatherSystem)
  } else if (mode == 'static') {
    // Show static weather
    const newWeather = mapWeather(staticWeather)
    weatherManager.update(newWeather)
  } else if (mode == 'loop') {
    // Loop all weather conditions
    engine.addSystem(loopWeatherSystem)
  }

  // Add Systems
  engine.addSystem(lighningSystem)
  engine.addSystem(spawnSystem)
  engine.addSystem(precipitationSystem)
  engine.addSystem(rotateSystem)
}
