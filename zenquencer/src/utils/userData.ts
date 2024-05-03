//import { GAME_STATE } from 'src/state'

import { EnvironmentRealm, getCurrentRealm } from '~system/EnvironmentApi'
import { UserData } from '~system/Players'
import { getUserData } from '~system/UserIdentity'

//TODO MOVE TO GAME STATE
let userData: UserData
export let playerRealm: EnvironmentRealm

export function initUserData() {}

export function getAndSetUserDataIfNullNoWait() {
  if (!getUserDataFromLocal()) {
    getAndSetUserData() //not calling await, hoping its fast
  }
  return getUserDataFromLocal()
}

export function getUserDataFromLocal(): UserData | null {
  return userData
}
export function getRealmDataFromLocal(): EnvironmentRealm | null {
  return playerRealm
}

export async function getAndSetUserData() {
  const data = await getUserData({})
  if (data && data.data) {
    console.log('getAndSetUserDataIfNullNoWait.yyy', data, data)
    //GAME_STATE.playerState.setDclUserData( data )
    userData = data.data
  }
  return data
}

// fetch the player's realm
export async function setRealm() {
  let realm = await getCurrentRealm({})
  if (realm && realm.currentRealm) {
    console.log(`You are in the realm: ${JSON.stringify(realm.currentRealm)}`)
    //GAME_STATE.playerState.setDclUserRealm( realm )
    playerRealm = realm.currentRealm
  }
}

// fetch the player's realm
export async function getRealm() {
  let realm = await getCurrentRealm({})
  console.log(`You are in the realm: ${JSON.stringify(realm.currentRealm)}`)
  return realm.currentRealm
}

/*
onRealmChangedObservable.add(async (realmData) => {
  if (realmData && realmData.room) {
    log('PLAYER CHANGED ISLAND TO ', realmData.room)
    //myConnectSystem.connected = true
    //log('CONNECTING TO WS SERVER')
    GAME_STATE.playerState.setDclUserRealm( {...realmData,layer:''} )
  }
})*/
