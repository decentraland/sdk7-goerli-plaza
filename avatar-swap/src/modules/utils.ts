import { AvatarAnchorPointType, AvatarAttach, Entity } from "@dcl/sdk/ecs";
import { getUserData } from "~system/UserIdentity"

export async function attachEntityToPlayer (entity: Entity){
    let userData = await getUserData({})
    if(!userData.data) return
    console.log(`userId: ${userData.data.userId}`)

    AvatarAttach.create(entity, {
        anchorPointId: AvatarAnchorPointType.AAPT_POSITION,
        avatarId: userData.data.userId
    })
}