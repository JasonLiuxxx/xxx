<template>
  <div>
    <el-card shadow="never">
      <el-form label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="活动名称">
              <el-input v-model="formdata.hd"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="品牌名称">
              <el-input v-model="formdata.pp"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="赞助商">
              <el-input v-model="formdata.zzs"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="举办单位">
              <el-input v-model="formdata.jbdw"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="特殊资源">
              <el-radio-group v-model="formdata.tszy">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="活动日期">
              <el-date-picker
                v-model="formdata.hdrq"
                type="date"
                placeholder="选择日期"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="tit[0]">
              <slot name="sw" :row="formdata"></slot>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="tit[1]">
              <slot name="sl" :row="formdata"></slot>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="" @click="tijiao">提交</el-button>
        <el-button type="" @click="chongzhi">重置</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
const defaultData = {
  hd: '',
  pp: '',
  zzs: '',
  jbdw: '',
  tszy: '',
  hdrq: '',
  jsps: 'true',
  km: '',
  hdxz: []
}
export default {
  props: ['tit'],
  data() {
    return {
      formdata: Object.assign({}, defaultData)
      // formdata: defaultData
    }
  },
  methods: {
    tijiao() {
      // console.log(this.formdata)
      this.$emit('tijiao', this.formdata)
    },
    chongzhi() {
      // console.log(defaultData);
      this.formdata = Object.assign({}, defaultData)
      // this.formdata = defaultData
    }
  }
}
</script>

<style></style>
