<template>
  <div id="app">
     <router-view />
  </div>
</template>
<style>
html,body{
  height: 100%;
  min-height: 500px;
  min-width: 600px;
  overflow:  hidden;
}
*{
  margin: 0;
  padding:0;
  box-sizing:border-box;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.layout{
  padding:30px;
}
.layout nav{
  padding: 20px 0 ;
}
.layout nav i{
  padding-right: 5px;
  font-weight: bold;
}
.primary{
  color:#409EFF;
}
.info-bg{
  border-color: #878D99;
  background-color: #878D99;
}
.danger-bg{
  border-color: #FA5555;
  background-color: #FA5555;
}
.primary-bg{
  border-color: #409EFF;
  background-color: #409EFF;
}
.success-bg{
  border-color: #67C23A;
  background-color: #67C23A;
}
.warning-bg{
  border-color: #EB9E05;
  background-color: #EB9E05;
}
.tool-bar-btns .el-badge__content.is-fixed{
  right: 20px !important;
}
.editVoteItems {
    padding: 0 9px;
}
.editVoteItems .el-badge__content.is-fixed{
    border-radius: 50%;
    padding: 0;
    width: 20px;
    height: 20px;
    line-height: 20px;
    top: 1px;
    right: 17px;
}
.createNewItem .voteItems .voteItemBlock > label,
.editVote .voteItems .voteItemBlock > label{
  font-family: "STFangsong";
  font-size: 43px;
  font-style: italic;
  text-align: center;
}
.base-table .el-table td{
  padding: 5px 0;
}
.base-table .el-table__body-wrapper .cell{
  padding: 10px 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>