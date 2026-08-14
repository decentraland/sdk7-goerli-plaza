

import { Color3 } from "~system/EngineApi"
import { PBAvatarShape } from "@dcl/ecs"

export type PlayerProfileData = {
    timestamp: number
    avatars: {
        hasClaimedName: boolean
        userId: string
        name: string
        ethAddress: string,
        avatar: {
            bodyShape: string,
            forceRender: string[],
            wearables: string[],
            eyes: {
                color: Color3,
            },
            hair: {
                color: Color3,
            },
            skin: {
                color: Color3,
            }
        }
    }[]
}

export class PlayerDataService {

  
    readonly USER_PROFILE_URL = 'https://peer.decentraland.org/lambdas/profiles'
    
    private _creatorNames: Map<string, string> = new Map()
    
    private static _instance: PlayerDataService
    public static instance(): PlayerDataService {
        if(!PlayerDataService._instance) {
            PlayerDataService._instance = new PlayerDataService()
        }
        return PlayerDataService._instance
    }
    private constructor() {}


    async asyncGetCreatorName(userId: string): Promise<string | undefined> {
        userId = userId.toLowerCase()
        if(this._creatorNames.has(userId)) return this._creatorNames.get(userId)
        try{
            const url = `${this.USER_PROFILE_URL}/${userId}`
            const response = await fetch(url)
            const data = (await response.json()) as PlayerProfileData
            if(data?.avatars && data?.avatars[0]?.name) {
                this._creatorNames.set(userId, data?.avatars[0]?.name)
                return data?.avatars[0]?.name
            }
            else{
                console.error("MarketplaceService: getCreatorName - Unknown name - " + userId)
                return undefined
            }
        }
        catch(error){
            console.error("MarketplaceService: getCreatorName")
            console.error(JSON.stringify(error))
            return undefined
        }
    }
   

}

