import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:5000"
let base = "http://127.0.0.1:5000"

export default {
    getMain(orderPk=null) {
        return axios.get("/group", {params:{pk:orderPk}})
    },


    
    newMain(data) {
        for (var key of data.values()){
          console.log(key);
        }
        let status = async () => { await axios.post('/group', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })}
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
        status()
        
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

    reviseMain(orderPk){
    let status = axios.put('/group', {pk:orderPk})

    return status
    },

    deleteMain(orderPk){
      console.log(orderPk)
      let status = axios.delete('/group', {params:{pk:orderPk}})

      return status
  },

}