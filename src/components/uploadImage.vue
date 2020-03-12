<template>
  <div>
    <div v-for="(item,index) in imgs" :key="index" class="img_wrap">
      <img :src="item" alt />
    </div>
    <img @click="showDialog" style="cursor: pointer;" src="../assets/upload.png" alt />
    <el-dialog :visible.sync="dialogTableVisible" @close="closeDialog" width="50%">
      <el-tabs @tab-click="tabsChange" v-model="activeName">
        <el-tab-pane label="上传图片" name="上传图片">
          <el-upload
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="header"
            name="image"
            :auto-upload="false"
            list-type="picture-card"
            multiple
            :limit="3"
            ref="upload"
            :class="{hide:hideUpload}"
            :on-success="uploadSuccess"
            :on-change="uploadChange"
            :on-remove="uploadRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="媒体库" name="媒体库">
          <media :imgs_="imgs" @checked="choseimg = $event" ref="media" />
        </el-tab-pane>
      </el-tabs>
      <div v-if="activeName == '上传图片'" slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">关 闭</el-button>
        <el-button :disabled="uploadDisabled" @click="upload" type="primary">上 传</el-button>
      </div>
      <div v-else slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button @click="chose" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import media from "@/components/media";
export default {
  props: ["images"],
  data() {
    return {
      dialogTableVisible: false,
      activeName: "上传图片",
      dialogImageUrl: "",
      disabled: false,
      header: {
        Authorization: "Bearer " + this.$store.state.userinfo.token
      },
      hideUpload: false,
      uploadDisabled: true,
      imageUrlList: [],
      imgs: [],
      choseimg:[]
    };
  },
  components: {
    media
  },
  watch: {
    images(val) {
      this.imgs = this.images;
    }
  },
  methods: {
    showDialog() {
      this.dialogTableVisible = true;
    },
    upload() {
      if (!this.imageUrlList.length) return;
      this.uploadDisabled = true;
      this.$refs.upload.submit();
    },
    uploadChange(file, fileList) {
      if (file.status == "success") return;
      this.hideUpload = fileList.length >= 3;
      this.imageUrlList = fileList;
      this.uploadDisabled = !this.imageUrlList.length > 0;
    },
    uploadRemove(file, fileList) {
      if (file.status == "success") {
        this.imageUrlList = fileList.map(item => {
          if (item.response.message == "OK") {
            return item.response.data.url;
          }
        });
        this.imgs = this.imageUrlList;
        return;
      }
      this.hideUpload = fileList.length >= 3;
      this.imageUrlList = fileList;
      this.uploadDisabled = !this.imageUrlList.length > 0;
    },
    uploadSuccess(response, file, fileList) {
      this.uploadDisabled = true;
      this.imageUrlList = fileList.map(item => {
        if (item.response) {
          return item.response.data.url;
        }
      });
      this.imgs.push(this.imageUrlList);
    },
    closeDialog() {
      this.dialogTableVisible = false;
      this.$emit("imageUrlList", this.imgs);
    },
    tabsChange(tab) {
      if (tab.label == "媒体库") {
        this.$refs.media.getMedia();
      }
    },
    chose() {
      if(this.choseimg.length + this.imgs.length >3) return
      this.imgs = this.imgs.concat(this.choseimg)
      console.log(this.imgs);
      
    }
  }
};
</script>

<style lang="less" scoped  >
/deep/ .el-upload-list__item-thumbnail {
  object-fit: cover !important;
}
/deep/ .hide .el-upload--picture-card {
  display: none;
}
.img_wrap {
  display: inline-block;
  width: 220px;
  height: 220px;
  padding: 5px;
  box-sizing: border-box;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover !important;
  }
}
</style>
<style lang="less">
body {
  .v-modal {
    z-index: 0 !important;
  }
}
</style>