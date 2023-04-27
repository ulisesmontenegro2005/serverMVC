import { userService } from "./userService.js"

export class factoryService {
    static get() {
        return new userService()
    }
}