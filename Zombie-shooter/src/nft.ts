const { Transform, NFTShape } = engine.baseComponents

export function createNft(xPos: number): Entity {
  const nft = engine.addEntity()

  Transform.create(nft, {
    position: { x: xPos, y: 1, z: 13 },
    scale: { x: 1, y: 1, z: 1 },
    rotation: { x: 0, y: 0, z: 0, w: 1 }
  })

  NFTShape.create(nft, {
    withCollisions: true,
    isPointerBlocker: true,
    visible: true,
    assetId: '',
    color: { r: 1, g: 1, b: 1 },
    style: 4,
    src: 'ethereum://0x06012c8cf97bead5deae237070f9587f8e7a266d/229795'
  })

  return nft
}
