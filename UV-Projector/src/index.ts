import { Projector } from "./modules/projector";
import { Screen, ScreenGroup, ColumnScreen } from "./modules/screens";
import { uvMat } from "./modules/materials";
import { uiInstruction } from './ui';
import { engine, GltfContainer, Transform} from "@dcl/sdk/ecs";
import { Vector3, Quaternion } from "@dcl/sdk/math";

export function main() {

  // set up two invisible projector planes, which determine the size and position of the video being projected onto the screens themselves
  //make sure this projector's rotation is facing the TV created later on, and that its scale is also big enough to cover the whole stack
  let projectorScatterTVs = new Projector(
    {
      position: Vector3.create(16, 4, 16),
      scale: Vector3.create(22, 9, 1),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0)
    },
    true
  )

  let projectorColumns = new Projector(
    {
      position: Vector3.create(16, 5, 16),
      scale: Vector3.create(12, 12.5, 1),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0)
    },
    true
  )

  //assign each projector to a specific group of screens
  let ScreenGrpColumns = new ScreenGroup(projectorColumns)
  let ScreenGrpScatterTvs = new ScreenGroup(projectorScatterTVs)

  function addTVScreens(_rows: number, _columns: number, radius: number, center: Vector3, _rot: number) {

    let pos = Vector3.create(0, 0, 1) //used as an iterator for each TVs position 
    let screenHeight = 1.8 //each TVs Height
    let screenWidth = 3.8 //width
    let heightStep = screenHeight * 1.1 //vertical distance between rows of TVs
    let angleRange = 75 // angle range spread of the curved TV stack

    let heightBase = screenHeight / 2 // vertical position of the bottom row of TVs
    let height = 0 // iterator for row heights
    let angleStep = angleRange / (_columns - 1) // angle increment between TVs in the same row (based on the range set above)
    let angle = _rot - angleStep * (_columns / 2) + angleStep / 2 // starting angle based on the initial rotation out of 360

    let currentAngle = -125 //iterator for the angle offset for each TV in the same row

    for (let i = 0; i < _rows; i++) {

      // step higher with each row of TVs
      height = heightBase + i * heightStep

      for (let j = 0; j < _columns - i % 2; j++) {

        //rotate each TV in a row around the center point
        currentAngle = angle + j * angleStep

        //offset the angles of odd rows to create a nice stacked look 
        if (i % 2 == 1) {
          currentAngle = angle + j * angleStep + angleStep / 2
        }

        let offset = Math.random() * 0.75 //front/back offset per TV, 0 for linear wall

        // calculate the position of each TV (rotate a vector around the center and scale it to the given radius, with a slight random offset)
        //pos = Vector3.scale((Vector3.rotate(Vector3.add(center, Vector3.Backward()), Quaternion.fromEulerDegrees(0, currentAngle, 0))), (radius - offset))
        pos = Vector3.add((Vector3.rotate((Vector3.scale(Vector3.Forward(), (radius - offset))), Quaternion.fromEulerDegrees(0, currentAngle, 0))), center)

        //create the actual screen with the above parameters
        //let uvs: number[] = ScreenGrpScatterTvs.updateScreens(Transform.getMutable(projectorScatterTVs.parent).position)
        let screen = new Screen({
          position: Vector3.create(pos.x, center.y + height, pos.z),
          rotation: Quaternion.fromEulerDegrees(0, currentAngle + Math.random() * 10 - 5, 1),
          scale: Vector3.create(screenWidth + Math.random() * 0.1, screenHeight + Math.random() * 0.1, 1)
        },
          true,
          uvMat
        )

        // assign all TVs to the same screen group
        ScreenGrpScatterTvs.addScreen(screen)

        // you can parent a mesh to the screen to add a nice frame to it (but never parent the screen itself to anything!!)
        let TVMesh = engine.addEntity()
        GltfContainer.create(TVMesh, { src: 'models/screen_bg.glb' })
        Transform.create(TVMesh, {
          position: Vector3.create(0, 0, 0),
          rotation: Quaternion.fromEulerDegrees(0, 180, 0),
          scale: Vector3.create(1, 1, 1),
          parent: screen.parent,
        })
      }
      
    }

  }

  function addColumnGrid(_rows: number, _columns: number, _center: Vector3) {
    const columnScale = 0.75
    const columnBaseHeight = 0
    const columnHeight = 10
    const columnSpacing = 2

    let sizeRows = columnSpacing * (_rows - 1)
    let sizeColumnss = columnSpacing * (_columns - 1)
    let origin = Vector3.create(_center.x - sizeRows / 2, _center.y, _center.z - sizeColumnss / 2)

    for (let i = 0; i < _rows; i++) {
      for (let j = 0; j < _columns; j++) {

        new ColumnScreen(
          ScreenGrpColumns,
          Vector3.create(
            origin.x + j * columnSpacing + Math.random() - 0.5,
            columnBaseHeight,
            origin.z + i * columnSpacing + Math.random() - 0.5
          ),
          columnScale * Math.random() + 0.5,
          columnHeight,
          false,
          uvMat)
      }
    }
  }


  function LiveProjectorSystem() {

    const player = Transform.getMutable(engine.CameraEntity)

    //get the current transformations of the projector planes
    const projectorColumnsTransform = Transform.getMutable(projectorColumns.parent)

    //rotate projector planes to face the player
    projectorColumnsTransform.rotation = Quaternion.fromLookAt(projectorColumnsTransform.position, player.position)

    //reproject all UV coordinates on all planes in both screen groups
    ScreenGrpColumns.updateScreens(player.position)

  }
  engine.addSystem(LiveProjectorSystem)

  // add 3x3 columns
  addColumnGrid(3, 3, Vector3.create(16, 5, 16))

  //add the TV stack
  addTVScreens(4, 6, 15, Vector3.create(16, 0, 16), 0)

console.log(ScreenGrpScatterTvs.screens)
  //calculate the UVs for the TV stack only once on startup (no realtime reprojection needed)
  ScreenGrpScatterTvs.updateScreens(Transform.getMutable(projectorScatterTVs.parent).position)

  uiInstruction()

}

