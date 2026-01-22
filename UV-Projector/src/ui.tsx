import { InputAction, PointerEventType, VideoPlayer, engine, inputSystem } from '@dcl/sdk/ecs';
import { Color4 } from '@dcl/sdk/math';
import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { video, videoParent } from './modules/materials';
import { Screen } from './modules/screens';


let uitext: string = "Click to start video";
var visible: boolean = true

export const uiInstruction = () => (

    <UiEntity
        uiTransform={{
            width: "auto",
            height: "auto",
            position: { left: '50%' },
            display: visible ? 'flex' : 'none',
        }}
        uiBackground={{ color: Color4.Green() }}
    >
        <Label
            value={uitext}
            fontSize={25}
        />
    </UiEntity>
)

function actionableData() {
    visible = false
    VideoPlayer.getMutable(videoParent).playing = true
    VideoPlayer.getMutable(videoParent).loop = true
}
engine.addSystem(() => {
    if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN)) {
        actionableData()
    }
})
ReactEcsRenderer.setUiRenderer(uiInstruction)

