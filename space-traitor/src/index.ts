
import { GltfContainer, Transform, engine } from "@dcl/sdk/ecs";
import { Vector3 } from '@dcl/sdk/math';
import { GameController, } from './game.controller';
import "./polyfill";

export function main() {
  const game = new GameController()
  const environmentEntity = engine.addEntity()
  GltfContainer.create(environmentEntity, { src: 'models/Environment.glb' })
  Transform.create(environmentEntity, { position: Vector3.Zero() })
}