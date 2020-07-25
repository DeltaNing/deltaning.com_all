<template>
    <div class="editor-wrapper">
        <div class="content">
            <h1 class="editor-title">编辑每日一句</h1>
            <input class="editor-submit" type="button" value="提交" @click="submitEveryday"/>
            <Editor ref="childEditor"/>
        </div>
    </div>
</template>

<script>
    import Editor from '../components/editor.vue'
    import { addEveryday } from "../api/everyday";
    import {message} from "../plugins/message";
    export default {
        name: "editEveryday",
        components: {
            Editor
        },
        methods: {
            submitEveryday() {
                let content = this.$refs.childEditor.content;
                if (!content) {
                    message({
                        type: 'error',
                        content: '内容不能为空',
                        duration: 3
                    });
                    return false;
                }
                addEveryday({content}).then(res => {
                    message({
                        type: 'success',
                        content: res.data.msg,
                        duration: 3
                    })
                }).catch(err => console.log(err))
            }
        }
    }
</script>

<style scoped>
    .content {
        text-align: right;
    }

    .editor-submit {
        margin: 1rem 0;
    }
</style>
