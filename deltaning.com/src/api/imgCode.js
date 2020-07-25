import request from './request'

export function getImgCode() {
    return request({
        method: 'get',
        url: '/queryRandomImgCode'
    })
}
