<template>
  <div>
    <headerMenu @setLocation="setLocation"></headerMenu>
    <div id="map" class="map" ></div>
    <!-- <el-button @click="addLocation()" class="addLocationBtn">新增位置</el-button> -->
    <div v-if="showPanel">
        <leftPanel :panelInfo="this.panelContent" @closePanel="closePanel()"></leftPanel>
    </div>

  </div>
</template>

<script>
import leftPanel from "./leftpanel.vue";
import PopUpPanel from "./popuppanel/popupPanel.vue"
import headerMenu from "./header.vue" 
import geoUtil from "../utils/geoUtil"
export default {
components:{leftPanel,headerMenu},
  data() {
    return {
      map: null,
      mapBounds:[[0.024719237514403372,0.00042915344238281255],[0.024719237514403372,0.03334522247314454],[0.0002145767211831047,0.00042915344238281255],[0.0002145767211831047,0.03338813781738282]],
      mapCenter:[0.0116046894120897,0.0116046894120897],
      markerLayer:this.L.layerGroup(),
      rateMarkerLayer:this.L.layerGroup(),
      locationMarkerLayer:this.L.layerGroup(),
      pictureList:[],
      npcList:[],
      otherList:[],
      rateList:[],
      pictureMarkers:null,
      npcMarkers:null,
      showPanel:false,
      panelContent:null,
      location:null,
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
      zoomControl:false,
      });
      //设置地图的地图
  //  let url = "http://localhost:3001/dbgmap/dbg2map_225773205_256X256_PNG.mbtiles";
  //   const mb =   this.L.tileLayer.mbTilesCORS(url).addTo(this.map);
  //   console.log(this.map,'map')
  //   console.log(mb,'mb')
  //   mb.on('databaseloaded',(ev)=>{
  //     console.log(ev,'evOK')
  //     mb.addTo(this.map)
  //   });
  //       mb.on('databaseerror',(ev)=>{
  //     console.log(ev,'evError')
  //   });
  let url = "jpg/{z}/{x}/{y}.png"
  this.L.tileLayer(url).addTo(this.map);
      this.map.setView([0.0116046894120897,0.0116046894120897], 16)
      //将marker图层添加到地图中
      this.markerLayer.addTo(this.map)
      this.locationMarkerLayer.addTo(this.map);
      this.loadData();
    },
    async loadData(){
      await this.$request("/map/getallmarkers").then(data=>{
        console.log(2)
        this.pictureList = data.picture;
        this.npcList =data.npc;
        this.otherList =data.other;
        this.addPictureMarkers()
        this.addNpcMarkers()
        this.addOtherMarkers();
      })
    },
   async  loadRateData(){
      await this.$request("/map/getratemarkers").then(data=>{
        this.rateList =data;
      })
    },
    addPictureMarkers(){
      this.pictureList.forEach(item=>{
        const marker = this.L.marker([item.lat,item.lng],{icon:this.L.divIconPlus({iconUrl:'/sucai/markericon/zhaoxiang.png',size:18})});
        marker.on('click',()=>{
          this.openPanel(item)
        })
        marker.addTo(this.markerLayer);
      })

    },
    addNpcMarkers(){
        this.npcList.forEach(item=>{
        let markerIcon=null;
        if(item.name=="bs"){
          markerIcon =this.L.divIconPlus({iconUrl:'/sucai/markericon/bushou.png',size:18})
        }else if(item.name=='tf'){
          markerIcon =this.L.divIconPlus({iconUrl:'/sucai/markericon/tf.png',size:18})
        }else if(item.name=='hs'){
           markerIcon =this.L.divIconPlus({iconUrl:'/sucai/markericon/hd.png',size:18})
        }
        const marker = this.L.marker([item.lat,item.lng],{icon:markerIcon});
        marker.on('click',()=>{
          this.openPanel(item)
        })
        marker.addTo(this.markerLayer);
      })

    },
    addOtherMarkers(){
      this.otherList.forEach(item=>{
        let markerIcon = null;
        if(item.name=="home"){
          markerIcon =this.L.divIconPlus({iconUrl:'/sucai/markericon/home.png',size:18})
        }
        const marker = this.L.marker([item.lat,item.lng],{icon:markerIcon});
        marker.on('click',()=>{
          this.openPanel(item)
        })
        marker.addTo(this.markerLayer);
      })
    },
    openPanel(marker){
      if(this.panelContent==null||this.panelContent.id==marker.id){
        this.panelContent = this.panelContent==null?marker:null;
        this.showPanel = !this.showPanel;
      }else if(this.panelContent.id!=marker.id){
        this.panelContent =marker;
      }
    },
    closePanel(){
      this.showPanel = !this.showPanel;
      this.panelContent =null;
    },
    addLocation(){
      const marker = this.L.marker([0.0116046894120897,0.0116046894120897],{icon:this.L.divIconPlus({size:18,iconClass:'el-icon-location-information'})});
      this.map.on('mousemove',(e)=>{
        marker.setLatLng([e.latlng.lat,e.latlng.lng]);
        marker.addTo(this.map)
      })
      this.map.on('click',(e)=>{
        this.map.off('mousemove');
        marker.setLatLng([e.latlng.lat,e.latlng.lng]);
        marker.popupPlus(PopUpPanel,{
        props:{
          lat:e.latlng.lat,
          lng:e.latlng.lng
        },
      })
      this.map.off('click')
      })
    },
    setLocation(){

      const locationMarker = this.L.marker([],{icon:this.L.divIconPlus({size:26,iconUrl:'/sucai/markericon/location.png'})});
      const moveLocationMarker=(e)=>{
        locationMarker.setLatLng([e.latlng.lat,e.latlng.lng])
        locationMarker.addTo(this.locationMarkerLayer)
      }
      const comfirmLocation=(e)=>{
        locationMarker.setLatLng([e.latlng.lat,e.latlng.lng])
        locationMarker.addTo(this.locationMarkerLayer)
        this.map.off("mousemove",moveLocationMarker);
        this.map.off("click",comfirmLocation)
        this.showMarkerinRanger(locationMarker);
      }
      this.map.on('mousemove', moveLocationMarker);
      this.map.on('click',comfirmLocation);
  },
  showMarkerinRanger(locationMarker){
    // this.loadRateData();
    console.log(locationMarker.getLatLng(),'000')
    console.log(this.L.Projection.LonLat.project(locationMarker.getLatLng()),'1111')
    // geoUtil.calDistance(locationMarker,[0.0116046894120897,0.0116046894120897])
  }
  },
  mounted() {
    this.initMap();


  },
};
</script>

<style lang="less" scoped>

.map{
  position: absolute;
  top: 0%;
  left: 0%;
  height: 100vh;
  width: 100%;
  background: #fff !important;
}
.addLocationBtn{
  position: absolute;
  z-index: 100000;
  right: 6px;
}
</style>
