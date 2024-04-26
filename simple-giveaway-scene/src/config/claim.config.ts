import { CONFIG } from '../classes/config.class'

export type ClaimConfigInstType = {
  campaign: string
  campaignKeys: Record<string, string>
}

export const USE_CAPTCHA: boolean = true


const TEST_CAMPAIGN_ID = 'db56a9ec-cdf7-4656-9d23-f780723a659f'
const TEST_CAMPAIGN_KEY = 'q97vcCt1SNWtLcyeWw528dtWqezN90ZWnSP3gHI6ZZ8=.jQvlHmYmjFMsGbXO5fG01MU75fADrevlPnBg0bi5O3U='

export const ClaimConfig = {
  rewardsServer: 'https://rewards.decentraland.zone',
  campaign: {

    campaign: CONFIG.CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_ID : 'db56a9ec-cdf7-4656-9d23-f780723a659f',
    campaignKeys: {
      KEY_1: CONFIG.CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY : 'q97vcCt1SNWtLcyeWw528dtWqezN90ZWnSP3gHI6ZZ8=.jQvlHmYmjFMsGbXO5fG01MU75fADrevlPnBg0bi5O3U=',
      KEY_2: CONFIG.CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY : 'iy0FzwLqSpSUY9tZOUOZ2NtWqezN90ZWnSP3gHI6ZZ8=.pPieIU9cCPVNa7o3UMh4zoVCHE3mGOaOWFy539FUCwc=',
      KEY_3: CONFIG.CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY : 'kr4lLoYSSa+JXFdMqucv0dtWqezN90ZWnSP3gHI6ZZ8=.tcivbQ9ePwdV/sLBCL408Y4BNykivRcSnj9he0ex8gw='
    }


  }
}
