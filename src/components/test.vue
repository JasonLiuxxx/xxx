<template>
  <div>
    <!-- <el-select  @change="changeValue"  v-model="channelId.channel_id" placeholder="请选择频道频道"> -->
    <el-select  @change="changeValue"  v-model="value" placeholder="请选择频道频道">
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
import { getAllChannels } from "@/api/api";

export default {
  data() {
    return {
      value: this.cid,
      options: []
    };
  },
  props:{'cid':''},
  model:{//自己试验:若cid为对象这步可不写
    prop:'cid',
    event:'change'
  },
  watch: {
    cid(val){
      console.log(val);
      this.value = val
    }
  },
  async mounted() {
    const res = await getAllChannels();
    if (res.message == "OK") {
      this.options = res.data.channels;
    }
  },
  methods: {
    changeValue(e){//自己试验:若cid为对象这步可不写
      console.log(e)
      this.$emit('change', e)
    }
  },
};
</script>

<style>
</style>