import { UiCanvasInformation, engine } from "@dcl/sdk/ecs";
import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { UiEntity, Button } from "@dcl/sdk/react-ecs";
import { tieredFontScale, tieredModalTextWrapScale, wordWrap } from "../helperFunctions";
import { pauseIcon, playIcon, skipIcon } from "./ui";
import { audioType, currentSong, isPlaying, openMixcloud, skipSong, toggleAudio } from "../Audio/audio";


const playlistFontSize = 12;
const playlistTextColor = Color4.White()

export function playlistUI() {
    const canvasHeight = UiCanvasInformation.get(engine.RootEntity).height;

    if (audioType == 'playlist') {
        let songData = `${currentSong.title}`;
        let songDataWrap = wordWrap(songData, 8 * tieredModalTextWrapScale, 6);
        return (

            <UiEntity
                key={'playlist-main'}
                uiTransform={{
                    height: `${canvasHeight * 0.18}`,
                    width: `${canvasHeight * 0.08}`,
                    positionType: 'absolute',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 4,
                    position: {
                        top: '7%',
                        right: '0%',
                        bottom: '0%',
                        left: '96%'
                    },
                    maxWidth: 100,
                    maxHeight: 200
                }}
            >
                {/* Button for more playlist info */}
                <Button
                    key={'playlist-button'}
                    uiTransform={{
                        width: `${canvasHeight * 0.07}`,
                        height: `${canvasHeight * 0.038}`,
                        margin: '0 0 0 0'
                    }}
                    value={songDataWrap}
                    variant='primary'
                    textAlign="top-center"
                    fontSize={playlistFontSize * tieredFontScale}
                    color={playlistTextColor}
                    onMouseDown={openMixcloud}
                />
                <UiEntity
                    key={'playlist-space'}
                    uiTransform={{
                        margin: '5 0 0 0',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}
                >
                    {/* Play / pause button */}
                    <Button
                        key={'playlist-button2'}
                        uiTransform={{
                            width: `${canvasHeight * 0.025}`,
                            height: `${canvasHeight * 0.025}`,
                            margin: '0 50px 15px 0' // space between buttons
                        }}
                        value=''
                        variant='secondary'
                        fontSize={playlistFontSize * tieredFontScale}
                        color={playlistTextColor}
                        uiBackground={{
                            textureMode: 'nine-slices',
                            texture: {
                                src: isPlaying('playlist') ? pauseIcon : playIcon,
                            },
                            textureSlices: {
                                top: -0.0,
                                bottom: -0.0,
                                left: -0.0,
                                right: -0.0,
                            },
                        }}
                        onMouseDown={() => toggleAudio('playlist')}
                    />
                    {/* Skip button */}
                    <Button
                        key={'playlist-button3'}
                        uiTransform={{
                            width: `${canvasHeight * 0.025}`,
                            height: `${canvasHeight * 0.025}`,
                            margin: '0 0 15px 0'
                        }}
                        value=''
                        variant='secondary'
                        fontSize={playlistFontSize * tieredFontScale}
                        color={Color4.White()}
                        uiBackground={{
                            textureMode: 'nine-slices',
                            texture: {
                                src: skipIcon,
                            },
                            textureSlices: {
                                top: -0.0,
                                bottom: -0.0,
                                left: -0.0,
                                right: -0.0,
                            },
                        }}
                        onMouseDown={skipSong}
                    />
                </UiEntity>
            </UiEntity>
        );
    }
}
