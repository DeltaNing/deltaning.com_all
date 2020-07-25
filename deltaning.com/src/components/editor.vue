<template>
    <quillEditor :content="content"
                 :options="editorOption"
                 @change="onEditorChange($event)" />
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import '../assets/css/editor.css'
    import { quillEditor } from 'vue-quill-editor'
    export default {
        name: "editor",
        data () {
            return {
                content: '',
                editorOption: {},
            }
        },
        components: {
            quillEditor
        },
        methods: {
            onEditorChange({ html }) {
                // console.log('editor change!', html);
                this.content = html
            }
        }
    }
</script>

<style scoped>

</style>
