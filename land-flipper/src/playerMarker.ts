import { Color4 } from "@dcl/sdk/math";
import { MY_COLOR, setMyColor } from "./systems";
import { generateHexColor } from "./utils";
import { myProfile, parentEntity, syncEntity } from "@dcl/sdk/network";
import { AvatarAnchorPointType, AvatarAttach, Entity, Material, MeshRenderer, PBAvatarAttach, Transform, engine } from "@dcl/sdk/ecs";

export function createMarker(player: string) {

  setMyColor()

  const markerParent = engine.addEntity()
  AvatarAttach.create(markerParent, { avatarId: player, anchorPointId: AvatarAnchorPointType.AAPT_NAME_TAG })


  const marker = engine.addEntity()
  Transform.create(marker, {
    scale: { x: 0.25, y: 0.5, z: 0.25 },
    position: { x: 0, y: 0.7, z: 0 },
    parent: markerParent
  })
  MeshRenderer.setCylinder(marker, 0, 1)
  Material.setPbrMaterial(marker, { albedoColor: MY_COLOR })


  // syncEntity(engine.PlayerEntity, [Transform.componentId])

  // syncEntity(marker, [Material.componentId, MeshRenderer.componentId, Transform.componentId])
  // parentEntity(marker, engine.PlayerEntity)




}