<template>
<div class="imageshow">
    <img :src="imgParams.url" :height="imgParams.height" :width="imgParams.width" @click="showBigImg()">
    <template v-if="bigImg.show">
        <div class="bigImgPanel">
        <img :src="bigImg.url">
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
    }

    },
    mounted(){
        this.imgParams.height = this.height;
        this.imgParams.width  = this.width;
        this.imgParams.url = this.url;
    }

}
</script>

<style lang="less" scoped>
.imageshow{
    cursor: pointer;

.bigImgPanel{
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 10001;
    background: rgba(42, 42, 42, 0.592);
}
}
</style>