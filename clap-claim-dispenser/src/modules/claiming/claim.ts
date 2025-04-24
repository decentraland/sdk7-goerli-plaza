import { getRealm, PBRealmInfo } from '~system/Runtime'
import { signedFetch } from '~system/SignedFetch'
import { ClaimConfig, ClaimConfigInstType, CONFIG_CLAIM_TESTING_ENABLED } from './claimConfig'
import { getUserData } from '~system/UserIdentity'
import * as utils from '@dcl-sdk/utils'
import { activeUiType, alreadyClaimedUi, endedUi, errorUi, notStartedUi, successUi, UiType, waitingUi } from './ui/dispenserUi'

let inTimeOut: boolean = false

let alreadyClaimed: string[] = []

let userData: any
export async function setUserData() {
    let METHOD_NAME = 'setUserData.'
    userData = await getUserData({})
    console.log(METHOD_NAME, 'User data is', userData)
    if (!userData || !userData.data || !userData.data.publicKey) {
        errorUi('You must be connected with an Ethereum wallet to claim rewards.')
        return false
    }
    return true
}

export async function claimToken(campaign: ClaimConfigInstType, campaign_key: string) {
    // prevent more than 1 request per second
    if (inTimeOut) return

    inTimeOut = true
    utils.timers.setTimeout(() => {
        inTimeOut = false
    }, 3000)

    // check if this same wearable was already claimed in this session
    const isClaimed = alreadyClaimed.find((item) => item === campaign_key)

    if (isClaimed) {
        alreadyClaimedUi()
        console.log('already claimed')
        return
    }

    let userDataSet = await setUserData()
    if(!userDataSet) return

    waitingUi()

    let result = await requestToken(campaign, campaign_key)
    return result
}

async function requestToken(campaign: ClaimConfigInstType, campaign_key: string) {
    let METHOD_NAME = 'requestToken.'


    const url = 
    (CONFIG_CLAIM_TESTING_ENABLED)? 
        ClaimConfig.rewardsServer + '/api/campaigns/' + campaign.campaign + '/rewards' :  
        ClaimConfig.rewardsServer + '/api/rewards?campaign_id=' + campaign.campaign

    let realm = await getRealm({})
    let realmInfo = realm.realmInfo as (PBRealmInfo & {domain: string}) | undefined

    let body = JSON.stringify({
        campaign_key: campaign_key,
        // catalyst: realm.realmInfo ? realm.realmInfo.baseUrl : '',
        // catalyst: 'https://realm-provider-ea.decentraland.org',
        catalyst: realmInfo ? realmInfo.baseUrl ?? realmInfo.domain : '',
        beneficiary: userData.data.hasConnectedWeb3 ? userData.data.userId : ''
    })

    // console.log(METHOD_NAME, 'sending req to: ', url, '\nbody:', JSON.stringify(body))

    let response: any = null
    try {
        response = await signedFetch({
        url: url,
        init: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        }
        })

        //console.log(METHOD_NAME, 'Reward received resp body: ', JSON.stringify(response))

        let result = await processResponse(response, campaign_key, campaign)
        console.log(METHOD_NAME, 'Result:', result)
        return result
    }
    catch (error) {
        // any response error is already catched on processResponse.
        if(activeUiType !== UiType.ERROR){
            errorUi('Error fetching reward server.' + error)
        }
    }
}

async function processResponse(response: any, campaign_key: string, campaign: ClaimConfigInstType) {
    let METHOD_NAME = 'processResponse.'

    if (!response || !response.body) {
        errorUi(JSON.stringify('Error fetching reward server.\nInvalid response.'))
        return false
        // throw new Error('Invalid response')
    }
    if(
        (response.body as string).includes && 
        (
            (response.body as string).includes('uninitiated') || 
            (response.body as string).includes('disabled') ||
            (response.body as string).includes('finished')
        )
    ){
        if(campaign.startDate && isCampaignEarly(campaign)){
            notStartedUi(campaign.startDate)
            return false
        }
        if(campaign.endDate && isCampaignLate(campaign)){
            endedUi(campaign.endDate)
            return false
        }
        
    }
    try{
        console.log(METHOD_NAME, 'response.body: ', response.body)
        let json = await JSON.parse(response.body)
        console.log(METHOD_NAME, 'response json: ', json)

        // result error
        if (json.ok === false) {
            console.log('ERROR:' + json.code + json.error)
            // errorUi(json.code ? json.code : 'Invalid response')
            if(
                (
                    json.code == 'campaign_key_uninitiated' || 
                    json.code == 'campaign_disabled' ||
                    (response.body as string).includes('uninitiated') || 
                    (response.body as string).includes('disabled') ||
                    (response.body as string).includes('finished')
                )
            ){
                if(campaign.startDate && isCampaignEarly(campaign)){
                    notStartedUi(campaign.startDate)
                    return false
                }
                if(campaign.endDate && isCampaignLate(campaign)){
                    endedUi(campaign.endDate)
                    return false
                }
            }
            errorUi(json.error ? json.error : json.code ? json.code : 'Invalid response')
            return false
        }
        // result ok but out of stock
        else if(json && json.ok && json.data && !json.data[0] && !json.error){
            errorUi('Item is out of stock.')
            return false
        }
        // result success
        else if(json && json.ok && json.data && json.data[0] && !json.error){
            // TODO: check wearable assigned date to check if user already claimed the wearable from dispenser

            alreadyClaimed.push(campaign_key)
            successUi(json.data[0].image, json.data[0].token)
            return true
        }
    }
    catch(error){
        errorUi(JSON.stringify(response.body))
        return false
    }

}

export function isCampaignEarly(campaign: ClaimConfigInstType){
    if(!campaign.startDate) return false
    return new Date() < campaign.startDate
}

export function isCampaignLate(campaign: ClaimConfigInstType){
    if(!campaign.endDate) return false
    return new Date() > campaign.endDate
}
