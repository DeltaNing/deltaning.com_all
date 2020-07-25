import request from './request'

// 获取博客的评论列表详情
export function getCommentsById(params) {
    return request({
        url: `/queryCommentsByBlogId`,
        method: 'get',
        params // {bid: bid}
    })
}
// 通过博客id获取评论总数
export function getCommentsCountById(params) {
    return request({
        url: `/queryCommentsCountById`,
        method: 'get',
        params
    })
}

// 提交评论
export function pushComment(params) {
    return request({
        url: '/addComment',
        method: 'get',
        params
    })
}

// 获取最新的几条评论
export function getNewComment() {
    return request({
        method: 'get',
        url: '/queryNewComments'
    })
}
