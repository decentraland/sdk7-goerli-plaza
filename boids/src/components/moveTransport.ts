// import { InterpolationType } from "../helper/interpolation"

// // TODO: use higher number so we dont have conflicts (i.e. > 2000)
// const COMPONENT_ID = 2046
// const COMPONENT_ID2 = 2047
// // const Vector3EcsType =  Schemas.Map({
// //   x: Schemas.Float,
// //   y: Schemas.Float,
// //   z: Schemas.Float
// // })

// const QuaternionEcsType = Schemas.Map({
// 	x: Schemas.Float,
// 	y: Schemas.Float,
// 	z: Schemas.Float,
// 	w:  Schemas.Float
// })

// // const MoveTransportData = {
// //   hasFinished: Schemas.Boolean,
// //   start: Vector3EcsType,
// //   end: Vector3EcsType,
// //   fraction: Schemas.Float,
// //    interpolationType:  Schemas.Enum<InterpolationType>(Schemas.Int)
// // }

// const RotateTransportData = {
// 	hasFinished: Schemas.Boolean,
// 	start: QuaternionEcsType,
// 	end: QuaternionEcsType,
// 	fraction: Schemas.Float,
// 	 interpolationType:  Schemas.Enum<InterpolationType>(Schemas.Int)
//   }

// // export const MoveTransformComponent = engine.defineComponent(MoveTransportData, COMPONENT_ID)

// export const RotateTransformComponent = engine.defineComponent(RotateTransportData, COMPONENT_ID2)
