import Vue from 'vue'
import App from './App.vue'

//全局引入ElementUI
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"

//引入leaflet
import L from 'leaflet'
//引入leaflet的css样式
import 'leaflet/dist/leaflet.css'
//引入可以加载mbtiles的包
import "leaflet-tilelayer-mbtiles"

//引入封装的leaflet包
import './leafletExtends/popupPlus'
import "./leafletExtends/divIconPlus"
import "./leafletExtends/mbTilesCORS"

//引入二次封装的axios
import request from "./utils/request"

//引入leaflet默认的markerIcon
// import './Myleaflet/icon'
//把leaflet挂载到vue实例中，使得在vue中可以使用leaflet
Vue.L=Vue.prototype.L=L;
Vue.prototype.$request = request;
Vue.config.productionTip = false

//使用ElementUI
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
}).$mount('#app')
