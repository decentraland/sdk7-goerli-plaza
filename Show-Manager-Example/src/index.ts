import { GltfContainer, Transform, engine } from "@dcl/sdk/ecs";
import { setupUi } from "./ui";
import { Quaternion, Vector3 } from "@dcl/sdk/math";
import { createDanceAreas } from './modules/createDanceAreas'
import { createShowEntities } from "./modules/showMgmt/showEntities";
import { setupShow } from "./modules/showMgmt/showSetup";
import { ShowStatusDisplays } from "./modules/showStatusDisplays";
import { VideoScreens } from "./modules/videoScreens";

export function main() {
  setupUi()

  const scene = engine.addEntity()
  Transform.create(scene)

  // Ground
  const ground = engine.addEntity()
  Transform.create(ground, {
    parent: scene,
    position: Vector3.create(8, 0, 8),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.One()
  })
  GltfContainer.create(ground, {
    src: 'models/FloorBaseGrass_01/FloorBaseGrass_01.glb' 
  })

  // Static Structure
  const structure = engine.addEntity()
  Transform.create(structure, {
    parent: scene,
    position: Vector3.create(8, 0, 8),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.One()
  })
  GltfContainer.create(structure, {
    src: 'models/staticStructure.glb' 
  })

  VideoScreens.Initialise()
  ShowStatusDisplays.Initialise()
  createDanceAreas()
  setupShow()
  createShowEntities()
}
