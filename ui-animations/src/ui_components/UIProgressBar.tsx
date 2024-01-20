import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { EntityPropTypes, PositionUnit, UiEntity } from '@dcl/sdk/react-ecs'
import { UICounter, CustomCounter } from './UICounter'


// export let progressValue:number = 0
// export let loadingProgress:number = 0
// export let barColor:Color4 = Color4.White()

export let progressCounter = new CustomCounter( 4, 4, 32,  'center',  "images/customCounter/number_sheet.png")


// export function setProgressBar(value:number){
//   progressValue = value

//   if(progressValue > 1){
//     progressValue = 1
//   }
//   setProgressValues(progressValue)
// }

export class ProgressBar {
  progressValue:number = 0
  loadingProgress:number = 0
  startColor:Color4 = Color4.fromHexString('#ff5511ff')
  endColor:Color4 =  Color4.fromHexString('#22bb33ff')
  barColor: Color4 = Color4.fromHexString('#ff5511ff')
  constructor(){

  }
  setProgressBar(value:number){
    this.progressValue = value
  
    if(this.progressValue > 1){
      this.progressValue = 0
    }
    this.setProgressValues(this.progressValue)
  }

  setProgressValues(value:number){
    this.loadingProgress = (0.2 + value * 0.8) * 100    
    this.barColor  = Color4.lerp(this.startColor, this.endColor, value)    
  }

  incrementProgressBAr(deltaValue:number){
    this.progressValue += deltaValue
    if(this.progressValue > 1){
      this.progressValue = 1
    }
    this.setProgressValues(this.progressValue)  
  }
}

// function setProgressValues(value:number){
//   loadingProgress = (0.2 + value * 0.8) * 100
//   //strengthAlpha  = Color4.fromInts(value *255, 255 - value * 200,20 , 100 + value *155)
//   //barColor  = Color4.fromInts(255 - value * 200,value *255, 20 , 255)
//   barColor  = Color4.lerp(Color4.fromHexString('#ff5511ff'), Color4.fromHexString('#22bb33ff'), value)
//   //progressCounter.setColor(barColor)
// }

// export function incrementProgressBAr(deltaValue:number){
//   progressValue += deltaValue
//   if(progressValue > 1){
//     progressValue = 0
//   }
//   setProgressValues(progressValue)  
// }



export type ProgressBarProps = Omit<EntityPropTypes, 'uiTransform' | 'uiBackground'> & {
  children?: ReactEcs.JSX.Component[] 
  progressBar:ProgressBar        
  uiTransform?: Omit<
    NonNullable<EntityPropTypes['uiTransform']>,
    '' 
  > 
  uiBackground?: Omit<
    NonNullable<EntityPropTypes['uiBackground']>,
    '' 
  >  
}


export function UIProgressBar(props:  ProgressBarProps){
  return (
    <UiEntity
            // progress bar container
            uiTransform={{
            width: '30%',
            height: '15%',
            minHeight: '5%',
            maxHeight: 128,
            alignItems: 'center',
            alignSelf: 'center',
            positionType: 'absolute',
            position:{left:'35%', bottom: '5%'},
            display: 'flex'
            }}
        >
     <UiEntity
            // counter container
            uiTransform={{
            width: '100%',
            height: '100%',
            
            positionType: 'absolute',
            position:{ top: '-70%'},
            display: 'flex'
            }}
        >        
        </UiEntity>
            <UiEntity
                uiTransform={{                  
                    width:'100%',
                    height:'100%',
                    positionType:'absolute',                  
                }}
                uiBackground={{
                  textureMode:'nine-slices',
                  texture: {
                    src: "images/progressBar/bar_bg.png",
                  },
                  textureSlices: {
                    top: 0.49,
                    bottom: 0.49,
                    left: 0.49,
                    right: 0.49
                  }
                }}
              />
             
            <UiEntity
                //loading bar scaling part
                uiTransform={{
                    width: (props.progressBar.loadingProgress + '%') as PositionUnit,
                    height: '100%',
                    minWidth: 100,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    alignSelf: 'center'
                }}
                uiBackground={{
                    color: props.progressBar.barColor,
                    textureMode: 'nine-slices',
                    texture: {
                    src: "images/progressBar/bar_rounded.png"
                    },
                    textureSlices: {
                        top: 0.49,
              bottom: 0.49,
              left: 0.49,
              right: 0.49
                    },
            
          }}
        >
        </UiEntity>        
    </UiEntity>    
  )
}

// export function createProgressBarUI() { 

//     return(
//         <UiEntity
//             // progress bar container
//             uiTransform={{
//             width: '30%',
//             height: '15%',
//             minHeight: '5%',
//             maxHeight: 128,
//             alignItems: 'center',
//             alignSelf: 'center',
//             positionType: 'absolute',
//             position:{left:'35%', bottom: '5%'},
//             display: 'flex'
//             }}
//         >
//      <UiEntity
//             // counter container
//             uiTransform={{
//             width: '100%',
//             height: '100%',
            
//             positionType: 'absolute',
//             position:{ top: '-70%'},
//             display: 'flex'
//             }}
//         >        
//         </UiEntity>
//             <UiEntity
//                 uiTransform={{                  
//                     width:'100%',
//                     height:'100%',
//                     positionType:'absolute',                  
//                 }}
//                 uiBackground={{
//                   textureMode:'nine-slices',
//                   texture: {
//                     src: "images/progressBar/bar_bg.png",
//                   },
//                   textureSlices: {
//                     top: 0.49,
//                     bottom: 0.49,
//                     left: 0.49,
//                     right: 0.49
//                   }
//                 }}
//               />
             
//             <UiEntity
//                 //loading bar scaling part
//                 uiTransform={{
//                     width: (loadingProgress + '%') as PositionUnit,
//                     height: '100%',
//                     minWidth: 100,
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     alignSelf: 'center'
//                 }}
//                 uiBackground={{
//                     color: barColor,
//                     textureMode: 'nine-slices',
//                     texture: {
//                     src: "images/progressBar/bar_rounded.png"
//                     },
//                     textureSlices: {
//                         top: 0.49,
//               bottom: 0.49,
//               left: 0.49,
//               right: 0.49
//                     },
            
//           }}
//         >

//         </UiEntity>
//         <UiEntity
//             // counter container
//             uiTransform={{
//             width: '100%',
//             height: '100%',            
//             positionType: 'absolute',           
//             display: 'flex'
//             }}
//         >
//         <UICounter customCounter={ progressCounter}  />          
//         </UiEntity>
//     </UiEntity>    
      
//     )
// }

