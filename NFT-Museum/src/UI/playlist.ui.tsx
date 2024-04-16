import { UiCanvasInformation, engine } from "@dcl/sdk/ecs";
import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { UiEntity, Button } from "@dcl/sdk/react-ecs";
import { tieredFontScale, tieredModalTextWrapScale, wordWrap } from "../helperFunctions";
import { pauseIcon, playIcon, skipIcon } from "./ui";
import { nowPlayingElement, openMixcloud, playingArtist, skipSong, streamPlayingRef, togglePlaylist, updateNowPlayingTitle } from "../Audio/playlist";

// Set Playlist to 'false' to hide the playlist UI:
let Playlist: Boolean = false;

let songData = 'RED ALBERT Playlist';
let songDataWrap = wordWrap(songData, 8 * tieredModalTextWrapScale, 6);
let playlistFontSize = 12;


export function playlistUI() {
    const canvasHeight = UiCanvasInformation.get(engine.RootEntity).height;

    if (Playlist) {
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
                    color={Color4.White()}
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
                    <Button
                        key={'playlist-button2'}

                        uiTransform={{
                            width: `${canvasHeight * 0.025}`,
                            height: `${canvasHeight * 0.025}`,
                            margin: '0 5px 15px 0' // space between buttons
                        }}
                        value=''
                        variant='secondary'
                        fontSize={24 * tieredFontScale}
                        color={Color4.White()}
                        uiBackground={{
                            textureMode: 'nine-slices',
                            texture: {
                                src: streamPlayingRef.value ? pauseIcon : playIcon,
                            },
                            textureSlices: {
                                top: -0.0,
                                bottom: -0.0,
                                left: -0.0,
                                right: -0.0,
                            },
                        }}
                        onMouseDown={togglePlaylist}
                    />
                    <Button
                        key={'playlist-button3'}

                        uiTransform={{
                            width: `${canvasHeight * 0.025}`,
                            height: `${canvasHeight * 0.025}`,
                            margin: '0 0 15px 0'
                        }}
                        value=''
                        variant='secondary'
                        fontSize={24 * tieredFontScale}
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
                        onMouseDown={() => {
                            skipSong();
                            updateNowPlayingTitle(nowPlayingElement, playingArtist);
                        }}
                    />
                </UiEntity>
            </UiEntity>
        );
    }
}
