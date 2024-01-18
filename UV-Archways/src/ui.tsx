import {
  engine,
  Transform,
} from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { CONFIG } from './config'

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

const uiComponent = () => (
  <UiEntity
    uiTransform={{
      width: '100%',
      height: '50px',
      position: { top: '75%' },
      alignContent: "center",
      justifyContent: "center"
    }}
    uiBackground={{ color: Color4.create(0.1, 0.1, 0.1, 0.9) }}
    uiText={{ value: directionTipText, fontSize: 40 }}
  >
  </UiEntity>
)

let directionTipText: string = ""

export function updateDirectionText(str: string) {
  if (directionTipText != str) { directionTipText = str }
}


const bottomCenter = Vector3.subtract(CONFIG.centerGround, Vector3.create(CONFIG.center.x, 0, CONFIG.center.z))
const northDir = Vector3.subtract(bottomCenter, CONFIG.centerGround)

let lastPosition: Vector3 = Vector3.Zero()

let walkDirUp = false
let cameraFaceUp = false

function DirectionSystem() {

  let camera = Transform.get(engine.CameraEntity)

  const walkDir = Vector3.normalize(Vector3.subtract(camera.position, lastPosition))
  const dotCamera = Vector3.dot(northDir, camera.rotation)

  if (walkDir.z > 0) {
    walkDirUp = true
  } else if (walkDir.z < 0) {
    walkDirUp = false
  }

  if (dotCamera > 0) {
    cameraFaceUp = false
  }
  else {
    cameraFaceUp = true
  }

  Vector3.copyFrom(camera.position, lastPosition)

  if (!cameraFaceUp) {
    if (camera.position.z < 20) {
      updateDirectionText("Arrived at South End (Exit Arches)")
    } else if (camera.position.z < 50) {
      updateDirectionText("Arriving at Sound End")
    } else {
      updateDirectionText("South End This Way")
    }
  } else {
    if (camera.position.z > 300) {
      //286 lower bound 
      updateDirectionText("Arrived at North End")
    } else if (camera.position.z > 250) {
      updateDirectionText("Arriving at North End")
    } else {
      updateDirectionText("North End This Way")
    }
  }
}
engine.addSystem(DirectionSystem)