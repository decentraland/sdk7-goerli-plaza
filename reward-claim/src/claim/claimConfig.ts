import { CONFIG } from '../config'

export type ClaimConfigInstType = {
  campaign: string
  campaignKeys: Record<string, string>
}

export const USE_CAPTCHA: boolean = true

const TEST_CAMPAIGN_ID = 'db56a9ec-cdf7-4656-9d23-f780723a659f'
//'7a7c87db-801a-4427-bf2b-2fab3d518b58'
//non captcha
const TEST_CAMPAIGN_KEY = 'q97vcCt1SNWtLcyeWw528dtWqezN90ZWnSP3gHI6ZZ8=.jQvlHmYmjFMsGbXO5fG01MU75fADrevlPnBg0bi5O3U='
//'eyJpZCI6IjY2NThmOGRiLWZjNGItNDQyMC05NTUzLWYyZDQxODRjZDY3YiIsImNhbXBhaWduX2lkIjoiN2E3Yzg3ZGItODAxYS00NDI3LWJmMmItMmZhYjNkNTE4YjU4In0=.lu0GNQ/5Tjl4QvAvJuFJ5hhjIPfyaeqVcWluMX/3WyY='

export const ClaimConfig = {
  // for production: 'https://rewards.decentraland.org'
  // for testing: 'https://rewards.decentraland.zone'
  rewardsServer: 'https://rewards.decentraland.zone',
  campaign: {
    CAMPAIGN_TEST: {
      campaign: CONFIG.CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_ID : 'PROVIDE_CAMPAIGN_ID_HERE',
      campaignKeys: {
        KEY_0: CONFIG.CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY : 'PROVIDE_PRODUCTION_KEY_HERE'
      }
    }
  }
}
