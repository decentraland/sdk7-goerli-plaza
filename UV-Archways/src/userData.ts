import { UserData, getUserData } from '~system/UserIdentity'
import { EnvironmentRealm, getCurrentRealm } from '~system/EnvironmentApi'
import { onRealmChangedObservable } from '@dcl/sdk/observables'

let userData: UserData
let playerRealm: EnvironmentRealm


export function getRealmDaraFromLocal(): EnvironmentRealm | null {
    return playerRealm
}

export function getUserDataFromLocal(): UserData | null {
    return userData
}

export function getAndSetUserDataIfNullNoWait() {
    if (!getUserDataFromLocal()) {
        getAndSetUserDataIfNullNoWait()
    }
}

export async function getAndSetUserData() {
    const data = (await getUserData({})).data
    if (data) {
        console.log(data.publicKey)
        userData = data
    }
    return data
}

//fetch player's realm
export async function setRealm() {
    let realm = (await getCurrentRealm({})).currentRealm
    if (realm) {
        console.log('You are in realm: ', realm.displayName)
        playerRealm = realm
    }
}

onRealmChangedObservable.add(async (realmData) =>{
    if (realmData && realmData.room) {
        console.log('Player changed island to ', realmData.room)
    }
})