
export class IntervalUtil {
    elapsedTime: number
    targetTime: number
    onTargetTimeReached: () => void

    onTimeReachedCallback?: () => void

    /**
     * @param millisecs - amount of time in milliseconds
     * @param onTimeReachedCallback - callback for when time is reached
     */
    constructor(millisecs: number, onTimeReachedCallback?: () => void) {
        this.elapsedTime = 0
        this.targetTime = millisecs / 1000
        this.onTimeReachedCallback = onTimeReachedCallback
        this.onTargetTimeReached = () => {
            this.elapsedTime = 0
            if (this.onTimeReachedCallback) this.onTimeReachedCallback()
        }
    }

    setCallback(onTimeReachedCallback: () => void) {
        this.onTimeReachedCallback = onTimeReachedCallback
    }
    /**
     * 
     * @param dt 
     * @returns false if not hit interval, true if hit interval
     */
    update(dt:number): boolean{
        
        this.elapsedTime += dt
        //log("interval ",this.elapsedTime , this.targetTime)
        if(this.elapsedTime > this.targetTime){
            this.onTargetTimeReached()
            return true
            //this.elapsedTime -= this.targetTime //push back
        }
        return false;
    }
    
}