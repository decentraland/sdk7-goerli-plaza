import {
  Realm,
  ExplorerConfiguration,
  Platform,
  getCurrentRealm,
  isPreviewMode,
  getExplorerConfiguration,
  getPlatform,
  getDecentralandTime
} from '@decentraland/EnvironmentAPI'

getCurrentRealm()
  .then((...values: any[]) => {
    dcl.log(`value of EnvironmentAPI.getCurrentRealm is`, values)
  })
  .catch((err) => {
    dcl.log('request getCurrentRealm, fails', err)
  })
isPreviewMode()
  .then((...values: any[]) => {
    dcl.log(`value of EnvironmentAPI.isPreviewMode is`, values)
  })
  .catch((err) => {
    dcl.log('request isPreviewMode, fails', err)
  })
getExplorerConfiguration()
  .then((...values: any[]) => {
    dcl.log(`value of EnvironmentAPI.getExplorerConfiguration is`, values)
  })
  .catch((err) => {
    dcl.log('request getExplorerConfiguration, fails', err)
  })
getPlatform()
  .then((...values: any[]) => {
    dcl.log(`value of EnvironmentAPI.getPlatform is`, values)
  })
  .catch((err) => {
    dcl.log('request getPlatform, fails', err)
  })
getDecentralandTime()
  .then((...values: any[]) => {
    dcl.log(`value of EnvironmentAPI.getDecentralandTime is`, values)
  })
  .catch((err) => {
    dcl.log('request getDecentralandTime fails', err)
  })
// export type Realm = {
//   domain: string
//   /** @deprecated use room instead */
//   layer: string
//   room: string
//   serverName: string
//   displayName: string
// }

// export type ExplorerConfiguration = {
//   clientUri: string
//   configurations: Record<string, string | number | boolean>
// }

// export const enum Platform {
//   DESKTOP = 'desktop',
//   BROWSER = 'browser'
// }

// /**
//  * Returns the current connected realm
//  */
// export function getCurrentRealm(): Promise<Realm | undefined>

// /**
//  * Returns whether the scene is running in preview mode or not
//  */
// export function isPreviewMode(): Promise<boolean>

// /**
//  * Returns explorer configuration and environment information
//  */
// export function getExplorerConfiguration(): Promise<ExplorerConfiguration>

// /**
//  * Returns what platform is running the scene
//  */
// export function getPlatform(): Promise<Platform>

// /**
//  * Returns Decentraland's time
//  */
// export function getDecentralandTime(): Promise<{ seconds: number }>
