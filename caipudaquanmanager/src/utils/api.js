import axios from 'axios'
import {Message} from 'element-ui';

//结果拦截
axios.interceptors.response.use(success => {
    //data.msg 是后端RespBean中响应的信息
    if (success.status && success.status == -1 && success.data.status == 500) {
        Message.error({message: success.data.msg})
        return;
    }
    //data.msg 是后端RespBean中响应的信息
    if (success.data.msg) {
        Message.success({message: success.data.msg})
    }
    return success.data;
}, error => {
    //data.msg 是后端RespBean中响应的信息
    if (error.response.data.msg) {
        Message.error({message: error.response.data.msg})
    } else {
        Message.error({message: '未知错误!'})
    }
    return;
})
/**
 * post请求
 * @param url  请求地址
 * @param params 请求参数
 * @returns {AxiosPromise}
 */
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${url}`,
        data: params
    })
}

export const postRequest1 = (url, params) => {
    let cid = params.cid
    return axios({
        method: 'post',
        url: `${url}`,
        params: {
            cid: cid
        }
    })
}


/**
 *  get请求
 * @param url  请求地址
 * @param params  请求参数
 * @returns {AxiosPromise}
 */
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${url}`,
        data: params
    })
}

export const getRequest1 = (url, params) => {
    let caiPuName = params.caiPuName
    return axios({
        method: 'get',
        url: `${url}`,
        params: {
            caiPuName: caiPuName,
        }
    })
}
/**
 * put请求
 * @param url  请求地址
 * @param params  请求参数
 * @returns {AxiosPromise}
 */
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${url}`,
        data: params
    })
}
/**
 * delete请求
 * @param url  请求地址
 * @param params  请求参数
 * @returns {AxiosPromise}
 */
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${url}`,
        data: params
    })
}
