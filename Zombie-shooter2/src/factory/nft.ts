
export function createNft(xPos: number): Entity {
  const nft = engine.addEntity()

  Transform.create(nft, {
    position: { x: xPos, y: 1, z: 13 }
  })

  NFTShape.create(nft, {
    color: { r: 1, g: 1, b: 1 },
    style: PBNFTShape_PictureFrameStyle.Classic,
    src: 'ethereum://0x06012c8cf97bead5deae237070f9587f8e7a266d/229795'
  })

  return nft
}