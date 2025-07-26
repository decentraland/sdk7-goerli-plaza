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
  [Games.G_ATARI]: 'assets/scene/Models/arcadeCabinetAtari.glb',
  [Games.G_DECENTRALAND]: 'assets/scene/Models/arcadeCabinetDecentraland.glb',
  [Games.G_ETHEREUM]: 'assets/scene/Models/arcadeCabinetEthereum.glb',
  [Games.G_BITCOIN]: 'assets/scene/Models/arcadeCabinetBitcoin.glb'
}

export enum Sounds {
  S_HIT = 'assets/scene/Audio/hit.mp3',
  S_MISS = 'assets/scene/Audio/miss.mp3'
}
