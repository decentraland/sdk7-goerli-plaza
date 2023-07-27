import { engine, Schemas } from '@dcl/sdk/ecs'

export const Zombie = engine.defineComponent('Zombie', {
  movementSpeed: Schemas.Number,
  rotationSpeed: Schemas.Number,
  damage: Schemas.Number,
  damageCooldown: Schemas.Number,
  damageEntity: Schemas.Entity,
  health: Schemas.Number
}, { health: 15 })
