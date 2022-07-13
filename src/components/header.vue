
<template>
  <div class="headerMenu">
    <div class="headerLogo"><span>MRBEAN455</span></div>
    <div class="headerFunc"><span class="headerBtn" @click="setLocation()">{{actived?'重新选择':'选择位置'}}</span></div>
    <div></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      actived:false,

    }
  },
  methods:{
    setLocation(){
      this.actived = !this.actived;
      this.$emit('setLocation',this.actived);
    }
  }
};
</script>

<style lang="less" scoped>
@keyframes logoStart {
  0% {
    color: #7f2e7d;
  }
  100% {
    color: #6b346a;
  }
}
@keyframes logoClick {
  0% {
    color: #6b346a;
  }
  100% {
    color: #db5f3a;
  }
}
@keyframes btnClick{
 0%{
  color: rgb(159, 161, 163);
 }
 100%{
  color: burlywood;
 }
}
.headerMenu {
  z-index: 1500;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 52px;
  display: flex;
  background-color: rgba(19, 18, 18, 0.915);
  background-color: rgba(19, 18, 18, 0.915);
  .headerLogo {
    position: relative;
    width: fit-content;
    height: 100%;
    font-family: Vemanem;
    padding: 4px;
    font-size: 32px;
    line-height: 52px;
    color: #6b346a;
    cursor: pointer;
    box-sizing: border-box;
    // animation: logoStart 0.5s 1;
    // animation-fill-mode:forwards;//forwards表示当执行完动画以后保持100%动画时的样式
  }
  .headerLogo:hover {
    // color:#db5f3a;
    animation: logoClick 0.5s 1;
    animation-fill-mode: forwards; //forwards表示当执行完动画以后保持100%动画时的样式
  }
.headerFunc{
  margin-left: 8px;
  position: relative;
  width: fit-content;
  height: 100%;
  text-align: center;
  .headerBtn{
    font-size: 24px;
    line-height: 52px;
    color: rgb(159, 161, 163);
    cursor: pointer;
  }
  .headerBtn:hover{
    animation: btnClick 0.5s 1;
    animation-fill-mode: forwards;
  }
}
}
</style>