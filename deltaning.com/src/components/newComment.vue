<template>
    <dl id="newComments" class="right-module">
        <dt class="right-module-title">最新评论</dt>
        <dd class="right-comment-list-item" v-for="(item, index) in commentList" :key="index">
            <p class="comment-name">{{item.user_name}}</p>
            <a @click="jump2Comment(item['blog_id'], item.id)">{{item.comments}}</a>
            <span class="pull-right">[{{item.ctime}}]</span>
        </dd>
    </dl>
</template>

<script>
    import {getNewComment} from "../api/comments";
    import {timeFormat} from "../utils";

    export default {
        name: "newComment",
        data() {
            return {
                commentList: [
                    {
                        user_name: '入驻邀请',
                        comments: '使用码云git的webhook实现生产环境代',
                        ctime: '1周前',
                    }
                ],
            }
        },
        methods: {
            jump2Comment(bid, id) {
                switch (bid) {
                    case -1: // bid为-1，跳转到关于页面
                        this.$router.push({
                            name: 'about',
                            query: {
                                comment: id
                            }
                        });
                        break;
                    case -2:// bid为-2，跳转到留言页面
                        this.$router.push({
                            name: 'guestbook',
                            query: {
                                comment: id
                            }
                        });
                        break;
                    default:
                        this.$router.push({
                            name: 'blogDetail',
                            query: {
                                bid,
                                comment: id
                            }
                        })
                }

            },
            handleComment(data) {
                return data.filter(item => {
                    item.ctime = timeFormat(item.ctime);
                    return true;
                })
            }
        },
        created() {
            let that = this;
            getNewComment().then(res => {
                that.commentList = that.handleComment(res.data.data);
                that = null;
            }).catch(err => console.log(err))
        }
    }
</script>

<style scoped>

</style>
