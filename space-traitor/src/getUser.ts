import { getRealm } from '~system/Runtime'
import { GameController } from './game.controller'

export class getUserInfo {
  public gameController : GameController
  constructor(gameController : GameController){
    this.gameController = gameController
  }
  async userInfo(){
    if (!this.gameController.connection.userData) {
      await this.gameController.connection.setUserData()
    }
    const { realmInfo } = await getRealm({})
    if (realmInfo?.isPreview) {
      return {
        face128:
          'https://peer.decentraland.org/content/contents/QmcHi6q7N6Ltse4YgFv2WPTMDpKCup3SQAUgQJ2Tjxkitg',
      }
    }
    if(realmInfo){
      let dataURL =
      realmInfo.baseUrl +
      '/lambdas/profiles?field=snapshot&id=' +
      this.gameController.connection.userData.data.userId.toLowerCase()
    console.log('FETCHING THUMB FROM ', dataURL)
    return (await fetch(dataURL)
    .then((res) => {
      try {
        return res.json()
      } catch {
        return null
      }
    })
    .then((res) =>
      res && res.length && res[0].avatars
        ? res[0].avatars[0].avatar.snapshots
        : null
    )) as Snapshots
    }
  }

}

export interface Profiles {
  id: string
  type: string
  timestamp: number
  pointers: string[]
  content: any[]
  metadata: Metadata
}

export interface Metadata {
  avatars: AvatarElement[]
}

export interface AvatarElement {
  userId: string
  email: string
  name: string
  hasClaimedName: boolean
  description: string
  ethAddress: string
  version: number
  avatar: AvatarAvatar
  inventory: string[]
  blocked: string[]
  tutorialStep: number
}

export interface AvatarAvatar {
  bodyShape: string
  snapshots: Snapshots
  eyes: Eyes
  hair: Eyes
  skin: Eyes
  wearables: string[]
  version: number
}

export interface Eyes {
  color: EyesColor
}

export interface EyesColor {
  color: ColorColor
}

export interface ColorColor {
  r: number
  g: number
  b: number
  a: number
}

export interface Snapshots {
  face: string
  face128: string
  face256: string
  body: string
}
