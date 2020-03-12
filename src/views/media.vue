<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-radio-group @change="radioChange" v-model="radio">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>
        <el-upload
          style="float:right"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="header"
          multiple
          :limit="3"
          :show-file-list="false"
          name="image"
          :on-success="uploadSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <el-row>
        <el-col
          style="margin-bottom: 15px;padding:0 10px 0 10px;"
          :span="4"
          v-for="item in imgs"
          :key="item.id"
        >
          <el-card :body-style="{ padding: '0px',textAlign: 'center' }">
            <img :src="item.url" class="image" style="height:160px" />
            <div
              style="height:30px;display:flex; justify-content:space-around;align-items:center;color:#409EFF;background-color: rgb(244, 245, 246)"
            >
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.is_collected ? '取消收藏' : '收藏'"
                placement="top"
              >
                <i
                  style="font-size: 16px;cursor: pointer;"
                  :class="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
                  @click="updatedMediaStatus(item)"
                ></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <i
                  @click="handleDelete(item.id)"
                  style="font-size: 16px;cursor: pointer;"
                  class="el-icon-delete"
                ></i>
              </el-tooltip>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getMedia, deleteMedia, updatedMediaStatus } from "@/api/api";
export default {
  data() {
    return {
      radio: "全部",
      imgs: [],
      total: 0,
      activity: [],
      urls: [],
      header: {
        Authorization: "Bearer " + this.$store.state.userinfo.token
      },
    };
  },
  mounted() {
    this.getMedia();
  },
  methods: {
    async getMedia(page = 1) {
      const res = await getMedia({
        per_page: 12,
        page: page,
        collect: this.radio == "收藏"
      });
      if (res.message == "OK") {
        this.total = res.data.total_count;
        this.imgs = res.data.results;
      }
    },
    radioChange() {
      this.getMedia();
    },
    async handleDelete(id) {
      const res = await deleteMedia(id);
      this.getMedia();
    },
    async updatedMediaStatus(item) {
      item.is_collected = !item.is_collected;
      const res = await updatedMediaStatus({
        id: item.id,
        collect: item.is_collected
      });
    },
    uploadSuccess(){
        this.getMedia();
    }
  }
};
</script>

<style lang='less' scoped >
p {
  cursor: pointer;
}
</style>