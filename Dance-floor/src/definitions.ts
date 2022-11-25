export const colors: Color3[] = [
    Color3.fromHexString('#1dccc7'),
    Color3.fromHexString('#ffce00'),
    Color3.fromHexString('#9076ff'),
    Color3.fromHexString('#fe3e3e'),
    Color3.fromHexString('#3efe94'),
    Color3.fromHexString('#3d30ec'),
    Color3.fromHexString('#6699cc')
]

enum CustomComponentIds {
  Tile = 2002,
  Beat = 2003
}

export const Tile = engine.defineComponent({}, CustomComponentIds.Tile)

export const Beat = engine.defineComponent(
    {
        interval: Schemas.Number,
        timer: Schemas.Number
    },
    CustomComponentIds.Beat
)