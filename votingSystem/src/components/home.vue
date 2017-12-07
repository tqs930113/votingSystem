<template>
  <div class="wrap">
        <v-header></v-header>
        <div class="wrap">
            <vSlider class="left slider"></vSlider>
            <router-view class="right container"/>
        </div>
  </div>
</template>
<script>
import vSlider from './sliderBar'
import vHeader from './header'
export default {
  name: 'app',
  components: {
    vSlider,
    vHeader
  }
}
</script>

<style>
.router-link-active{
  color:red !important;
  font-size:20px;
  transition:all .5s;
}
.left{
  float: left;
}
.slider{
  /* box-shadow: 0px 0px 10px 0px rgba(0,0, 0,.5); */
  border-right: 1px solid goldenrod;
  text-align: center;
  width:20%;
  position: fixed;
  top:80px;
  left: 0;
  height: 88%;
}
.right{
  position: fixed;
  right: 0;
  top:80px;
  width:80%;
  height: 88%;
  overflow: auto;
}
.wrap::after{
  content:" ";
  display: block;
  clear: both;
  zoom: 1;
  width:100%;
}
</style>

