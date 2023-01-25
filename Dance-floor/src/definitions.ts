import { engine, Schemas } from "@dcl/sdk/ecs";
import { Color4 } from '@dcl/sdk/math'

export const colors: Color4[] = [
    Color4.fromHexString('#1dccc7'),
    Color4.fromHexString('#ffce00'),
    Color4.fromHexString('#9076ff'),
    Color4.fromHexString('#fe3e3e'),
    Color4.fromHexString('#3efe94'),
    Color4.fromHexString('#3d30ec'),
    Color4.fromHexString('#6699cc')
]


export const Tile = engine.defineComponent("Tile", {})

export const Beat = engine.defineComponent(
	"Beat",
    {
        interval: Schemas.Number,
        timer: Schemas.Number
    }
)