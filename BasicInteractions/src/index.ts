import { setupEventOnEntities } from './events-on-entities'
import { setupGlobalEvents } from './global-events'
import { setupProximity } from './proximity'
import { setupQueryMeshes } from './query-meshes'
import { createMesh } from './utils'
import { Vector3 } from '@dcl/sdk/math'
export * from '@dcl/sdk'
import './painter'

createMesh(Vector3.create(8, 1, 8), "You're using ECS7", 0.5)

setupEventOnEntities()
setupProximity()
setupGlobalEvents()
//setupQueryMeshes()