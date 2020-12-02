import axios from "axios"


const instance = axios.create({
    withCredentials: true
  })
  instance.defaults.baseURL = "http://127.0.0.1:5000"
// axios.defaults.header = {}
// ,  {key : key}, {credentials: 'include', withCredentials: true }

export default {
    signupUser(data) {
        console.log(data);
        return instance.post("/signup", data)
    },

    loginUser(data) {
        console.log(data);
        return instance.post("/login", data)
    },

    logoutUser() {
        return instance.get("/signup")
    },

    async checkUser() {
        // console.log(key)
        return await instance.get("/login" )
        
    }
}