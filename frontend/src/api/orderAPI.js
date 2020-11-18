import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:5000"
let base = "http://127.0.0.1:5000"
// axios.defaults.header = {}


export default {
    getOrders(orderPk=null) {
        return axios.get("/orders", {params:{pk:orderPk}})
    },


    
    makeOrders(data) {
        console.log(data)
        // let status = axios.post('/orders', {params: {data:data}})
        let status = axios.post('/orders', {data:data})

        return status

    },

    setComplete(orderPk){
    let status = axios.put('/orders', {pk:orderPk})

    return status
    },

    deleteOrder(orderPk){
      console.log(orderPk)
      let status = axios.delete('/orders', {params:{pk:orderPk}})

      return status
  },


    async test() {
        return axios.get("/test")
        }
}