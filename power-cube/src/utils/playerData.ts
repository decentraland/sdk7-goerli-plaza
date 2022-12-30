import { executeTask } from "@dcl/sdk/ecs"
import { getUserData } from "~system/UserIdentity"
export let userId: undefined | string = undefined

executeTask(async () => {
  userId = (await getUserData({})).data?.userId
})
