<template>
  <div id="index">
    <el-container>
      <el-aside width="200px">
        <div class="img_wrap">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ8AAAAoCAYAAADg1CgtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTg3RjBBMDcxOEEyMTFFOThEODI4NjFFNkZBMUY2ODEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTg3RjBBMDgxOEEyMTFFOThEODI4NjFFNkZBMUY2ODEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1ODdGMEEwNTE4QTIxMUU5OEQ4Mjg2MUU2RkExRjY4MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1ODdGMEEwNjE4QTIxMUU5OEQ4Mjg2MUU2RkExRjY4MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuQY0pYAAAriSURBVHja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"
            alt
          />
        </div>
        <el-menu
          unique-opened
          default-active="1"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="map">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span>首页</span>
            </template>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-platform"></i>
              <span>内容管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="publish">发布文章</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="article">内容列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="2-3">评论列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="media">素材管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>粉丝管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="overview">粉丝概况</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="3-2">粉丝概况</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="3-3">粉丝列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="account">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>账户管理</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="title">江苏传智播客教育科技股份有限公司</span>
          <el-dropdown trigger="click" @command="handleCommand">
            <div class="user">
              <img :src="user.photo" alt />
              <span>{{user.name}}</span>
              <i class="el-icon-arrow-down"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { checkLogin } from "@/api/api";
export default {
  name: "index",
  data() {
    return {
      user: {}
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    async checkLogin() {
      const res = await checkLogin();
      if (res.message == "OK") {
        this.user = res.data;
        // this.$store.dispatch("save_userinfo", res.data);
      } else {
        this.$router.push("/login");
      }
    },
    handleCommand(command) {
      if (command == "logout") {
        this.$store.dispatch('clear_userinfo')
        this.$router.push('/login')
      }
    }
  }
};
</script>

<style lang="less" scoped>
#index {
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
      background-color: #545c64;
      .img_wrap {
        background-color: #000;
        text-align: center;
        padding: 10px 0;
        img {
          width: 100px;
        }
      }
      .el-menu {
        border: none;
        .el-menu-item{
          font-size: 12px
        }
      }
    }
    .el-header {
      background-color: #545c64;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      padding: 0 100px 0 20px;
      .title {
        font-size: 18px;
      }
      .user {
        color: #fff;
        cursor: pointer;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        span {
          font-size: 16px;
          margin: 10px;
        }
      }
    }
  }
}
</style>