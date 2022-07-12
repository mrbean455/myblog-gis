<template>
  <div class="leftPanel">
    <div class="closePanel"><i class="el-icon-close" @click="closePanel()"></i></div>
    <div class="panelInfo"><span>详情</span></div>
    <div class="panelPicture">
        <Imageshow  :url="info.url"></Imageshow>
    </div>
    <div class="panelDetail">
        <div class="info">
            <div v-if="info.type=='npc'">姓名:{{info.name=="bs"?"捕兽人":info.name=="hs"?"黑市商人":info.name=="tf"?"屠夫":""}}</div>
            <div>类型:{{info.type=='npc'?info.type:info.type=="picture"?"摄影":""}}</div>
            <div>介绍:{{info.introduce}}</div>
        </div>
        <div class="location"><span>{{info.location}}</span></div>
    </div>
  </div>
</template>

<script>
import Imageshow from "./imageshow/iamgeshow.vue"
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
    box-sizing: border-box;
   height: 96%;
   width: 400px;
   position:absolute;
   z-index:2000;
   padding:0 6px;
   display: flex;
   flex-direction: column;
   justify-content:left;
    background: rgba(0, 0, 0, 0.963);
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
    margin: 10px auto;
    line-height: 64px;
    text-align: center;
    font-size: 36px;
    color: #ccc9c9;
    background-image: url('/sucai/border.png');
    background-size: 100% 100%;
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
        font-size: 20px;
        margin: 0 10px;
        background:#7b797912;
    }
    .location{
        position: relative;
        text-align: center;
        bottom: 2px;
        height: 12%;
        font-size: 18px;
        line-height: 52px;
    }
   }
}
</style>