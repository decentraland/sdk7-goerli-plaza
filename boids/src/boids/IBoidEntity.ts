import Grid from './Grid'

export enum BoidTypeEnum {
  FLOCK_ENTITY = 1,
  OBSTACLE_ENTITY = 2,
  PREDATOR_ENTITY = 3,
  SEEK_ENTITY = 4
}

/**
 * @module IBoidEntity
 * Entity class defines an entitiy model which has a position and a velocity.
 * Also it has some utiliy methods.
 */
export default interface IBoidEntity {
  id: number
  type: number
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  grid?: Grid

  canMove: boolean //default is false

  maxSpeed: number
  burstSpeed: number
  decelSpeed: number
  acelSpeed: number
  enabled: boolean

  //optional //override system controlling it
  aligmentWeight?: number
  cohesionWeight?: number
  separationWeight?: number

  aligmentRadius?: number
  cohesionRadius?: number
  separationRadius?: number
  obstacleRadius?: number
  seekRadius?: number
  avoidRadius?: number

  //maxEntitySpeed?:number

  //aligmentRadius?:number
  //cohesionRadius?:number
  //separationRadius?:number
  //obstacleRadius?:number

  initEntity(): void
  /**
   * Sets the grid instance
   * @param {Grid} grid
   */
  setGrid(grid?: Grid): void

  /**
   * @returns {Number} type of the entity
   */
  getType(): number

  /**
   * @returns {Number} the current scalar velocity of the entity.
   */
  getVelocity(): number

  /**
   * Checks the velocity of the entitiy and limits it to the given parameter
   * @param {Number} maxVelocity
   */
  checkVelocity(): void

  /**
   * This method adds the given velocity to the current velocity.
   * @param {Number} vx x velocity
   * @param {Number} vy y velocity
   * @param {Number} vz z velocity
   */
  addVelocity(vx: number, vy: number, vz: number): void

  /**
   * This method moves the entity.
   * @param {Number} maxVelocity
   * @param {Number} bx
   * @param {Number} by
   * @param {Number} bz
   */
  move(maxVelocity: number, bx: number, by: number, bz: number): void

  /**
   * Calculate the distance between the entity and the given entity
   * @param {Entity} otherEntity
   * @returns {Number} the distance between two entities
   */
  getDistance(otherEntity: IBoidEntity): number

  /**
   * Serialized the entitiy
   * @returns {Object} serialized data
   */
  serialize(): void

  /**
   * Updates the internal data of the entity if the IDs match
   * @param {Object} data
   */
  updateData(data: any): void

  /**
   * This static method deserializes the given data and returns new Entity instance.
   * @param {Object} data
   * @returns {Entitiy} deserialized Entitiy instance
   */
  deserialize(data: any): void
}
