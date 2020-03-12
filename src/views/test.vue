<template>
  <div>
    <div>
      <channels v-model="idc"></channels>
      <div>{{ idc }}</div>
      <button @click="idc++">+</button>
      <button @click="idc--">-</button>
    </div>
    <br />
    <br />
    <br />
    <br />
    <formtest :tit="['即时配送', '科目']" @tijiao="tijiao">
      <template v-slot:sw="{ row }">
        {{ row.jsps}}
        <el-switch v-model="row.jsps"></el-switch>
        
        <!-- <el-input v-model="row.jsps" placeholder=""></el-input> -->
        <!-- <input type="text" v-model="row.jsps" > -->
      </template>
      <template v-slot:sl="{ row }">
        {{ row.km }}
        <channels v-model="row.km"></channels>
      </template>
    </formtest>
    <el-switch v-model="z"></el-switch>
  </div>
</template>

<script>
import channels from '@/components/test'
import formtest from '@/components/formtest'
export default {
  data() {
    return {
      idc: 6,
      sw: '',
      tit: '函数',
      z:true
    }
  },
  components: { channels, formtest },
  methods: {
    tijiao(e) {
      console.log('11111111111')
      console.log(e)
      console.log('11111111111')
    },
  },
}
</script>

<style></style>
