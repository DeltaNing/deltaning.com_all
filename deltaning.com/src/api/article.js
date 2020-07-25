import request from './request';

// 获取博客列表详情
export function getArticleListByPage(params) {
    return request({
        method: 'GET',
        url: '/queryBlogByPage',
        params
    })
}
// 获取博客总数
export function getArticleCount() {
    return request({
        method: 'GET',
        url: '/queryBlogCount'
    })
}
// 通过标签id获取博客列表详情
export function getArticleByTagId(params) {
    return request({
        url: '/queryBlogsByTagId',
        method: 'get',
        params
    })
}
// 通过标签id获取博客总数
export function getArticleCountByTagId(params) {
    return request({
        url: '/queryBlogCountByTagId',
        method: 'get',
        params
    })
}
// 通过搜索词获取博客列表详情
export function getArticleBySearch(params) {
    return request({
        url: '/queryBlogBySearch',
        method: 'get',
        params
    })
}
// 通过搜索词获取博客总数
export function getArticleCountBySearch(params) {
    return request({
        url: '/queryBlogCountBySearch',
        method: 'get',
        params
    })
}
// 获取博客所有标题列表
export function getAllArticle() {
    return request({
        url: '/queryAllBlog',
        method: 'get'
    })
}
// 获取最热门的10篇博客
export function getHotBlogs() {
    return request({
        method: 'get',
        url: '/queryHotBlogs'
    })
}

// 根据博客id获取博客详情
export function getBlogById(params) {
    return request({
        method: "get",
        url: '/queryBlogById',
        params // {bid: bid}
    })
}
// 更新文章浏览次数
export function addBlogViews(params) {
    return request({
        method: "get",
        url: "/updateBlogViews",
        params // {bid: bid}
    })
}

export function addBlog(params, data) {
    return request({
        url: '/editBlog',
        method: 'post',
        params, // {title: '', tags: ''}
        data // {content: ''}
    })
}
