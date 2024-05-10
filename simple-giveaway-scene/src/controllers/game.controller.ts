import { getUserData } from '~system/UserIdentity'
import { airdropWearable } from '../classes/airdrop.class'
import { addUser, getPlayerData, updatePlayerData } from '../functions/server.function'
import { UI } from '../classes/ui.class'
import { Claim } from '../classes/claim.class'
import { ClaimConfig } from '../config/claim.config'
import { setUpScenes } from '../classes/scene.class'

export class gameController {
  public ui: UI
  public airdrop_1: airdropWearable
  public airdrop_2: airdropWearable
  public airdrop_3: airdropWearable
  public userId: any
  public playerData: any
  public placeholder: any
  public claim: Claim
  public camp = ClaimConfig.campaign
  public scene: setUpScenes
  constructor() {
    this.ui = new UI(this)
    //Create as many airdrops you want
    this.airdrop_1 = new airdropWearable(
      this,
      'assets/scene/models/crate_eth.glb',
      'assets/scene/models/parachute_jungle.glb',
      this.camp,
      this.camp.campaignKeys.KEY_1
    )
    this.airdrop_2 = new airdropWearable(
      this,
      'assets/scene/models/crate_eth.glb',
      'assets/scene/models/parachute_jelly.glb',
      this.camp,
      this.camp.campaignKeys.KEY_2
    ) //Replace Key from Nico E
    this.airdrop_3 = new airdropWearable(
      this,
      'assets/scene/models/crate_eth.glb',
      'assets/scene/models/parachute_meta.glb',
      this.camp,
      this.camp.campaignKeys.KEY_3
    ) //Replace Key from Nico E
    this.claim = new Claim(this)
    this.scene = new setUpScenes(this)
  }
  async user() {
    let userData = await getUserData({})
    this.userId = userData.data?.publicKey
    this.playerData = await addUser(this.userId)
    return this.playerData
  }
  async updateWearableData() {
    let userData = await getUserData({})
    this.userId = userData.data?.publicKey
    let response = await updatePlayerData(this.userId)
    return response
  }
  async fetchPlayerData() {
    let userData = await getUserData({})
    this.userId = userData.data?.publicKey
    this.playerData = await getPlayerData(this.userId)
    return this.playerData
  }
}
