import { executeTask } from "@dcl/sdk/ecs"
import { getRealm } from '~system/Runtime'


executeTask(async () => {
  const realm = await getRealm({})
  console.log('You are in the realm: ' + JSON.stringify(realm) + ' baseUrl:' + realm?.baseUrl)
})
