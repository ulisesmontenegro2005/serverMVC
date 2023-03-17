import singleton from "../singleton.js";

function userDTO(usr) {
    let user = singleton(usr)
    return user
}

export default userDTO
