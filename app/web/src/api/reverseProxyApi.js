import axios from 'axios'


export const reverseProxyApi = axios.create({
    baseURL: 'https://apigwdd.ifxcorp.com/admin'
})