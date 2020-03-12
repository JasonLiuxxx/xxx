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
  props:['channelId'],
//   props: {
//     channelId: Object  若是普通数据类不可以直接绑定,还是要用$emit
// },
  data() {
    return {
      value: '',
      options: []
    };
  },
  watch: {
    channelId(val){
      this.value = this.channelId
    }
  },
  async mounted() {
    const res = await getAllChannels();
    if (res.message == "OK") {
      this.options = res.data.channels;
    }
  },
  methods: {
    changeValue(val){
      this.$emit('chanegeSelectID',val)
    }
  },
};
</script>

<style>
</style>