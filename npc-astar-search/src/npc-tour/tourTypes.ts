import { Portal } from "../sceneItems/portal"

export type GridPosition = number[]

export type DayPathData = {
    day: number
    isLastDay?: boolean
    dropLootBox: boolean
    isEventDay: boolean
    currSegment: number
    segmentsAbs: GridPosition[][]
    segmentsRel: GridPosition[][]
    completed: boolean
    completedOn?: number//timestamp in ms
    portals: Record<string, Portal>
}

export type VanishInPortalParams = {
    delayTillNpcEnterPortal: number
    closeSpeed: number
    closePortal: boolean
    playerCanEnter: boolean
    onNpcEnterPortalCallback: () => void
    onPortalCloseCallback: () => void
    onPlayerEnterPortalCallback: () => void
}

export enum TourState {
    NOT_INIT = "not-init",
    TOUR_OFF = "tour-off",
    TOUR_ON = "tour-on",
    PLAYER_FIND_NPC = "player-find-npc",
    NPC_FIND_PLAYER_TO_START = 'npc-find-player-to-ask',
    NPC_ASK_TOUR = 'ask-tour',
    TOURING = 'touring',
    TOURING_WAITING_4_PLAYER = 'touring-waiting4u',
    TOUR_COMPLETE = 'tour-completed',
    NPC_ASK_TOUR_DECLINE = 'tour-declined',
    NPC_ASK_TOUR_ACCEPT = 'tour-accept',
    TOURING_START = 'tour-start',
} 