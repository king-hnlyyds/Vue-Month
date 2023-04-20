import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//重置样式表
import "./assets/css/reset.css";
//字体图标
import "./assets/fonts/iconfont.css";

//引入ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);


Vue.config.productionTip = false

// 自动注册全局过滤器
//1.引入方法
import * as isFilters from "@/filters";
Object.keys(isFilters).forEach((v) => {
  //2.全局过滤器
  Vue.filter(v, isFilters[v]);
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
