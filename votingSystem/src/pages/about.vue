<template>
  <div class="readMe layout">
      <h1 class="title"><i class="el-icon-tickets"></i>自述</h1>
      <article>
        <caption>README.md</caption>
        <div class="content">
          <h1>manage-system</h1>
          <p >基于Vue.js 2.x系列 + Element UI 的后台管理系统解决方案</p>
          <h1>前言</h1>
          <p>之前在公司用了Vue + Element组件库做了个后台管理系统，基本很多组件可以直接引用组件库的，但是也有一些需求无法满足。像图片裁剪上传、富文本编辑器、图表等这些在后台管理系统中很常见的功能，就需要引用其他的组件才能完成。从寻找组件，到使用组件的过程中，遇到了很多问题，也积累了宝贵的经验。所以我就把开发这个后台管理系统的经验，总结成这个后台管理系统解决方案。

该方案作为一套多功能的后台框架模板，适用于绝大部分的后台管理系统（Web Management System）开发。基于vue.js,使用vue-cli脚手架快速生成项目目录，引用Element UI组件库，方便开发快速简洁好看的组件。分离颜色样式，支持手动切换主题色，而且很方便使用自定义主题色。</p>
          <h1>功能</h1>
          <ul>
            <li>
              
              <el-checkbox checked disabled></el-checkbox><span>Element UI</span>
            </li>
            <li>
              <el-checkbox checked disabled></el-checkbox><span>登录/注销</span>
            </li>
            <li>
              <el-checkbox checked disabled></el-checkbox><span>表格</span>
            </li>
            <li>
              <el-checkbox checked disabled></el-checkbox><span>表单</span>
            </li>
            <li>
              <el-checkbox checked disabled></el-checkbox><span>图表</span>
            </li>
            <li>
              <el-checkbox checked disabled></el-checkbox><span>富文本编辑器</span>
            </li>
            <li>
             <el-checkbox checked disabled></el-checkbox><span>markdown编辑器</span>
            </li>
            <li>
              <el-checkbox checked disabled></el-checkbox><span>图片拖拽/剪辑上传</span>
            </li>
            <li>
              <el-checkbox checked disabled></el-checkbox><span>列表拖拽排序</span>
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


