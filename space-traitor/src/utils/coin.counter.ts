export class CreditCounter{
    public credits: number
    constructor(){
        this.credits = 0
    }
    set(number:number){
        this.credits = number
    }
    increase(number:number){
        this.credits = this.credits + number
    }
    decrease(number:number){
        this.credits = this.credits  - number
    }
}