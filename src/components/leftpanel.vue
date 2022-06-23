<template>
  <div class="leftPanel">
    <div class="closePanel"><i class="el-icon-close" @click="closePanel()"></i></div>
    <div class="panelInfo"><span>详情</span></div>
    <div class="panelPicture">
        <Imageshow  :url="info.url"></Imageshow>
    </div>
    <div class="panelDetail">
        <div class="info">
            <template v-if="info.info.type=='npc'">
            <div>姓名:{{info.info.name}}</div>
            <div>类型:{{info.info.type}}</div>
            <div>位置:{{info.info.location}}</div>
            <div>功能:{{info.info.work}}</div>
            </template>
            <template v-else-if="info.info.type=='picture'">
            <div>类型:{{info.info.type}}</div>
            <div>位置:{{info.info.location}}</div>
            <div>描述:{{info.info.introduce}}</div>
            </template>

        </div>
        <div class="date">{{info.date}}</div>
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
    methods:{
        closePanel(){
            this.$emit('closePanel',false);
        }
    },
    created(){
        this.info = this.panelInfo;      
    },
    watch:{
        panelInfo:{
            deep:true,
            handler(nval){
                console.log(111)
                this.info = nval;
            }
        }
    }
        

}
</script>

<style lang="less" scoped>
.leftPanel{
   height: 96%;
   width: 400px;
   position:absolute;
   z-index:1000;
   display: flex;
   flex-direction: column;
   justify-content:left;
    background: rgba(27, 27, 27, 0.879);
    .closePanel{
        position: relative;
        i{
            position: absolute;
            right: 0;
            font-size: 22px;
            font-weight: 600;
            z-index: 1005;
            color:#ccc9c9;
            cursor: pointer;
        }
        i:hover{
            color: #ffffff;
        }

    }
   .panelInfo{
    position: relative;
    height: 10%;
    width: 96%;
    margin: 0 auto;
    line-height: 64px;
    text-align: center;
    font-size: 36px;
    color: #ccc9c9;
   }
   .panelPicture{
    height: 38%;
    padding: 6px 10px;
   }
   .panelDetail{
    position: relative;
    bottom: 0;
    height: 44%;
    width: 100%;
    color: #ccc9c9;
    flex-grow: 1;
    .info{
        height: 84%;
        width: 100%;
        font-size: 20px;
        margin: 0 10px
    }
    .date{
        position: absolute;
        right:6px;
        bottom: 2px;
        height: 12%;
        font-size: 22px;
    }
   }
}
</style>