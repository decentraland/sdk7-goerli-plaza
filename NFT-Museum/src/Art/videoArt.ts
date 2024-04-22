import { engine, Transform, MeshRenderer, MeshCollider, Material, VideoPlayer, InputAction, pointerEventsSystem } from '@dcl/sdk/ecs';
import * as utils from '@dcl-sdk/utils';
import { openExternalUrl } from '~system/RestrictedActions';
import { Quaternion, Color3, Color4, Vector3 } from '@dcl/sdk/math';
import { homepageUrl, linktreeURL } from '../social';
import { audioConfig, audioType, toggleAudio } from '../audio';
import { artPositions } from './artData';

const videoVolume = 0.1
let isImage = true

const verticalVideo = 'https://player.vimeo.com/external/931742718.m3u8?s=efbe1b55804e4ba10b2e8c17e241d1809d324f36&logging=false'
const verticalVideoPlaceholder = 'https://bafkreicuvnybcylixwtpxslw4cvwmtwg566z2d6cinxshqbg25lhojkqtq.ipfs.nftstorage.link/'

const verticalVarbarianVid = 'https://player.vimeo.com/external/931794663.m3u8?s=3a78fb41c8f6e7f39962465441abecbe7a056262&logging=false'
const verticalVarbarianPlaceholder = 'https://bafkreibuzswvpnmmvux3b6vfwfeggbmakubxwdztrqmqerjjm7ba6efcpu.ipfs.nftstorage.link/'

const horizontalVideoMVFW23 = 'https://player.vimeo.com/external/931744777.m3u8?s=2a274c3898d4aa78fdb7cddf0a0329d25693b056&logging=false'
const horizontalVideoMVFW23placeholder = 'https://bafybeigpiynyk563o5rd4wzz62lx7gkncdrnozhzit4l7s4maxc5mffgbm.ipfs.nftstorage.link/'

const horizontalVideoLPMxSOA = 'https://player.vimeo.com/external/711197011.m3u8?s=1fe29a85f3c1455580a070eee4fb93abcb2ed5a2&logging=false'
const horizontalVideoLPMxSOAplaceholder = 'https://bafkreigpeshmzddtlhw5tpxa55z3lfv7yjyzpkoj3s7vc5wxyuy367o5ji.ipfs.nftstorage.link/'

const horizontalVideoIndieVillage = 'https://player.vimeo.com/external/931792879.m3u8?s=fa7ece24dfd2899ddac2112250092c4be5dbdff0&logging=false'
const horizontalVideoIndieVillagePlaceholder = 'https://bafkreie2rucyrbnl5en7bccthydcxsmddhffp4oincu7afc2jt53u4eb6e.ipfs.nftstorage.link/'


export const videoCollection: VideoData[] = [
  {
    room: 1,
    id: 2,
    position: artPositions[1].position,
    rotation: artPositions[1].rotation,
    scale: Vector3.create(0.003 * 1920, 0.003 * 1080, 1),
    image: horizontalVideoMVFW23placeholder,
    video: horizontalVideoMVFW23,
    hoverText: 'Click',
    website: homepageUrl,
    triggerScale: Vector3.create(4, 2, 10),
    triggerPosition: Vector3.create(artPositions[1].position.x + 2, artPositions[1].position.y - 1, artPositions[1].position.z),
    audio: true,
    hasAlpha: false
  },
  {
    room: 2,
    id: 14,
    position: artPositions[13].position,
    rotation: artPositions[13].rotation,
    scale: Vector3.create(0.0025 * 1920, 0.0025 * 1080, 1),
    image: horizontalVideoLPMxSOAplaceholder,
    video: horizontalVideoLPMxSOA,
    hoverText: 'Click',
    website: linktreeURL,
    triggerScale: Vector3.create(4, 2, 4),
    triggerPosition: Vector3.create(artPositions[13].position.x + 2, artPositions[13].position.y - 1, artPositions[13].position.z),
    audio: true,
    hasAlpha: false

  },
  {
    room: 2,
    id: 15,
    position: artPositions[14].position,
    rotation: artPositions[14].rotation,
    scale: Vector3.create(0.0025 * 1920, 0.0025 * 1080, 1),
    image: horizontalVideoIndieVillagePlaceholder,
    video: horizontalVideoIndieVillage,
    hoverText: 'Click',
    website: linktreeURL,
    triggerScale: Vector3.create(4, 2, 4),
    triggerPosition: Vector3.create(artPositions[14].position.x + 2, artPositions[14].position.y - 1, artPositions[14].position.z),
    audio: true,
    hasAlpha: false

  },
  {
    room: 2,
    id: 25,
    position: artPositions[24].position,
    rotation: artPositions[24].rotation,
    scale: Vector3.create(6, 8.65, 1),
    image: verticalVarbarianPlaceholder,
    video: verticalVarbarianVid,
    hoverText: 'Click',
    website: linktreeURL,
    triggerScale: Vector3.create(8, 6, 6),
    triggerPosition: Vector3.create(artPositions[24].position.x, artPositions[24].position.y - 1, artPositions[24].position.z - 2),
    audio: false,
    hasAlpha: false
  },
  {
    room: 2,
    id: 26,
    position: artPositions[25].position,
    rotation: artPositions[25].rotation,
    scale: Vector3.create(6, 8.65, 1),
    image: verticalVideoPlaceholder,
    video: verticalVideo,
    hoverText: 'Click',
    website: linktreeURL,
    triggerScale: Vector3.create(8, 6, 6),
    triggerPosition: Vector3.create(artPositions[25].position.x, artPositions[25].position.y - 1, artPositions[25].position.z + 4),
    audio: true,
    hasAlpha: false
  }
]

export type VideoData = {
  room: number;
  id: number;
  position: Vector3;
  rotation: Vector3;
  scale: Vector3;
  image: string;
  video: string;
  hoverText: string;
  website: string;
  triggerScale: Vector3;
  triggerPosition: Vector3;
  audio?: boolean;
  hasAlpha?: boolean;
};

export function createVideoArt(
  position: Vector3,
  rotation: Vector3,
  scale: Vector3,
  image: string,
  video: string,
  hoverText: string,
  website: string,
  triggerScale: Vector3,
  triggerPosition: Vector3,
  audio: boolean = true,
  hasAlpha?: boolean
) {

  const entity = engine.addEntity();
  MeshRenderer.setPlane(entity);
  MeshCollider.setPlane(entity);

  Transform.createOrReplace(entity, {
    position: position,
    rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
    scale: scale,
  });

  const imageMaterial = Material.Texture.Common({ src: image });
  const videoTexture = Material.Texture.Video({ videoPlayerEntity: entity });

  Material.setPbrMaterial(entity, {
    texture: imageMaterial,
    roughness: 1,
    specularIntensity: 0,
    metallic: 0,
    emissiveColor: Color3.White(),
    emissiveIntensity: 1,
    emissiveTexture: imageMaterial,
    transparencyMode: hasAlpha ? undefined : 1,
    alphaTexture: hasAlpha ? videoTexture : imageMaterial,
    alphaTest: hasAlpha ? undefined : 0.5,
  });


  function setMaterial(isImage: boolean) {

    Material.setPbrMaterial(entity, {
      texture: isImage ? videoTexture : imageMaterial,
      roughness: 1,
      specularIntensity: 0,
      metallic: 0,
      emissiveColor: Color3.White(),
      emissiveIntensity: 1,
      emissiveTexture: isImage ? videoTexture : imageMaterial,
      transparencyMode: hasAlpha ? undefined : 1,
      alphaTexture: hasAlpha ? videoTexture : imageMaterial,
      alphaTest: hasAlpha ? undefined : 0.5,
    });

    isImage = !isImage

  }

  pointerEventsSystem.onPointerDown(
    {
      entity: entity,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: hoverText,
      },
    },
    () => {
      console.log('Clicked artwork');
      openExternalUrl({ url: website });
    }
  );

  const videoPlayer = VideoPlayer.create(entity, {
    src: video,
    playing: false,
    loop: true,
    volume: 0.1
  });

  if (!videoPlayer) {
    console.error('Failed to create video player.');
  }

  utils.triggers.addTrigger(

    utils.addTestCube({ position: triggerPosition, scale: triggerScale }, undefined, undefined, Color4.create(1, 1, 1, 0), undefined, true),
    utils.NO_LAYERS,
    utils.LAYER_1,
    [{ type: 'box', scale: triggerScale }],

    (otherEntity) => {
      if (audio) {
        toggleAudio(audioType)
      }
      if (!otherEntity || !videoPlayer) return;

      setMaterial(isImage)

      VideoPlayer.createOrReplace(entity, {
        src: video,
        playing: true,
        loop: true,
        volume: videoVolume
      })
      videoPlayer.playing = true
    },


    (onExit) => {
      VideoPlayer.getMutable(entity).playing = false;
      setMaterial(isImage)  
      
      if (audio) {
        toggleAudio(audioType)
      }
    //  if (!videoPlayer) return;
    }
  );
  return entity
}
