import BoidsController from "./boids/BoidsController";
import ControlHelper from "./boids/ControlHelper";
import { BoidSystem } from "./boidSystem";

export class Registry {
  boidController?: BoidsController
  controlHelper?: ControlHelper
  boidSystem?: BoidSystem
}

export const REGISTRY = new Registry()