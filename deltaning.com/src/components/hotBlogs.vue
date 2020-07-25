<template>
    <dl id="newHot" class="right-module">
        <dt class="right-module-title">最近热门</dt>
        <dd v-for="(item, index) in hotList" :key="index">
            <a @click="jump2BlogDetail(item.id)">{{item.title}}</a>
        </dd>
    </dl>
</template>

<script>
    import { getHotBlogs } from "../api/article";

    export default {
        name: "hotBlogs",
        data () {
            return {
                hotList: [],
            }
        },
        methods: {
            jump2BlogDetail(blogId) {
                this.$router.push({
                    name: 'blogDetail',
                    query: {
                        bid: blogId
                    }
                });
            }
        },
        created() {
            // 获取article列表
            let that = this;
            getHotBlogs().then(function (res) {
                that.hotList = res.data.data;
                that = null;
            }).catch(function (error) {
                console.log(error)
            })
        }
    }
</script>

<style scoped>

</style>
