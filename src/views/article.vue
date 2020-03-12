<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form>
          <el-form-item label="状态">
            <el-radio-group v-model="searchParams.status">
              <el-radio :label="undefined">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <channels @chanegeSelectID="chanegeSelectID"></channels>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-button @click="search" type="primary">筛选</el-button>
        </el-form>
      </div>
      <p>共找到 {{tableData.total_count}}条符合条件的内容</p>
      <el-table :data="tableData.results" style="width: 60%">
        <el-table-column prop="cover.images[0]" label="封面" width="180">
          <template slot-scope="scope">
            <div @click="showDialog(scope.row)">
              <img v-for="item in scope.row.cover.images" width="50" :src="item" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="status" label="状态" width="180">
          <template slot-scope="scope">
            <el-tag>{{scope.row.status | formatStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="changPage"
        background
        layout="prev, pager, next"
        :total="tableData.total_count"
      ></el-pagination>
    </el-card>
    <el-dialog title="轮播图" :visible.sync="dialogTableVisible" width="30%">
      <el-carousel :autoplay="false" trigger="click" height="200px">
        <el-carousel-item style="text-align: center;" v-for="item in images" :key="item">
          <img height="100%" :src="item" alt="">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script>
import channels from "@/components/channels";
import { getTableData, deleteTableData } from "@/api/api";
export default {
  data() {
    return {
      searchParams: {
        status: undefined,
        channel_id: undefined,
        begin_pubdate: "",
        end_pubdate: "",
        page: 1
      },
      date: [],
      value: "",
      tableData: [],
      dialogTableVisible: false,
      images: []
    };
  },
  components: {
    channels
  },
  filters: {
    formatStatus(val) {
      switch (val) {
        case 0:
          return "草稿";
        case 1:
          return "待审核";
        case 2:
          return "审核通过";
        case 3:
          return "审核失败";
        case 4:
          return "已删除";
      }
    }
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    async getTableData() {
      this.searchParams.begin_pubdate = this.date ? this.date[0] : "";
      this.searchParams.end_pubdate = this.date ? this.date[1] : "";
      const res = await getTableData(this.searchParams);
      if (res.message == "OK") {
        this.tableData = res.data;
      }
    },
    changPage(page) {
      this.searchParams.page = page;
      this.getTableData();
    },
    chanegeSelectID(id) {
      this.searchParams.channel_id = id;
    },
    search() {
      this.getTableData();
    },
    async handleDelete(row) {
      const res = await deleteTableData(row.id);
      if (res.message == "OK") {
        this.getTableData();
      }
    },
    showDialog(row) {
      if (!row.cover.images.length) return;
      this.images = row.cover.images;
      this.dialogTableVisible = true;
    }
  }
};
</script>

<style lang="less" scoped >
</style>