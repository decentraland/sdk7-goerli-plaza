import {
  Entity,
  engine,
  PointerEvents,
  InputAction,
  PointerEventType,
  inputSystem,
  AudioSource,
  AvatarAttach,
  AvatarAnchorPointType,
} from "@dcl/sdk/ecs"

export function clickedSystem() {
  if (inputSystem.getInputCommand(InputAction.IA_POINTER, PointerEventType.PET_DOWN)) {
    const blasterSound = AudioSource.getMutable(soundPlayer)
    blasterSound.playing = true

    for (const [entity] of engine.getEntitiesWith(EnemyShip)) {
      if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN, entity)) {
        destroyEnemy(entity)
        console.log("HIT ENEMY")
      }
    }
  }
}

const soundPlayer = engine.addEntity()
AudioSource.create(soundPlayer, {
  audioClipUrl: "sounds/blaster.mp3",
  playing: false,
  loop: false,
  volume: 0.5,
})
attachEntity(soundPlayer)

import { getUserData } from "~system/UserIdentity"
import { EnemyShip } from "../components/customComponents"
import { destroyEnemy } from "../enemy"

async function attachEntity(entity: Entity) {
  let userData = await getUserData({})
  if (!userData.data) return
  console.log(userData.data.userId)

  AvatarAttach.create(entity, {
    anchorPointId: AvatarAnchorPointType.AAPT_POSITION,
    avatarId: userData.data.userId,
  })
}
