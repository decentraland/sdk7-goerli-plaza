import { defaultMaterial, hitMaterial, hitMaterial2, MovingCube, Ray } from '../definitions'

export default function raycastSystem() {
  for (const [entity, ray, transform] of engine.getEntitiesWith(Ray, Transform)) {
    const result = RaycastResult.getOrNull(entity)
    if (result?.timestamp === ray.timestamp) {
      if (result.hits.length > 0) {
        for (const hit of result.hits) {
          if (hit.entityId) {
            Material.setPbrMaterial(hit.entityId as Entity, entity === engine.CameraEntity ? hitMaterial2 : hitMaterial)
          }
        }
      } else {
        for (const [entity] of engine.getEntitiesWith(MovingCube)) {
          Material.setPbrMaterial(entity, defaultMaterial)
        }
      }
    }

    const shouldUpdateRaycast = Raycast.getOrNull(entity) === null || (result && ray.timestamp === result.timestamp)

    if (shouldUpdateRaycast) {
      const raycastMut = Ray.getMutable(entity)
      raycastMut.timestamp += 1

      Raycast.createOrReplace(entity, {
        origin: transform.position,
        direction: Vector3.rotate(Vector3.Forward(), transform.rotation),
        maxDistance: raycastMut.power,
        queryType: RaycastQueryType.RQT_QUERY_ALL
      })
    }
  }
}
