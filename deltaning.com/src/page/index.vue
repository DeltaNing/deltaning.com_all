<template>
    <div class="index wrapper">
        <Header />
        <main class="content">
            <!--主体左半部分-->
            <div class="content-left">
                <router-view></router-view>
            </div>
            <!--主体右半部分-->
            <div class="content-right">
                <!--随机云标签-->
                <Tags />
                <!--最近热门-->
                <HotBlogs />
                <!--最新评论-->
                <NewComment />
                <!--友情链接-->
                <dl class="right-module divide50">
                    <dt class="right-module-title">友情链接</dt>
                    <dd>
                        <router-link to="/">挨踢茶馆</router-link>
                    </dd>
                    <dd>
                        <router-link to="/">挨踢茶馆</router-link>
                    </dd>
                    <dd>
                        <router-link to="/">挨踢茶馆</router-link>
                    </dd>
                    <dd>
                        <router-link to="/">挨踢茶馆</router-link>
                    </dd>
                    <dd>
                        <router-link to="/">挨踢茶馆</router-link>
                    </dd>
                    <dd>
                        <router-link to="/">挨踢茶馆</router-link>
                    </dd>
                </dl>
            </div>
        </main>
        <Footer />
    </div>
</template>

<script>
    import Header from '../components/header.vue'
    import Tags from '../components/tagCloud.vue'
    import HotBlogs from '../components/hotBlogs.vue'
    import NewComment from '../components/newComment.vue'
    import Footer from '../components/footer.vue'
    export default {
        name: "index",
        components: {
            Header,
            Tags,
            HotBlogs,
            NewComment,
            Footer
        },
        data() {
            return {

            }
        },
        computed: {
            tagColor() {
                return function () {
                    var r = Math.random() * 255 + 50,
                        g = Math.random() * 255 + 50,
                        b = Math.random() * 255 + 50;
                    return `rgb(${r}, ${g}, ${b})`
                }
            },
            tagSize() {
                return function () {
                    return Math.random() * 20 + 12 + 'px';
                }
            }
        },
    }
</script>

<style scoped>

</style>
