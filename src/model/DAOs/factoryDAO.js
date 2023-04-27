import { OrdersDAO } from "./ordersDAO.js"

class factoryDAO {
    static get() {
        return new OrdersDAO()
    }
}

export default factoryDAO