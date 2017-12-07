<template>
  <div class="editor layout">
    <nav>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-document"></i>表单</el-breadcrumb-item>
        <el-breadcrumb-item>编辑器</el-breadcrumb-item>
      </el-breadcrumb>
    </nav>
    <div class="wrap">
        <quill-editor  class="custom-editor" v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
        </quill-editor>
    </div>
    <div class="container">
        <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        content: '',
        editorOption: {
          // some quill options
          placeholder: 'Vue-Quill-Editor：基于Quill、适用于Vue2的富文本编辑器。访问地址:https://github.com/surmon-china/vue-quill-editor'

        }
      }
    },
    // manually control the data synchronization
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    methods: {
      onEditorBlur (quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus (quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady (quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange ({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.content = html
      },
      submit () {
        console.log('最终结果是：' + this.content)
      }
    },
    computed: {
      editor () {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted () {
      console.log('this is current quill instance object', this.editor)
    }
  }
</script>
<style>
.editor .ql-editor{
   height: 400px;
}
.editor .container{
    padding:20px;
    text-align:right;
}
</style>
