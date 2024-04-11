import { CONFIG } from '../classes/config.class'

export type ClaimConfigInstType = {
  campaign: string
  campaignKeys: Record<string, string>
}

export const USE_CAPTCHA: boolean = true

const TEST_CAMPAIGN_ID = '0x464f38a93a6c34bb85d1915761ef39acdac2197e'
const TEST_CAMPAIGN_KEY = 'ZN3zqBl2RVqp7dolXribbWbjQaKkuU0vhggk18iv3Jc=.taU/DJWHfeWI4kpnQ8Xr8n3N42EFQKqqEHWlK/DBls4='

export const ClaimConfig = {
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
