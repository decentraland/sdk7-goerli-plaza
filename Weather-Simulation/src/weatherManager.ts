import { Entity, GltfContainer, Transform, engine } from '@dcl/sdk/ecs'
import { weatherManager } from '.'

// Defining types for the Weather object
type WeatherCondition = {
  index: number
  house: string
  cloud?: string // Optional since not all conditions have a cloud property
  rainDrops: number
  snowFlakes: number
  spawnInterval: number
}

type WeatherObject = {
  sun: WeatherCondition
  clouds: WeatherCondition
  rain: WeatherCondition
  heavyRain: WeatherCondition
  storm: WeatherCondition
  snow: WeatherCondition
}

// Object to store model variations
const src = {
  house: {
    dry: 'models/house_dry.gltf',
    wet: 'models/house_wet.gltf',
    snow: 'models/house_snow.gltf'
  },
  cloud: {
    light: 'models/clouds.gltf',
    dark: 'models/dark-cloud.gltf'
  }
}

// Object to store weather conditions
export const weather: WeatherObject = {
  sun: {
    index: 0,
    house: src.house.dry,
    rainDrops: 0,
    snowFlakes: 0,
    spawnInterval: 0
  },
  clouds: {
    index: 1,
    house: src.house.dry,
    cloud: src.cloud.light,
    rainDrops: 0,
    snowFlakes: 0,
    spawnInterval: 0
  },
  rain: {
    index: 2,
    house: src.house.wet,
    cloud: src.cloud.light,
    rainDrops: 10,
    snowFlakes: 0,
    spawnInterval: 0.4
  },
  heavyRain: {
    index: 3,
    house: src.house.wet,
    cloud: src.cloud.dark,
    rainDrops: 50,
    snowFlakes: 0,
    spawnInterval: 0.6
  },
  storm: {
    index: 4,
    house: src.house.wet,
    cloud: src.cloud.dark,
    rainDrops: 100,
    snowFlakes: 0,
    spawnInterval: 0.7
  },
  snow: {
    index: 5,
    house: src.house.snow,
    cloud: src.cloud.dark,
    rainDrops: 0,
    snowFlakes: 50,
    spawnInterval: 0.2
  }
}

// This holds and interacts with the entities in the scene
export class WeatherManager {
  mode: string
  weatherCondition: WeatherCondition = weather.sun
  lat: number = 0
  lon: number = 0
  house!: Entity
  cloud!: Entity
  lightning!: Entity
  rainSpeed: number = 4
  snowSpeed: number = 2
  constructor(mode: string, lat: number, lon: number, rainSpeed: number, snowSpeed: number) {
    this.mode = mode
    this.lat = lat
    this.lon = lon
    this.rainSpeed = rainSpeed
    this.snowSpeed = snowSpeed
    this.init()
  }

  // Sets spawn intervals based on speed
  init() {
    // Loops through object until finds the right index
    for (const weatherCondition of Object.values(weather)) {
      let w = weatherCondition
      w.spawnInterval = 0
      if (w.rainDrops > 0) {
        w.spawnInterval = this.rainSpeed / w.rainDrops
      } else if (w.snowFlakes > 0) {
        w.spawnInterval = (this.snowSpeed * 10) / w.snowFlakes
      }
    }
  }

  // Adds house, clouds and lightning to manager
  add(house: Entity, cloud: Entity, lighning: Entity) {
    this.house = house
    this.cloud = cloud
    this.lightning = lighning
    this.update(this.weatherCondition)
  }

  // Updates the current weather condition
  update(condition: WeatherCondition) {
    this.weatherCondition = condition
    this.updateEnvironment(condition)
  }

  // Updates environment depending on weather condition
  updateEnvironment(weather: WeatherCondition) {
    GltfContainer.createOrReplace(this.house, { src: weather.house })
    if (weather.cloud) {
      GltfContainer.createOrReplace(this.cloud, { src: weather.cloud })
    } else {
      // If no clouds specified, remove component from entity
      GltfContainer.deleteFrom(this.cloud)
    }
  }

  // Sets the next weather condition form WeatherObject
  next() {
    let index = this.weatherCondition.index
    if (index < 5) {
      index++
    } else {
      index = 0 // Go to first if we reach the last condition
    }
    // Loops through object until find the right index
    for (const weatherCondition of Object.values(weather)) {
      if (weatherCondition.index === index) {
        this.update(weatherCondition)
      }
    }
  }
}

// Map verbose API responses to distinct possible values
export function mapWeather(weatherString: string | undefined) {
  if (!weatherString) return weatherManager.weatherCondition

  console.log(weatherString)
  let weatherCondition: WeatherCondition
  if (weatherString.match(/(thunder)/gi)) {
    weatherCondition = weather.storm
  } else if (weatherString.match(/(snow|ice)/gi)) {
    weatherCondition = weather.snow
  } else if (weatherString.match(/(heavy|torrential)/gi)) {
    weatherCondition = weather.heavyRain
  } else if (weatherString.match(/(rain|drizzle|shower)/gi)) {
    weatherCondition = weather.rain
  } else if (weatherString.match(/(cloud|cloudy|overcast|fog|mist)/gi)) {
    weatherCondition = weather.clouds
  } else {
    weatherCondition = weather.sun
  }
  return weatherCondition
}
