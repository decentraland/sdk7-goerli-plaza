// TODO: use higher number so we dont have conflicts (i.e. > 2000)
const COMPONENT_ID = 2080

const CubeIdentifier = MapType({ id: Int8 })

export const CubeIdentifierComponent = engine.defineComponent(COMPONENT_ID, CubeIdentifier)
