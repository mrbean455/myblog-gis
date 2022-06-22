<template>
  <div>
    <div id="map" class="map"></div>
    <div v-if="showPanel">
        <leftPanel :panelInfo="this.panelContent"></leftPanel>
    </div>

  </div>
</template>

<script>
import LeftPanel from "./leftpanel.vue";
export default {
components:{LeftPanel},
  data() {
    return {
      coords:[{coord:{lat:0.010524613472941513,lng:0.01630783081054688},date:"2022-06-22",url:"/markericon/test1.jpg"}
      ,{coord:{lat:0.010759327693997187,lng:0.029788613319396976},date:"2022-06-22",url:"/markericon/test1.jpg"}],
      map: null,
      mapCenter:[0.0116046894120897,0.0116046894120897],
      markerLayer:this.L.layerGroup(),
      showPanel:false,
      panelContent:{},
    };
  },
  methods: {
    initMap() {
        //实例化一个地图
      this.map = this.L.map("map", {
      center:this.mapCenter,
      crs:this.L.CRS.EPSG3857,
      minZoom:1,
      maxZoom:18,
      });
      //设置地图的地图
      let url = "/dbgmap/dbg2map_225773205_256X256_PNG.mbtiles";
      this.L.tileLayer.mbTiles(url).addTo(this.map)
      this.map.setView(this.mapCenter,17)

      this.L.marker([0.0116046894120897,0.0116046894120897],{icon:this.L.divIcon({className:'el-icon-user'})}).addTo(this.map);
      //将marker图层添加到地图中
      this.markerLayer.addTo(this.map)
      this.addMarkers()
    },
    addMarkers(){
        this.coords.forEach(item=>{
            const marker = this.L.marker([item.coord.lat,item.coord.lng],{icon:this.L.divIcon({className:'el-icon-user'})})
            marker.on('click',()=>{
                this.openPanel(item)
            });
            marker.addTo(this.markerLayer);
        })
    },
    openPanel(marker){
      this.panelContent=marker;
      this.showPanel=!this.showPanel;
    }
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style>
.map{
  position: absolute;
  top: 0%;
  left: 0%;
  height: 100vh;
  width: 100%;
  background: #fff !important;
}
</style>
