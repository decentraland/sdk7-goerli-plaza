import { UiCanvasInformation, engine } from "@dcl/sdk/ecs";
import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { UiEntity, Button, Label } from "@dcl/sdk/react-ecs";
import { tieredFontScale, tieredModalTextWrapScale, wordWrap } from "../helperFunctions";
import { audioFont, audioFontSize, backgroundUI, linkIcon, pauseIcon, playIcon } from "./ui";
import { audioType, currentSong, isPlaying, openMixcloud, prevSong, skipSong, toggleAudio } from "../Audio/audio";


const playlistSmallFont = 8
const playlistTextColor = Color4.Black()
const highlightColor = Color4.Red()
const previousSongIcon = 'images/prev.png'
const nextSongIcon = 'images/next.png'


export function playlistUI() {
    const canvasHeight = UiCanvasInformation.get(engine.RootEntity).height;

    if (audioType == 'playlist') {
        let songData = `${currentSong.title}`;
        let songDataArtist = `${currentSong.artist}`;

        let songDataWrap = wordWrap(songData, 20 * tieredModalTextWrapScale, 6);
        let songDataArtistWrap = wordWrap(songDataArtist, 28 * tieredModalTextWrapScale, 6);

        return (

            <UiEntity
                key={'playlist-main'}
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
                {/* Label with song title */}
                <Label
                    key={'playlist-song-title'}
                    uiTransform={{
                        width: `${canvasHeight * 0.07}`,
                        height: `${canvasHeight * 0.038}`,
                        margin: '0 0 0 0',
                        position: `-2% 0 0 1%`,
                    }}
                    value={songDataWrap}
                    textAlign="top-center"
                    fontSize={audioFontSize * tieredFontScale}
                    color={highlightColor}
                    font={audioFont}
                />
                    {/* Label with song artist */}
                    <Label
                    key={'playlist-song-artist'}
                    uiTransform={{
                        width: `${canvasHeight * 0.07}`,
                        height: `${canvasHeight * 0.038}`,
                        margin: '0 0 0 0',
                        position: `-13% 0 0 2%`,
                    }}
                    value={songDataArtistWrap}
                    textAlign="top-center"
                    fontSize={playlistSmallFont * tieredFontScale}
                    color={playlistTextColor}
                    font={audioFont}
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
                            width: `${canvasHeight * 0.035}`,
                            height: `${canvasHeight * 0.035}`,
                            margin: '0 0px 0px 0', // space between buttons
                            position: `-105% 0 0% 35%`,
                        }}
                        value=''
                        variant='secondary'
                        fontSize={audioFontSize * tieredFontScale}
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
                      {/* Previous song button */}
                      <Button
                        key={'playlist-previous-song'}
                        uiTransform={{
                            width: `${canvasHeight * 0.015}`,
                            height: `${canvasHeight * 0.015}`,
                            margin: '0 0 20px 0',
                            position: `-85% 0 0 -40%`,

                        }}
                        value=''
                        variant='secondary'
                        fontSize={audioFontSize * tieredFontScale}
                        color={Color4.White()}
                        uiBackground={{
                            textureMode: 'stretch',
                            textureSlices: {
                                left: 1, // Flip horizontally
                                right: 0,
                                top: 0, // Flip vertically
                                bottom: 0,
                            },
                            texture: {
                                src: previousSongIcon,
                                wrapMode: 'repeat', 
                            },
                        }}
                        onMouseDown={prevSong}
                    />
                    {/* Next song button */}
                    <Button
                        key={'playlist-next-song'}
                        uiTransform={{
                            width: `${canvasHeight * 0.015}`,
                            height: `${canvasHeight * 0.015}`,
                            margin: '0 0 20px 0',
                            position: `-85% 0 0 27%`,

                        }}
                        value=''
                        variant='secondary'
                        fontSize={audioFontSize * tieredFontScale}
                        color={Color4.White()}
                        uiBackground={{
                            textureMode: 'nine-slices',
                            texture: {
                                src: nextSongIcon,
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
                    
                     {/* Social link button */}
                     <Button
                        key={'playlist-social-link'}
                        uiTransform={{
                            width: `${canvasHeight * 0.015}`,
                            height: `${canvasHeight * 0.015}`,
                            margin: '0 0 0px 0',
                            position: `0% 0 0 -35%`,

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
                        onMouseDown={openMixcloud}
                    />
                </UiEntity>
            </UiEntity>
        );
    }
}
