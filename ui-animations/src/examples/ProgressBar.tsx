import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs"
import { ProgressBar, UIProgressBar } from "../ui_components/UIProgressBar";

export let myProgressBar = new ProgressBar()

export function createProgressBarUI() {
    return (
        <UIProgressBar progressBar={myProgressBar} /> 
    )
}

let progress = 0

// system to step along each sprite in each row with the given frequency
export function ProgressBarTestSystem(dt: number) {

    if(progress < 1){
        progress += dt * 0.25
    }
    else{
        progress = 0        
    }

    myProgressBar.setProgressBar(progress) 
    //progressCounter.increaseNumberBy(16)     
    
  }