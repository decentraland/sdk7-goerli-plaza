

export const CONFIG_CLAIM_TESTING_ENABLED = false
export type ClaimConfigInstType = {
    refId: string
    campaign: string
    campaignKeys: Record<string, string>
    startDate?: Date
    endDate?: Date
}

// export const USE_CAPTCHA: boolean = false

// const TEST_CAMPAIGN_ID_ERROR = '7a7c87db-801a-4427-bf2b-2fab3d518b5'
const TEST_CAMPAIGN_ID = '7a7c87db-801a-4427-bf2b-2fab3d518b58'

//non captcha
// const TEST_CAMPAIGN_KEY_ERROR = 'eyJpZCI6IjY2NThmOGRiLWZjNGItNDQyMC05NTUzLWYyZDQxODRjZDY3YiIsImNhbXBhaWduX2lkIjoiN2E3Yzg3ZGItODAxYS00NDI3LWJmMmItMmZhYjNkNTE4YjU4In0=.lu0GNQ/5Tjl4QvAvJuFJ5hhjIPfyaeqVcWluMX/3WyY'
const TEST_CAMPAIGN_KEY = 'eyJpZCI6IjY2NThmOGRiLWZjNGItNDQyMC05NTUzLWYyZDQxODRjZDY3YiIsImNhbXBhaWduX2lkIjoiN2E3Yzg3ZGItODAxYS00NDI3LWJmMmItMmZhYjNkNTE4YjU4In0=.lu0GNQ/5Tjl4QvAvJuFJ5hhjIPfyaeqVcWluMX/3WyY='

export const ClaimConfig = {
    // for production: 'https://rewards.decentraland.org'
    // for testing: 'https://rewards.decentraland.zone'
    rewardsServer: CONFIG_CLAIM_TESTING_ENABLED ? 'https://rewards.decentraland.zone' : 'https://rewards.decentraland.org',
    campaign: {
        CrownChakra: {
            refId: 'CrownChakra',
            campaign: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_ID : '1b306440-981e-4b9b-95d2-18b0837da9dd',
            campaignKeys: {
                key: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY : 'i/yF5OHjRUKUupcIuYTfgxswZECYHkubldIYsIN9qd0=.Lag+uYdalMEYEcSY/NssX4OJ6SqqRx4itzyZBbCMV8k='
            },
            startDate: new Date('2025-04-09T17:00:00Z'),
            endDate: new Date('2025-04-13T13:00:00Z')
        },
        ThroatChakra: {
            refId: 'ThroatChakra',
            campaign: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_ID : '1b306440-981e-4b9b-95d2-18b0837da9dd',
            campaignKeys: {
                key: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY : 'wzF7PSOTTAu6YWJqbCpLtBswZECYHkubldIYsIN9qd0=.i2pmudj3xmdnPls//wZuxB+t/V5ur9tbfOolksbUOsY='
            },
            startDate: new Date('2025-04-09T17:00:00Z'),
            endDate: new Date('2025-04-13T13:00:00Z')
        },

        Jacket: {
            refId: 'Jacket',
            campaign: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_ID : '1b306440-981e-4b9b-95d2-18b0837da9dd',
            campaignKeys: {
                key: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY : 'SJ3Ml9MmTE+1OLCu5QulzBswZECYHkubldIYsIN9qd0=.GAUeFmX4wW/Q6N64+jmyLfZQo5MUq0MgNrv4AHGnxu4='
            },
            startDate: new Date('2025-04-09T17:00:00Z'),
            endDate: new Date('2025-04-13T13:00:00Z')
        }
        
    }
}
