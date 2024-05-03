export const BRICK_OFFSET_X = 7
export const BRICK_OFFSET_Z = 28.75
export const BRICK_SIZE = 0.55

export enum Games {
  G_ATARI = 'atari',
  G_DECENTRALAND = 'decentraland',
  G_ETHEREUM = 'ethereum',
  G_BITCOIN = 'bitcoin'
}

export const CABINETS: Record<Games, string> = {
  [Games.G_ATARI]: 'models/arcadeCabinetAtari.glb',
  [Games.G_DECENTRALAND]: 'models/arcadeCabinetDecentraland.glb',
  [Games.G_ETHEREUM]: 'models/arcadeCabinetEthereum.glb',
  [Games.G_BITCOIN]: 'models/arcadeCabinetBitcoin.glb'
}

export enum Sounds {
  S_HIT = 'sounds/hit.mp3',
  S_MISS = 'sounds/miss.mp3'
}
