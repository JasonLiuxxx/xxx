<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="less">
@import 'assets/reset.less';
#app {
  height: 100%;
}
</style>
