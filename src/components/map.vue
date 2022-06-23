<template>
  <div>
    <div id="map" class="map"></div>
    <div v-if="showPanel">
        <leftPanel :panelInfo="this.panelContent" @closePanel="closePanel()"></leftPanel>
    </div>

  </div>
</template>

<script>
import LeftPanel from "./leftpanel.vue";
export default {
components:{LeftPanel},
  data() {
    return {
      coords:[{id:"0001",coord:{lat:0.010524613472941513,lng:0.01630783081054688},date:"2022-06-22",url:"/markericon/test1.jpg",info:{type:"picture",location:'草莓镇',introduce:'草莓镇的夜晚'}}
      ,{id:"0002",coord:{lat:0.010759327693997187,lng:0.029788613319396976},date:"2022-06-22",url:"/markericon/test2.jpg",info:{type:"npc",location:'圣丹尼斯',work:'交易',name:'xxx'}}],
      map: null,
      mapBounds:[[0.024719237514403372,0.00042915344238281255],[0.024719237514403372,0.03334522247314454],[0.0002145767211831047,0.00042915344238281255],[0.0002145767211831047,0.03338813781738282]],
      mapCenter:[0.0116046894120897,0.0116046894120897],
      markerLayer:this.L.layerGroup(),
      showPanel:false,
      panelContent:null,
    };
  },
  methods: {
    initMap() {
        //实例化一个地图
      this.map = this.L.map("map", {
      center:this.mapCenter,
      crs:this.L.CRS.EPSG3857,
      maxBounds:this.mapBounds,
      maxBoundsViscosity:0.7,
      minZoom:16,
      maxZoom:18,
      zoomControl:false
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
      if(this.panelContent==null||this.panelContent.id==marker.id){
        console.log(1)
        this.panelContent = this.panelContent==null?marker:null;
        this.showPanel = !this.showPanel;
      }else if(this.panelContent.id!=marker.id){
        this.panelContent =marker;
      }
    },
    closePanel(){
      this.showPanel = !this.showPanel;
      this.panelContent =null;
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
