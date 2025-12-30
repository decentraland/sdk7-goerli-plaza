import { CONFIG } from '../../config'

export type ClaimConfigInstType = {
    refId: string
    campaign: string
    campaignKeys: Record<string, string>
    startDate?: Date
    endDate?: Date
}


// const TEST_CAMPAIGN_ID = 'db56a9ec-cdf7-4656-9d23-f780723a659f'
const TEST_CAMPAIGN_ID = '2909812d-704e-41f6-917f-e1e2d7dbcf7b'
//'7a7c87db-801a-4427-bf2b-2fab3d518b58'
//non captcha
// const TEST_CAMPAIGN_KEY = 'q97vcCt1SNWtLcyeWw528dtWqezN90ZWnSP3gHI6ZZ8=.jQvlHmYmjFMsGbXO5fG01MU75fADrevlPnBg0bi5O3U='
//'eyJpZCI6IjY2NThmOGRiLWZjNGItNDQyMC05NTUzLWYyZDQxODRjZDY3YiIsImNhbXBhaWduX2lkIjoiN2E3Yzg3ZGItODAxYS00NDI3LWJmMmItMmZhYjNkNTE4YjU4In0=.lu0GNQ/5Tjl4QvAvJuFJ5hhjIPfyaeqVcWluMX/3WyY='

const TEST_CAMPAIGN_KEY = 'QUOnKgN+RnqlFRhcafTI1SkJgS1wTkH2kX/h4tfbz3s=.Lv2oPGMDiRzatG37H37icqDwJyMJ5Yn1SoCy/OQmh38='

export const ClaimConfig = {
  // for production: 'https://rewards.decentraland.org'
  // for testing: 'https://rewards.decentraland.zone'
  rewardsServer: 'https://rewards.decentraland.org',
  campaign: {
    CAMPAIGN_TEST: {
      refId: 'TestCampaign',
      campaign: CONFIG.CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_ID : 'PROVIDE_CAMPAIGN_ID_HERE',
      campaignKeys: {
        key: CONFIG.CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY : 'PROVIDE_PRODUCTION_KEY_HERE'
      }
    }
  }
}
