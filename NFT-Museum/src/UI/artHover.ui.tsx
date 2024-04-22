import { UiCanvasInformation, engine } from "@dcl/ecs";
import { Color4 } from "@dcl/ecs-math";
import ReactEcs, { UiEntity, Label } from "@dcl/react-ecs";
import { currentArtworkId, findArtworkById, hoverVisible, toggleHover } from "../Art/artHover";
import { wordWrap, tieredModalTextWrapScale, breakLines, tieredFontScale } from "../helperFunctions";



const Max_Chars = 38
const Max_Lines = 3
const titleFontSize = 22;
const descriptionFontSize = 12

const titleFont = 'serif'
const descriptionFont = 'sans-serif'

const titleColor = Color4.White()
const descriptionColor = Color4.White()

const artFrame = 'images/artFrame.png'


// Set all Art Titles and Descriptions in artData.ts 

export function artDetailsUI() {
  if (hoverVisible) {
    const artwork = findArtworkById(currentArtworkId);
    if (artwork && artwork.visible) {
      const { title, description } = artwork;
      const artTitleWrap = wordWrap(title, Max_Chars * tieredModalTextWrapScale, Max_Lines)
      const artDescriptionWrap = breakLines(description, Max_Chars)


      return (
        <UiEntity key={'art-main'}
          uiTransform={{
            height: `${UiCanvasInformation.get(engine.RootEntity).height * .2}`,
            width: `${UiCanvasInformation.get(engine.RootEntity).width * .5}`,
            positionType: 'absolute',
            position: `85% 0 0 90%`,
            flexDirection: 'column',
            alignItems: 'center',
            maxHeight: `${UiCanvasInformation.get(engine.RootEntity).height * .2}`,
            maxWidth: `${UiCanvasInformation.get(engine.RootEntity).width * .1}`,
            minWidth: '200px',
          }}
          onMouseDown={toggleHover}
          uiBackground={{
            texture: { src: artFrame },
            textureMode: 'nine-slices',
            textureSlices: {
              top: -0.0,
              bottom: -0.0,
              left: -0.0,
              right: -0.0,
            },
          }}

        >
          {/* Label displaying Art Title */}
          <Label key={'artTitle'}
            value={artTitleWrap}
            fontSize={titleFontSize * tieredFontScale}
            font={titleFont}
            textAlign="middle-center"
            uiTransform={{
              width: 'auto',
              height: 'auto',
              alignSelf: 'center',
              margin: `15% 0px 0px ${UiCanvasInformation.get(engine.RootEntity).width * .023}`,
              positionType: 'absolute',
              position: '-18% 0 0 0%',
            }}
            color={titleColor}
            onMouseDown={toggleHover}

          />
          {/* Label displaying Art Details */}
          <Label key={'artDetails'}
            value={artDescriptionWrap}
            fontSize={descriptionFontSize * tieredFontScale}
            font={descriptionFont}
            textAlign="middle-center"
            uiTransform={{
              width: 'auto',
              height: 'auto',
              alignSelf: 'center',
              margin: `0px 0px 0px ${UiCanvasInformation.get(engine.RootEntity).width * .015}`,
              positionType: 'absolute',
              position: '10% 0 -9% 0%',
            }}
            color={descriptionColor}
            onMouseUp={toggleHover}
          />
        </UiEntity>


      );

    }
  }

}
