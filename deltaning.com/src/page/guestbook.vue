<template>
    <div>
        <div class="description">
            <p>欢迎灌水交流，别看我长时间不发博，博主可一直都在线~</p>
            <p class="red">友链只交换技术类个人博客，本博客稳定在线，所以也需要你的站尽量稳定。</p>
            <p class="red">不要皮，谢谢。</p>
        </div>

        <CommentsComp :blog-title="'留言'" :bid="bid" />
    </div>
</template>

<script>
    import CommentsComp from '../components/commentsComp.vue';
    export default {
        name: "guestbook",
        data () {
            return {
                bid: -2
            }
        },
        components: {
            CommentsComp
        }
    }
</script>

<style src="../assets/css/guestbook.css" scoped>

</style>
