<template>
    <div id="randomTags" class="right-module">
        <div class="right-module-title">随机标签云</div>
        <div class="right-list">
            <a v-for="(tag, index) in tagList"
               :key="index"
               @click="jump2BlogList(tag.id)"
               :style="{color: tagColor(), fontSize: tagSize()}">{{tag.tag}}</a>
        </div>
    </div>
</template>

<script>
    import { getAllTags } from "../api/tag";

    export default {
        name: "tagCloud",
        data () {
            return {
                tagList: [{link: '', tag: ''}],
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
        methods: {
            jump2BlogList(tagId) {
                this.$router.push({
                    name: 'home',
                    query: {
                        tagId: tagId
                    }
                })
            }
        },
        created() {
            // 获取随机标签
            let that = this;
            getAllTags().then(function (res) {
                that.tagList = res.data.data;
                that = null;
            }).catch(function (error) {
                console.log(error)
            })
        }
    }
</script>

<style scoped>

</style>
