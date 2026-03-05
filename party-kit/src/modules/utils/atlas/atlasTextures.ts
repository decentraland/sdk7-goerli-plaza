import { Material, TextureUnion } from "@dcl/sdk/ecs"
import { AtlasData } from "./atlasTypes"
import { posToUVS, posToUVSDoubleSide, posToUVSEmptyBackSide } from "../utils"

const atlasTextures = new Map<string, TextureUnion>()

export function getAtlasTexture(atlasSrc: string): TextureUnion {
    if(atlasTextures.has(atlasSrc)) {
        return atlasTextures.get(atlasSrc)!
    }
    const texture = Material.Texture.Common({src: atlasSrc})
    atlasTextures.set(atlasSrc, texture)
    return texture
}

export function getAtlasPlaneUVs(atlasData: AtlasData, imageName: string): number[] {
    const image = atlasData.images.find(image => image.name === imageName)
    if(!image) {
        console.error(`Image ${imageName} not found in atlas ${atlasData.atlas.src}`)   
        return []
    }
    return posToUVSDoubleSide(
        [image.image.x, image.image.x + image.image.width], 
        [image.image.y, image.image.y + image.image.height], 
        { width: atlasData.atlas.width, height: atlasData.atlas.height }
    )
}

export function getAtlasUiUVs(atlasData: AtlasData, imageName: string): number[] {
    const image = atlasData.images.find(image => image.name === imageName)
    if(!image) {
        console.error(`Image ${imageName} not found in atlas ${atlasData.atlas.src}`)   
        return []
    }
    return posToUVS(
        [image.image.x, image.image.x + image.image.width], 
        [image.image.y, image.image.y + image.image.height], 
        { width: atlasData.atlas.width, height: atlasData.atlas.height }
    )
}

export function getAtlasEmptyBackSideUVs(atlasData: AtlasData, imageName: string): number[] {
    const image = atlasData.images.find(image => image.name === imageName)
    if(!image) {
        console.error(`Image ${imageName} not found in atlas ${atlasData.atlas.src}`)   
        return []
    }
    return posToUVSEmptyBackSide(
        [image.image.x, image.image.x + image.image.width], 
        [image.image.y, image.image.y + image.image.height], 
        { width: atlasData.atlas.width, height: atlasData.atlas.height }
    )
}