<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <editor :content_="ruleForm.content" @editorChange="editorChange" />
      </el-form-item>
      <el-form-item label="封面">
        <upload-image :images="ruleForm.cover.images" @imageUrlList="imageUrlList" />
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <channels :channelId.sync="ruleForm" @chanegeSelectID="chanegeSelectID" />
      </el-form-item>
      <el-form-item>
        <el-button>保存草稿</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import channels from "@/components/channels";
import editor from "@/components/editor";
import uploadImage from "@/components/uploadImage";
import { submitPublish } from "@/api/api";
export default {
  data() {
    // var checkCon = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("请输入内容"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      ruleForm: {
        title: "",
        content: "",
        channel_id: "",
        cover: {
          type: 0,
          images: []
        }
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        channel_id: [
          { required: true, message: "请选择频道", trigger: "change" }
        ],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
        // content: [{ validator: checkCon, trigger: "blur" }]
      }
    };
  },
  components: {
    channels,
    editor,
    uploadImage
  },
  mounted() {},
  methods: {
    chanegeSelectID(id) {
      this.ruleForm.channel_id = id;
    },
    editorChange(con) {
      this.ruleForm.content = con;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    imageUrlList(img) {
      this.ruleForm.cover.images = img;
      this.ruleForm.cover.type = img.length;
    },
    async submitForm() {
      const res = await submitPublish(this.ruleForm);
      if (res.message == "OK") {
        this.ruleForm = {
          title: "",
          content: "",
          channel_id:'',
          cover: {
            type: 0,
            images: []
          }
        };
        this.$message.success('发布成功!');
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>