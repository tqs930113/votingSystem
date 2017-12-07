<template>
  <div class="base-table layout">
    <nav>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/voteManager' }"><i class="el-icon-menu"></i>投票管理</el-breadcrumb-item>
      </el-breadcrumb>
    </nav>
    <div class="tool-bar">
      <div class="tool-bar-btns">
        <el-badge :value="12" class="item control ">
          <el-button class="control " size='small' id="createVote"  icon="el-icon-circle-plus-outline" type="primary">新建投票</el-button>
        </el-badge>
        <el-badge :value="12" class="item control ">
          <el-button  class="control" size='small' id="editVote"   icon="el-icon-edit" type="primary">修改投票</el-button>
        </el-badge>
        <el-button  class="control "size='small' id="startVote" icon="el-icon-upload2" type="primary">发布投票</el-button>
        <el-button  class="control " size='small' id="stopVote" icon="el-icon-remove-outline" type="primary">停止投票</el-button>
        <el-button class="control " size='small' id="deleteVote" type="danger" icon="el-icon-delete" >批量删除</el-button>
      </div>
      <div class="tool-bar-others">
        <el-select class="control"   v-model="classifications" filterable placeholder="投票状态">
          <el-option
            v-for="item in classificationsOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="search">
          <el-input class="control input" placeholder="请输入投票名称关键词" clearable v-model="keyWord" ></el-input>
          <el-button class="control" type="primary" icon="el-icon-search" >搜索</el-button>
        </div>
      </div>
    </div>

    <div class="table">
        <el-table
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
          prop="content"
          label="投票活动名称"
          show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="创建日期"
            width="105"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="开始时间"
            width="105"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="结束时间"
            width="105"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="80">
          </el-table-column>
          <el-table-column 
            width="250"
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
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
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
      handleEdit (index, row) {
        console.log(index, row)
        this.$message({
          showClose: true,
          message: `编辑第${index + 1}行`,
          type: 'success'
        })
      },
      handleDelete (index, row) {
        console.log(index, row)
        this.$message({
          showClose: true,
          message: `删除第${index + 1}行`,
          type: 'warning'
        })
      }
    },
    data () {
      return {
        classificationsOptions: [{
          value: 'ongoing',
          label: '进行中'
        }, {
          value: 'votingEnd',
          label: '已结束'
        }, {
          value: 'notStarted',
          label: '未开始'
        }],
        classifications: '',
        keyWord: '',
        tableData: [{
          createDate: '2016-05-03',
          status: '王小虎',
          content: '上海市普陀区金沙江路 1518 弄11111111111111啊是的范德萨发范德萨撒范德萨发大发大发'
        }, {
          createDate: '2016-05-02',
          status: '王小虎',
          content: '上海市普陀区金沙江路 1518 弄'
        }, {
          createDate: '2016-05-04',
          status: '王小虎',
          content: '上海市普陀区金沙江路 1518 弄'
        }, {
          createDate: '2016-05-01',
          status: '王小虎',
          content: '上海市普陀区金沙江路 1518 弄'
        }, {
          createDate: '2016-05-08',
          status: '王小虎',
          content: '上海市普陀区金沙江路 1518 弄'
        }, {
          createDate: '2016-05-06',
          status: '王小虎',
          content: '上海市普陀区金沙江路 1518 弄'
        }, {
          createDate: '2016-05-07',
          status: '王小虎',
          content: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
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

