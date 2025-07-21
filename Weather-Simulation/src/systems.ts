import { engine, Transform, GltfContainer } from '@dcl/sdk/ecs'

import { IsPrecip, PrecipType, Spin } from './components'
import { getWeather } from './api'
import { weatherManager } from '.'
import { mapWeather, weather } from './weatherManager'
import { createRaindrop, createSnowflake } from './factory'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

/**
 * Flash lightning when stormy
 */
let lightningTimer = 1
export function lighningSystem(dt: number) {
  // If we have storm
  if (weatherManager.weatherCondition == weather.storm) {
    lightningTimer -= dt
    if (lightningTimer < 0) {
      const lightning = weatherManager.lightning
      if (GltfContainer.has(lightning)) {
        // If lightning is on remove it
        GltfContainer.deleteFrom(lightning)

        lightningTimer = Math.random() * 10
      } else {
        // Show random lightning shape
        const max = 6
        const min = 1
        const random = Math.floor(Math.random() * (max - min + 1)) + min
        GltfContainer.createOrReplace(lightning, {
          src: 'assets/scene/Models/ln' + random + '.gltf'
        })

        lightningTimer = Math.random() * 2
      }
    }
  } else {
    const lightning = weatherManager.lightning
    GltfContainer.deleteFrom(lightning)
  }
}

/**
 * Create drops and flakes evenly spread out in time as they fall
 */
let rainSpawnInterval = 0
let snowSpawnInterval = 0
let spawnedRaindrops = 0
let spawnedSnowflakes = 0
export function spawnSystem(dt: number) {
  const maxRaindrops = weatherManager.weatherCondition.rainDrops
  const maxSnowflakes = weatherManager.weatherCondition.snowFlakes

  // Spawn raindrops
  if (maxRaindrops > 1 && maxRaindrops > spawnedRaindrops) {
    rainSpawnInterval -= dt
    if (rainSpawnInterval < 0) {
      createRaindrop()
      spawnedRaindrops++
      rainSpawnInterval = weatherManager.weatherCondition.spawnInterval
    }
  }

  // Remove raindrops
  else if (maxRaindrops == 0 && spawnedRaindrops > 0) {
    for (const [entity, precip] of engine.getEntitiesWith(IsPrecip)) {
      const pos = Transform.getMutable(entity).position
      if (pos.y < 0.1 && precip.type == PrecipType.drop) {
        engine.removeEntity(entity)
        spawnedRaindrops--
      }
    }
  }

  // Spawn snowflakes
  if (maxSnowflakes > 1 && maxSnowflakes > spawnedSnowflakes) {
    snowSpawnInterval -= dt
    if (snowSpawnInterval < 0) {
      createSnowflake()
      spawnedSnowflakes++
      snowSpawnInterval = weatherManager.weatherCondition.spawnInterval
    }
  }

  // Remove snowflakes
  else if (maxSnowflakes == 0 && spawnedSnowflakes > 0) {
    for (const [entity, precip] of engine.getEntitiesWith(IsPrecip)) {
      const pos = Transform.getMutable(entity).position
      if (pos.y < 0.1 && precip.type == PrecipType.flake) {
        engine.removeEntity(entity)
        spawnedSnowflakes--
      }
    }
  }
}

/**
 * Rain and snow physics
 */
export function precipitationSystem(dt: number) {
  for (const [entity, precip] of engine.getEntitiesWith(IsPrecip)) {
    const wm = weatherManager
    // Fetch a mutable Transform component
    const pos = Transform.getMutable(entity).position

    // Move particle by speed value
    if (precip.type == PrecipType.drop) {
      pos.y = pos.y - dt * wm.rainSpeed
    } else if (precip.type == PrecipType.flake) {
      pos.y = pos.y - dt * wm.snowSpeed
    }

    // If particle reaches ground move it to the sky
    if (pos.y < 0) {
      pos.x = Math.random() * 8 + 4
      pos.y = 12
      pos.z = Math.random() * 8 + 4
    }
  }
}

/**
 * Rotate snowflakes
 */
export function rotateSystem() {
  for (const [entity, spin] of engine.getEntitiesWith(Spin)) {
    let transform = Transform.getMutable(entity)
    transform.rotation = Quaternion.multiply(transform.rotation, Quaternion.fromAngleAxis(3, spin.dir))
  }
}

/**
 * Regularly update weather conditions
 */
const checkWeatherInterval = 100
let checkWeatherTimer = checkWeatherInterval
export function checkWeatherSystem(dt: number) {
  if (weatherManager.mode != 'api') return

  checkWeatherTimer -= dt
  if (checkWeatherTimer < 0) {
    // Get Weather from API
    callAPI()

    checkWeatherTimer = checkWeatherInterval
  }
}

// This function is outside of system
// as systems do not allow asynchronous tasks
async function callAPI() {
  const lat = weatherManager.lat
  const lon = weatherManager.lon
  const response = await getWeather(lat, lon)
  const newWeather = mapWeather(response)
  weatherManager.update(newWeather)
}

/**
 * Loops trough all weather conditions
 */
const timerDuration = 10
let timer: number = timerDuration
export function loopWeatherSystem(dt: number) {
  if (weatherManager.mode != 'loop') return

  timer -= dt
  if (timer <= 0) {
    weatherManager.next()
    console.log('WeatherCondition:', weatherManager.weatherCondition.index)

    timer = timerDuration
  }
}
