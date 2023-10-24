import * as showMgmt from 'show-manager/src'
import { DemoShowSubs } from './subtitle-files/DemoShowSubs'
import { IntermissionSubs } from './subtitle-files/IntermissionSubs'

export let FAKING_LOCALLY: boolean = false
// Video to display as background while no show is playing
export const DEFAULT_VIDEO =
  'https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252'

// Video schedule

const defaultShow: showMgmt.ShowType = {
  id: -1,
  title: 'Intermission',
  artist: 'Intermission',
  link: DEFAULT_VIDEO,
  subs: IntermissionSubs,
  startTime: -1,
  length: 17,
  loop: true
}

//showing how a show can be mid play, and show will skip to it correct starting point
const testStartTime = new Date(Date.now() + 5 * 1000).getTime() / 1000

const testStartTime2 = new Date(Date.now() + 40 * 1000).getTime() / 1000

const testStartTime3 = new Date(Date.now() + 80 * 1000).getTime() / 1000

export const shows: showMgmt.ShowType[] = [
  {
    id: 1,
    title: 'Demo Show',
    artist: 'Demo Show',
    link: `videos/tunnelVisuals.mp4`,
    subs: DemoShowSubs,
    startTime: testStartTime,
    length: 28
  },
  {
    id: 2,
    title: 'Demo Show2',
    artist: 'Demo Show2',
    link: `videos/tunnelVisuals.mp4`,
    subs: DemoShowSubs,
    startTime: testStartTime2,
    length: 28
  },

  {
    id: 3,
    title: 'Demo Show3',
    artist: 'Demo Show3',
    link: `videos/tunnelVisuals.mp4`,
    subs: DemoShowSubs,
    startTime: testStartTime3,
    length: 28
  },
  defaultShow
]

export const showData: showMgmt.ShowDataType = {
  defaultShow: defaultShow,
  shows: shows
}
