<template>
<div class="imageshow">
    <img :src="imgParams.url" :height="imgParams.height" :width="imgParams.width" @click="showBigImg()" style="cursor: pointer">
    <template v-if="bigImg.show">
        <div class="bigImgPanel">
        <div class="bigImgDetail">
            <div class="bigImgBtn">
            <i class="el-icon-circle-close" @click="closeBigImg()"></i>
            </div>
        </div>
        <div class="bigImgBg">
       <img :src="bigImg.url" class="bigImg">
        </div>
        </div>
    </template>
</div>
  
</template>

<script>
export default {
    props:{
        height:{
            default:"100%",
            type:String
        },
        width:{
            default:"100%",
            type:String
        },
        url:{
            required:true,
            type:String
        }
    },
    data(){
        return{
            imgParams:{
                height:"",
                width:"",
                url:"",
            },
            bigImg:{
                show:false,
                url:""
            }
        }
    },
    methods:{
    showBigImg(){
        this.bigImg.url=this.imgParams.url;
        this.bigImg.show=true;
    },
    closeBigImg(){
        this.bigImg.url="";
        this.bigImg.show=false;
    }

    },
    mounted(){
        this.imgParams.height = this.height;
        this.imgParams.width  = this.width;
        this.imgParams.url = this.url;
    },
    watch:{
        url:{
            handler(nval){
                this.imgParams.url = nval;
            }
        }
    }

}
</script>

<style lang="less" scoped>
.imageshow{
.bigImgPanel{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    z-index: 10001;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(42, 42, 42, 0.592);
    .bigImgDetail{
        position: fixed;
        top:0;
        width: 100%;
        height: 10%;
        z-index: 10001;
    .bigImgBtn{
        width: 30%;
        position: relative;
        top:30%;
        margin: 0 auto;
        text-align: center;
        i{  
            border-radius: 52%;
            font-size:38px;
            cursor:pointer;
            color: rgb(204, 201, 201);
        }
    }
    }
    .bigImgBg{
            position: relative;
            z-index: 10002;
    .bigImg{
        height: 576px;
        width: 1024px;
        object-fit: contain;
    }
    }

}
}
</style>