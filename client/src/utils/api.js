/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default {
    // Get book based on search
    signUp: function(data) {
        console.log(data);
        return axios.post(`http://localhost:${process.env.PORT}/api/signUp`, data);
       
    },

}