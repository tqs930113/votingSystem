<template>
    <div>
      <el-menu
      router
      unique-opened
      :default-active="onRouted"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">

      <template v-for="item in items">
          <template v-if="item.hasOwnProperty('children')">
            <el-submenu :key="item.id" :index="item.index">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.label}}</span>
                </template>
                <el-menu-item v-for="subItem in item.children" :key="subItem.index" :index="subItem.index">
                    {{subItem.label}}
                </el-menu-item>
            </el-submenu> 
          </template>
          <template v-else>
            <el-menu-item :key="item.id" :index="item.index">
                <i :class="item.icon"></i>
                <span slot="title">{{item.label}}</span>
            </el-menu-item>
          </template>
      </template>
     </el-menu>
    </div>
</template>
<script>
export default {
  data () {
    return {
      filterText: '',
      items: [
        {
          id: 2,
          label: '自述',
          index: '/about',
          icon: 'el-icon-tickets'
        },
        {
          id: 1,
          label: '投票管理',
          index: '/voteManager',
          icon: 'el-icon-document'
        },
        {
          id: 24,
          label: '用户权限管理',
          index: '/userManager',
          icon: 'el-icon-menu'
        },
        {
          id: 21,
          label: '配置管理',
          index: 'setting',
          icon: 'el-icon-setting',
          children: [
            {
              id: 22,
              label: '前台配置',
              index: 'webSetting'
            },
            {
              id: 23,
              label: '系统配置',
              index: 'systemSetting'
            }
          ]
        }
      ]
    }
  },
  watch: {
  },
  methods: {
    onClicked () {
      var val = '/about'
      this.$router.push(val)
    }
  },
  computed: {
    onRouted () {
      return this.$route.path.replace('/', '')
    }
  }

}
</script>

<style>
.el-menu{
    text-align: left;
    height: 100%;
}
.el-submenu .el-menu-item{
    padding-left: 60px;
}
.vouter-slider-bar{
    padding:10px 0;
    list-style-type: none;
}
.vouter-slider-bar > a{
    text-decoration:none;
}
.vouter-slider-bar > a:visited{
    color:black;
}
</style>

