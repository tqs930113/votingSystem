<template>
  <div class="layout statisticalAnalysis">
    <nav>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/voteManager' }"><i class="el-icon-document"></i>投票管理</el-breadcrumb-item>
        <el-breadcrumb-item>统计分析</el-breadcrumb-item>
      </el-breadcrumb>
    </nav>
    <div class="tool-bar">
      <div class="tool-bar-btns">
        <div class="title left primary">{{voteTitle}} <span class="voteStatus" :style=" voteStatus === 3? 'color: #F56C6C':'color: #67C23A'">{{voteStatusStr}}</span></div>
          <!-- <el-button class="refresh" type="primary" @click="initData()">刷新</el-button> -->
      </div>
      <!-- <div class="tool-bar-others">
        <div class="search">
          <el-input class="search-input" @keyup.enter.native="search" placeholder="请输入投票名称关键词" clearable v-model="searchKeyWord" ></el-input>
          <el-button class="search-btn"  @click="search" type="primary" icon="el-icon-search" >搜索</el-button>
        </div>
      </div> -->
    </div> 
    <div class="table">
        <el-table
        v-loading="loading"
        :default-sort = "{prop: 'date', order: 'descending'}"
        border
        header-row-class-name="tabel-header"
        highlight-current-row
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="title"
            label="投票项名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="docUrl"
            label="原文地址"
            width="250">
          </el-table-column>
          <el-table-column
            prop="docId"
            label="文档ID"
            width="105"
            sortable>
          </el-table-column>
          <el-table-column
            prop="totalCount"
            label="投票数"
            width="105"
            sortable
            >
          </el-table-column>
        </el-table>
    </div>
    <div class="pagination">
       <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="page.pageSizeOptions"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import systemConfig from '../assets/js/systemConfig'
import API from '../assets/js/API'
const api = new API()
export default {
  beforeMount () {
    this.voteId = this.$route.params.voteId
    this.initTableData()
    this.initVoteInfo()
  },
  data () {
    return {
      // 检索关键字
      // searchKeyWord: '',
      // multipleSelection: '',
      loading: true,
      voteId: '',
      voteTitle: '',
      voteStatus: '',
      tableData: [],
      // 分页数据字段
      page: {
        pageSizeOptions: systemConfig.page.pageSizeOptions
      }
    }
  },
  computed: {
    voteStatusStr () {
      if (this.voteStatus.length <= 0) return ''
      return systemConfig.numToStr.voteManager.activityState[this.voteStatus] || ''
    }
  },
  methods: {
    ajaxMethod (that, params) {
      api.get(params)
      .then(function (res) {
        if (res.data.code !== '000000') {
          api.reqFail(that, systemConfig.tips.statisticalAnalysis.initTableErr)
          return false
        }
        that.tableData.length = 0
        res.data.datas.content.forEach(element => {
          // 初始化数据表格
          var tempObj = {}
          tempObj.title = element.title
          tempObj.docUrl = element.docUrl
          tempObj.docId = element.docId
          tempObj.totalCount = element.totalCount || 0
          that.tableData.push(tempObj)
        })
        // 渲染分页
        that.page.total = res.data.datas.totalElements
        that.page.pageSize = res.data.datas.size
        that.page.totalPages = res.data.datas.totalPages
        that.page.currentPage = res.data.datas.number
        that.loading = false
      })
      .catch(function (err) {
        that.loading = false
        console.log(err)
        api.reqFail(that, systemConfig.tips.statisticalAnalysis.initTableErr)
      })
    },
    initVoteInfo () {
      var that = this
      var params = {
        url: systemConfig.requestUrlConfig.voteManager.info.replace(/{objId}/, that.voteId),
        datas: {}
      }
      api.get(params)
      .then(function (res) {
        if (res.data.code !== '000000') {
          api.reqSuccess(that, systemConfig.tips.statisticalAnalysis.initVoteErr)
          return false
        }
        that.voteTitle = res.data.datas.title
        that.voteStatus = res.data.datas.activityState
      })
      .catch(function (err) {
        console.log(err)
        api.reqFail(that, systemConfig.tips.statisticalAnalysis.initVoteErr)
      })
    },
    initTableData () {
      var that = this
      that.loading = true
      var params = {
        url: `${systemConfig.requestUrlConfig.statisticalAnalysis.list.replace(/{objId}/, this.voteId)}?pageNumber=${systemConfig.page.currentPage}&pageSize=${systemConfig.page.pageSize}`,
        datas: {}
      }
      that.ajaxMethod(that, params)
    },
     // 分页触发事件
    handleSizeChange (val) {
      // 当切换pagesize大小时触发，请求数据并重新渲染
      this.loading = true
      this.page.pageSize = val
      var params = {}
      params.datas = {}
      params.url = `${systemConfig.requestUrlConfig.statisticalAnalysis.list.replace(/{objId}/, this.voteId)}?pageNumber=${this.page.currentPage}&pageSize=${this.page.pageSize}`
      let that = this
      this.ajaxMethod(that, params)
    },
    handleCurrentChange (val) {
      // 当切换当前页索引时大小时触发，请求数据并重新渲染
      this.loading = true
      this.page.currentPage = val
      var params = {}
      params.datas = {}
      params.url = `${systemConfig.requestUrlConfig.statisticalAnalysis.list.replace(/{objId}/, this.voteId)}?pageNumber=${this.page.currentPage}&pageSize=${this.page.pageSize}`
      let that = this
      this.ajaxMethod(that, params)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
    // 检索关键词重新渲染表格
    // search () {
    //   if ((this.searchKeyWord).replace(/(^\s*)|(\s*$)/ig, '') === '') {
    //     api.reqFail(this, '关键词不能为空')
    //     return false
    //   }
    //   this.loading = true
    //   params.datas = {}
    //   params.url = `/colife/activity/vote?name=${this.searchKeyWord}&pageNumber=${this.page.currentPage}&pageSize=${this.page.pageSize}`
    //   let that = this
    //   var errMsg = '搜索失败，请稍后重试'
    //   this.ajaxMethod(that, params, errMsg)
    // }
  }
}
</script>
<style scoped>
.voteStatus{
  font-size: 12px;
  padding-left: 15px;
  vertical-align: baseline;
}
.refresh{
  float: right;
}
.search-input{
  width: 70%;
}
.search-btn{
  width: 28%;
}
.tool-bar-btns,.tool-bar-others{
  padding: 10px 0 5px 0;
}
.tool-bar-btns::after,.tool-bar-others::after{
  width: 100%;
  content: " ";
  display: block;
  clear: both;
  zoom: 1;
}
.search{
  float: left;
}
statisticalAnalysis .tool-bar::after{
  content: " ";
  display: block;
  clear: both;
  zoom: 1;
}
.statisticalAnalysis .tool-bar .control{
  float: left;
  margin-right: 10px;
}
.statisticalAnalysis .tool-bar .input{
  width:220px;
}
.statisticalAnalysis .table{
  margin-top: 20px;
}
.statisticalAnalysis .table .tabel-header{
  background-color:#eef1f6;
} 
.statisticalAnalysis .pagination{
  margin-top:20px;
  text-align: right;
}
</style>

