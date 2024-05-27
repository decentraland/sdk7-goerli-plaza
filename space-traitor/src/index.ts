
import { engine, Transform, GltfContainer } from "@dcl/sdk/ecs"
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { GameController, } from './game.controller'
import "./polyfill";
import { Voting } from "./voting";

export function main() {
  const game = new GameController()
  const environmentEntity = engine.addEntity()
  GltfContainer.create(environmentEntity, { src: 'models/Environment.glb' })
  Transform.create(environmentEntity, { position: Vector3.Zero() })
}