import *  as  npc from 'dcl-npc-toolkit'
import * as utils from '@dcl-sdk/utils'
import *  as  ui from 'dcl-ui-toolkit'

//import {Grid,Astar} from "fast-astar";
import Grid from '../fast-astar/Grid'
import Astar from '../fast-astar/Astar'
import { CONFIG } from '../config';
import { IntervalUtil } from '../utils/interval-util';
import { NpcAnimationNameDef, REGISTRY } from '../registry'
import { RESOURCES } from '../resources'
import { NPCLerpData, pickRandom } from '../utils/utils'

import { DayPathData, GridPosition, TourState } from './tourTypes'
import * as TOUR_CONSTANTS from './tourConstants'
import { pathTo3D, placeAtEndOfSegment, realDistance, showAtEndOfSegment, toAbsGridPos } from './tourUtils'

import { updateDebugTourInfo } from './debugUI'
import { TourManager } from './tourManager'
import { getAstarCurrentPlayerPosition, getAstarNpcPosition, posEqual } from './astarUtils'
//import { disableTour, enableTour, initRunAwayForDay, spawnRewardForDay, startRunAwayForDay } from './tourSetup'
import { Portal } from '../sceneItems/portal'
import { Transform, engine } from '@dcl/ecs'
import { Quaternion, Vector3 } from '@dcl/ecs-math'
import { teleportTo } from '~system/RestrictedActions'
import { NPCState } from 'dcl-npc-toolkit/dist/types'


const ONE_SECOND_MILLIS = 1000
const pollUserDataInterval = new IntervalUtil(ONE_SECOND_MILLIS / 10);
const logUserSystemInterval = new IntervalUtil(ONE_SECOND_MILLIS / 2);

const updateBreadcrumbInterval = new IntervalUtil(ONE_SECOND_MILLIS / 6);

const maxAwayDistance = TOUR_CONSTANTS.NPC_MAX_AWAY_DISTANCE //when this close start amplifying speed to keep them out of reach
const activateDistance = TOUR_CONSTANTS.NPC_ACTIVATE_DISTANCE //when this close start amplifying speed to keep them out of reach

export class NpcTourSystem {
    lastKnownState: TourState = TourState.NOT_INIT

    constructor() {
        engine.addSystem(this.update)
    }

    update(dt: number): void {
        // const playerCurrentPosition = Transform.get(engine.CameraEntity).position

        if (!pollUserDataInterval.update(dt)) {
            return
        }

        const tourManager = REGISTRY.tourManager
        if (tourManager === undefined) {
            console.log("NpcTourSystem skipped, tourManager not ready", tourManager)
            return
        }

        if (CONFIG.DEBUG_2D_PANEL_ENABLED) updateDebugTourInfo({ astarNpcLoc: getAstarNpcPosition(), astarCurPlayerPos: getAstarCurrentPlayerPosition() })

        //log("NpcTourSystem.state",this.lastKnownState,"vs",tourManager.tourState)
        if (this.lastKnownState != tourManager.tourState) {
            console.log("NpcTourSystem.stateChange.from", this.lastKnownState, "to", tourManager.tourState)

            if (tourManager.tourState == TourState.TOUR_OFF) {
                tourManager.disableTour()
            } else if (!tourManager.isTourEnabled()) {
                //if(tourManager.tourState == TourState.TOUR_INIT){
                tourManager.enableTour()
                //spawn her near you
                //}
            }

            if (tourManager.tourState == TourState.PLAYER_FIND_NPC) {
                tourManager.initRunAwayForDay()

                // const trackUserComponent = NPC.TrackUserFlag
                // trackUserComponent.active = true
            } else if (tourManager.tourState == TourState.NPC_FIND_PLAYER_TO_START) {
                const startPos = getAstarNpcPosition()
                const destPos = getAstarCurrentPlayerPosition()

                tourManager.startAstar(startPos, destPos, true)
            } else if (tourManager.tourState == TourState.NPC_ASK_TOUR) {
                if (CONFIG.DEBUG_UI_ANNOUNCE_ENABLED) ui.createComponent(ui.Announcement, { value: "follow the white rabbit?" })
                REGISTRY.leavingQuestAreaUI.hide()
                //TODO tag:check-w3-can-get
                //"ask-follow-white-rabbit","ask-follow-white-rabbit-next-day","ask-follow-white-rabbit-try-again",
                npc.talk(tourManager.npc, REGISTRY.WhiteRabbitDialog, tourManager.getNPCAskForTourDialog())
                console.log("HEART")
                npc.playAnimation(tourManager.npc, REGISTRY.npcAnimations.HEART_WITH_HANDS.name, true, REGISTRY.npcAnimations.HEART_WITH_HANDS.duration);
            } else if (tourManager.tourState == TourState.NPC_ASK_TOUR_ACCEPT) {
                if (CONFIG.DEBUG_UI_ANNOUNCE_ENABLED) ui.createComponent(ui.Announcement, { value: "lets go" })
                REGISTRY.leavingQuestAreaUI.hide()
                utils.timers.setTimeout(() => {
                    if (REGISTRY.tourManager.tourState != TourState.TOURING
                        && REGISTRY.tourManager.tourState != TourState.TOURING_WAITING_4_PLAYER) {
                        tourManager.setTourState(TourState.TOURING_START)
                    } else {
                        debugger
                    }
                }, 100)
            } else if (tourManager.tourState == TourState.TOURING_START) {
                //const res = findAstarMultiTargetPath(startPos,pathSeedPoints,startIdx);
                //initMultiTargetAstarTour(tourManager)
                tourManager.startRunAwayForDay()
            } else if (tourManager.tourState == TourState.TOURING) {
                if (CONFIG.DEBUG_UI_ANNOUNCE_ENABLED) ui.createComponent(ui.Announcement, { value: "tour go" })
                console.log("tour go")
            } else if (tourManager.tourState == TourState.TOUR_COMPLETE) {
                console.log("tour done!!!")
                if (CONFIG.DEBUG_UI_ANNOUNCE_ENABLED) ui.createComponent(ui.Announcement, { value: "tour done" })

                //TODO tag:check-w3-can-get
                npc.talk(tourManager.npc, REGISTRY.WhiteRabbitDialog, "end-of-the-tour-day-" + tourManager.day)
                npc.playAnimation(tourManager.npc, REGISTRY.npcAnimations.HEART_WITH_HANDS.name, true, REGISTRY.npcAnimations.HEART_WITH_HANDS.duration)

                const playerEnterOffset = (.5 * 1000)

                const currDay = tourManager.day
                const currSegment = tourManager.dayPaths[currDay].currSegment

                const portal = tourManager.getSegmentPortal(currDay, currSegment, "end")

                tourManager.vanishInPortal(
                    portal,
                    {
                        delayTillNpcEnterPortal: REGISTRY.npcAnimations.HEART_WITH_HANDS.duration * 1000 - playerEnterOffset,
                        closeSpeed: Portal.defaultCloseSpeedSeconds,
                        closePortal: !tourManager.isLastDay(),
                        playerCanEnter: tourManager.isLastDay(),
                        onPlayerEnterPortalCallback: () => {
                            //ui.displayAnnouncement("player entered but end of tour!?!?!")
                            //only called if  playerCanEnter == true?  or call either way??? but then ened to do check
                            if (tourManager.isLastDay()) {
                                //TODO tag:check-w3-can-get
                                teleportTo({ worldCoordinates: TOUR_CONSTANTS.TOUR_LAST_DAY_TELEPORT_COORDS })
                            } else {
                                ui.createComponent(ui.Announcement, { value: "Why could she enter the portal but not you?" })
                            }
                        },
                        onPortalCloseCallback: () => {
                            const day = tourManager.day
                            const dayPath = tourManager.dayPaths[day]
                            dayPath.currSegment++

                            //moveFollowThingToStartOfSegment(tourManager)
                            //continueRunAwayForDay(tourManager)
                        },
                        onNpcEnterPortalCallback: () => {
                            //ui.displayAnnouncement("npc.entered")
                            console.log("npc.entered.portal")
                            //trying to time it with portal snapshut
                            utils.timers.setTimeout(
                                () => {
                                    tourManager.spawnRewardForDay()
                                }, 400 + playerEnterOffset)
                        }
                    }
                )
            }
            this.lastKnownState = tourManager.tourState
        }
    }
}

export class NpcProximitySystem {
    lastPlayerRecalcPosition!: GridPosition
    lastNpcRecalcPosition!: GridPosition

    constructor() {
        engine.addSystem(this.update)
    }

    update(dt: number): void {
        //const playerCurrentPosition = Camera.instance.position
        if (pollUserDataInterval.update(dt)) {
            const tourManager = REGISTRY.tourManager;
            if (tourManager === undefined) {
                console.log("NpcProximitySystem skipped, tourManager not ready", tourManager)
                return
            }
            const NPC = npc.getData(tourManager.npc)
            const now = Date.now()
            //log("xxx ")
            const camera = Transform.get(engine.CameraEntity)
            const currentPlayerPos = camera.position //playerCurrentPosition.clone()
            //const newRotation = Camera.instance.rotation.clone()
            const cameraRotation = Quaternion.fromEulerDegrees(0, Quaternion.toEulerAngles(camera.rotation).y + 180, 0)

            //const walkDir = newPos.subtract(lastWalkDir)
            let lerpData: NPCLerpData | null = tourManager.npcLerpData ? tourManager.npcLerpData : null
            const lerpDataValid = (lerpData !== null && lerpData.target < lerpData.path.length)
            // const npcPointerDown = tourManager.npc.getComponent(OnPointerDown)

            // const trackUserComponent = NPC.TrackUserFlag
            const npcTransform = Transform.getMutable(tourManager.npc)
            //const npmDist = npcTransform.position
            const npcDist = realDistance(npcTransform.position, currentPlayerPos)

            let modifiedSpeed = 1 - npcDist / activateDistance
            //let modifiedSpeed = 1 - npcDist/activateDistance
            if (modifiedSpeed < 0) {
                modifiedSpeed = 0
            }

            const startMoving = npcDist < activateDistance
            const stopAndWait = npcDist > maxAwayDistance

            const adjSpeed = TOUR_CONSTANTS.NPC_DEFAULT_WALK_SPEED + (TOUR_CONSTANTS.NPC_DEFAULT_WALK_SPEED * modifiedSpeed) * 10
            //log("distance from npc",npcDist,",tourManager.npc.walkingSpeed",tourManager.npc.walkingSpeed,"modifiedSpeed",modifiedSpeed,"new",adjSpeed)


            if (tourManager.tourState == TourState.NOT_INIT) {
                //cannot be found

            } else if (tourManager.tourState == TourState.PLAYER_FIND_NPC) {
                //log("WAVE",waveInterval.update(dt))
                tourManager.playNpcWaveCome(dt)
            } else if (tourManager.tourState == TourState.NPC_FIND_PLAYER_TO_START) {
                let playerFromEndWalkDist = -1
                if (lerpDataValid) {
                    playerFromEndWalkDist = realDistance(currentPlayerPos, lerpData!.path[lerpData!.path.length - 1])
                }
                //spawn triggers, if player near one, put npc here to start

                //when near enough
                if (npcDist < TOUR_CONSTANTS.NPC_FIND_PLAYER_TO_START_MIN_DIST) {
                    console.log("tour", TourState.NPC_FIND_PLAYER_TO_START, "distance near enough!")
                    tourManager.npcStopWalking()
                    tourManager.setTourState(TourState.NPC_ASK_TOUR);
                } else if (
                    (playerFromEndWalkDist > TOUR_CONSTANTS.NPC_FIND_PLAYER_RECALC_DIST)
                    || (!lerpDataValid && npcDist > TOUR_CONSTANTS.NPC_FIND_PLAYER_RECALC_DIST)) {
                    const destPos = getAstarCurrentPlayerPosition()
                    if (!posEqual(this.lastPlayerRecalcPosition, destPos)) {
                        console.log("tour.RECALC", TourState.NPC_FIND_PLAYER_TO_START, "distance near enough!", "npcDist", npcDist, "playerFromEndWalkDist", playerFromEndWalkDist, "lerpDataValid", lerpDataValid)
                        const startPos = getAstarNpcPosition()

                        this.lastPlayerRecalcPosition = destPos

                        //DONT RECALCULATE THIS A TON! 
                        tourManager.startAstar(startPos, destPos, true)
                    } else {
                        console.log("tour.DONT_RECALC", TourState.NPC_FIND_PLAYER_TO_START, "distance near enough!", "npcDist", npcDist, "playerFromEndWalkDist", playerFromEndWalkDist, "lerpDataValid", lerpDataValid)
                    }
                } else {
                    console.log("tour", TourState.NPC_FIND_PLAYER_TO_START, "distance from npc", npcDist, "player from end", playerFromEndWalkDist, ",tourManager.npc.walkingSpeed", NPC.walkingSpeed, "modifiedSpeed", modifiedSpeed, "new", adjSpeed)
                }
            } else if (tourManager.tourState == TourState.NPC_ASK_TOUR) {

            } else if (tourManager.tourState == TourState.TOURING || tourManager.tourState == TourState.TOURING_WAITING_4_PLAYER) {
                //log("npc","tour",npcDist,"NPC_ACTIVATE_BREADCRUMB_DIST",TOUR_CONSTANTS.NPC_ACTIVATE_BREADCRUMB_DIST,"lerpDataValid",lerpDataValid,"stopAndWait",stopAndWait,"startMoving",startMoving,"tourManager.npc.state ",tourManager.npc.state ,"trackUserComponent.active",trackUserComponent.active)

                /*let playerFromNpcDist = -1
                const npcPosition = getNpcTransform().position
                if(lerpDataValid){
                  playerFromNpcDist = realDistance(currentPlayerPos,npcPosition)
                }*/
                if (npcDist > TOUR_CONSTANTS.NPC_TOO_FAR_AWAY) {//if(!posEqual( this.lastPlayerRecalcPosition,destPos )){
                    if (!tourManager.leavingQuestWarningActive) {
                        tourManager.startLeavingQuestAreaCounter()
                        REGISTRY.leavingQuestAreaUI.show(true)
                    }

                    const timeLeft = tourManager.leavingQuestDeadline - now
                    if (timeLeft > 0) {
                        REGISTRY.leavingQuestAreaUI.show()//passive check
                        REGISTRY.leavingQuestAreaUI.updateText("You are too far away.  Catch up! \nFollow the White Rabbit Quest will end in\n" + (timeLeft / 1000).toFixed(0))
                    } else {
                        REGISTRY.leavingQuestAreaUI.hide()
                        //npc message
                        tourManager.triesToday++
                        npc.talk(tourManager.npc, REGISTRY.WhiteRabbitDialog, "left-quest-area")
                        tourManager.setTourState(TourState.PLAYER_FIND_NPC)
                    }
                } else {
                    tourManager.stopLeavingQuestAreaCounter()
                    REGISTRY.leavingQuestAreaUI.hide()
                }
                if (npcDist > TOUR_CONSTANTS.NPC_ACTIVATE_BREADCRUMB_DIST) {//if(!posEqual( this.lastPlayerRecalcPosition,destPos )){
                    //log("updateBreadcrumbInterval.check",updateBreadcrumbInterval.elapsedTime,dt)
                    if (updateBreadcrumbInterval.update(dt)) {
                        //log("updateBreadcrumbInterval.check",dt)

                        //const startPos = getAstarNpcPosition()
                        tourManager.enableNPCBreadcrumb()

                        const destPos = getAstarNpcPosition()
                        const startPos = getAstarCurrentPlayerPosition()

                        if (!posEqual(this.lastNpcRecalcPosition, destPos) || !posEqual(this.lastPlayerRecalcPosition, startPos)) {
                            console.log("tour.breadcrumb.RECALC", TourState.NPC_FIND_PLAYER_TO_START, "distance near enough!", "npcDist", npcDist, "lerpDataValid", lerpDataValid, this.lastNpcRecalcPosition, destPos)

                            //if( updateBreadcrumbInterval.update(dt) ){
                            this.lastNpcRecalcPosition = destPos
                            this.lastPlayerRecalcPosition = startPos

                            //DONT RECALCULATE THIS A TON! 
                            tourManager.startAstarCrumb(startPos, destPos)
                            //}
                        } else {
                            console.log("tour.breadcrumb.DONT_RECALC", TourState.NPC_FIND_PLAYER_TO_START, "distance near enough!", "npcDist", npcDist, "lerpDataValid", lerpDataValid, this.lastNpcRecalcPosition, destPos, this.lastPlayerRecalcPosition, startPos)
                        }
                    }
                    //this.lastPlayerRecalcPosition = destPos
                } else {
                    tourManager.disableNPCBreadcrumb()
                }

                //dont place till closer to it? placePortalAtEndOfSegment(tourManager)
                //-5 is visit points but the curve points it came up with
                if (lerpDataValid && lerpData !== null && lerpData.target > lerpData.path.length - 5) {
                    tourManager.getCurrentDayEndSegmentPortal().showAtEndOfSegment(tourManager.getCurrentDayEndSegmentPositionAbs())
                    if (tourManager.isCurrentDayHasMoreSegments()) {
                        tourManager.getCurrentDayNextSegmentPortal().showAtStartOfSegment(tourManager.getNextDayStartSegmentPositionAbs())
                    } else {
                        REGISTRY.GIFT.placeAtEndOfSegment(tourManager.getCurrentDayEndSegmentPositionAbs())
                    }
                    //place reward there
                }

                if (stopAndWait) {
                    //beyond runaway distance
                    if (NPC.state != NPCState.STANDING) {
                        tourManager.npcStopWalking()
                        //trackUserComponent.active = false
                    }
                    //tourManager.setTourState(TourState.TOURING_WAITING_4_PLAYER)
                } else if (startMoving) {
                    const doLog = logUserSystemInterval.update(dt)

                    tourManager.setTourState(TourState.TOURING)

                    if (doLog) console.log("npc", "tour", npcDist, "NPC_ACTIVATE_BREADCRUMB_DIST", TOUR_CONSTANTS.NPC_ACTIVATE_BREADCRUMB_DIST, "lerpDataValid", lerpDataValid, "stopAndWait", stopAndWait, "startMoving", startMoving, "tourManager.npc.state ", NPC.state
                        , "lerpData.target", lerpData !== null ? lerpData.target : "-1", lerpData !== null ? lerpData.path.length : "-1")

                    //log("tourManager.npc.state",tourManager.npc.state,lerpData) 
                    if (NPC.state != NPCState.FOLLOWPATH && lerpDataValid) {
                        //resume walking

                        NPC.lastPlayedAnim.stop()
                        if (NPC.walkingAnim) {
                            NPC.walkingAnim.play()
                            NPC.lastPlayedAnim = NPC.walkingAnim
                        }
                        NPC.state = NPCState.FOLLOWPATH
                    } else { //invalid lerp data, done?
                        if (NPC.state != NPCState.FOLLOWPATH) {

                            // console.log("npc", "trackUserComponent.active", "enable", trackUserComponent.active, NPC.state, "lerpDataValid", lerpDataValid)
                            //use onFinishCallback instead?
                            console.log("onFiNpcProximitySystemnishCallback calling tourComplete")
                            //tourComplete()
                        }
                        //tourManager.npcStopWalking()
                    }
                } else {
                    const doLog = logUserSystemInterval.update(dt)
                    if (doLog) console.log("npc", "not sure what to do", npcDist, "tourManager.npc.state ", NPC.state)
                }

                //START HANDING FACE PLAYER LOGIC
                if (stopAndWait) {//|| (!startMoving && !stopAndWait)){
                    // if (NPC.state == NPCState.STANDING && !trackUserComponent.active && (now - tourManager.stoppedWalkingTime) > 500) {
                    //     console.log("npc.look at player", "stopAndWait", stopAndWait, "startMoving", startMoving, "tourManager.npc.state ", NPC.state)
                    //     trackUserComponent.active = true
                    // }
                    //log("WAVE",waveInterval.update(dt))
                    tourManager.playNpcWaveCome(dt)
                } else {
                    //run away
                    // if (NPC.state == NPCState.FOLLOWPATH && trackUserComponent.active) {
                    //     const lastVal = trackUserComponent.active
                    //     trackUserComponent.active = false
                    //     //ensure facing direction again, force a look at
                    //     if (lastVal && lerpDataValid) {
                    //         console.log("npc.look at player.FORCE", "stopAndWait", stopAndWait, "startMoving", startMoving, "tourManager.npc.state ", NPC.state)
                    //         npcTransform.rotation = Quaternion.lookRotation(Vector3.subtract(lerpData!.path[lerpData!.target], npcTransform.position))
                    //     }
                    // }
                }
                //END HANDING FACE PLAYER LOGIC
            }
            //tourManager.npc.walkingSpeed = Math.max( adjSpeed, NPC_DEFAULT_WALK_SPEED)

            //log("dist",dist) 
            //log("angleAxis",walkDirRotation.eulerAngles,dist) 

        }
    }
}