import { ColliderLayer, Entity, GltfContainer, Material, MeshCollider, MeshRenderer, PBMaterial_PbrMaterial, PBVideoPlayer, Transform, VideoPlayer, VideoTexture, engine, pointerEventsSystem } from "@dcl/sdk/ecs";
import { CONFIG } from "./config";
import { Quaternion, Vector3 } from "@dcl/sdk/math";

export type CreateArchArgsType = {
    parent: Entity
    myVideoTexture: PBVideoPlayer
    archSpacing: number
    archQty: number
    material: PBMaterial_PbrMaterial
}

export type ArchInstType = {
    myVideoTexture: PBVideoPlayer
    index: number
    planes: Entity[]
}

export type ArchesType = {
    arches: ArchInstType[]
}

const ARC_CENTER_POS = Vector3.create(CONFIG.sizeX / 2, 13, 8)
const WALLS_CENTER_POS = Vector3.create(CONFIG.sizeX / 2, 6.5, 8)

export function creathArches(args: CreateArchArgsType) {

    const arches: ArchInstType[] = []
    const myVideoTexture = args.myVideoTexture

    const _scene = args.parent
    const ARCH_SPACING = args.archSpacing
    const ARCH_NUMBER = args.archQty

    //Define UV offsets

    const uOffsetA_INC = 0.1865
    const uOffsetB_INC = 0.07837
    const uOffsetC_INC = 0.1075
    const vOffset_INC = 0.02775

    let uOrigin = 0
    let vOrigin = 0
    let uOffsetA = uOffsetA_INC
    let uOffsetB = uOffsetB_INC
    let uOffsetC = uOffsetC_INC
    let vOffset = vOffset_INC

    let arcRotOffset = (180 / 9)

    const videoMat = args.material

    const archCenterPos = Vector3.clone(ARC_CENTER_POS)
    const wallCenterPos = Vector3.clone(WALLS_CENTER_POS)

    const ARC_PLANE_WORLD_UP_DIR = Vector3.Right()
    const WALL1_PLANE_WORLD_UP_DIR = Vector3.Backward()

    const frameRowOffset = 28
    const ratio = 1280 / 720
    const rowCnt = 8

    for (let i = 0; i < ARCH_NUMBER; i++) {
        const planes: Entity[] = []

        //reset this each loop
        let uvRow = 0

        const zOffsetAdd = ARCH_SPACING * 2

        if (i > 0) {
            archCenterPos.z += zOffsetAdd
            wallCenterPos.z += zOffsetAdd
        }

        const archPositions: Vector3[] = [
            Vector3.create(2.53284, 15.6788, archCenterPos.z),
            Vector3.create(4.58309, 20.6285, archCenterPos.z),
            Vector3.create(8.37147, 24.4169, archCenterPos.z),
            Vector3.create(13.3212, 26.4672, archCenterPos.z),
            Vector3.create(18.6788, 26.4672, archCenterPos.z),
            Vector3.create(23.6285, 24.4169, archCenterPos.z),
            Vector3.create(27.4169, 20.6285, archCenterPos.z),
            Vector3.create(29.4672, 15.6788, archCenterPos.z),
        ]

        //Structure
        const archStructureShape = engine.addEntity()
        GltfContainer.create(archStructureShape, { src: 'models/structure2.glb' })
        Transform.createOrReplace(archStructureShape, {
            position: Vector3.create(16, 0, archCenterPos.z),
            parent: _scene
        })

        const S1 = engine.addEntity()
        MeshRenderer.setPlane(S1, [
            1 - uOffsetA, 1 - vOffset_INC * (i),
            1 - uOrigin, 1 - vOffset_INC * (i),
            1 - uOrigin, 1 - vOffset_INC * (i + 1),
            1 - uOffsetA, 1 - vOffset_INC * (i + 1),

            uOffsetA - 0, 1 - vOffset_INC * (i + 1), //upper left
            uOrigin + 0, 1 - vOffset_INC * (i + 1), //lower left
            uOrigin + 0, 1 - vOffset_INC * (i), //lower right 
            uOffsetA - 0, 1 - vOffset_INC * (i), //upper right

        ])
        Transform.create(S1, {
            position: Vector3.create(2, 6.5, wallCenterPos.z),
            scale: Vector3.create(8, 13, 1),
            rotation: Quaternion.fromEulerDegrees(0, 90, 180)
        })
        Quaternion.fromLookAt(Transform.getMutable(S1).rotation, wallCenterPos, WALL1_PLANE_WORLD_UP_DIR)
        Material.setPbrMaterial(S1, videoMat)

        planes.push(S1)

        for (let x = 0; x < 8; x++) {
            uvRow++

            if (x >= 3 && CONFIG.sizeX <= 16) {
                console.log("plot not big enough")
                continue
            }

            const S2 = engine.addEntity()
            MeshRenderer.setPlane(S2, [

                uOrigin - uOffsetC - (uOffsetB * (uvRow)), -vOffset * (i + 1), //lower left
                uOrigin - uOffsetC - (uOffsetB * (uvRow + 1)), -vOffset * (i + 1),  //upper ;eft
                uOrigin - uOffsetC - (uOffsetB * (uvRow + 1)), -vOffset * (i), //upper right
                uOrigin - uOffsetC - (uOffsetB * (uvRow)), -vOffset * (i), //lower right

                uOrigin + uOffsetA + (uOffsetB * (uvRow - 1)), 1 - vOffset * (i),
                uOrigin + uOffsetA + (uOffsetB * (uvRow)), 1 - vOffset * (i),
                uOrigin + uOffsetA + (uOffsetB * (uvRow)), 1 - vOffset * (i + 1),
                uOrigin + uOffsetA + (uOffsetB * (uvRow - 1)), 1 - vOffset * (i + 1),  

            ])

            Transform.create(S2, {
                position: archPositions[x],
                scale: Vector3.create(8, 5.46253, 1)
            })
            Material.setPbrMaterial(S2, videoMat)
            planes.push(S2)
            Transform.getMutable(S2).rotation = Quaternion.fromLookAt(Transform.getMutable(S2).position, archCenterPos, ARC_PLANE_WORLD_UP_DIR)
        }

        uvRow++
        const S10 = engine.addEntity()
        MeshRenderer.setPlane(S10, [

            1 - uOffsetA, 1 - vOffset_INC * (i),
            1 - uOrigin, 1 - vOffset_INC * (i),
            1 - uOrigin, 1 - vOffset_INC * (i + 1),
            1 - uOffsetA, 1 - vOffset_INC * (i + 1),

            uOffsetA - 0, 1 - vOffset_INC * (i + 1), //upper left
            uOrigin + 0, 1 - vOffset_INC * (i + 1), //lower left
            uOrigin + 0, 1 - vOffset_INC * (i), //lower right 
            uOffsetA - 0, 1 - vOffset_INC * (i), //upper right
        ])
        Transform.create(S10, {
            position: Vector3.create(30, 6.5, wallCenterPos.z),
            scale: Vector3.create(8, 13, 1),
            rotation: Quaternion.fromEulerDegrees(0, 90, 180)
        })
        Quaternion.fromLookAt(Transform.getMutable(S10).rotation, wallCenterPos, WALL1_PLANE_WORLD_UP_DIR)
        Material.setPbrMaterial(S10, videoMat)
        planes.push(S10)


        const archInst: ArchInstType = {
            index: i,
            myVideoTexture: myVideoTexture,
            planes: planes
        }
        arches.push(archInst)
    }

    if (CONFIG.showFullVideoDebugPanel) {
        const debugPanelZOffset = -5
        const debugSize = 2
        let text = "Full Video Debug Panel (Pause)\ndisable me with CONFIG.showFullVideoDebugPanel=false"

        const fullVideo = engine.addEntity()
        Transform.create(fullVideo, {
            position: Vector3.subtract(Vector3.clone(WALLS_CENTER_POS), Vector3.create(0, 4 - 0.9, debugPanelZOffset)),
            rotation: Quaternion.fromEulerDegrees(0, 0, 0),
            scale: Vector3.create(debugSize * ratio, debugSize, debugSize * ratio)
        })
        MeshRenderer.setPlane(fullVideo)
        MeshCollider.setPlane(fullVideo,[ColliderLayer.CL_POINTER])
        Material.setPbrMaterial(fullVideo, videoMat)

        pointerEventsSystem.onPointerDown({
            entity: fullVideo,
            opts: { hoverText: text }
        },
            () => {
                if (myVideoTexture.playing) {
                    text = "Full Video Debug Panel (Play)\ndisable me with CONFIG.showFullVideoDebugPanel=false"
                    VideoPlayer.getMutable(_scene).playing = false
                } else {
                    text = "Full Video Debug Panel (Pause)\ndisable me with CONFIG.showFullVideoDebugPanel=false"
                    VideoPlayer.getMutable(_scene).playing = true
                }
            })

        const bottomLeftFrame = engine.addEntity()
        Transform.create(bottomLeftFrame, {
            position: Vector3.subtract(Vector3.clone(WALLS_CENTER_POS), Vector3.create(3, 1, debugPanelZOffset)),
            rotation: Quaternion.fromEulerDegrees(0, 0, 0),
            scale: Vector3.create(debugSize * ratio, debugSize, debugSize * ratio)
        })
        MeshRenderer.setPlane(bottomLeftFrame, [

            uOrigin, 0,  //lower left 
            uOrigin, vOffset * rowCnt, //upper left
            uOffsetA + uOffsetB / 2, vOffset * rowCnt, //upper right
            uOffsetA + uOffsetB / 2, 0, //lower right

            uOrigin, 0,  //lower left 
            uOrigin, vOffset_INC * rowCnt, //upper left
            uOffsetA + uOffsetB / 2, vOffset_INC * rowCnt, //upper right
            uOffsetA + uOffsetB / 2, 0, //lower right

        ])
        Material.setPbrMaterial(bottomLeftFrame, videoMat)

        const bottomRightFrame = engine.addEntity()
        Transform.create(bottomRightFrame, {
            position: Vector3.add(Vector3.clone(WALLS_CENTER_POS), Vector3.create(3, -1, -1 * debugPanelZOffset)),
            rotation: Quaternion.fromEulerDegrees(0, 0, 0),
            scale: Vector3.create(debugSize * 2 * ratio, debugSize, debugSize * ratio)
        })
        MeshRenderer.setPlane(bottomRightFrame, [
            uOffsetA + uOffsetB, 0,  //lower left 
            uOffsetA + uOffsetB, vOffset * rowCnt, //upper left
            1, vOffset * rowCnt, //upper right
            1 - uOffsetA + uOffsetA, 0, //lower right

            uOffsetA + uOffsetB, 0,  //lower left 
            uOffsetA + uOffsetB, vOffset * rowCnt, //upper left
            1, vOffset * rowCnt, //upper right
            1 - uOffsetA + uOffsetA, 0, //lower right

        ])
        Material.setPbrMaterial(bottomRightFrame, videoMat)
    }

    const archData: ArchesType = { arches: arches }
    return archData
}