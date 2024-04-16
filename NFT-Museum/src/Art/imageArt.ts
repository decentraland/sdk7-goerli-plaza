import { InputAction, Material, MeshCollider, MeshRenderer, Transform, engine, pointerEventsSystem } from "@dcl/sdk/ecs";
import { Color3, Quaternion, Vector3 } from "@dcl/sdk/math";
import { openExternalUrl } from "~system/RestrictedActions";
import { artPos10, artPos4, artPos5, artPos9, artRot10, artRot4, artRot5, artRot9 } from "./artPositions";
import { homepageUrl, linktreeURL } from "../social";

// For static images that aren't loaded in as NFTs
// Use server hosted images or paths to files in your project folder
export let logoImage = 'https://bafkreih4ndg6qpczqw2ardbrrdoj23t43hiegbceo36hbi3vjqskcoi4yu.ipfs.nftstorage.link/'

let verticalImageAR = 'https://bafybeig2s7rg4dwuebwnmzwefz5h6c3p3x4eazcm6qng2wgtqqfe2l2m2i.ipfs.nftstorage.link/'
let verticalImageRender = 'https://bafkreia5xiavtlcbrvfr4os7om5bdzbzjdtvm4jcuki52r5wkn6lzzb74a.ipfs.nftstorage.link/'


export type ImageData = {
  room: number,
  id: number,
  position: Vector3,
  rotation: Vector3,
  scale: Vector3
  image: string,
  hoverText: string,
  url: string,
  hasAlpha: boolean
}

export const imageArtCollection: ImageData[] = [
  {
    room: 1,
    id: 4,
    position: artPos4,
    rotation: artRot4,
    scale: Vector3.create(1.5, 1.5, 1.5),
    image: logoImage,
    hoverText: 'Click',
    url: linktreeURL,
    hasAlpha: true
  },
  {
    room: 1,
    id: 5,
    position: artPos5,
    rotation: artRot5,
    scale: Vector3.create(1.5, 1.5, 1.5),
    image: logoImage,
    hoverText: 'Click',
    url: linktreeURL,
    hasAlpha: true
  },
  {
    room: 2,
    id: 9,
    position: artPos9,
    rotation: artRot9,
    scale: Vector3.create(1, 2, 1),
    image: verticalImageAR,
    hoverText: 'Click',
    url: homepageUrl,
    hasAlpha: false
  },
  {
    room: 2,
    id: 10,
    position: artPos10,
    rotation: artRot10,
    scale: Vector3.create(1, 2, 1),
    image: verticalImageRender,
    hoverText: 'Click',
    url: homepageUrl,
    hasAlpha: false
  }
]


export function createImageArt(
  position: Vector3,
  rotation: Vector3,
  scale: Vector3,
  image: string, // can be path to image file or url to hosted image
  hoverText: string,
  url: string,
  hasAlpha: boolean
) {

  let entity = engine.addEntity()
  Transform.create(entity, {
    position: position,
    rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
    scale: scale
  })
  MeshRenderer.setPlane(entity)
  MeshCollider.setPlane(entity)

  pointerEventsSystem.onPointerDown(
    {
      entity: entity,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: hoverText,
        maxDistance: 16
      }
    },
    function () {
      openExternalUrl({
        url: url
      })
    }
  )

  const imageMaterial = Material.Texture.Common({ src: image });


  if (!hasAlpha) {

    Material.setPbrMaterial(entity, {
      texture: imageMaterial,
      roughness: 1,
      specularIntensity: 0,
      metallic: 0,
      emissiveColor: Color3.White(),
      emissiveIntensity: 1,
      emissiveTexture: imageMaterial,
    })
  }

  else if (hasAlpha) {

    Material.setPbrMaterial(entity, {
      texture: imageMaterial,
      roughness: 1,
      specularIntensity: 0,
      metallic: 0,
      transparencyMode: 1,
      alphaTexture: imageMaterial,
      alphaTest: 0.5,
      emissiveColor: Color3.White(),
      emissiveIntensity: 1,
      emissiveTexture: imageMaterial,

    })
  }

  return entity
}