<template>
  <div class="readMe layout">
      <h1 class="title"><i class="el-icon-tickets"></i>自述</h1>
      <article>
        <caption>README.md</caption>
        <div class="content">
          <h1>voting-manage-system</h1>
          <p >基于Vue.js 2.x系列 + Element UI 的投票活动后台管理系统</p>
          <h1>前言</h1>
          <p>用VUE + Element组件库做的投票活动后台管理系统，功能及系统框架仍需继续完善</p>
          <h1>功能</h1>
          <ul>
            <li>
              
              <el-checkbox checked disabled></el-checkbox><span>Element UI</span>
            </li>
            <li>
              <el-checkbox checked disabled></el-checkbox><span>投票活动管理</span>
            </li>
            <li>
              <el-checkbox checked disabled></el-checkbox><span>用户管理</span>
            </li>
            <li>
              <el-checkbox checked disabled></el-checkbox><span>系统配置</span>
            </li>
            <li>
              <el-checkbox checked disabled></el-checkbox><span>前台配置</span>
            </li>
          </ul>
           </div>
      </article>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: 'about'
    }
  }
}
</script>
<style>
.readMe .title{
  text-align: left;
  color:#97a8be;
  font-weight:normal;
  font-size:16px;
  padding: 20px 0;
}
.readMe .title > i{
  font-size: 18px;
  padding-right:5px;
}
.readMe article{
  border-radius:5px;
   border: 1px solid #d8d8d8;
}
.readMe article caption{
  background-color: #f5f5f5;
  display: block;
  text-align:left;
  height: 50px;
  line-height: 50px;
  padding-left: 5px;
  border-top-left-radius:5px;
  border-top-right-radius:5px;
  font-weight: bold;
  border-bottom:1px solid #d8d8d8;
  font-size: 20px;
}
.readMe article .content{
  padding:20px 30px;
  font-size:18px;
}
.readMe article .content  h1{
  padding: 10px 0;
  border-bottom:1px solid #d8d8d8;
  text-align:left;
  width:100%;
  font-weight: bold;
  margin-bottom:15px;
}
.readMe article .content p{
  text-align:left;
  text-indent: 2em;
}
.readMe li{
  list-style-type:none;
  text-align: left;
  line-height:1.7em;
}
.readMe li span:nth-last-of-type(1){
  margin-left:10px;
}
</style>


