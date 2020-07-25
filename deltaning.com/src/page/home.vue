<template>
    <div class="home">
        <!--每日一句-->
        <div id="everyDay" class="every-day">
            <span>每日一句</span>
            <p v-html="everyday">The golden rule is that there are no golden rules.</p>
        </div>
        <!--文章列表-->
        <div id="articleList" class="article-list">
            <div class="article" v-for="(article, index) in articleList" :key="index">
                <div class="article-body">
                    <a @click="jump2BlogDetail(article.id)" class="article-title">{{article.title}}</a>
                    <p class="article-content">{{article.content}}</p>
                </div>
                <div class="article-footer">
                    发布于{{article.date}} |  浏览({{article.views}}) | Tags：{{article.tags}}
                </div>
            </div>

            <div class="pageTools">
                <ul>
                    <li v-for="(item, index) in pageNumList"
                        :key="index"
                        @click="jumpTo(item.page)"
                        :class="{activePage: item.text==nowPage}">{{item.text}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { getArticleBySearch, getArticleByTagId, getArticleCount, getArticleListByPage, getArticleCountBySearch, getArticleCountByTagId } from "../api/article";
    import { timeStamp, getUrlSearchArr, setItem, getItem } from "../utils";
    import { getEveryDay } from "../api/everyday";

    export default {
        name: "home",
        data() {
            return {
                everyday: '这里是每日一句名人名言',
                nowPage: 1, // 当前页码
                pageSize: 6, // 每页显示的文章数量
                count: 100, // 文章总数
                pageNumList: [],
                articleList: [
                    {
                        title: 'Laravel5.4安装passport时遇到的一些问题',
                        content: '安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\\Passport\\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...',
                        date: '2019-12-06',
                        views: '103',
                        tags: 'laravel',
                        id: '1',
                        link: ''
                    }
                ]
            }
        },
        computed: {
            jumpTo() {
                return function (page) {
                    setItem('nowPage', page);
                    this.getPage(page, this.pageSize)
                }
            },
            getPage() {
                return function (page, pageSize) {
                    var tagId = '';
                    var search = '';

                    if ('tagId' in getUrlSearchArr()) {
                        tagId = getUrlSearchArr()['tagId']
                    } else {
                        tagId = this.$route.query.tagId;
                    }
                    if ('search' in getUrlSearchArr()) {
                        search = getUrlSearchArr()['search']
                    } else {
                        search = this.$route.query.search;
                    }

                    if (tagId) { // tagId存在
                        this.queryBlogsByTagId(tagId, 1, pageSize);
                        this.queryBlogCountByTagId(tagId);
                    } else if (search) { // search存在且tagId不存在的情况
                        this.queryBlogBySearch(search, 1, pageSize);
                        this.queryBlogCountBySearch(search);
                    } else {
                        this.queryBlogList(page, pageSize);
                        this.queryBlogCount();
                    }
                }
            }

        },
        watch: {
          $route: {
              handler () {
                  // 用于处理home页面根据tagId查询博客列表
                  this.getPage(this.nowPage, this.pageSize)
              }
          }
        },
        methods: {
            /*
            * @method 查询博客列表详情
            * @params {number}page 当前页码
            * @params {number}pageSize 每页显示的博客数量
            * */
            queryBlogList(page, pageSize) {
                let that = this;
                getArticleListByPage({page: page-1, pageSize}).then(res => {
                  that.articleList = that.handleResult(res.data.data);
                  that.nowPage = page;
                  that.generatePageTool();
                  that = null;
              }).catch(error => console.log(error))
            },
            // 查询博客文章总数
            queryBlogCount() {
                let that = this;
                getArticleCount().then(res => {
                    that.count = res.data.data[0].count;
                    that.generatePageTool();
                    that = null;
                }).catch(err => console.log(err))
            },
            // 通过标签id查询博客列表详情
            queryBlogsByTagId(tagId, page, pageSize) {
                let that = this;
                getArticleByTagId({tagId, page: page-1, pageSize}).then(res => {
                    that.articleList = that.handleResult(res.data.data);
                    that.nowPage = page;
                    that.generatePageTool();
                    that = null;
                }).catch(error => console.log(error))
            },
            // 通过标签id查询博客总数
            queryBlogCountByTagId(tagId) {
                let that = this;
                getArticleCountByTagId({tagId}).then(res => {
                    that.count = res.data.data[0].count;
                    that.generatePageTool();
                    that = null;
                }).catch(err => console.log(err))
            },
            // 通过搜索词查询博客列表详情
            queryBlogBySearch(searchText, page, pageSize) {
                let that = this;
                getArticleBySearch({search:searchText, page:page-1, pageSize}).then(res => {
                    that.articleList = that.handleResult(res.data.data);
                    that.nowPage = page;
                    that.generatePageTool();
                    that = null;
                }).catch(error => console.log(error))
            },
            // 通过搜索词查询博客总数
            queryBlogCountBySearch(search) {
                let that = this;
                getArticleCountBySearch({search}).then(res => {
                    that.count = res.data.data[0].count;
                    that.generatePageTool();
                    that = null;
                }).catch(err => console.log(err))
            },
            // 生成页码
            generatePageTool() {
                var nowPage = this.nowPage;
                var pageSize = this.pageSize;
                var totalPage = (this.count + pageSize - 1) / pageSize;
                var result = [];
                result.push({text: "<<", page: 1});
                // 前两个条件和最后两个条件是为了保证选中最后一页或者第一页时，显示的还是5个页码
                if (nowPage > 4 && nowPage == totalPage) {
                    result.push({text: nowPage - 4, page: nowPage - 4});
                }

                if (nowPage > 3 && nowPage >= totalPage - 1) {
                    result.push({text: nowPage - 3, page: nowPage - 3});
                }

                if (nowPage > 2) {
                    result.push({text: nowPage - 2, page: nowPage - 2});
                }
                if (nowPage > 1) {
                    result.push({text: nowPage - 1, page: nowPage - 1});
                }

                result.push({text: nowPage, page: nowPage});
                if (nowPage + 1 <= totalPage) {
                    result.push({text: nowPage + 1, page: nowPage + 1});
                }

                if (nowPage + 2 <= totalPage) {
                    result.push({text: nowPage + 2, page: nowPage + 2});
                }

                if ((nowPage <= 2) && nowPage + 3 <= totalPage) {
                    result.push({text: nowPage + 3, page: nowPage + 3});
                }

                if (nowPage == 1 && nowPage + 4 <= totalPage) {
                    result.push({text: nowPage + 4, page: nowPage + 4});
                }

                result.push({text: ">>", page: parseInt(totalPage)});
                this.pageNumList = result;
                return result;
            },
            // 处理获取到的博客列表详情
            handleResult(result) {
                return result.filter(item => {
                    item.date = timeStamp(item.ctime, '-', false);
                    return true;
                });
            },
            jump2BlogDetail(bid) {
                this.$router.push({
                    name: 'blogDetail',
                    query: {
                        bid
                    }
                })
            }
        },
        created() {
            console.log('create home', getItem('nowPage'));
            this.nowPage = getItem('nowPage') || this.nowPage;
            this.getPage(this.nowPage, this.pageSize);
            let that = this;
            // 获取每日一句
            getEveryDay().then(res => {
                that.everyday = res.data.data[0].content;
                that = null;
            }).catch(function (err) {
                console.log(err)
            })
        },
    }
</script>

<style src="../assets/css/index.css" scoped>

</style>
