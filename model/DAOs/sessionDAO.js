import UserModel from './../db/sessions.js';
import options from './../db/connection.js';
import userDTO from '../DTOs/user.js';

class sessionDAO {
    getCompleteUser = async (username) => {
        await options.connect()
        const user = await UserModel.findOne({'username': username});
        await options.disconnect()
        return user
    }
    getUserDetails = async (username) => {
        await options.connect()
        const user = await UserModel.findOne({'username': username}, {__v: 0, _id: 0, password: 0});
        await options.disconnect()
        return user
    }
    saveUser = async (user) => {
        let usr = userDTO(user)
        console.log(usr);
        await options.connect()
        const newUser = await UserModel.create(usr)
        await options.disconnect()
    }
}

export default sessionDAO