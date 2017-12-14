<template>
    <header>
        <h2 class="logo">{{logoText}}</h2>
         <el-popover
            trigger="hover"
            ref="popover5"
            placement="bottom"
            width="100"
            v-model="visible2">
            <div style="text-align: center; margin: 0">
                <el-button type="primary" size="mini" @click="visible2 = false">退出</el-button>
            </div>
            </el-popover>
        <div class="account"  >
            <div class="logoutBlock"  v-popover:popover5></div>
            <div class="photo"></div> 
            <div class="user-name" id="userName">
               {{userName}}
            </div>
        </div>

    </header>
</template>
<script>
export default {
  data () {
    return {
      visible2: false
    }
  },
  computed: {
    userName () {
      return 'admin'
    },
    logoText () {
      return '网站投票管理系统'
    }
  }
}
</script>
<style>
header{
    width: 100%;
    overflow: hidden;
    background-color:#253042;
    position: fixed;
    top:0;
}
header::after{
    content:' ';
    display: block;
    width:100%;
    zoom: 1;
    clear: both;
}
header .logo{
    float: left;
    text-align: center;
    width: 20%;
    height: 80px;
    line-height:80px;
    color:whitesmoke
}
header .account{
    position: relative;
    float: right;
    height: 80px;
}
header .logoutBlock{
    width: 100%;
    height: 40px;
    top: 50%;
    margin-top: -20px;
    position: absolute;
}
header .photo{
    background:url('../assets/img/account.jpeg') no-repeat center center ;
    background-size: cover;
    float: left;
    width:40px;
    height: 40px;
    margin-top:-20px;
    position: relative;
    top:50%;
    border-radius:50%;
    background-color:white;
}
header .user-name{
    float: left;
    color:whitesmoke;
    width:100px;
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    margin-right: 20px;
}
</style>


