// TODO: use higher number so we dont have conflicts (i.e. > 2000)
const COMPONENT_ID = 2080

const CubeIdentifier = { id: Schemas.Int }

export const CubeIdentifierComponent = engine.defineComponent(CubeIdentifier, COMPONENT_ID)
