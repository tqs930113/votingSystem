<template>
  <div class="userManage layout">
    <nav>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/userManager' }"><i class="el-icon-menu"></i>用户权限管理</el-breadcrumb-item>
      </el-breadcrumb>
    </nav>
      <div class="tool-bar">
      <div class="tool-bar-btns">
         <el-button  class="control " size='small' id="createUser"  icon="el-icon-circle-plus-outline" type="primary">新建用户</el-button>
        <!-- <el-button  class="control" size='small' id="editUser"   icon="el-icon-edit" type="primary">修改用户</el-button> -->
        <el-button  class="control " size='small' id="activateUser" icon="el-icon-upload2" type="primary">激活用户</el-button>
        <el-button  class="control " size='small' id="stopUser" icon="el-icon-remove-outline" type="primary">停用用户</el-button>
        <el-button class="control "   size='small' id="deleteUsers" type="danger" icon="el-icon-delete" >批量删除</el-button>
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
          prop="voteTitle"
          label="用户"
          show-overflow-tooltip>
          </el-table-column>
           <el-table-column
          prop="contact"
          label="联系方式"
          width="150"
          show-overflow-tooltip>
          </el-table-column>
          <el-table-column
           width="50"
          prop="gender"
          label="性别"
          show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="修改日期"
            width="105"
            sortable
            >
          </el-table-column>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="80">
          </el-table-column>
          <el-table-column 
            width="50"
            label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click"  @command="handleEdit">
                <span class="el-dropdown-link">
                  <i class="el-icon-more el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item  :command="{ index: scope.$index,row: scope.row,method: 'editUser'}">修改用户</el-dropdown-item>
                  <el-dropdown-item  :command="{ index: scope.$index,row: scope.row,method: 'deleteUser'}">删除</el-dropdown-item>
                  <el-dropdown-item  :command="{ index: scope.$index,row: scope.row,method: 'stopUser'}">停用</el-dropdown-item>
                  <el-dropdown-item  :command="{ index: scope.$index,row: scope.row,method: 'activateUser'}">启用</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>   
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
  </div>
</template>
<script>
import API from '../api/API'
const api = new API()
var params = {
  url: '',
  datas: {}
}
var ajaxResultStatus = false // 获取ajax获取数据时的异步状态

export default {
  beforeMount () {
    this.loading = true
    const obj = this
    var errMsg = '投票活动列表初始化失败，请刷新重试！'
    this.ajaxMethod(obj, params, errMsg, 'all')
  },
  methods: {
    // 异步获取数据的方法
    ajaxMethod (obj, params, errMsg, handleObj) {
      api.get(params)
      .then(function (res) {
        let result = res.data
        // console.log(result)
        // 渲染表格数据
        obj.tableData = result.data
        // 渲染分页数据
        obj.page.total = result.pagination.total
        obj.page.pageSize = result.pagination.per_page
        if (obj.classificationsOptions.length > 0) {
          handleObj = 'forbidden'
        }
        if (handleObj === obj.classificationsOptions || handleObj === 'all') {
          // 渲染下拉框数据
          obj.classificationsOptions = []
          obj.classificationsOptions = result.classificationsOptions
        }
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
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleEvents (obj) {
      var eventName = obj.method
      switch (eventName) {
        case 'editUser':
          this.handleEdit(obj.index, obj.row)
          break
        case 'deleteUser':
          this.handleDelete(obj.index, obj.row)
          break
        case 'stopUser':
          this.handleStop(obj.index, obj.row)
          break
        case 'activateUser':
          this.handleActivate(obj.index, obj.row)
          break
      }
    },
    handleEdit (index, row) {
      // 编辑单条用户
      console.log(index, row)
      this.$message({
        showClose: true,
        message: `编辑第${index}行`,
        type: 'success'
      })
    },
    handleDelete (index, row) {
      // 删除单条记录
      // console.log(index, row)
      params.datas = {}
      params.datas.voteId = row.voteId
      params.url = '/static/voteData.1.json'
      let that = this
      var errMsg = '删除数据失败'
      var message = ''
      console.log(this.ajaxMethod(that, params, errMsg))
      if (this.ajaxMethod(that, params, errMsg)) {
        message = `删除第${index + 1}行`
      } else {
        message = `删除第${index + 1}行数据失败`
      }
      this.$message({
        showClose: true,
        message: message,
        type: 'warning'
      })
    },
    handleStop (index, row) {
      //  停用单行用户

    },
    handleActivate (index, row) {
      //  激活单行用户
    },
    modifyVoteOpenOrClose (open) {
      var errMsg = ''
      if (open) {
        params.url = '/static/voteData.json' // 发布投票活动的地址
        errMsg = '发布投票活动操作失败'
      } else {
        params.url = '/static/voteData.json' // 停止投票活动的地址
        errMsg = '停止投票活动操作失败'
      }
      var ids = ''
      for (const key in this.multipleSelection) {
        ids += this.multipleSelection[key].voteId
        ids += ','
      }
      if (!ids.length > 0) {
        return false
      }
      params.datas = {}
      params.datas.voteId = ids
      var obj = this
      api.get(params)
      .then(function (res) {
        // 当发布或者停止成功的时候改变选中项的状态
        console.log(obj.tableData.indexOf(obj.multipleSelection[0]))
//
//  此处还需要 ：根据res返回的结果集，判定是否可以将在obj.multipleSelection这个数组中的对象，
//  对应到obj.tableData数组中 相应对象设置status的值
//
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
      } else {
        message = `发布选中投票活动失败，请稍后再试`
      }
      this.$message({
        showClose: true,
        message: message,
        type: 'warning'
      })
    },
    stopVote () {
      // 停止投票活动
      var message = ''
      if (this.modifyVoteOpenOrClose(true)) {
        message = `成功停止选中投票活动`
      } else {
        message = `停止选中投票活动失败，请稍后再试`
      }
      this.$message({
        showClose: true,
        message: message,
        type: 'warning'
      })
    },
    itemsDelete () {
      // 批量删除
      var ids = ''
      for (const key in this.multipleSelection) {
        ids += this.multipleSelection[key].voteId
        ids += ','
      }
      ids = ids.substring(0, ids.length - 1)
      params.datas = {}
      params.datas.voteId = ids
      params.url = '/static/voteData.1.json'
      let that = this
      var errMsg = '删除数据失败'
      var message = ''
      if (this.ajaxMethod(that, params, errMsg)) {
        message = `批量删除失败`
      } else {
        message = `批量删除成功`
      }
      this.$message({
        showClose: true,
        message: message,
        type: 'warning'
      })
    },
    // 下拉框点击触发分类过滤事件
    handleChange (val) {
      this.loading = true
      params = {}
      params.url = '/static/voteDataClassifictions.json'
      params.datas = {}
      params.datas.currentPage = this.page.currentPage
      params.datas.perPageSize = this.page.pageSize
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
      params.datas.perPageSize = val
      params.url = '/static/voteDataPerPageSize.json'
      params.datas.currentPage = 1
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
      params.url = '/static/voteData.1.json'
      params.datas.currentPage = val
      let that = this
      var errMsg = '刷新投票活动列表失败'
      this.ajaxMethod(that, params, errMsg)
    },
    // 检索关键词重新渲染表格
    search (el) {
      params.datas = {}
      params.url = '/static/voteData.1.json'
      params.datas.keyWord = this.searchKeyWord
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
      // 下拉框数据
      classificationsOptions: [],
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
  text-align: left;
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
.userManage .tool-bar::after{
  content: " ";
  display: block;
  clear: both;
  zoom: 1;
}
.userManage .tool-bar .control{
  float: left;
  margin-right: 10px;
}
.userManage .tool-bar .input{
  width:240px;
}
.userManage .table{
  margin-top: 20px;
}
.userManage .table .tabel-header{
  background-color:#eef1f6;
} 
.userManage .pagination{
  margin-top:20px;
  text-align: right;
}
.el-dropdown-link{
  color: #409EFF;
  text-align: center;
  cursor: pointer;
}
</style>