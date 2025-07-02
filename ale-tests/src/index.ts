import { executeTask } from '@dcl/sdk/ecs'
import { getRealm, PBRealmInfo } from '~system/Runtime'


executeTask(async () => {
  let realm = await getRealm({})
  let realmInfo = realm.realmInfo as (PBRealmInfo & { domain: string }) | undefined
  console.log('You are in the realm: ' + JSON.stringify(realmInfo) + ' baseUrl:' + realmInfo?.baseUrl)
})
