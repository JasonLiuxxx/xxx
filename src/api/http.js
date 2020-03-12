import Vue from 'vue'
import store from '@/store/index'
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/';

// 添加请求拦截器
axios.interceptors.request.use( (config) => {
    // 在发送请求之前做些什么
    if(store.state.userinfo){
        config.headers.Authorization = 'Bearer ' + store.state.userinfo.token
    }
    NProgress.start()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 添加响应拦截器
axios.interceptors.response.use( (response) => {
    // 对响应数据做点什么
    NProgress.done()
    return response;
}, function (error) {
    // 对响应错误做点什么
    NProgress.done()
    return Promise.reject(error);
});

export default (url = '', params = {}, type = 'GET') => {
    type = type.toUpperCase()
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: type,
            data: type === 'POST' || 'PUT' || 'PATCH' ? params : '',
            params: type === 'GET' ? params : '',
        }).then(res => {
            if (res.status == 201 || 200) {
                resolve(res.data)
            }
        }).catch(err => {
            reject(err)
        })
    })
}
