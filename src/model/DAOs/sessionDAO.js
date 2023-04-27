import UserModel from './../db/sessions.js';
import userDTO from '../DTOs/user.js';

class sessionDAO {
    getCompleteUser = async (username) => {
        const user = await UserModel.findOne({'email': username});
        return user
    }
    getUserDetails = async (username) => {
        const user = await UserModel.findOne({'email': username}, {__v: 0, _id: 0, password: 0});
        return user
    }
    saveUser = async (user) => {
        let usr = userDTO(user)
        usr = {...usr, cart: []}
        usr.email = usr.username
        const newUser = await UserModel.create(usr)
    }
}

export default sessionDAO