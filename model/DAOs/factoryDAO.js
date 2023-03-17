import messagesDAO from "./messagesDAO.js"

class factoryDAO {
    static get() {
        return new messagesDAO()
    }
}

export default factoryDAO