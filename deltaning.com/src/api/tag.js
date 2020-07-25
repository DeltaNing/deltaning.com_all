import request from './request'

export function getAllTags() {
    return request({
        url: '/queryRandomTags',
        method: 'get'
    })
}
