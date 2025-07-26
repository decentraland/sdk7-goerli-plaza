import { ColliderLayer, EasingFunction, engine, Entity, GltfContainer, InputAction, Material, MeshCollider, MeshRenderer, pointerEventsSystem, Transform, TransformTypeWithOptionals, Tween, tweenSystem, VisibilityComponent } from "@dcl/sdk/ecs"
import { Quaternion, Vector3 } from "@dcl/sdk/math"
import { MenuButton, uiAssets } from "./ui"

export type PhotoMuralProps = {
    sceneCoords: string[]
    transform: TransformTypeWithOptionals
    refreshRateSeconds?: number
    maxPhotos?: number
}

type Photo = {
    id: string
    dateTime: number
    isPublic: boolean
    thumbnailUrl: string
    url: string
    entity: Entity
}

type ArrowData = {
    movement: number
    position: Vector3
    button?: MenuButton
}

let fetchSystemStarted = false
let refreshRate: number = 10
let refreshTimer = 0
let photoMuralInstances: PhotoMural[] = []
let globalSceneIds: string[] = []

const photoMuralSystem = (dt: number) => {
    refreshTimer += dt
    if (refreshTimer < refreshRate) return
    refreshTimer = 0

    getCameraReelPhotos()
}

const getCameraReelPhotos = async () => {
    const getCameraReelURL = (placeId: string) => `https://camera-reel-service.decentraland.org/api/places/${placeId}/images`

    const photosBySceneId = new Map<string, Photo[]>()

    for (const sceneId of globalSceneIds) {
        // console.log("fetching photos for", sceneId)
        const photosBody = (await (await fetch(getCameraReelURL(sceneId))).json())
        photosBySceneId.set(sceneId, photosBody.images)
    }

    photoMuralInstances.forEach(instance => {
        const instancePhotos: Photo[] = []
        instance.sceneIds.forEach(sceneId => {
            const photos = photosBySceneId.get(sceneId)
            if (photos) {
                instancePhotos.push(...photos.map(photo => ({ ...photo })))
            }
        })
        instance.processNewPhotos(instancePhotos)
    })
}


export class PhotoMural {
    parentEntity: Entity
    carouselEntity: Entity
    maxPhotos: number = 10
    sceneIds: string[] = []
    photos: Photo[] = []
    thumbWidth: number = 1
    thumbHeight: number = this.thumbWidth * 0.5625
    scrollIndex: number = 0
    selectedPhotos: Photo[] = []
    selectedPhotoId: string = ""
    arrows: ArrowData[] = [
        { movement: -1, position: Vector3.create(-1.7, this.thumbHeight / 2, -0.3) },
        { movement: 1, position: Vector3.create(1.71, this.thumbHeight / 2, -0.3) }
    ]

    constructor(photoMuralProps: PhotoMuralProps) {
        const { sceneCoords, transform, refreshRateSeconds = 10, maxPhotos = 10 } = photoMuralProps

        refreshRate = refreshRateSeconds
        refreshTimer = refreshRateSeconds
        this.maxPhotos = maxPhotos
        photoMuralInstances.push(this)

        this.initPhotoMuralSystem(sceneCoords)

        //create frame
        this.parentEntity = engine.addEntity()
        Transform.create(this.parentEntity, {
            ...transform,
            // position: { ...transform.position || Vector3.One(), y: transform.position?.y || 1 + 1 }
        })
        const frameEntity = engine.addEntity()
        Transform.create(frameEntity, {
            parent: this.parentEntity,
            position: Vector3.create(0, 1.6, -0.29),
            rotation: Quaternion.fromEulerDegrees(0, 180, 0),
            scale: Vector3.create(4, 4, 1)
        })

        MeshCollider.setPlane(frameEntity, ColliderLayer.CL_POINTER)

        const billboard = engine.addEntity()
        Transform.create(billboard, {
            parent: this.parentEntity,
            position: Vector3.create(0, -0.7, 0.1),
            scale: Vector3.create(1, 1, 1)
        })
        GltfContainer.create(billboard, {
            src: "assets/scene/Models/billboard.glb",
            visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
            invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
        })

        pointerEventsSystem.onPointerDown(
            {
                entity: frameEntity,
                opts: {
                    button: InputAction.IA_ANY,
                    maxDistance: 8,
                    showFeedback: false,
                    showHighlight: false,
                },
            },
            (cmd) => {

                if (cmd.button === InputAction.IA_PRIMARY) {
                    this.arrows[0].button?.onClick()
                }

                if (cmd.button === InputAction.IA_SECONDARY) {
                    this.arrows[1].button?.onClick()
                }
            }
        )

        //create photo carousel
        this.carouselEntity = engine.addEntity()
        Transform.create(this.carouselEntity, {
            parent: this.parentEntity,
            position: Vector3.create(-1.025, this.thumbHeight / 2, -0.3),
        })

        //create arrow buttons
        this.arrows.forEach((arrow) => {
            const { movement, position } = arrow

            arrow.button = new MenuButton({
                parent: this.parentEntity,
                position: position,
                rotation: Quaternion.fromEulerDegrees(-90, 0, 0),
            },
                arrow.movement === -1 ? uiAssets.icons.leftArrow : uiAssets.icons.rightArrow,
                arrow.movement === -1 ? "Previous [E]" : "Next [F]",
                () => {
                    this.scrollCarousel(movement)
                },
                movement === -1 ? InputAction.IA_PRIMARY : InputAction.IA_SECONDARY,
                true,
                310
            )
        })


    }


    private async initPhotoMuralSystem(sceneCoords: string[]) {
        for (const coord of sceneCoords) {
            const placeBody = (await (await fetch("https://places.decentraland.org/api/places/?positions=" + coord)).json())
            const sceneId = placeBody?.data[0]?.id
            sceneId && this.sceneIds.push(sceneId)
        }
        globalSceneIds = [...new Set([...globalSceneIds, ...this.sceneIds])]

        if (!fetchSystemStarted) {
            fetchSystemStarted = true
            engine.addSystem(photoMuralSystem)
        }
    }

    processNewPhotos(newPhotos: Photo[]) {
        const currentIds = this.photos.map(p => p.id)
        const tempNewPhotos = newPhotos.sort((p1, p2) => p2.dateTime - p1.dateTime).slice(0, this.maxPhotos)

        const photosToRemove = this.photos.filter(p => !tempNewPhotos.some(newP => newP.id === p.id))
        photosToRemove.forEach(photo => this.removePhoto(photo))

        tempNewPhotos.forEach(photo => {
            if (!currentIds.includes(photo.id)) {
                this.createPhoto(photo)
            }
        })

        this.placePhotos()

        if (!this.selectedPhotoId) {
            this.setSelectedPhoto(this.photos[0])
        }
    }

    private createPhoto(photo: Photo) {
        photo.entity = engine.addEntity()
        Transform.create(photo.entity, {
            parent: this.carouselEntity,
            position: Vector3.create(0, 0, 0),
            scale: Vector3.create(this.thumbWidth * 0.5, this.thumbHeight * 0.5, 1)
        })

        MeshRenderer.setPlane(photo.entity)
        Material.setBasicMaterial(photo.entity, {
            texture: Material.Texture.Common({
                src: photo.thumbnailUrl,
            }),
        })

        MeshCollider.setPlane(photo.entity, ColliderLayer.CL_POINTER)

        VisibilityComponent.createOrReplace(photo.entity, {
            visible: false
        })

        this.photos.push(photo)

        pointerEventsSystem.onPointerDown(
            {
                entity: photo.entity,
                opts: {
                    button: InputAction.IA_ANY,
                    maxDistance: 10,
                    hoverText: "View Photo"
                },
            },
            (cmd) => {
                if (cmd.button === InputAction.IA_POINTER) {
                    this.setSelectedPhoto(photo)
                }

                if (cmd.button === InputAction.IA_PRIMARY) {
                    this.arrows[0].button?.onClick()
                }

                if (cmd.button === InputAction.IA_SECONDARY) {
                    this.arrows[1].button?.onClick()
                }
            }
        )

        //create selectedPhotoItem
        const selectedPhotoEntity = engine.addEntity()

        this.selectedPhotos.push({ ...photo, entity: selectedPhotoEntity })

        Transform.create(selectedPhotoEntity, {
            parent: this.parentEntity,
            position: Vector3.create(0, 1.58, -0.3),
            scale: Vector3.create(0, 0, 0)
        })

        MeshRenderer.setPlane(selectedPhotoEntity)
        Material.setBasicMaterial(selectedPhotoEntity, {
            texture: Material.Texture.Common({
                src: photo?.url,
            }),
        })
    }

    private setSelectedPhoto(photo: Photo) {
        if (this.selectedPhotoId == photo.id) return


        for (const selectedPhoto of this.selectedPhotos) {
            Tween.deleteFrom(selectedPhoto.entity)
            Transform.getMutable(selectedPhoto.entity).scale = Vector3.create(0, 0, 0)
        }

        this.selectedPhotoId = photo.id
        const newSelectedPhoto = this.selectedPhotos.find(p => p.id === photo.id)

        newSelectedPhoto && Tween.createOrReplace(newSelectedPhoto.entity, {
            mode: Tween.Mode.Scale({
                start: Vector3.create(1.5, 0.7, 1),
                end: Vector3.create(3.05, 3.05 * 0.5625, 1),
            }),
            duration: 300,
            easingFunction: EasingFunction.EF_EASEOUTQUAD,
        })
    }

    private removePhoto(photo: Photo) {
        if (photo.entity) {
            engine.removeEntityWithChildren(photo.entity)
        }
        this.photos = this.photos.filter(p => p.id !== photo.id)

        if (this.selectedPhotoId === photo.id) {
            this.setSelectedPhoto(this.photos[0])
        }

        const selectedPhoto = this.selectedPhotos.find(p => p.id === photo.id)
        selectedPhoto && engine.removeEntityWithChildren(selectedPhoto.entity)
        this.selectedPhotos = this.selectedPhotos.filter(p => p.id !== photo.id)
    }

    private placePhotos() {
        this.photos = this.photos.sort((p1, p2) => p2.dateTime - p1.dateTime)

        this.photos.forEach((photo, i) => {
            const targetPosition = Vector3.create(i * (this.thumbWidth + 0.025), 0, 0)
            Transform.getMutable(photo.entity).position = targetPosition
            this.setPhotosVisibility()
        })

        if (!this.selectedPhotos) {
            this.setSelectedPhoto(this.photos[0])
        }
    }

    scrollCarousel(positions: number) {
        if (this.scrollIndex + positions < 0 || this.scrollIndex + positions >= this.photos.length - 2) return

        const currentPosition = Transform.get(this.carouselEntity).position
        this.scrollIndex += positions

        //before moving hide the last photo
        const oldPhoto = positions > 0 ? this.photos[this.scrollIndex - 1] : this.photos[this.scrollIndex + 3]
        if (oldPhoto) {
            this.hidePhoto(oldPhoto)
        }

        Tween.createOrReplace(this.carouselEntity, {
            mode: Tween.Mode.Move({
                start: currentPosition,
                end: Vector3.create(this.scrollIndex * -1 * (this.thumbWidth + 0.025) - this.thumbWidth, currentPosition.y, currentPosition.z),
            }),
            duration: 300,
            easingFunction: EasingFunction.EF_EASEOUTSINE,
        })

        engine.addSystem(() => {
            const tweenCompleted = tweenSystem.tweenCompleted(this.carouselEntity)
            if (tweenCompleted) {
                const newPhoto = positions < 0 ? this.photos[this.scrollIndex] : this.photos[this.scrollIndex + 2]
                if (newPhoto) {
                    this.showPhoto(newPhoto)
                }

                engine.removeSystem("scrollSystem")
            }
        }, undefined, "scrollSystem",)
        // this.setPhotosVisibility()
    }

    setPhotosVisibility() {
        this.photos.forEach((photo, i) => {
            const isVisible = i >= this.scrollIndex && i <= this.scrollIndex + 2

            if (isVisible) {
                this.showPhoto(photo)
            } else {
                this.hidePhoto(photo)
            }
        })
    }

    hidePhoto(photo: Photo) {
        VisibilityComponent.getMutable(photo.entity).visible = false
        // MeshCollider.deleteFrom(photo.entity)
        MeshCollider.getMutable(photo.entity).collisionMask = ColliderLayer.CL_NONE
        Tween.deleteFrom(photo.entity)
    }

    showPhoto(photo: Photo) {
        VisibilityComponent.getMutable(photo.entity).visible = true
        // MeshCollider.setPlane(photo.entity, ColliderLayer.CL_POINTER)
        MeshCollider.getMutable(photo.entity).collisionMask = ColliderLayer.CL_POINTER
        Tween.createOrReplace(photo.entity, {
            mode: Tween.Mode.Scale({
                start: Vector3.create(this.thumbWidth * 0.5, this.thumbHeight * 0.5, 1),
                end: Vector3.create(this.thumbWidth, this.thumbHeight, 1),
            }),
            duration: 50,
            easingFunction: EasingFunction.EF_EASEOUTSINE,
        })
    }
}

