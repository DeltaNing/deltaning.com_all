<template>
    <header class="header">
        <div class="container">
            <router-link class="title" to="/">Deltaning个人博客 | 技术博客</router-link>
            <ul class="menu">
                <li><router-link to="/">首页</router-link></li>
                <li><router-link to="/sitemap">地图</router-link></li>
                <li><router-link to="/about">关于</router-link></li>
                <li><router-link to="/guestbook">留言</router-link></li>
            </ul>
            <div class="search-bar" id="searchBar">
                <input id="searchText" v-model="search" placeholder="输入关键词查找">
                <button @click="searchBlog()">搜索</button>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: "headerPage",
        data() {
          return {
              search: ''
          }
        },
        methods: {
            searchBlog() {
                this.$router.push({
                    name: 'home',
                    query: {
                        search: this.search
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
