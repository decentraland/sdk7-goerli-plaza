import { executeTask } from "@dcl/sdk/ecs"
import { getRealm } from '~system/Runtime'


executeTask(async () => {
  const { realmInfo } = await getRealm({})
  console.log('You are in the realm: ' + JSON.stringify(realmInfo) + ' baseUrl:' + realmInfo.realmInfo?.baseUrl)
})
