/**
 * This module provides a createTestRuntime function that returns an object with a test function that can be used to define tests.
 */

import { IEngine } from '@dcl/ecs'

export type TestHelpers = {}

export type TestFunction = (helpers: TestHelpers) => Generator | Promise<any>

export type TestDefinitionFunction = (name: string, fn: TestFunction) => void

// This function creates a test runtime that can be used to define and run tests.
// It takes a `TestingModule` instance (loaded from require('~system/Testing')) and an `IEngine` instance (from Decentraland's SDK).
// It returns an object with a `test` function that can be used to define tests.
/* @__PURE__ */
export function mendezCoroutineRuntime(engine: IEngine) {
  type TestPlanEntry = { name: string; fn: TestFunction }
  type RunnerEnvironment = {
    resolve: () => void
    reject: (error: any) => void
    helpers: any
    generator: Generator
  }

  // this flag ensures no tests are added asynchronously
  let runtimeFrozen = false

  let currentFrameCounter = 0
  let currentFrameTime = 0

  // array to hold the scheduled tests
  const scheduledTests: TestPlanEntry[] = []

  // an array of promises that are resolved on the next frame (after the current frame is finished)
  const nextTickFuture: Array<(dt: number) => void> = []

  // this function returns a promise that resolves on the next frame
  async function nextTick() {
    return new Promise<number>((resolve) => {
      nextTickFuture.push(resolve)
    })
  }

  // add a system to the engine that resolves all promises in the `nextTickFuture` array
  engine.addSystem(function TestingFrameworkCoroutineRunner(dt) {
    currentFrameCounter++
    currentFrameTime += dt
    // resolve all nextTick futures.
    nextTickFuture.splice(0, nextTickFuture.length).forEach((_) => _(dt))
  })

  // this function schedules a value to be processed on the next frame, the test runner will
  // continue to run until it reaches a yield point
  function scheduleValue(value: any, env: RunnerEnvironment) {
    if (value && typeof value === 'object' && typeof value.then === 'function') {
      console.log('⏱️ yield promise')
      // if the value is a promise, schedule it to be awaited after the current frame is finished
      nextTickFuture.push(async () => {
        try {
          scheduleValue(await value, env)
        } catch (err) {
          env.reject(err)
        }
      })
    } else if (typeof value === 'function') {
      console.log('⏱️ yield function')
      // if the value is a function, schedule it to be called on the next frame
      nextTickFuture.push(() => {
        scheduleValue(value(), env)
      })
      return
    } else if (typeof value === 'undefined' || value === null) {
      console.log('⏱️ yield')
      // if the value is undefined or null, continue processing the generator the next frame
      nextTickFuture.push(() => {
        consumeGenerator(env)
      })
    } else throw new Error(`Unexpected value from test generator: ${value}`)
  }

  // this function processes a generator function by scheduling its values to be processed on the next frame
  function consumeGenerator(env: RunnerEnvironment) {
    try {
      const ret = env.generator.next()
      if (!ret.done) {
        scheduleValue(ret.value, env)
      } else {
        env.resolve()
      }
    } catch (err) {
      env.reject(err)
    }
  }

  // this function schedules a test run on the next frame
  function scheduleNextRun() {
    if (scheduledTests.length) {
      nextTickFuture.push(runTests)
    }
  }

  // this function runs the scheduled tests
  function runTests() {
    if (scheduledTests.length) {
      const entry = scheduledTests.shift()!
      const initialFrame = currentFrameCounter
      const startTime = currentFrameTime

      let resolved = false

      // this function should be called only once. it makes the current test pass
      const resolve = () => {
        if (resolved) throw new Error('resolved twice')
        resolved = true

        console.log(`🟢 Coroutine passed ${entry.name}`)

        scheduleNextRun()
      }

      const reject = (err: any) => {
        if (resolved) throw new Error('resolved twice')
        resolved = true

        console.log(`🔴 Coroutine failed ${entry.name}`)
        console.error(err)

        scheduleNextRun()
      }

      try {
        console.log(`🧪 Running coroutine ${entry.name}`)

        const testHelpers: TestHelpers = {}

        const returnValue = entry.fn(testHelpers)

        if (returnValue && typeof returnValue === 'object') {
          if (isGenerator(returnValue)) {
            const env: RunnerEnvironment = {
              generator: returnValue,
              helpers: testHelpers,
              resolve,
              reject
            }
            consumeGenerator(env)
          } else if (isPromise(returnValue)) {
            returnValue.then(resolve).catch(reject)
          } else {
            throw new Error(`Unknown test result type: ${returnValue}`)
          }
        } else {
          resolve()
        }
      } catch (err: any) {
        reject(err)
      }
    }
  }

  // schedule the test runner start for the next frame
  nextTickFuture.push(() => {
    // once we run the next tick, the test runtime becomes frozen. that means no new
    // test definitions are accepted
    runtimeFrozen = true

    if (!scheduledTests.length) return

    runTests()
  })

  // this is the function that is used to plan a test functionn
  /* @__PURE__ */

  return {
    run(fn: TestFunction) {
      if (runtimeFrozen) throw new Error("New tests can't be added at this stage.")

      const name = fn.name || 'coroutine'

      scheduledTests.push({ fn, name })
    }
  }
}

function isGenerator(t: any): t is Generator {
  return t && typeof t === 'object' && typeof t[Symbol.iterator] === 'function'
}

function isPromise(t: any): t is Promise<unknown> {
  return t && typeof t === 'object' && typeof t.then === 'function'
}

function globalFail(error: any) {
  // for now, the failure is only writing to the console.error.
  console.error(error)
}
