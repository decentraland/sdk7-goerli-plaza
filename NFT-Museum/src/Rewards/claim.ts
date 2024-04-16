import { getRealm } from "~system/Runtime"
import { signedFetch } from "~system/SignedFetch"
import { ClaimConfig, ClaimConfigInstType } from "./claimConfig"
import { getUserData } from "~system/UserIdentity"
import * as utils from '@dcl-sdk/utils'

let inTimeOut: boolean = false

let alreadyClaimed: string[] = []


let userData: any
export async function setUserData() {
	userData = await getUserData({})
	console.log('user data is', userData)
}

export async function claimToken(campaign: ClaimConfigInstType, campaign_key: string) {

	// prevent more than 1 request per second
	if (inTimeOut) return

	inTimeOut = true
	utils.timers.setTimeout(() => {
		inTimeOut = false
	}, 1000)

	// check if this same wearable was already claimed in this session
	const isClaimed = alreadyClaimed.find(item => item === campaign_key)

	if (isClaimed) {
		//alreadyClaimedUI()
		console.log('already claimed')
		return
	}

	await setUserData()

	let METHOD_NAME = "claimToken"

	const url = ClaimConfig.rewardsServer + '/api/campaigns/' + campaign.campaign + '/rewards'
	console.log(METHOD_NAME, 'sending req to: ', url)

	let realm = await getRealm({})
	console.log('realm is', realm.realmInfo)

	let body = JSON.stringify({
		campaign_key: campaign_key,
		catalyst: realm.realmInfo ? realm.realmInfo.baseUrl : "",
		beneficiary: userData.data.hasConnectedWeb3 ? userData.data.userId : "",
	})

	try {
		let response: any = null
		console.log(METHOD_NAME, 'signedFetch')
		response = await signedFetch({
			url: url, init: {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: body,
			}
		})

		console.log(METHOD_NAME, 'Reward received resp body: ', response)

		await processResponse(response, campaign_key)

	} catch (error) {
		console.log(METHOD_NAME, 'error fetching from token server ', url)
		console.log(METHOD_NAME, "error", error)
	}
}

async function processResponse(response: any, campaign_key: string) {
	if (!response || !response.body) {
		throw new Error('Invalid response')
	}
	let json = await JSON.parse(response.body)

	console.log('Reward received json: ', json)

	alreadyClaimed.push(campaign_key)

	//openUI(json.data[0].image, json.data[0].token)

	// test
	//openUI('images/scene-thumbnail.png', 'Wearable Name')
}