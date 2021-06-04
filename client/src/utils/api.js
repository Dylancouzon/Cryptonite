/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";



export default {

    googleOauth: function (data) {
        return axios.post(`/api/googleOauth`, data)
    },
    signUp: function (data) {
        return axios.post(`/api/signUp`, data)
    },
    logOut: function(){
        return axios.post(`/api/logout`)
    },
    logIn: function (data) {
        return axios.post(`/api/logIn`, data)
    },
    getAddressBalance: function (data) {
        return axios.get('/api/blockchain/balance/' + data)
    },
    getUserTransactions: function (data) {
        return axios.get('/api/blockchain/transactions/' + data)
    },
    getUsername: function (data) {
        return axios.get('/api/username/' + data)
    },
    sendTransaction: function (data) {
        return axios.post('/api/blockchain/transactions', data)
    },
    getSessions: function (data) {
        return axios.get('/api/sessions')
    },
    checkPrivateKeyMatch: function (data) {
        return axios.delete(`/api/delete/` + data)
    },
    getUSD: function (data) {
        return axios.get('/api/blockchain/coinValue')
    },
    startMining: function () {
        return axios.get('/api/blockchain/mine')
    },
    getValueData: function(data) {
        return axios.get('/api/blockchain/valueData')
    },
    addTransaction: function (data) {
        return axios.post('/api/blockchain/addTransaction', data)
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