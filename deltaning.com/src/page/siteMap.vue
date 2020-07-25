<template>
    <div class="sitemap">
        <h1>Delta个人博客's SiteMap</h1>
        <div class="nav">
            <router-link to="/">Delta个人博客</router-link>
            >>
            <router-link to="/siteMap">站点地图</router-link>
        </div>
        <div class="sitemap-list" id="blog_list">
            <h2>最新文章</h2>
            <ul>
                <li v-for="(blog, index) in blogList" :key="index">
                    <a @click="jump2BlogDetail(blog.id)">{{blog.title}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {getAllArticle} from "../api/article";

    export default {
        name: "siteMap",
        data() {
            return {
                blogList: []
            }
        },
        computed: {},
        methods: {
            jump2BlogDetail(bid) {
                this.$router.push({
                    name: 'blogDetail',
                    query: {bid}
                })
            }
        },
        created() {
            let that = this;
            getAllArticle().then(function (res) {
                that.blogList = res.data.data;
                that = null;
            }).catch(function (error) {
                console.log(error)
            })
        }
    }
</script>

<style src="../assets/css/sitemap.css" scoped>

</style>
