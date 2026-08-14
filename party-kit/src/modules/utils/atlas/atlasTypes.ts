export type AtlasImage = {
    name: string
    cell: {
        x: number
        y: number
        width: number
        height: number
    },
    image: {
        x: number
        y: number
        width: number
        height: number
    },
    original: {
        width: number
        height: number
    },
    layout_position: {
        row: number
        col: number
    }
}

export type AtlasData = {
    atlas: {
        src: string
        srcAlpha: string
        width: number
        height: number
        margin: number
        rows: number
        total_images: number
    }
    images: AtlasImage[]

}