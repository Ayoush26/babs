import axios from 'axios';

const headers = {
    "Content-Type": 'application/json'
}

const http = axios.create({
    baseURL: process.env.REACT_APP_HOST,
    responseType: 'json'
})

function get(url,params={}){
    return http.get(url,{
        headers
    })
}

function post(url,data,params={}){
    return http.post(url,data,{
        headers,
        params
    })
}

export default {
    get,
    post
}