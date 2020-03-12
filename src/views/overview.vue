<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size:16px">基本信息</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="card_warp">
        <el-card class="card_item">
          <p>粉丝数</p>
          <p>50</p>
          <p>昨日敬赠：0</p>
        </el-card>
        <el-card class="card_item">
          <p>粉丝阅读累计阅读数</p>
          <p>3000</p>
          <p>阅读累计阅读数：0</p>
        </el-card>
        <el-card class="card_item">
          <p>月度粉丝收益</p>
          <p>800元</p>
          <p>月度累计收益：800元</p>
        </el-card>
      </div>
    </el-card>
    <el-card style="margin:10px 0" shadow="always">
      <div style="height:300px;width:100%" ref="pie" id="pie"></div>
    </el-card>
    <el-card style="margin:10px 0" shadow="always">
      <div style="height:500px;width:33.333%" ref="line1" class="line"></div>
      <div style="height:500px;width:33.333%" ref="line2" class="line"></div>
    </el-card>
    <el-card style="margin:10px 0" shadow="always">
      <div style="height:300px;width:100%" ref="map" id="map"></div>
    </el-card>
  </div>
</template>

<script>
import { getFollowers } from "@/api/api";
import echarts from "echarts";
import '../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
export default {
  data() {
    return {
      gender: [],
      age: [],
      device: []
    };
  },
  async mounted() {
    var pie = echarts.init(this.$refs.pie);
    var line1 = echarts.init(this.$refs.line1);
    var line2 = echarts.init(this.$refs.line2);
    var map = echarts.init(this.$refs.map);
    var pie_option = {
      title: [
        {
          subtext: "性别",
          left: "16.67%",
          top: "85%",
          textAlign: "center",
          subtextStyle: { color: "#000", fontSize: 14 }
        },
        {
          subtext: "年龄",
          left: "50%",
          top: "85%",
          textAlign: "center",
          subtextStyle: { color: "#000", fontSize: 14 }
        },
        {
          subtext: "设备",
          left: "83.33%",
          top: "85%",
          textAlign: "center",
          subtextStyle: { color: "#000", fontSize: 14 }
        }
      ],
      tooltip: {
        trigger: "item"
      },
      series: [
        {
          type: "pie",
          radius: "70%",
          center: ["50%", "50%"],
          data: this.gender,
          animation: false,
          label: {
            position: "inner",
            alignTo: "none",
            bleedMargin: 5
          },
          left: 0,
          right: "66.6667%",
          top: 0,
          bottom: 0,
          tooltip: {
            formatter: "性别 <br/>{b} : {c} ({d}%)"
          },
          color: ["blue", "pink"]
        },
        {
          type: "pie",
          radius: "70%",
          center: ["50%", "50%"],
          data: this.age,
          animation: false,
          label: {
            position: "inner",
            alignTo: "labelLine",
            bleedMargin: 5
          },
          left: "33.3333%",
          right: "33.3333%",
          top: 0,
          bottom: 0,
          tooltip: {
            formatter: "年龄 <br/>{b} : {c} ({d}%)"
          }
        },
        {
          type: "pie",
          radius: "70%",
          center: ["50%", "50%"],
          data: this.device,
          animation: false,
          label: {
            position: "inner",
            alignTo: "edge",
            margin: 20
          },
          left: "66.6667%",
          right: 0,
          top: 0,
          bottom: 0,
          tooltip: {
            formatter: "设备 <br/>{b} : {c} ({d}%)"
          }
        }
      ]
    };
    var line1_option = {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ['product', '男', '女'],
          ["性别", 15,10]
        ]
      },
      xAxis: { type: "category" },
      yAxis: {
          type: 'value',
          min:0,
          max:200
      },
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [{ type: "bar" }, { type: "bar" }]
    };
    var line2_option = {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ['product', 'IOS', '安卓'],
          ["设备", 57,30]
        ]
      },
      xAxis: { type: "category" },
      yAxis: {
          show:true,
        //    boundaryGap:false,
         interval:20,
          type: 'value',
          min:0,
          max:200
      },
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [{ type: "bar" }, { type: "bar" }]
    };
    const res = await getFollowers();
    if (res.message == "OK") {
      for (let i in res.data) {
        for (let j in res.data[i]) {
          this[i].push({ name: j, value: res.data[i][j] });
        }
      }
      pie.setOption(pie_option);
      line1.setOption(line1_option);
      line2.setOption(line2_option);
    }
    // 使用刚指定的配置项和数据显示图表。
  },
  created() {}
};
</script>

<style lang="less" scoped >
.card_warp {
  display: flex;
  justify-content: space-around;
  .card_item {
    width: 300px;
    background-color: #f8f8f8;
    p {
      font-size: 14px;
      line-height: 20px;
      text-align: center;
    }
  }
}
.line{
    display: inline-block
}
</style>