import { Material, PBMaterial_PbrMaterial } from "@dcl/sdk/ecs"
import { Color3, Color4 } from "@dcl/sdk/math"

export const INVISIBLE_MATERIAL: PBMaterial_PbrMaterial = {
    albedoColor: Color4.Clear()
}

const emissiveBoxMat: PBMaterial_PbrMaterial = {
    castShadows: false,
    albedoColor: Color4.Black(),
    emissiveColor: Color3.Black(),
    emissiveIntensity: 0,
    reflectivityColor: Color3.Black(),
    specularIntensity: 0,
    metallic: 0,
    roughness: 1
}

const emissiveBoxMatOutline: PBMaterial_PbrMaterial = {
    albedoColor: Color4.Purple(),
    emissiveColor: Color3.Purple(),
    emissiveIntensity: 10,
    reflectivityColor: Color3.Purple(),
    specularIntensity: 0,
    metallic: 0,
    roughness: 1
}

const emissiveGreenMat: PBMaterial_PbrMaterial = {
    albedoColor: Color4.Green(),
    emissiveColor: Color3.Green(),
    emissiveIntensity: 10,
    reflectivityColor: Color3.Green(),
    specularIntensity: 0,
    metallic: 0,
    roughness: 1
}

const outerBoxMat: PBMaterial_PbrMaterial = {
    albedoColor: Color4.Black(),
    emissiveColor: Color3.Black(),
    emissiveIntensity: 10,
    reflectivityColor: Color3.Black(),
    metallic: 1,
    roughness: 0
}

let normalPlaneShape = 'models/opaque_plane.glb'


export const RESOURCES = {
    models: {
        names: {

        },
        instances: {
            outerPlaneShape: normalPlaneShape
        }
    },
    // textures: {
    //     //sprite_sheet: spriteSheetTexture,
    //     transparent: INVISIBLE_MATERIAL_texture,
    //     dialogAtlas: Material.Texture.Common({ src: 'images/DispenserAtlas.png' })
    // },
    textures: {
        transparent: 'images/transparent-texture.png',
        dialogAtlas: 'images/DispenserAtlas.png'
    },
    materials: {
        //sprite_sheet: spriteSheetMaterial
        transparent: INVISIBLE_MATERIAL,
        emissiveBoxMat: emissiveBoxMat,
        emissiveBoxMatOutline: emissiveBoxMatOutline,
        outerBoxMat: outerBoxMat,
        rabbitCheckPoints: emissiveGreenMat
    },
    images: {
        portrait: {
        },
    }
}
