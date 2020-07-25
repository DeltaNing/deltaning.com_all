import Axios from "axios";

const service = Axios.create({
    baseURL: '/api',
    // baseURL: 'http://192.168.1.32:9093',
    timeout: 5000
});

service.interceptors.request.use(config => {
   config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
   return config
},
    error => {
    Promise.reject(error)
    });

service.interceptors.response.use(response => {
    return response
},
    error => {
        Promise.reject(error)
    });

export default service
