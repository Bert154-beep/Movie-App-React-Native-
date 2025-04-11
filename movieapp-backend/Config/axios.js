const axios = require('axios')

const api = axios.create({
    baseURL: "http://192.168.1.103:3000",
    withCredentials: true
})

module.exports = api