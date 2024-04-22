import { engine, Transform, TextShape, Font, GltfContainer } from "@dcl/sdk/ecs"
import { Color4, Quaternion, Vector3 } from "@dcl/sdk/math"
import { wordWrap } from "./helperFunctions"
import { sceneCentrePosition } from "./structures"


// Set to true to use custom texts and hide the defaults
let showCustomText: Boolean = false


/// Info area text panels
const textPanelValue = 'Welcome! \n\nFeel free to customise this text however works best for you.'
const textPanelColor = Color4.White()


// Elevator area text panels
const elevatorTextPanelValue = 'NFT Museum \n\nExplore the whole museum and you might find a gift. \n\nHave fun!'
const elevatorTextPanelColor = Color4.White()

// Art Gallery entrance text
const artGalleryText = 'A R T   G A L L E R Y'
const artGalleryColor = Color4.Black()


// Elevator entrance text
const elevatorText = 'E L E V A T O R S'
const elevatorFontColor = Color4.Black()

// Museum Sign
const museumSignText = 'M \nU \nS \nE \nU \nM' // Vertical text
const museumSignFontColor = Color4.Black()

// Fonts: 
const serif = Font.F_SERIF
const mono = Font.F_MONOSPACE


export function createCustomTextPanels() {
    createText(
        Vector3.create(8.99, 3.3, 4.66),
        Vector3.create(0, 0, 0),
        textPanelValue,
        serif,
        1,
        textPanelColor,
        15
    )


    createText(
        Vector3.create(8.99, 3.3, 27.35),
        Vector3.create(0, 180, 0),
        textPanelValue,
        serif,
        1,
        textPanelColor,
        15
    )

    createText(
        Vector3.create(29.02, 2.85, 22.8),
        Vector3.create(0, 180, 0),
        elevatorTextPanelValue,
        serif,
        1,
        elevatorTextPanelColor,
        15
    )

    createText(
        Vector3.create(29.02, 2.85, 9.2),
        Vector3.create(0, 0, 0),
        elevatorTextPanelValue,
        serif,
        1,
        elevatorTextPanelColor,
        15
    )
}

export function createCustomTextTitles() {

    if (showCustomText) {


        createText(
            Vector3.create(14.25, 5.85, 16),
            Vector3.create(0, -90, 0),
            artGalleryText,
            mono,
            8,
            artGalleryColor,
            40
        )


        createText(
            Vector3.create(26.7, 5.85, 16),
            Vector3.create(0, 90, 0),
            elevatorText,
            mono,
            8,
            elevatorFontColor,
            40
        )

        createText(
            Vector3.create(31.2, 11.2, 30.6),
            Vector3.create(0, 90, 0),
            museumSignText,
            mono,
            9,
            museumSignFontColor,
            40
        )
        createText(
            Vector3.create(31.7, 11.2, 30.5),
            Vector3.create(0, -90, 0),
            museumSignText,
            mono,
            9,
            museumSignFontColor,
            40
        )
        createText(
            Vector3.create(31.7, 11.2, 1.35),
            Vector3.create(0, -90, 0),
            museumSignText,
            mono,
            9,
            museumSignFontColor,
            40
        )
        createText(
            Vector3.create(31.2, 11.2, 1.54),
            Vector3.create(0, 90, 0),
            museumSignText,
            mono,
            9,
            museumSignFontColor,
            40
        )
    }
}

export function createDefaultTexts() {
    if (!showCustomText) {
        const defaultTexts = engine.addEntity()
        Transform.create(defaultTexts, {
            position: sceneCentrePosition
        })
        GltfContainer.create(defaultTexts, {
            src: 'models/museumText.glb'
        })
    }
}

export function createText(
    position: Vector3,
    rotation: Vector3,
    text: string,
    font: Font,
    fontSize: number,
    textColor: Color4,
    maxWidth: number
) {
    let entity = engine.addEntity()
    Transform.create(entity, {
        position: position,
        rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z)
    })
    TextShape.create(entity, {
        text: wordWrap(text, maxWidth, 10),
        fontSize: fontSize,
        font: font,
        textColor: textColor

    })
}