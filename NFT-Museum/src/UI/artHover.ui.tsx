import { UiCanvasInformation, engine } from "@dcl/ecs";
import ReactEcs, { UiEntity, Label } from "@dcl/react-ecs";
import { currentArtworkId, findArtworkById, hoverVisible, toggleHover } from "../Art/artHover";
import { wordWrap, tieredModalTextWrapScale, breakLines, tieredFontScale } from "../helperFunctions";
import { backgroundUI, highlightColor, mainColor, mainFont } from "./ui";



const titleFontSize = 20;
const descriptionFontSize = 10
const Max_Chars = 32
const Max_Lines = 3


// Set all Art Titles and Descriptions in artData.ts 
export function artDetailsUI() {
  if (hoverVisible) {
    const artwork = findArtworkById(currentArtworkId);
    if (artwork && artwork.visible) {
      const { title, description } = artwork;
      const artTitleWrap = wordWrap(title, Max_Chars * tieredModalTextWrapScale, Max_Lines)
      const artDescriptionWrap = breakLines(description, Max_Chars)
      const canvasHeight = UiCanvasInformation.get(engine.RootEntity).height;


      return (
        <UiEntity key={'art-main'}
          uiTransform={{
            height: `${canvasHeight * 0.18}`,
            width: `${canvasHeight * 0.18}`,
            positionType: 'absolute',
            position: `23% 0 0 92%`,
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onMouseDown={toggleHover}
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
          {/* Label displaying Art Title */}
          <Label key={'artTitle'}
            value={artTitleWrap}
            fontSize={titleFontSize * tieredFontScale}
            font={mainFont}
            textAlign="middle-center"
            uiTransform={{
              width: `${canvasHeight * 0.07}`,
              height: `${canvasHeight * 0.038}`,
              margin: '0 0 0 0',
              position: `13% 0 0 1%`,
            }}
            color={highlightColor}
            onMouseDown={toggleHover}

          />
          {/* Label displaying Art Details */}
          <Label key={'artDetails'}
            value={artDescriptionWrap}
            fontSize={descriptionFontSize * tieredFontScale}
            font={mainFont}
            textAlign="middle-center"
            uiTransform={{
              width: `${canvasHeight * 0.07}`,
              height: `${canvasHeight * 0.038}`,
              margin: '0 0 0 0',
              position: `20% 0 0 2%`,
            }}
            color={mainColor}
            onMouseUp={toggleHover}
          />
        </UiEntity>
      );
    }
  }
}
