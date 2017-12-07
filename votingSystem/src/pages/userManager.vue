<template>
  <div class="charts layout">
    <nav>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/userManager' }"><i class="el-icon-picture"></i>用户权限管理</el-breadcrumb-item>
      </el-breadcrumb>
    </nav>
    <div class="plugins-tips">
            echarts的图表组件。
            访问地址：<a href="http://echarts.baidu.com/index.html" target="_blank">echarts</a>
    </div>
    <div class="container">
        <div class="wrap">
            <h2>柱状图</h2>
            <div class="bar-graph">
                <div id="bar-graph" :style="{height:'400px'}">
                </div>
            </div>
        </div>
        <div class="wrap">
            <h2>饼图</h2>
            <div class="pie">
              <div id="pie" :style="{height:'400px'}">
              </div>
            </div>
        </div>
        <div class="wrap">
            <h2>折线图</h2>
            <div class="line-chart">
              <div id="line-chart" :style="{height:'400px'}"></div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'barGraph',
  data () {
    return {
      barOptions: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      },
      pieOptions: {
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data: [
              {value: 235, name: '网站广告'},
              {value: 400, name: '搜索引擎'},
              {value: 100, name: '他人推荐'},
              {value: 300, name: '链接跳转'},
              {value: 50, name: '随意点击'}
            ]
          }
        ]
      },
      lineOptions: {
        title: {
          text: '游客访问情况',
          subtext: '纯属虚构'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['主页访问量', 'APP访问量', '博客访问量']
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {show: true}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '主页访问量',
            type: 'line',
            smooth: true,
            data: [1000, 20000, 15000, 2000, 12000, 3219, 12344]
          },
          {
            name: 'APP访问量',
            type: 'line',
            smooth: true,
            data: [2000, 10000, 5000, 12000, 5000, 6219, 9344]
          },
          {
            name: '博客访问量',
            type: 'line',
            smooth: true,
            data: [8000, 13000, 9000, 2000, 6000, 11219, 344]
          }
        ]
      }
    }
  },
  mounted () {
    var createCharts = (container, chartsId, options) => {
      var barGraph = this.$echarts.init(document.getElementById(chartsId))
      var bar = document.getElementById('bar-graph')
      bar.style.width = container.clientWidth + 'px'
      barGraph.setOption(options)
    }
    //  柱状图
    var barId = 'bar-graph'
    var container = document.getElementsByClassName('bar-graph')[0]
    createCharts(container, barId, this.barOptions)
    //  饼图
    var pieId = 'pie'
    var pieContainer = document.getElementsByClassName('pie')[0]
    createCharts(pieContainer, pieId, this.pieOptions)
    // 折线图
    var lineId = 'line-chart'
    var lineContainer = document.getElementsByClassName('line-chart')[0]
    createCharts(lineContainer, lineId, this.lineOptions)
  }
}
</script>

<style>
.charts .plugins-tips{
    background-color:#eef1f6;
    text-align: left;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
}
.charts .plugins-tips a{
    text-decoration: none;
    color:#20a0ff;
}
.charts .bar-graph{
    margin: 0 auto;
    width: 80%;
}
</style>

