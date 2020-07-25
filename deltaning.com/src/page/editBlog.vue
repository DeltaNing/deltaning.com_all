<template>
    <div class="editor-wrapper">
        <div class="content">
            <h1 class="editor-title">编辑博客</h1>
            <form name="blogEditor" class="editor-form">
                <label for="title">文章标题：</label>
                <input id="title" name="title" class="editor-input" placeholder="请输入文章标题" v-model="title">
                <label for="tags">标签：</label>
                <input id="tags" name="tags" class="editor-input" placeholder="请输入标签，多个标签用逗号隔开" v-model="tags">
                <input class="editor-submit" type="button" value="提交" @click="submitBlog" />
            </form>

            <Editor ref="childEditor" />
        </div>
    </div>

</template>

<script>
    import Editor from '../components/editor.vue'
    import {message} from "../plugins/message";
    import { addBlog } from "../api/article";

    export default {
        name: "editBlog",
        data () {
          return {
              title: '',
              tags: ''
          }
        },
        components: {
            Editor
        },
        methods: {
            submitBlog () {
                console.log(this.$refs.childEditor.content);
                if (!this.title || !this.tags) {
                    message({
                        type: 'error',
                        content: '文章标题和标签不能为空',
                        duration: 3
                    });
                    return false;
                }
                let content = this.$refs.childEditor.content;
                if (!content) {
                    message({
                        type: 'error',
                        content: '博客内容不能为空',
                        duration: 3
                    });
                    return false;
                }
                let params = {
                    title: this.title,
                    tags: this.tags
                };
                addBlog(params, {content}).then(res => {
                    message({
                        type: 'success',
                        content: res.data.msg,
                        duration: 3
                    });
                    console.log(res)
                }).catch(err => console.log(err))
            }
        },
        created() {
        }
    }
</script>

<style scoped>

</style>
