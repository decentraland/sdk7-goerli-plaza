import {
  ColliderLayer,
  engine,
  InputAction,
  Material,
  MeshCollider,
  MeshRenderer,
  pointerEventsSystem,
  Transform,
  VideoPlayer
} from '@dcl/sdk/ecs'
import { } from '@dcl/sdk/math'
import { setupUi } from './ui'
import { EntityNames } from '../assets/scene/entity-names'
import { getTriggerEvents, getActionEvents } from '@dcl/asset-packs/dist/events'

export function main() {

  // fetch screens from editor
  const screen = engine.getEntityOrNullByName(EntityNames.Video_Screen)

  if (screen) {
  }

  // UI with GitHub link
  // setupUi()
}


// Other video links:
//'https://vz-8a0704eb-552.b-cdn.net/bf77e515-7998-4040-85be-c863b5c65111/playlist.m3u8'

//'https://vz-8a0704eb-552.b-cdn.net/868d1f35-9036-4985-9a3f-73d4498213a5/playlist.m3u8'
