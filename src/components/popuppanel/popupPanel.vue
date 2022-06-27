<template>
  <div class="addLocationPanel">
    <el-form ref="form" :model="locationInfo" label-width="80px">
  <el-form-item label="地点">
    <el-input v-model="locationInfo.location"></el-input>
  </el-form-item>
  <el-form-item label="lat">
        <el-input v-model="locationInfo.lat"></el-input>
  </el-form-item>
    <el-form-item label="lng">
        <el-input v-model="locationInfo.lng"></el-input>
  </el-form-item>
  <el-form-item label="类型">
    <el-select v-model="locationInfo.type" placeholder="请选择类型">
      <el-option label="picture" value="picture"></el-option>
      <el-option label="npc" value="npc"></el-option>
      <el-option label="rate" value="rate"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="介绍">
        <el-input v-model="locationInfo.introduce"></el-input>
  </el-form-item>
  <el-form-item label="名字">
    <el-input  v-model="locationInfo.name"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="addLocation()">提交</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
  </div>

</template>

<script>
import dayjs from "dayjs";
export default {
    props:['lat','lng'],
    data(){
        return{
            locationInfo:{
                location:"",
                lat:null,
                lng:null,
                type:'picture',
                introduce:"",
                name:""
            }
        }
    },
    methods:{
        addLocation(){
            let date = dayjs().format('YYYY-MM-DD');
            this.$request({url:'/map/addmarker',params:{
                location:this.locationInfo.location,
                lat:this.locationInfo.lat,
                lng:this.locationInfo.lng,
                type:this.locationInfo.type,
                introduce:this.locationInfo.introduce,
                name:this.locationInfo.name,
                date,
            }})
        }
    },
    mounted(){
      this.locationInfo.lat=(this.lat*1).toFixed(7);
      this.locationInfo.lng=this.lng.toFixed(7);
    }
}
</script>

<style lang="less" scoped>

</style>