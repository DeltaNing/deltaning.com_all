<template>
    <div class="blog-detail">
        <!--博客内容-->
        <div class="blog-body" id="blogDetail">
            <div class="blog-title">{{blogInfo.title}}</div>
            <div class="blog-msg">作者：Delta 标签：{{blogInfo.tags}} 发布于：{{blogInfo.ctime}} 浏览（{{blogInfo.views}}）</div>
            <div class="blog-content" v-html="blogInfo.content"></div>
        </div>

        <!--留言部分-->
        <CommentsComp :blogTitle="blogInfo.title" :bid="blogInfo.id"/>

    </div>
</template>

<script>
    import {getBlogById, addBlogViews} from "../api/article";
    import {timeStamp, getUrlSearchArr} from "../utils";
    import CommentsComp from '../components/commentsComp.vue'

    export default {
        name: "blogDetail",
        components: {
            CommentsComp
        },
        data() {
            return {
                blogInfo: {},
            }
        },
        watch: {
            $route: {
                handler() {
                    let bid = this.$route.query.bid;
                    if (bid == this.blogInfo.id) {
                        return false;
                    }
                    this.queryBlogDetail(bid);
                    this.updateBlogViews(bid);
                }
            }
        },
        methods: {
            queryBlogDetail(bid) {
                let that = this;
                getBlogById({bid: bid}).then(res => {
                    that.blogInfo = that.handleBlogInfo(res.data.data[0]);
                    that = null;
                    // console.log(res)
                }).catch(err => console.log(err))
            },
            updateBlogViews(bid) {
                addBlogViews({bid}).then(res => res).catch(err => console.log(err))
            },
            handleBlogInfo(result) {
                result.ctime = timeStamp(result.ctime, 'zh', true);
                return result;
            }
        },
        created() {
            let bid = this.$route.query.bid;
            if (!bid) {
                bid = getUrlSearchArr()['bid'];
            }
            if (bid == this.blogInfo.id) {
                return false;
            }
            this.queryBlogDetail(bid);
            this.updateBlogViews(bid);
        },
        mounted() {
            // if (getUrlSearchArr()['comment']) {
            //     this.$nextTick(() => {
            //         let id = 'comment-' + getUrlSearchArr()['comment'];
            //         // document.getElementById(id).scrollIntoView();
            //         console.log(document.getElementById(id))
            //     })
            // }
        }
    }
</script>

<style src="../assets/css/blogDetail.css" scoped>

</style>
