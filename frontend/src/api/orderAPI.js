import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:5000"
let base = "http://127.0.0.1:5000"
// axios.defaults.header = {}


export default {
    getOrders(startDate, endDate) {
        return axios.get("/orders", {
            params: {
              startDate: startDate,
              endDate : endDate
            }
          })
    },


    
    makeOrders(data) {
      console.log(1111)
      // fetch(base + "/orders", {
      //     method: "POST",
      //     headers: {
      //       'Content-type': 'application/json',
      //       "Access-Control-Allow-Origin": "*"
      //   },
      //     body: JSON.stringify({
      //       data : data
      //     })
      //   })
    //   let config = {
    //     headers: {
    //         "Access-Control-Allow-Origin": "*"
    //     },
    // };
      
        let status = axios.post('/orders', data)

        return status

    },

    async get_inst() {
        return axios.get("/inst_update")
        }
}