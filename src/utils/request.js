import axios from "axios";

//配置baseURL，这样在写url的时候可以简写
const baseURL = "http://localhost:8000";
//设置超时时间
const timeout = 5000;

//创建实例
const instance = axios.create({
    baseURL,
    timeout
})


//添加请求拦截
instance.interceptors.request.use(req => {
    console.log('请求被拦截')
    console.log(req,'req')
    return req
}, error => {
    console.log(error, '发生错误')
})

//添加返回拦截
instance.interceptors.response.use(response => {
    const { status, data } = response;//返回的数据在data中
    return data;
}, error => {
    if (!error.response) {
        throw new Error(error.message, '发成错误00');
    }

    const status = error.response.status;
    if (status >= 500) {
        throw new Error(`服务器端错误,status:${status}`)
    }
    return error.response.data;
})

export default instance;