import { executeTask } from '@dcl/sdk/ecs'
import { getRealm, PBRealmInfo } from '~system/Runtime'
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import { RealmUI, updateRealmText } from './ui'

// Set up the UI renderer
ReactEcsRenderer.setUiRenderer(RealmUI)

executeTask(async () => {
  let realm = await getRealm({})
  let realmInfo = realm.realmInfo as (PBRealmInfo & { domain: string }) | undefined
  
  // Update the display text
  const displayText = 'You are in the realm: ' + JSON.stringify(realmInfo) + ' baseUrl:' + realmInfo?.baseUrl
  
  // Update the UI text
  updateRealmText(displayText)
  
  console.log(displayText)
})
