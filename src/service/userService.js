import factoryDAO from './../model/DAOs/factoryDAO.js';
const DAOs = factoryDAO.get();
import bcrypt from 'bcrypt';
import { messagesService } from './messageService.js';

export class userService extends messagesService {
    constructor() {
        super()
    }

    async getUser (username) {
        return await DAOs.getUserDetails(username);
    }
    
    async completeUserByUsername (username) {
        return await DAOs.getCompleteUser(username)
    }
    
    async createUser (obj) {
        await DAOs.saveUser(obj);
        return obj
    }
    
    async comparePassword (pass1, pass2) {
        return await bcrypt.compare(pass1, pass2);
    }
}