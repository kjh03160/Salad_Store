import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:5000"
let base = "http://127.0.0.1:5000"
// axios.defaults.header = {}


export default {
    signupUser(user_id, password) {
        return axios.post("/signup", {
            params: {
              usr_id : '11',
              password : '11'
            }
          })
    }
}