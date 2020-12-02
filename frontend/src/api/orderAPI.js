import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:5000"


export default {
    getOrders(orderPk=null) {
        return axios.get("/orders", {params:{pk:orderPk}})
    },

    makeOrders(data) {
        let status = axios.post('/orders', {data:data})
        return status
    },

    setComplete(orderPk){
        let status = axios.patch('/orders', {pk:orderPk})
        return status
    },

    deleteOrder(orderPk){
        let status = axios.delete('/orders', {params:{pk:orderPk}})
        return status
    },

}