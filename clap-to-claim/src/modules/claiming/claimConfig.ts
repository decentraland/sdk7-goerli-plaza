import { CONFIG_CLAIM_TESTING_ENABLED } from "../../global"


export type ClaimConfigInstType = {
    refId: string
    campaign: string
    campaignKeys: Record<string, string>
    startDate?: Date
    endDate?: Date
}

const TEST_CAMPAIGN_ID = '7a7c87db-801a-4427-bf2b-2fab3d518b58'
const TEST_CAMPAIGN_KEY = 'eyJpZCI6IjY2NThmOGRiLWZjNGItNDQyMC05NTUzLWYyZDQxODRjZDY3YiIsImNhbXBhaWduX2lkIjoiN2E3Yzg3ZGItODAxYS00NDI3LWJmMmItMmZhYjNkNTE4YjU4In0=.lu0GNQ/5Tjl4QvAvJuFJ5hhjIPfyaeqVcWluMX/3WyY='


export const ClaimConfig = {
    // for production: 'https://rewards.decentraland.org'
    // for testing: 'https://rewards.decentraland.zone'
    rewardsServer: CONFIG_CLAIM_TESTING_ENABLED ? 'https://rewards.decentraland.zone' : 'https://rewards.decentraland.org',
    campaign: {
        Wearable_1: {
            refId: 'WEARABLE_1',
            campaign: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_ID : 'YOUR_CAMPAIGN_ID',
            campaignKeys: {
                key: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY : 'YOUR_CAMPAIGN_KEY'
            },
            startDate: new Date('2025-04-09T17:00:00Z'),
            endDate: new Date('2030-04-13T13:00:00Z')
        },
        Wearable_2: {
            refId: 'WEARABLE_2',
            campaign: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_ID : 'YOUR_CAMPAIGN_ID',
            campaignKeys: {
                key: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY : 'YOUR_CAMPAIGN_KEY'
            },
            startDate: new Date('2025-04-09T17:00:00Z'),
            endDate: new Date('2030-04-13T13:00:00Z')
        },
        Wearable_3: {
            refId: 'WEARABLE_3',
            campaign: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_ID : 'YOUR_CAMPAIGN_ID',
            campaignKeys: {
                key: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY : 'YOUR_CAMPAIGN_KEY'
            },
            startDate: new Date('2025-04-09T17:00:00Z'),
            endDate: new Date('2030-04-13T13:00:00Z')
        }
    }
}
