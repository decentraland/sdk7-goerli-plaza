/// --- Set up a system ---

import { Connection } from './connection'
import { engine, Material, MeshRenderer, Transform } from "@dcl/sdk/ecs"
import { Color4, Vector3 } from '@dcl/sdk/math'
import { GameController } from './game.controller'
import "./polyfill";

export function main() {
  const game = new GameController()
  const connection1 = new Connection(game)
  connection1.connect('my_room').then((room) => {
    console.log('Connected!')
    // room.state.listen('fader1', (value: number) => {
    //   Transform.getMutable(fader1).position.y = value * 5 + 2
    //   if (value > 0.9) {
    //     Material.setPbrMaterial(fader1, {
    //       albedoColor: Color4.Red()
    //     })
    //   } else if (value > 0.6) {
    //     Material.setPbrMaterial(fader1, {
    //       albedoColor: Color4.Yellow()
    //     })
    //   } else {
    //     Material.setPbrMaterial(fader1, {
    //       albedoColor: Color4.Green()
    //     })
    //   }
    // })

    // room.state.listen('fader2', (value: number) => {
    //   Transform.getMutable(fader2).position.y = value * 5 + 2
    //   if (value > 0.9) {
    //     Material.setPbrMaterial(fader2, {
    //       albedoColor: Color4.Red()
    //     })
    //   } else if (value > 0.6) {
    //     Material.setPbrMaterial(fader2, {
    //       albedoColor: Color4.Yellow()
    //     })
    //   } else {
    //     Material.setPbrMaterial(fader2, {
    //       albedoColor: Color4.Green()
    //     })
    //   }
    // })

    // room.state.listen('fader3', (value: number) => {
    //   Transform.getMutable(fader3).position.y = value * 5 + 2
    //   if (value > 0.9) {
    //     Material.setPbrMaterial(fader3, {
    //       albedoColor: Color4.Red()
    //     })
    //   } else if (value > 0.6) {
    //     Material.setPbrMaterial(fader3, {
    //       albedoColor: Color4.Yellow()
    //     })
    //   } else {
    //     Material.setPbrMaterial(fader3, {
    //       albedoColor: Color4.Green()
    //     })
    //   }
    // })

    // room.state.listen('fader4', (value: number) => {
    //   Transform.getMutable(fader4).position.y = value * 5 + 2
    //   if (value > 0.9) {
    //     Material.setPbrMaterial(fader4, {
    //       albedoColor: Color4.Red()
    //     })
    //   } else if (value > 0.6) {
    //     Material.setPbrMaterial(fader4, {
    //       albedoColor: Color4.Yellow()
    //     })
    //   } else {
    //     Material.setPbrMaterial(fader4, {
    //       albedoColor: Color4.Green()
    //     })
    //   }
    // })
  })
  let fader1 = engine.addEntity()
  Transform.create(fader1, {
    position: Vector3.create(8, 2, 2),
  })
  MeshRenderer.setBox(fader1)
  Material.setPbrMaterial(fader1, {
    albedoColor: Color4.Green()
  })

  let fader2 = engine.addEntity()
  Transform.create(fader2, {
    position: Vector3.create(8, 2, 4),
  })
  MeshRenderer.setBox(fader2)
  Material.setPbrMaterial(fader2, {
    albedoColor: Color4.Green()
  })


  let fader3 = engine.addEntity()
  Transform.create(fader3, {
    position: Vector3.create(8, 2, 6),
  })
  MeshRenderer.setBox(fader3)
  Material.setPbrMaterial(fader3, {
    albedoColor: Color4.Green()
  })


  let fader4 = engine.addEntity()
  Transform.create(fader4, {
    position: Vector3.create(8, 2, 8),
  })
  MeshRenderer.setBox(fader4)
  Material.setPbrMaterial(fader4, {
    albedoColor: Color4.Green()
  })
}
