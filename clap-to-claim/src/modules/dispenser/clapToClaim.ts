import { AvatarEmoteCommand, engine } from "@dcl/sdk/ecs"
import * as utils from '@dcl-sdk/utils'
import { DispenserComponent } from "./dispensers"
import { claimToken } from "../claiming/claim"


export function initClapToClaim(){
    AvatarEmoteCommand.onChange(engine.PlayerEntity, (emote) => {
		if (!emote) return
		console.log('Emote played: ', emote.emoteUrn)

        if(emote.emoteUrn === 'clap'){

            utils.timers.setTimeout(() => {
                const dispensers = engine.getEntitiesWith(DispenserComponent)
                
                for(const [dispenser, dispenserComponent] of dispensers){
                    if(dispenserComponent.isActive){
                        claimToken(
                            {
                                refId: dispenserComponent.campaignId,
                                campaign: dispenserComponent.campaignId,
                                campaignKeys: {
                                    key: dispenserComponent.campaignKey
                                },
                                startDate: dispenserComponent.startDate? new Date(dispenserComponent.startDate) : undefined,
                                endDate: dispenserComponent.endDate? new Date(dispenserComponent.endDate) : undefined,
                            }, 
                            dispenserComponent.campaignKey
                        )
                    }
                }
            }, 1500)

        }
	})
}