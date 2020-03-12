<template>
  <div style="display:flex">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="width:400px;margin-right:20px"
      label-position="top"
    >
      <el-form-item label="媒体名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="媒体简介" prop="intro">
        <el-input type="textarea" autosize placeholder="请输入媒体简介" v-model="ruleForm.intro"></el-input>
      </el-form-item>
      <el-form-item label="头条号id" prop="id">
        <el-input disabled v-model="ruleForm.id"></el-input>
      </el-form-item>
      <el-form-item label="绑定手机" prop="mobile">
        <el-input disabled v-model="ruleForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存更新</el-button>
      </el-form-item>
    </el-form>
    <div>
      <p style="font-size:14px;margin-bottom:10px;color:#606266">头像</p>
      <el-upload
        class="avatar-uploader"
        action
        :show-file-list="false"
        :http-request="customUpload"
      >
        <!-- 默认为post请求 -->
        <img v-if="ruleForm.photo" :src="ruleForm.photo" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { checkLogin, updatePhoto, updateProfile } from "@/api/api";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        synopsis: "",
        id: "",
        mobile: "",
        email: "",
        photo: ""
      },
      rules: {
        name: [{ required: true, message: "请输入媒体名称", trigger: "blur" }],
        synopsis: [
          { required: true, message: "请输入媒体简介", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮件", trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "邮箱格式错误",
            trigger: "blur"
          }
        ]
      },
      header: {
        Authorization: "Bearer " + this.$store.state.userinfo.token
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateProfile(this.ruleForm).then(res => {
              
            if (res.message == "OK") {
              this.$message.success("修改成功");
              this.$store.dispatch('save_userinfo',this.ruleForm)
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    customUpload(data) {
      let fm = new FormData();
      fm.append("photo", data.file);
      updatePhoto(fm).then(res => {
        console.log(res);
        if (res.message == "OK") {
          this.ruleForm.photo = res.data.photo;
        }
      });
    }
  },
  mounted() {
    checkLogin().then(res => {
      if (res.message == "OK") {
        this.ruleForm = res.data;
      }
    });
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>