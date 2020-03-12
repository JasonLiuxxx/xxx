import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store/index'

// import '@/assets/reset.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false
//11111111111111

import axios from 'axios'
import VueQuillEditor from "vue-quill-editor";
// import "quill/dist/quill.core.css";
// import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";
// Vue.use(VueQuillEditor)

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (to.path == '/login') {
    next()
  } else {
    if (store.state.userinfo) {
      next()
    } else {
      next('/login')
    }
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
