/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";



export default {
    signUp: function (data) {
        console.log(data);
        return axios.post(`/api/signUp`, data);


    },

}

// return axios.post(`http://localhost:3001/api/signUp`, data, {
//     mode: 'cors',
//     credentials: 'include'
//   });

// return axios({
//     method: 'post', //you can set what request you want to be
//     url: 'http://localhost:3001/api/signUp',
//     data: data,
//     crossDomain: true,
//     headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }
// })