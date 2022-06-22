<template>
  <div class="leftPanel">
    <div class="panelInfo">详情</div>
    <div class="panelPicture">
        <Imageshow  :url="info.url"></Imageshow>
    </div>
    <div class="panelDetail">
        {{info.date}}
    </div>
  </div>
</template>

<script>
import Imageshow from "./imagehow/iamgehow.vue"
export default {
    components:{Imageshow},
    props:['panelInfo'],
    data(){
        return{
            info:{}
        }
    },
    created(){
        this.info = this.panelInfo;      
    }
        

}
</script>

<style lang="less" scoped>
.leftPanel{
   height: 96%;
   width: 400px;
   background: rgba(43, 43, 43, 0.879);
   position:absolute;
   z-index:1000;
   .panelInfo{
    height: 16%;
   }
   .panelPicture{
    height: 60%;
    padding: 10px;
   }
   .panelDetail{
    height: 20%;
   }
}
</style>