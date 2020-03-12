<template>
  <div>
    <formtest :tit="['即时配送', '科目']">
      <template v-slot:sl="{row}">
          {{row.jsps}}
          <channels v-model="row.jsps"></channels>
      </template>
    </formtest>
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
      tit:'函数'
    }
  },
  components: { channels, formtest }
}
</script>

<style></style>
