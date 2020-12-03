import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:5000"

export default {
    getStat(startDate, endDate, menu = null, option = null) {
        console.log(menu)
        return axios.get("/statistics", {params:{startDate : startDate, endDate : endDate, menu : menu, option : option}})
    },
}