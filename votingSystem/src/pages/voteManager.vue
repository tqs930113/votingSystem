<template>
  <div class="base-table layout">
    <nav>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/voteManager' }"><i class="el-icon-document"></i>投票管理</el-breadcrumb-item>
      </el-breadcrumb>
    </nav>
    <div class="tool-bar">
      <div class="tool-bar-btns">
        <el-badge :value="12" class="item control ">
          <el-button @click="createNewVote" class="control " size='small' id="createVote"  icon="el-icon-circle-plus-outline" type="primary">新建投票</el-button>
        </el-badge>
        <el-badge :value="12" class="item control ">
          <el-button  class="control" size='small' id="editVote" @click="editVote"  icon="el-icon-edit" type="primary">修改投票</el-button>
        </el-badge>
        <el-button  class="control " @click="startVote" size='small' id="startVote" icon="el-icon-upload2" type="primary">发布投票</el-button>
        <el-button  class="control " @click="stopVote" size='small' id="stopVote" icon="el-icon-remove-outline" type="primary">停止投票</el-button>
        <el-button class="control "  @click="itemsDelete" size='small' id="deleteVote" type="danger" icon="el-icon-delete" >批量删除</el-button>
      </div>
      <div class="tool-bar-others">
        <el-select class="control"   @change="handleChange" v-model="classifications" filterable placeholder="投票状态">
          <el-option
            v-for="item in classificationsOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :command="item.label">
          </el-option>
        </el-select>
        <div class="search">
          <el-input class="control input" @keyup.enter.native="search" placeholder="请输入投票名称关键词" clearable v-model="searchKeyWord" ></el-input>
          <el-button class="control"  @click="search" type="primary" icon="el-icon-search" >搜索</el-button>
        </div>
      </div>
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
        style="width: 100%"
        @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="40">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="title"
            label="投票活动名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="published"
            label="是否发布"
            width="80">
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="创建日期"
            width="105"
            sortable>
          </el-table-column>
          <el-table-column
            prop="beginTime"
            label="开始时间"
            width="105"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="结束时间"
            width="105"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="activityState"
            label="状态"
            width="80">
          </el-table-column>
          <el-table-column 
            width="180"
            label="操作">
            <template slot-scope="scope">
              <el-badge :value="12" class="editVoteItems">
                <el-button
                  size="mini"
                  type="text"
                  @click="handleEdit(scope.$index, scope.row)">修改投票项</el-button>
              </el-badge>
              <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)">统计</el-button>
            </template>   
          </el-table-column>
        </el-table>
        <!-- <div style="margin-top: 20px">
          <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
        </div> -->
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
import API from '../assets/js/API'
const api = new API()
var params = {
  url: '/colife/activity/vote?pageNumber=1&pageSize=20',
  datas: {}
}
var ajaxResultStatus = false // 获取ajax获取数据时的异步状态

export default {
  beforeMount () {
    this.initDatas()
  },
  methods: {
    initDatas () {
      params.url = '/colife/activity/vote?pageNumber=1&pageSize=10'
      params.datas = {}
      this.loading = true
      const obj = this
      var errMsg = '投票活动列表初始化失败，请刷新重试！'
      this.ajaxMethod(obj, params, errMsg, 'all')
    },
    // 异步获取数据的方法
    ajaxMethod (obj, params, errMsg, handleObj) {
      api.get(params)
      .then(function (res) {
        let result = res.data
        // 渲染表格数据
        obj.tableData = []
        result.data.content.forEach(element => {
          let tempObj = {}
          tempObj = element
          if (element.objId) {
            // -活动ID
            tempObj.voteId = element.objId
          }
          if (element.createTime) {
            // -活动创建时间
            tempObj.createDate = api.formatDate(element.createTime, '-', false).split(' ')[0]
          }
          if (element.beginTime) {
            // -活动开始时间
            tempObj.beginTime = api.formatDate(element.beginTime, '-', false).split(' ')[0]
          }
          if (element.endTime) {
            // -活动结束时间
            tempObj.endTime = api.formatDate(element.endTime, '-', false).split(' ')[0]
          }
          if (element.title) {
            // -活动名称
            tempObj.voteTitle = element.title
          }
          // -活动状态
          tempObj.activityState = obj.switchStutsNumToStr(element.activityState)
          // -活动发布状态
          tempObj.published = element.published === 0 ? '未发布' : '已发布'
          obj.tableData.push(tempObj)
        })
        // 渲染分页数据
        obj.page.total = result.data.totalElements
        obj.page.pageSize = result.data.size
        obj.page.totalPages = result.data.totalPages
        obj.page.currentPage = result.data.number + 1
        // if (obj.classificationsOptions.length > 0) {
        //   handleObj = 'forbidden'
        // }
        // if (handleObj === obj.classificationsOptions || handleObj === 'all') {
        //   // 渲染下拉框数据
        //   obj.classificationsOptions = []
        //   obj.classificationsOptions = result.classificationsOptions
        // }
        // 取消加载遮罩层
        obj.loading = false
        ajaxResultStatus = true
      })
      .catch(function (err) {
        if (err) {
          console.log(err)
        }
        obj.loading = false
        // 弹出加载失败提示
        api.reqFail(obj, errMsg)
        ajaxResultStatus = false
      })
      return ajaxResultStatus
    },
    ajaxMethodDelete (that, params, errMsg, handleObj) {
      api.delete(params)
      .then(function (res) {
        that.loading = false
        that.initDatas()
      })
      .catch(function (err) {
        that.loading = false
        console.log(err)
      })
    },
    switchStutsNumToStr (key) {
      // 处理活动状态数字转换成文字
      var result = ''
      switch (key) {
        case -1:
          result = '全部'
          break
        case 1:
          result = '未开始'
          break
        case 2:
          result = '进行中'
          break
        case 3:
          result = '已结束'
          break
      }
      return result
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    editVote () {
      // 修改投票
      var id = ''
      if (this.multipleSelection.length === 0) {
        api.reqFail(this, '未选中活动，请至少选择一项')
        return false
      }
      if (this.multipleSelection.length > 1) {
        api.reqFail(this, '仅能选一项进行修改')
        return false
      }
      id = this.multipleSelection[0].voteId
      this.$router.push(`/editVote/editVote/${id}`)
    },
    handleEdit (index, row) {
      // 修改投票项
      var id = row.objId
      this.$router.push(`/editVote/editVoteItems/${id}`)
    },
    handleDelete (index, row) {
      // 删除单条记录
      params.datas = {}
      params.url = `/colife/activity/vote?objIds=${row.voteId}`
      let that = this
      this.loading = true
      var errMsg = '删除数据失败'
      this.ajaxMethodDelete(that, params, errMsg)
    },
    modifyVoteOpenOrClose (open) {
      var errMsg = ''
      var published = ''
      if (open) {
        params.url = '/colife/activity/vote/publish' // 发布投票活动的地址
        errMsg = '发布投票活动操作失败'
        published = '已发布'
      } else {
        params.url = '/colife/activity/vote/unpublish' // 停止投票活动的地址
        errMsg = '停止投票活动操作失败'
        published = '未发布'
      }
      var ids = ''
      for (const key in this.multipleSelection) {
        ids += this.multipleSelection[key].voteId
        ids += ','
      }
      ids = ids.substring(0, ids.length - 1)
      if (!this.multipleSelection > 0) {
        api.reqFail(this, '未选中活动，请至少选择一项')
        return false
      }
      params.datas = {}
      ids = '?objIds=' + ids
      params.url += ids
      var obj = this
      api.get(params)
      .then(function (res) {
        // 当发布或者停止成功的时候改变选中项的状态
        obj.multipleSelection.forEach(element => {
          const index = obj.tableData.indexOf(element)
          obj.tableData[index].published = published
        })
        ajaxResultStatus = true
      })
      .catch(function (err) {
        if (err) {
          console.log(err)
        }
        obj.loading = false
        // 弹出加载失败提示
        api.reqFail(obj, errMsg)
        ajaxResultStatus = false
      })
      return ajaxResultStatus
    },
    startVote () {
      // 发布投票活动
      var message = ''
      if (this.modifyVoteOpenOrClose(true)) {
        message = `成功发布选中投票活动`
        this.$message({
          showClose: true,
          message: message,
          type: 'warning'
        })
      }
    },
    stopVote () {
      // 停止投票活动
      var message = ''
      if (this.modifyVoteOpenOrClose(false)) {
        message = `成功停止选中投票活动`
        this.$message({
          showClose: true,
          message: message,
          type: 'warning'
        })
      }
    },
    itemsDelete () {
      // 批量删除
      var ids = ''
      for (const key in this.multipleSelection) {
        ids += this.multipleSelection[key].voteId
        ids += ','
      }
      ids = ids.substring(0, ids.length - 1)
      if (!this.multipleSelection > 0) {
        api.reqFail(this, '未选中活动，请至少选择一项')
        return false
      }
      params.datas = {}
      params.url = `/colife/activity/vote?objIds=${ids}`
      let that = this
      var errMsg = '批量删除数据失败'
      that.loading = true
      this.ajaxMethodDelete(that, params, errMsg)
    },
    // 下拉框点击触发分类过滤事件
    handleChange (val) {
      this.loading = true
      params = {}
      params.url = `/colife/activity/vote?activityState=${val}&pageNumber=${this.page.currentPage}&pageSize=${this.page.pageSize}`
      let that = this
      var errMsg = '刷新投票活动列表失败'
      this.ajaxMethod(that, params, errMsg)
    },
    // 分页触发事件
    handleSizeChange (val) {
      // 当切换pagesize大小时触发，请求数据并重新渲染
      this.loading = true
      this.page.pageSize = val
      params = {}
      params.datas = {}
      params.url = `/colife/activity/vote?pageNumber=${this.page.currentPage}&pageSize=${this.page.pageSize}`
      let that = this
      var errMsg = '刷新投票活动列表失败'
      this.ajaxMethod(that, params, errMsg)
    },
    handleCurrentChange (val) {
      // 当切换当前页索引时大小时触发，请求数据并重新渲染
      this.loading = true
      this.page.currentPage = val
      params = {}
      params.datas = {}
      params.url = `/colife/activity/vote?pageNumber=${this.page.currentPage}&pageSize=${this.page.pageSize}`
      let that = this
      var errMsg = '刷新投票活动列表失败'
      this.ajaxMethod(that, params, errMsg)
    },
    // 检索关键词重新渲染表格
    search () {
      if ((this.searchKeyWord).replace(/(^\s*)|(\s*$)/ig, '') === '') {
        api.reqFail(this, '关键词不能为空')
        return false
      }
      this.loading = true
      params.datas = {}
      params.url = `/colife/activity/vote?name=${this.searchKeyWord}&pageNumber=${this.page.currentPage}&pageSize=${this.page.pageSize}`
      let that = this
      var errMsg = '搜索失败，请稍后重试'
      this.ajaxMethod(that, params, errMsg)
    },
    // 新建投票活动
    createNewVote () {
      this.$router.push('/createNewItem')
    }
  },
  data () {
    return {
      loading: true,
      // 分页数据字段
      page: {
        total: 100,
        pageSizeOptions: [5, 10, 25, 50, 100, 200],
        pageSize: 15,
        currentPage: 1
      },
      // 下拉框投票活动分类数据
      classificationsOptions: [
        {
          'value': -1,
          'label': '全部'
        },
        {
          'value': 1,
          'label': '未开始'
        },
        {
          'value': 2,
          'label': '进行中'
        },
        {
          'value': 3,
          'label': '已结束'
        }
      ],
      classifications: '',
      // 检索关键字
      searchKeyWord: '',
      // 投票活动表格数据
      tableData: [
        //  投票活动列表共计5列
      ],
      multipleSelection: [
        //  多选时已选中的项
      ]
    }
  }
}
</script>
<style scoped>
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
  float: right;
}
.base-table .tool-bar::after{
  content: " ";
  display: block;
  clear: both;
  zoom: 1;
}
.base-table .tool-bar .control{
  float: left;
  margin-right: 10px;
}
.base-table .tool-bar .input{
  width:220px;
}
.base-table .table{
  margin-top: 20px;
}
.base-table .table .tabel-header{
  background-color:#eef1f6;
} 
.base-table .pagination{
  margin-top:20px;
  text-align: right;
}
</style>

