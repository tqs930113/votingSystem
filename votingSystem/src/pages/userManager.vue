<template>
  <div class="userManage layout">
    <nav>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/userManager' }"><i class="el-icon-menu"></i>用户权限管理</el-breadcrumb-item>
      </el-breadcrumb>
    </nav>
      <div class="tool-bar">
      <div class="tool-bar-btns">
         <el-button  class="control " size='small' id="createUser"  @click="createNewUser" icon="el-icon-circle-plus-outline" type="primary">新建用户</el-button>
        <!-- <el-button  class="control" size='small' id="editUser"   icon="el-icon-edit" type="primary">修改用户</el-button> -->
        <el-button  class="control " size='small' id="activateUser" icon="el-icon-upload2" type="primary">激活用户</el-button>
        <el-button  class="control " size='small' id="stopUser" icon="el-icon-remove-outline" type="primary">停用用户</el-button>
        <el-button class="control "   size='small' id="deleteUsers" type="danger" @click="itemsDelete" icon="el-icon-delete" >批量删除</el-button>
      </div>
      <div class="tool-bar-others">
        <el-select class="control"   @change="handleChange" v-model="classifications" filterable placeholder="用户状态">
          <el-option
            v-for="item in classificationsOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :command="item.label">
          </el-option>
        </el-select>
        <div class="search">
          <el-input class="control input" @keyup.enter.native="search" placeholder="请输入用户关键词" clearable v-model="searchKeyWord" ></el-input>
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
          prop="username"
          label="用户名"
          show-overflow-tooltip>
          </el-table-column>
           <el-table-column
          prop="nickname"
          label="用户昵称"
          width="150"
          show-overflow-tooltip>
          </el-table-column>
          <el-table-column
           width="100"
          prop="isAdmin"
          label="是否管理员"
          show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建日期"
            width="105"
            sortable
            >
          </el-table-column>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="50">
          </el-table-column>
          <el-table-column 
            width="180"
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)">设置为管理员</el-button>
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
    <!-- 创建用户弹出框 -->
    <el-dialog title="注册用户" width="30%" :visible.sync="dialogFormVisible" :modal-append-to-body = "false">
      <el-form :model="userform" ref="userform">
        <el-form-item label="用户名：" :label-width="formLabelWidth"
        prop="username"
        :rules="[
          { required: true, message: '用户名必填', trigger: 'blur' }
        ]">
          <el-input v-model="userform.username" auto-complete placeholder="请输入用户名" ></el-input>
        </el-form-item>
        <el-form-item label="昵称：" :label-width="formLabelWidth">
          <el-input v-model="userform.nickname" placeholder="请输入昵称" auto-complete></el-input>
        </el-form-item>
        <el-col :span="2">
          <el-form-item label="是否管理员：" :label-width="formLabelWidth">
            <el-switch
              v-model="userform.isAdmin"
              active-value='1'
              inactive-value='0'>
            </el-switch>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUserForm">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import API from '../assets/js/API'
import systemConfig from '../assets/js/systemConfig'
const api = new API()
var params = {
  url: '',
  datas: {}
}
var ajaxResultStatus = false // 获取ajax获取数据时的异步状态

export default {
  beforeMount () {
    this.initDatas()
    this.classificationsOptions = this.initClassificationsOptions()
  },
  methods: {
    initDatas () {
      params.url = `${systemConfig.requestUrlConfig.userManagerRequestUrlConfig.list}?pageNumber=1&pageSize=10`
      params.datas = {}
      this.loading = true
      const obj = this
      var errMsg = '用户列表初始化失败，请刷新重试！'
      this.ajaxMethod(obj, params, errMsg, 'all')
    },
    // 下拉框用户状态分类数据
    initClassificationsOptions () {
      var arr = []
      var obj = systemConfig.numToStr.userManagerNumToStr.userStatus
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          var tempObj = {}
          tempObj.value = key
          tempObj.label = obj[key]
          arr.push(tempObj)
        }
      }
      return arr
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
          var objConfig = systemConfig.numToStr.userManagerNumToStr
          var isAdminConfig = objConfig.isAdmin
          var userStatus = objConfig.userStatus
          if (element.objId) {
            // -用户ID
            tempObj.objId = element.objId
          }
          if (element.createTime) {
            // -用户创建时间
            tempObj.createTime = api.formatDate(element.createTime, '-', false).split(' ')[0]
          }
          if (element.nickname) {
            // -用户昵称
            tempObj.nickname = element.nickname
          }
          // -是否管理员
          tempObj.isAdmin = isAdminConfig[element.isAdmin]
          if (element.username) {
            // -用户名称
            tempObj.username = element.username
          }
          // -用户状态
          tempObj.status = userStatus[element.status]
          obj.tableData.push(tempObj)
        })
        // 渲染分页数据
        obj.page.total = result.data.totalElements
        obj.page.pageSize = result.data.size
        obj.page.totalPages = result.data.totalPages
        obj.page.currentPage = result.data.number + 1
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
        if (res.data.state !== '000000') {
          api.reqSuccess(that, res.data.message)
          return false
        }
        that.initDatas()
      })
      .catch(function (err) {
        that.loading = false
        console.log(err)
      })
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
    editUser () {
      // 修改用户
      var id = ''
      if (this.multipleSelection.length === 0) {
        api.reqFail(this, '未选中用户，请至少选择一项')
        return false
      }
      if (this.multipleSelection.length > 1) {
        api.reqFail(this, '仅能选一项进行修改')
        return false
      }
      id = this.multipleSelection[0].objId
      this.$router.push(`/editVote/editVote/${id}`)
    },
    handleEdit (index, row) {
      // 修改用户
      var id = row.objId
      this.$router.push(`/editVote/editVoteItems/${id}`)
    },
    handleDelete (index, row) {
      // 删除单条记录
      params.datas = {}
      params.url = `${systemConfig.requestUrlConfig.userManagerRequestUrlConfig.delete}?objIds=${row.objId}`
      let that = this
      this.loading = true
      var errMsg = '删除数据失败'
      this.ajaxMethodDelete(that, params, errMsg)
    },
    modifyUserOpenOrClose (open) {
      var errMsg = ''
      var published = ''
      if (open) {
        params.url = '/colife/activity/vote/publish' // 激活用户的地址
        errMsg = '启用用户操作失败'
        published = '已发布'
      } else {
        params.url = '/colife/activity/vote/unpublish' // 停用用户用户的地址
        errMsg = '停用用户操作失败'
        published = '未发布'
      }
      var ids = ''
      for (const key in this.multipleSelection) {
        ids += this.multipleSelection[key].objId
        ids += ','
      }
      ids = ids.substring(0, ids.length - 1)
      if (!this.multipleSelection > 0) {
        api.reqFail(this, '未选中用户，请至少选择一项')
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
    startUser () {
      // 启用用户
      var message = ''
      if (this.modifyUserOpenOrClose(true)) {
        message = `成功启用选中用户`
        this.$message({
          showClose: true,
          message: message,
          type: 'warning'
        })
      }
    },
    stopUser () {
      // 停用用户
      var message = ''
      if (this.modifyUserOpenOrClose(false)) {
        message = `成功停用选中用户`
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
        ids += this.multipleSelection[key].objId
        ids += ','
      }
      ids = ids.substring(0, ids.length - 1)
      if (!this.multipleSelection > 0) {
        api.reqFail(this, '未选中用户，请至少选择一项')
        return false
      }
      params.datas = {}
      params.url = `${systemConfig.requestUrlConfig.userManagerRequestUrlConfig.delete}?objIds=${ids}`
      let that = this
      var errMsg = '批量删除数据失败'
      that.loading = true
      this.ajaxMethodDelete(that, params, errMsg)
    },
    // 下拉框点击触发分类过滤事件
    handleChange (val) {
      this.loading = true
      params = {}
      params.url = `${systemConfig.requestUrlConfig.userManagerRequestUrlConfig.list}?status=${val}&pageNumber=${this.page.currentPage}&pageSize=${this.page.pageSize}`
      let that = this
      var errMsg = '刷新用户列表失败'
      this.ajaxMethod(that, params, errMsg)
    },
    // 分页触发事件
    handleSizeChange (val) {
      // 当切换pagesize大小时触发，请求数据并重新渲染
      this.loading = true
      this.page.pageSize = val
      params = {}
      params.datas = {}
      params.url = `${systemConfig.requestUrlConfig.userManagerRequestUrlConfig.list}?pageNumber=${this.page.currentPage}&pageSize=${this.page.pageSize}`
      let that = this
      var errMsg = '刷新用户列表失败'
      this.ajaxMethod(that, params, errMsg)
    },
    handleCurrentChange (val) {
      // 当切换当前页索引时大小时触发，请求数据并重新渲染
      this.loading = true
      this.page.currentPage = val
      params = {}
      params.datas = {}
      params.url = `${systemConfig.requestUrlConfig.userManagerRequestUrlConfig.list}?pageNumber=${this.page.currentPage}&pageSize=${this.page.pageSize}`
      let that = this
      var errMsg = '刷新用户列表失败'
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
      params.url = `${systemConfig.requestUrlConfig.userManagerRequestUrlConfig.list}?username=${this.searchKeyWord}&pageNumber=${this.page.currentPage}&pageSize=${this.page.pageSize}`
      let that = this
      var errMsg = '搜索失败，请稍后重试'
      this.ajaxMethod(that, params, errMsg)
    },
    // 新建用户
    createNewUser () {
      this.dialogFormVisible = true
    },
    // 提交新建用户表单
    submitUserForm () {
      var that = this
      that.$refs['userform'].validate(function (valid) {
        if (valid) {
          var params = {}
          params.url = `${systemConfig.requestUrlConfig.userManagerRequestUrlConfig.add}`
          params.datas = {}
          params.datas.username = that.userform.username
          params.datas.nickname = that.userform.nickname
          params.datas.isAdmin = that.userform.isAdmin
          api.post(params)
          .then(function (res) {
            that.initDatas()
            that.dialogFormVisible = false
          })
          .catch(function (err) {
            console.log(err)
            api.reqFail(that, '新建用户失败，请稍后再试')
          })
        } else {
          api.reqFail(that, '新建用户表单验证未通过')
        }
      })
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
      // 下拉框分类
      classificationsOptions: [],
      classifications: '',
      // 检索关键字
      searchKeyWord: '',
      // 用户表单数据
      userform: {
        username: '',
        nickname: '',
        isAdmin: 0
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      // 用户表格数据
      tableData: [
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