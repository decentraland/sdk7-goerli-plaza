import {
  ColorString,
  Snapshots,
  AvatarForUserData,
  UserData,
  getPlayerData,
  getConnectedPlayers,
  getPlayersInScene
} from '@decentraland/Players'

getPlayerData({ userId: '0x03eb0bef2bdbc89bff468f5bd6e6b559f3bb61e6' })
  .then((...result) => dcl.log('Value of Players.getPlayerData', result))
  .catch((err) => dcl.error('Players.getPlayerData error', err))

getConnectedPlayers()
  .then((...result) => dcl.log('Value of Players.getConnectedPlayers', result))
  .catch((err) => dcl.error('Players.getConnectedPlayers error', err))

getPlayersInScene()
  .then((...result) => dcl.log('Value of Players.getPlayersInScene', result))
  .catch((err) => dcl.error('Players.getPlayersInScene error', err))

// export type ColorString = string

// export type Snapshots = {
//   // @deprecated
//   face: string
//   // @deprecated
//   face256: string
//   // @deprecated
//   face128: string
//   // @deprecated
//   body: string
// }

// export type AvatarForUserData = {
//   bodyShape: WearableId
//   skinColor: ColorString
//   hairColor: ColorString
//   eyeColor: ColorString
//   wearables: WearableId[]
//   snapshots: Snapshots
// }

// export type UserData = {
//   displayName: string
//   publicKey: string | null
//   hasConnectedWeb3: boolean
//   userId: string
//   version: number
//   avatar: AvatarForUserData
// }

// /**
//  * Return the players's data
//  */
// export function getPlayerData(opt: { userId: string }): Promise<UserData | null>

// /**
//  * Return array of connected players
//  */
// export function getConnectedPlayers(): Promise<{ userId: string }[]>

// /**
//  * Return array of players inside the scene
//  */
// export function getPlayersInScene(): Promise<{ userId: string }[]>
