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
//'https://player.vimeo.com/external/878776484.m3u8?s=0b62be8cfb1d35f8bf30fcb33170a6f3a86620fe&logging=false'

//'https://player.vimeo.com/external/552481870.m3u8?s=c312c8533f97e808fccc92b0510b085c8122a875'
