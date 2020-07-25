<template>
    <div>
        <div class="description">
            <h2 class="about-title">关于我</h2>
            <p>The golden rule is that there are no golden rules.</p>
            <p>The golden rule is that there are no golden rules.</p>
            <p>The golden rule is that there are no golden rules.</p>
            <p>The golden rule is that there are no golden rules.</p>
            <h2 class="about-title">关于博客</h2>
            <p>———— George Bernard Shaw</p>
            <p>———— George Bernard Shaw</p>
            <p>———— George Bernard Shaw</p>
            <p>———— George Bernard Shaw</p>
        </div>

        <CommentsComp :blog-title="'关于'" :bid="bid" />
    </div>

</template>

<script>
    import CommentsComp from '../components/commentsComp.vue';
    export default {
        name: "about",
        data () {
            return {
                bid: -1
            }
        },
        components: {
            CommentsComp
        }
    }
</script>

<style src="../assets/css/about.css" scoped>

</style>
