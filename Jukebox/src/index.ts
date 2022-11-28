import { songs } from './definitions'
import moveAnimationSystem from './modules/moveAnimation'
import { createSongButton } from './modules/songButton'

function createJukebox(position: Vector3) {
  // Jukebox
  const jukebox = engine.addEntity()
  GltfContainer.create(jukebox, { src: 'models/Jukebox.gltf' })
  Transform.create(jukebox, {
    position,
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    scale: Vector3.create(0.6, 0.6, 0.6)
  })

  for (let i = 0; i < songs.length; i++) {
    const posX = i % 2 === 0 ? -0.03 : 0.4
    const posY = Math.floor(i / 2) === 0 ? 1.9 : 1.77
    createSongButton(jukebox, posX, posY, songs[i])
  }
}

function setup() {
  // ground
  const floor = engine.addEntity()
  GltfContainer.create(floor, { src: 'models/FloorBaseGrass.glb' })
  Transform.create(floor, { position: Vector3.create(8, 0, 8), scale: Vector3.create(1.6, 0.1, 1.6) })

  // jukebox
  createJukebox(Vector3.create(5, 0, 9.5))

  engine.addSystem(moveAnimationSystem)
}

setup()
