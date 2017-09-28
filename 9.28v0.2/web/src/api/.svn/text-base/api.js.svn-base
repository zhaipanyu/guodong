import axios from 'axios';
const CryptoJS = require('crypto-js');
/*export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.post(`${base}/User_GetList`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };*/

let base = 'http://120.27.216.49:2112/api/',
    userId,token;
const $axios = (str,params) => {
    return axios.post(`${base}/${str}`,{params: Object.assign({limit:10,offset:0},params)});
};
axios.interceptors.request.use((config) => {
    let time = new Date().getTime(),
        user = JSON.parse(sessionStorage.getItem('user'));
    userId = userId || (user && user['id'])|| '';
    token = token || (user && user['token'])||'';
    config.headers = {
        'user-id': userId,
        'time': time,
        'token':CryptoJS.MD5(userId+time+token) || '',
        'X-Requested-With':'XMLHttpRequest',
        'Content-Type':'application/json',
        'dev-request-type':'user_web'
    };
    return config;
});
axios.interceptors.response.use((response) => {
    const data = response.data;
        return data;
    },
    // 这里是返回状态码不为200时候的错误处理
    (err) => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '请求错误'
                break

            case 401:
                err.message = '未授权，请登录'
                break

            case 403:
                err.message = '拒绝访问'
                break

            case 404:
                err.message = `请求地址出错: ${err.response.config.url}`
                break

            case 408:
                err.message = '请求超时'
                break

            case 500:
                err.message = '服务器内部错误'
                break

            case 501:
                err.message = '服务未实现'
                break

            case 502:
                err.message = '网关错误'
                break

            case 503:
                err.message = '服务不可用'
                break

            case 504:
                err.message = '网关超时'
                break

            case 505:
                err.message = 'HTTP版本不受支持'
                break

            default:
        }
    }
    return Promise.reject(err);
})
export {$axios}