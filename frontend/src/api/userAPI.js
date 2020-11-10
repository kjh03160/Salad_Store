import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:5000"
// axios.defaults.header = {}


export default {
    signupUser(data) {
        console.log(data);
        return axios.post("/signup", data)
    },

    loginUser(data) {
        console.log(data);
        return axios.post("/login", data)
    }
}