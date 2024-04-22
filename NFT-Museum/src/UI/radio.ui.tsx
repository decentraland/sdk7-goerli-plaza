import { UiCanvasInformation, engine } from "@dcl/sdk/ecs";
import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { UiEntity, Button, Label } from "@dcl/sdk/react-ecs";
import { tieredFontScale, wordWrap } from "../helperFunctions";
import { audioFontSize, backgroundUI, highlightColor, linkIcon, mainColor, mainFont, pauseIcon, playIcon } from "./ui";
import { audioType, isPlaying, toggleAudio, openRadioLink } from "../audio";

const radioStationName = '24 House Radio'
const radioStationNameWrap = wordWrap(radioStationName, 14, 3)


export function radioUI() {
    if (audioType === 'radio') {
        const canvasHeight = UiCanvasInformation.get(engine.RootEntity).height;

        return (
            <UiEntity
                key={'radio-main'}
                uiTransform={{
                    height: `${canvasHeight * 0.18}`,
                    width: `${canvasHeight * 0.18}`,
                    positionType: 'absolute',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 4,
                    position: {
                        top: '7%',
                        right: '0%',
                        bottom: '0%',
                        left: '92%'
                    },
                }}
                uiBackground={{
                    texture: { src: backgroundUI },
                    textureMode: 'nine-slices',
                    textureSlices: {
                        top: -0.0,
                        bottom: -0.0,
                        left: -0.0,
                        right: -0.0,
                    },
                }}
            >

                {/* Label with radio name */}
                <Label
                    key={'radio-name'}
                    uiTransform={{
                        width: `${canvasHeight * 0.07}`,
                        height: `${canvasHeight * 0.038}`,
                        margin: '0 0 0 0',
                        position: `-11% 0 0 1%`,
                    }}
                    value={radioStationNameWrap}
                    fontSize={audioFontSize * tieredFontScale}
                    color={highlightColor}
                    font={mainFont}

                />

                {/* Play / pause radio button */}
                <Button key={'radio-toggle'}
                    uiTransform={{
                        width: `${canvasHeight * 0.035}`,
                        height: `${canvasHeight * 0.035}`,
                        position: `-7% 0 0% 0%`,
                    }}

                    value=''
                    variant='secondary'
                    fontSize={24 * tieredFontScale}
                    color={mainColor}
                    uiBackground={{
                        textureMode: 'nine-slices',
                        texture: {
                            src: isPlaying('radio') ? pauseIcon : playIcon,
                        },
                        textureSlices: {
                            top: -0.0,
                            bottom: -0.0,
                            left: -0.0,
                            right: -0.0,
                        },
                    }}
                    onMouseDown={() => toggleAudio('radio')}
                />

                {/* Social link button */}
                <Button
                    key={'radio-social-link'}
                    uiTransform={{
                        width: `${canvasHeight * 0.015}`,
                        height: `${canvasHeight * 0.015}`,
                        margin: '0 0 0px 0',
                        position: `1% 0 0 -1%`,

                    }}
                    value=''
                    variant='secondary'
                    fontSize={audioFontSize * tieredFontScale}
                    color={Color4.White()}
                    uiBackground={{
                        textureMode: 'nine-slices',
                        texture: {
                            src: linkIcon,
                        },
                        textureSlices: {
                            top: -0.0,
                            bottom: -0.0,
                            left: -0.0,
                            right: -0.0,
                        },
                    }}
                    onMouseDown={openRadioLink}
                />
            </UiEntity>
        );
    } else {
        return null;
    }
}
