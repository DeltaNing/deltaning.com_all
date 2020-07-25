<template>
    <div>
<!--显示留言-->
        <div class="blog-comments" id="blogComments">
            <P>{{blogTitle}}：目前有{{totalCount}}条留言</P>
            <div class="blog-comment-item" v-for="item in commentsList"
                 :key="item.id"
                 :id="'comment-' + item.id">
                <span class="blog-comment-username">{{item.user_name}}：{{item.options}}</span> 发表于{{item.ctime}}
                [<a class="blog-comment-replay-btn" @click="replayComment(item.id, item.user_name)">回复</a>]
                <p class="blog-comment-content">{{item.comments}}</p>
            </div>
        </div>

        <!--提交留言部分-->
        <div class="send-comment" id="sendComment">
            <h3>发表评论</h3>
            <form name="sendCommentForm">
                <input type="hidden" name="parent" :value="parent">
                <input type="hidden" name="parentName" :value="parentName">
                <div class="comment-form-group">
                    <input class="comment-name input" type="text" placeholder="昵称" name="name" v-model="username">
                    <input class="comment-email input" type="text" placeholder="邮箱（评论被回复时，你能收到通知）" v-model="email" name="email">
                </div>
                <div class="comment-form-group">
                    <textarea class="comment-content input" name="comments" v-model="commentText" placeholder="无意义内容我可能不会回复你"></textarea>
                </div>
                <div class="comment-form-group">
                    <input class="comment-code input" name="code" v-model="code" placeholder="验证码">
                    <span class="img-code" @click="getImgCode()" v-html="imgCode"></span>
                </div>
                <div class="comment-form-group">
                    <input class="comment-submit-btn btn input"
                           @click="submitComment()"
                           type="button" value="提交留言">
                    <input class="comment-rewrite-btn btn input" type="button" value="重写">
                    <span :class="{tips: true, 'show-tips': showTips}">{{tipText}}</span>
                </div>
            </form>
        </div>

    </div>

</template>

<script>
    import { getCommentsById, getCommentsCountById, pushComment } from "../api/comments";
    import { getImgCode } from "../api/imgCode";
    import { getUrlSearchArr, timeStamp } from "../utils";
    import { message } from "../plugins/message";

    export default {
        name: "commentsComp",
        props: [
            'blogTitle', 'bid'
        ],
        data () {
            return {
                commentsList: [
                    {id: 1, user_name: 'Delta', ctime: '123456765432',comments: 'djasjflkdjlk', options: '回复@'}
                ],
                totalCount: '', // 总评论数
                imgCode: '',
                codeText: '',
                tipText: '',
                showTips: false,
                parent: -1, // 评论回复@的id
                parentName: 0, // 回复@的名称
                username: '', // 提交评论中的用户名
                email: '', // 提交评论中的用户的email
                commentText: '', // 提交评论中的评论内容
                code: '', // 提交评论中的验证码
            }
        },
        watch: {
          $route: {
              handler () {
                  this.getComments(this.getBid());
                  this.getCommentsCount(this.getBid());
                  this.getImgCode();
              }
          },
            // 监听列表渲染完毕，跳转到对应comment的位置
            commentsList() {
                if (getUrlSearchArr()['comment']) {
                    this.$nextTick(() => {
                        let id = 'comment-' + getUrlSearchArr()['comment'];
                        document.getElementById(id).scrollIntoView(); // 跳转到当前页面对应的评论
                    })
                }
            }
        },
        methods: {
            // 获取所有评论
            getComments(bid) {
                let that = this;
                getCommentsById({bid}).then(res => {
                    that.commentsList = that.handleComments(res.data.data);
                    that = null;
                }).catch(function (error) {
                    console.log(error)
                });
            },
            // 处理评论列表
            handleComments(data) {
                return data.filter(item => {
                    if (item.parent > -1) {
                        item.options = '回复@' + item['parent_name'];
                    }
                    item.ctime = timeStamp(item.ctime, '123', true);
                    return true;
                })
            },
            // 获取评论总数
            getCommentsCount(bid) {
                let that = this;
                getCommentsCountById({bid}).then(function (res) {
                    that.totalCount = res.data.data[0].count;
                    that = null;

                }).catch(function (error) {
                    console.log(error)
                })
            },
            // 回复评论功能
            replayComment(commentId, parent_name) {
                this.parent = commentId;
                this.parentName = parent_name;
                // 跳转到提交评论区域
                location.href = '#sendComment';
            },
            // 获取图形验证码
            getImgCode() {
                let that = this;
                getImgCode().then(res => {
                    that.imgCode = res.data.data.data;
                    that.codeText = res.data.data.text;
                    that = null;
                }).catch(function (error) {
                    console.log(error)
                })
            },
            // 提交评论
            submitComment() {
                if (!this.checkSubmitContent()) {
                    return false;
                }
                let comment = {
                    bid: this.getBid(),
                    parent: this.parent,
                    parentName: this.parentName,
                    name: this.username,
                    email: this.email,
                    comments: this.commentText
                };
                pushComment(comment).then(res => {
                    if (res.status === 200) {
                        message({
                            type: "success", //消息类型： info、warn、error、success
                            content: "提交成功", //消息提示内容
                            duration: 3, //多少秒后关闭
                            onClose: function() {
                                console.log("提示关闭了")
                            } //关闭后的回调
                        });
                        comment = null;
                    }

                }).catch(err => console.log(err))

            },
            checkSubmitContent() {
                if (!this.username || !this.email || !this.commentText) {
                    this.tipText = '错误：信息不完整（昵称，邮箱）';
                    this.showTips = true;
                    let that = this;
                    setTimeout(function () {
                        that.showTips = false;
                        that.tipText = '';
                        that = null;
                    }, 2000);
                    return false;
                }

                if (this.code.toLowerCase() !== this.codeText.toLowerCase()) {

                    this.tipText = '验证码错误';
                    this.showTips = true;
                    let that = this;
                    setTimeout(function () {
                        that.showTips = false;
                        that.tipText = '';
                        that = null;
                    }, 2000);
                    return false;
                }

                return true;
            },
            getBid() {
                let bid = this.$route.query.bid;
                if (!bid) { // 路由中参数没有bid
                    bid = getUrlSearchArr()['bid'] || this.bid;
                }
                return bid;
            }
        },
        created() {
            this.getComments(this.getBid());
            this.getCommentsCount(this.getBid());
            this.getImgCode();
        }
    }
</script>

<style scoped>

</style>
