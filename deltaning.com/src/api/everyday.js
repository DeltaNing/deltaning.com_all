import request from './request'

// 获取每日一句
export function getEveryDay() {
    return request({
        method: 'get',
        url: '/queryEveryday'
    })
}

// 添加每日一句
export function addEveryday(data) {
    return request({
        url: '/editEveryday',
        method: 'post',
        data // {content: content},
    })
}
