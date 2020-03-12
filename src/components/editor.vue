<template>
  <div>
        <quill-editor
          :options="editorOption"
          v-model="content"
          ref="myQuillEditor"
          @change="onEditorChange($event)"
        ></quill-editor>
    <!-- @focus="onEditorFocus($event)" -->
    <!-- @blur="onEditorBlur($event)" -->
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; // 调用富文本编辑器
import "quill/dist/quill.snow.css"; // 富文本编辑器外部引用样式  三种样式三选一引入即可
import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";
import * as Quill from "quill"; // 富文本基于quill

export default {
  props:['content_'],
  data() {
    return {
       rules: {
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
        text: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      editor: null,
      content: this.content,
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], //引用，代码块

            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向

            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题

            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], //字体
            [{ align: [] }], //对齐方式

            ["clean"], //清除字体样式
            ["image", "video"] //上传图片、上传视频
          ]
        },
        theme: "snow",
        placeholder: "请输入正文..."
      }
    };
  },
  watch: {
    content_(val){
      this.content = this.content_
    }
  },
  components: {
    quillEditor
  },
  mounted() {
    this.editor = this.$refs.myQuillEditor.quill;
  },
  beforeDestroy() {
    this.editor = null;
    delete this.editor;
  },
  methods: {
    // 准备富文本编辑器
    // onEditorReady(editor) {console.log(editor);},
    // 富文本编辑器 失去焦点事件
    onEditorBlur(editor) {
      console.log(editor);
    },
    // 富文本编辑器 获得焦点事件
    // onEditorFocus(editor) {console.log(editor);},
    // 富文本编辑器 内容改变事件
    onEditorChange(editor) {
      // console.log(editor);
      // console.log(this.content);
      this.$emit("editorChange", this.content);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .ql-container {
  height: 300px;
}
/deep/ .ql-picker-label::before {
  position: absolute;
  top: 0;
}
/deep/ .ql-picker-label {
  position: absolute;
  top: 0;
}
/deep/ .ql-picker-label svg {
  position: absolute;
  top: 0;
}
</style>