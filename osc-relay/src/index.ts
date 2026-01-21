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
