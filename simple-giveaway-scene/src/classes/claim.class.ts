import { getRealm } from '~system/Runtime'
import { signedFetch } from '~system/SignedFetch'
import { ClaimConfig, ClaimConfigInstType, USE_CAPTCHA } from '../config/claim.config'
import * as utils from '@dcl-sdk/utils'
import { getPlayer } from '@dcl/sdk/src/players'
import { gameController } from '../controllers/game.controller'

export class Claim {
  public inTimeOut: boolean = false
  public alreadyClaimed: string[] = []
  public userData: any
  private gameController: gameController
  public campaign: ClaimConfigInstType
  public campaign_key: string
  constructor(gameController: gameController) {
    this.gameController = gameController
    this.campaign = this.gameController.camp
    this.campaign_key = this.gameController.camp.campaignKeys.KEY_0
  }
  setUserData() {
    this.userData = getPlayer()
    console.log('user data is', this.userData)
    if (!this.userData || this.userData.isGuest) {
      // this.gameController.ui.errorUI('You must be\nconnected with an Ethereum wallet\nto claim rewards.')
      return false
    }
    return true
  }
  async claimToken() { 
    // prevent more than 1 request per second
    if (this.inTimeOut) return
  
    this.inTimeOut = true
    utils.timers.setTimeout(() => {
      this.inTimeOut = false
    }, 1000)
  
    // check if this same wearable was already claimed in this session
    const isClaimed = this.alreadyClaimed.find((item) => item === this.campaign_key)
  
    if (isClaimed) {
      this.gameController.ui.alreadyClaimedUI()
      console.log('already claimed')
      return
    }
  
    await this.setUserData()
  
    if (USE_CAPTCHA) {
      const request = await fetch(`https://rewards.decentraland.org/api/captcha`, { method: 'POST' })
      const captcha = await request.json()
      console.log('CAPTCHA DATA: ', captcha)
      this.gameController.ui.captchaUI(captcha.data.image, captcha.data.id, this.campaign, this.campaign_key)
    } else {
      this.requestToken(this.campaign, this.campaign_key)
    }
  }
  async requestToken(campaign: ClaimConfigInstType, campaign_key: string) {
    let METHOD_NAME = 'claimToken'
    const url = ClaimConfig.rewardsServer + '/api/campaigns/' + campaign.campaign + '/rewards'
    console.log(METHOD_NAME, 'sending req to: ', url)
  
    let realm = await getRealm({})
    console.log('realm is', realm.realmInfo)
  
    let body = JSON.stringify({
      campaign_key: campaign_key,
      catalyst: realm.realmInfo ? realm.realmInfo.baseUrl : '',
      beneficiary: !this.userData.isGuest ? this.userData.userId : ''
    })
  
    try {
      let response: any = null
      console.log(METHOD_NAME, 'signedFetch')
      response = await signedFetch({
        url: url,
        init: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body
        }
      })
  
      console.log(METHOD_NAME, 'Reward received resp body: ', response)
  
      await this.processResponse(response, campaign_key)
    } catch (error) {
      console.log(METHOD_NAME, 'error fetching from token server ', url)
      console.log(METHOD_NAME, 'error', error)
    }
  }
  async processResponse(response: any, campaign_key: string) {
    if (!response || !response.body) {
      throw new Error('Invalid response')
    }
    let json = await JSON.parse(response.body)
    console.log('Reward received json: ', json)
  
    if (json.ok === false) {
      console.log('ERROR:' + json.error)
      this.gameController.ui.errorUI(json.error ? this.gameController.ui.breakLines(json.error, 20) : 'Invalid response')
    }
  
    this.alreadyClaimed.push(campaign_key)
  
    this.gameController.ui.confirmationUI(json.data[0].image, json.data[0].token)
  }
  async validateCaptcha(
    captcha: string,
    captcha_id: string,
    campaign: ClaimConfigInstType,
    campaign_key: string
  ) {
    const user = await getPlayer()
    let realm = await getRealm({})
    console.log('realm is', realm.realmInfo)
    if (!user || user.isGuest || !realm) {
      this.gameController.ui.errorUI('You must be\nconnected with an Ethereum wallet\nto claim rewards.')
      return
    }
  
    const response = await signedFetch({
      url: 'https://rewards.decentraland.org/api/rewards',
      init: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          campaign_key: campaign_key,
          catalyst: realm.realmInfo ? realm.realmInfo.baseUrl : '',
          beneficiary: !this.userData.isGuest ? this.userData.userId : '',
          captcha_id: captcha_id,
          captcha_value: captcha
        })
      }
    })
  
    if (!response || !response.body) {
      return false
    }
    let json = await JSON.parse(response.body)
    console.log(json)
  
    if (json.ok === false) {
      console.log('ERROR:' + json.error)
      this.gameController.ui.errorUI(json.error ? this.gameController.ui.breakLines(json.error, 20) : 'Invalid response')
      return false
    }
    
    this.alreadyClaimed.push(campaign_key)
    let update = await this.gameController.updateWearableData();
    if(update?.status === 200){
      this.gameController.ui.updatePlayerData()
      this.gameController.ui.confirmationUI(json.data[0].image, json.data[0].token)
    } else {
      const errorMessage  = await update?.text() ?? "Error undefined"
      this.gameController.ui.errorUI(errorMessage ? this.gameController.ui.breakLines(errorMessage, 20) : 'Invalid response')
    }

    
  }

}



