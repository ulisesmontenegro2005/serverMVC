import { cartController } from "./cartController.js";

export class factoryController {
    static get() {
        return new cartController()
    }
}