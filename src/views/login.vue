<template>
  <div id="login">
    <div class="login_wrap">
      <img src="../assets/login_logo.png" alt />
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号码" v-model="ruleForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            style="width:60%;float:left"
            placeholder="请输入验证码"
            v-model="ruleForm.code"
            autocomplete="off"
          ></el-input>
          <el-button style="width:30%;float:right">获取验证码</el-button>
        </el-form-item>
        <el-form-item prop="agree" style="text-align:left">
          <el-checkbox v-model="ruleForm.agree"></el-checkbox>&nbsp;
          <span class="tip">
            我已阅读并同意
            <a href="javascript:void(0)">用户协议</a>和
            <a href="javascript:void(0)">隐私条款</a>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click="submit('ruleForm')">登录</el-button>
          <el-button  type="primary" @click="dj">dj</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/api";
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        mobile: "13922222222",
        code: "246810",
        agree: false
      },
      rules: {
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { len: 11, message: "手机号码错误", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { len: 6, message: "验证码错误", trigger: "blur" }
        ],
        agree: [{ pattern: /true/, message: "请勾选同意", trigger: "change" }]
      },
      loading:true
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.loading = true
          const res = await login({
            mobile: this.ruleForm.mobile,
            code: this.ruleForm.code
          });
          this.loading = false
          if (res.message == "OK") {
            this.$store.dispatch("save_userinfo", res.data);
            this.$router.push("/");
          } else {
            this.$message.error("手机号码或验证码xx!");
          }
        } else {
          return false;
        }
      });
    },
    
    // dj(){
    //   axios.get('/api/movie/top250').then(res => {
    //     console.log(res);
    //   })
    // },

    // dj(){
    //   axios.get('/movie/top250').then(res => {
    //     console.log(res);
    //   })
    // },

    dj(){
      axios.get('/api/movie/top').then(res => {
        console.log(999);
      })
    }
  },
};
</script>

<style lang="less" scoped>
@import "../assets/common.less";
#login {
  height: 100%;
  background: url("../assets/login_bg.jpg");
  @display();
  text-align: center;
  .login_wrap {
    width: 400px;
    background-color: #fff;
    padding: 40px;
    box-sizing: border-box;
    img {
      width: 150px;
      margin-bottom: 30px;
    }
  }
  /deep/ .el-form {
    .el-form-item__content {
      margin: 0 !important;
    }
    .el-button {
      width: 100%;
    }
    .tip {
      a {
        color: blue;
      }
      a:active {
        color: red;
      }
    }
  }
}
</style>