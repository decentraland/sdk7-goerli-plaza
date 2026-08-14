import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs";
import { getAnimAlpha, getAnimOffsetY, getAnimScale, getSizeScale, getSplashImageIndex, getSplashOffsetX, getSplashOffsetY, getSplashSide, getSplashUVs, isSplashVisible, isVisible } from "./cakeSplash";
import { Color4 } from "@dcl/sdk/math";

export function createCakeSplashUI() {
    return (
        <UiEntity uiTransform={{
            display: isVisible() ? 'flex' : 'none',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        >
            {createCakeSplashImage(0)}
            {createCakeSplashImage(1)}
            {createCakeSplashImage(2)}
            {createCakeSplashImage(3)}
            {createCakeSplashImage(4)}
            {createCakeSplashImage(5)}
            {createCakeSplashImage(6)}
            {createCakeSplashImage(7)}
            {createCakeSplashImage(8)}
        </UiEntity>
    )
}

function createCakeSplashImage(index: number) {
    const verticalPercent = 5 + getSplashOffsetY(index) * 65
    return (
        <UiEntity uiTransform={{
            display: isSplashVisible(index) ? 'flex' : 'none',
            width: 256 * getAnimScale(index) * getSizeScale(index),
            height: 256 * getAnimScale(index) * getSizeScale(index),
            justifyContent: 'center',
            alignItems: 'center',
            positionType: 'absolute',
            position: {
                top: `${verticalPercent}%` as `${number}%`,
            },
        }}
        >
        <UiEntity uiTransform={{
            width: 256 * getAnimScale(index) * getSizeScale(index),
            height: 256 * getAnimScale(index) * getSizeScale(index),
            positionType: 'absolute',
            position: {
                top: getAnimOffsetY(index),
                left: 700 * getSplashSide(index) * getSplashOffsetX(index),
            },
        }}
        uiBackground={{
            texture: {src: "images/cake/Splash_" + (getSplashImageIndex(index)+1) + ".png"},
            textureMode: 'stretch',
            color: Color4.create(0.9, 0.8, 0.7, getAnimAlpha(index)),
            uvs: getSplashUVs(index)
        }}
        />
        </UiEntity>
    )
}