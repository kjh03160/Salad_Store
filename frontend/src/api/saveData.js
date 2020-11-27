import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:5000"
let base = "http://127.0.0.1:5000"

export default {
    getMain(data) {
        return axios.get("/menu", {params: data})
    },
    
    newMain(data) {
      for (var key of data.values()){
        console.log(key);
      }
      let status = axios.post('/menu', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return status
        // catch ((e) => { 
        //   if (e.response) {
        //     console.log(e.response.data);
        //     console.log(e.response.status);
        //     console.log(e.response.headers);
        //   }
        //   else if (e.request) {
        //     console.log(e.request);
        //   }
        //   else {
        //     console.log(e.message);
        //  }
        //  console.log(e.config);
        //  }) }

        
        // for (var key of data.values()){
        //   console.log(key);
        // }

        // axios.post('group', {data:data}, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
        // })

        // let status = axios.post('/group', {data:data},{headers: {'Content-Type' : 'multipart/form-data'}})
        // return status

    },

    reviseMain(data){
      let status = axios.patch('/menu', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return status
    },


    deleteMain(data){
      let status = axios.delete('/menu', {params:data})
      return status
    },

    addCategory(data){
      let status = axios.post('/category', data)
      
      return status

    },

    changeCategory(data){
      let status = axios.patch('/category', data)
      return status
    },

    getCategory(data){
      let status = axios.get('/category', {params:data})
      return status
    },

    deleteCategory(data){
      let status = axios.delete('/category', {params : data})
      return status
    },


    addOption(data){
      let status = axios.post('/option', data,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }})
      return status
    },
    addOptionWithMenu(data){
      let status = axios.post('/option', data, {
        headers:{
          'Content_Type': 'multipart/form-data'
        }
      })
      return status
    }
}