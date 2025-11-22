import { UI } from "./ui";

export class GameController{
    public ui: UI
    constructor() {
        this.ui = new UI()
    }
}