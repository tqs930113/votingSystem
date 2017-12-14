<template>
  <div class="createNewItem layout">
      <div class="top">
          <div class="title layout-left">
              新建投票
          </div>
          <div class="layout-right">
              <el-button size="small" @click="backToVoteManagementPage">返回</el-button>
              <!-- <el-button size="small" @click="saveData" :disabled="voteForms.objId?false:true" type="primary">保存</el-button> -->
          </div>
      </div>
      <div class="content">
              <div class="layout-left steps">
                <div style="height: 300px;">
                    <el-steps  direction="vertical" :active="active">
                        <el-step title="步骤 1"></el-step>
                        <el-step title="步骤 2"></el-step>
                        <el-step title="完成"></el-step>
                    </el-steps>
                </div>     
              </div>
              <div class="layout-right forms">
                    <el-collapse v-model="activeName"  accordion>
                        <el-collapse-item title="注册投票活动" name="1">
                           <div class="wrap">
                             <el-form :model="voteForms" status-icon ref="voteForms" label-width="100px" >
                              <el-form-item label="投票名称:" 
                              prop="name"
                              :rules="[
                                { required: true, message: '投票名称不能为空', trigger: 'blur' }
                              ]">
                                <el-input v-model="voteForms.name" placeholder="请输入投票活动名称"></el-input>
                              </el-form-item>
                              <el-col :span="11">
                                <el-form-item label="开始时间:" required>
                                    <el-form-item prop="beginTime"
                                    :rules="[
                                      { required: true, message: '开始时间不能为空', trigger: 'blur' }
                                    ]">
                                      <el-date-picker type="date" placeholder="选择日期" v-model="voteForms.beginTime" style="width: 100%;"></el-date-picker>
                                    </el-form-item>
                                </el-form-item>
                                <el-form-item label="结束时间:" required>
                                    <el-form-item prop="endTime"
                                    :rules="[
                                      { required: true, message: '结束时间不能为空', trigger: 'blur' }
                                    ]">
                                      <el-date-picker type="date" placeholder="选择日期" v-model="voteForms.endTime" style="width: 100%;"></el-date-picker>
                                    </el-form-item>
                                </el-form-item>
                                <el-form-item label="是否图片类型:" :prop="voteForms.imageVote + ''">
                                  <el-col :span="6">
                                   <el-switch  v-model="voteForms.imageVote"></el-switch>
                                  </el-col>
                                </el-form-item>
                              </el-col>
                              <el-col :span="11" :push="4">
                                <!-- 投票活动封面图片上传 -->
                                  <el-upload 
                                    v-if="voteForms.imageVote"
                                    class="avatar-uploader"
                                    :action="fileConf.url"
                                    :show-file-list="false"
                                    :on-success="voteFormsSuccessUpload"
                                    :before-upload="checkFile"
                                    :on-error="errorUpload"
                                    :file-list="voteForms.fileList">
                                    <img v-if="voteForms.imageUrl" :src="voteForms.imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    <span class="picture_word">图片上传</span>
                                  </el-upload>
                              </el-col>
                              <el-col :span="24" >
                              <el-form-item label="投票内容描述:" :prop="voteForms.description">
                                <el-input type="textarea" :rows="4" placeholder="请输入投票活动的描述内容" v-model="voteForms.description"></el-input>
                              </el-form-item>
                              </el-col>
                              <el-col :span="4" :push="20">
                                <el-form-item>
                                  <el-button v-if="!voteForms.objId" type="primary" @click="submitVoteForm('voteForms')">下一步</el-button>
                                  <el-button v-else type="warning" @click="editVoteForm('voteForms')">修改</el-button>
                                </el-form-item>
                              </el-col>
                            </el-form>
                           </div>
                        </el-collapse-item>
                        <el-collapse-item  v-show="voteForms.objId"  title="新建投票项" name="2">
                          <p class="tips">温馨提示： 投票活动的选项可以根据我们的需要添加，投票项设置的上限为99，投票项如果超过99个，请及时联系系统管理人员进行配置。同时本投票活动是和WCM系统集成的，所以增加了投票项地址和投票项WCM_DOC_ID的字段信息，这两个属性值均来自WCM系统中，请从WCM中获取并设置。
</p>
                            <el-form :model="voteItems" status-icon ref="voteItems" label-width="50px"  class="voteItems">
                              <el-form-item
                                class="hover voteItemBlock"
                                v-for="(domain, index) in voteItems.domains"
                                :label=" index + 1 + '.'"
                                :key="domain.key"
                              >
                              <!-- 能循环添加的部分 -->
                              <el-row :gutter="1">
                                <el-col :xs="23"  :sm="19">
                                  <!-- item内容 -->
                                    <el-row :gutter="0">
                                      <el-col :span="17">
                                        <div class="grid-content">
                                          <el-form-item label-width="100px"
                                          :prop="'domains.' + index + '.value'"
                                          :rules="[
                                            { required: true, message: '投票项名称不能为空', trigger: 'blur' }
                                          ]"
                                          label="投票项名称:">
                                          <el-input v-model="domain.value"  :maxlength="voteItems.max" @input="listenInputTextChange(domain.value, index)"  placeholder="请输入投票项名称"></el-input>
                                          </el-form-item>
                                        </div>
                                      </el-col>
                                      <el-col :span="7">
                                        <span class="advice">{{domain.adviceValue}}</span>
                                      </el-col>
                                    </el-row>
                                    <el-row :gutter="0">
                                      <el-col :span="14"><div class="grid-content">
                                        <el-form-item  label-width="100px"
                                        :prop="'domains.' + index + '.resourceUrl'"
                                        :rules="[
                                          { required: true, message: '投票项地址不能为空', trigger: 'blur' }
                                        ]"
                                        label="投票项地址:">
                                        <el-input v-model="domain.resourceUrl"   placeholder="请输入投票项地址"></el-input>
                                      </el-form-item>
                                        </div></el-col>
                                      <el-col :span="10"><div class="grid-content">
                                        <el-form-item label-width="100px"  
                                        :prop="'domains.' + index + '.docId'"
                                         label="docId:"
                                        :rules="[
                                          { required: true, message: 'docId不能为空', trigger: 'blur' }
                                        ]"
                                        >
                                        <el-input v-model="domain.docId"  placeholder="请输入ID"></el-input>
                                      </el-form-item>
                                      </div></el-col>
                                    </el-row>
                                </el-col>
                                <el-col :xs="23" :sm="4" :push="1">
                                  <!-- 上传图片附件 -->
                                   <!-- :autoUpload="false" -->
                                  <el-upload
                                    class="avatar-uploader"
                                    :action="fileConf.url"
                                    :show-file-list="false"
                                    :on-success="successUpload"
                                    :before-upload="checkFile"
                                    :on-error="errorUpload"
                                    :file-list="domain.fileList"
                                    >
                                    <div class="click_wrap" @click="changeCurOperateItemIndex(index)">
                                      <img v-if="domain.imageUrl" :src="domain.imageUrl" class="avatar">
                                      <i v-else  class="el-icon-plus avatar-uploader-icon"></i>
                                       <span class="picture_word">图片上传</span>
                                    </div>
                                  </el-upload>
                                </el-col>
                              </el-row>
                                <i  class="delete-btn el-icon-circle-close" @click.prevent="removeDomain(domain)"></i>
                              </el-form-item>
                                <el-button type="primary" :disabled="voteForms.objId?false:true" @click="addDomain">新增选项</el-button>
                                <el-button @click="saveData('voteItems')" :disabled="voteForms.objId?false:true" type="success">保存</el-button>
                            </el-form>
                        </el-collapse-item>
                    </el-collapse>
              </div>
      </div>
      <i class="fixed top_btn el-icon-arrow-up" @click="scrollToTop" id="top_btn" ></i>
      <i class="fixed down_btn el-icon-arrow-down" @click="scrollToBottom" id="down_btn" ></i>
  </div>
</template>
<script>
  import API from '../assets/js/API.js'
  import config from '../assets/js/config.js'
  const api = new API()
  var timer = null
  export default {
    data () {
      return {
        // 控制步骤
        active: 1,
        activeName: '1',
        voteForms: {
          name: '',
          beginTime: '',
          endTime: '',
          imageVote: false,
          description: '',
          imageUrl: '',
          fileList: []
        },
        voteItems: {
          // 投票项数据
          domains: [{
            value: '',
            resourceUrl: '',
            docId: null,
            key: 1,
            adviceValue: '',
            imageUrl: '',
            fileList: []
          }],
          // 输入框最长和最短输入字符数
          max: 15,
          min: 1,
          // 记录当前操作投票附件上传的index
          curOperateItemIndex: '0'
        },
        // 文件限制配置
        fileConf: {
          size: 1000,
          type: ['jpg', 'png', 'jpeg'],
          url: `${config.baseURL}/colife/activity/vote/upload`
        }
      }
    },
    watch: {
      activeName (cur, old) {
        this.active = cur - 0
      }
    },
    mounted () {
      var dom = document.getElementsByClassName('createNewItem')[0]
      var topBtn = document.getElementById('top_btn')
      var downBtn = document.getElementById('down_btn')
      var screenHeight = document.body.clientHeight
      dom.onscroll = () => {
        if (dom.scrollTop > screenHeight / 8) {
          topBtn.style.opacity = '1'
          downBtn.style.opacity = '0'
        } else {
          topBtn.style.opacity = '0'
          downBtn.style.opacity = '1'
        }
      }
    },
    methods: {
      scrollToTop () {
        var dom = document.getElementsByClassName('createNewItem')[0]
        var temp = dom.scrollHeight
        if (timer) {
          // 当点击了toTop的动画期间，若再点击toBottom时 停止当前动画
          clearInterval(timer)
          timer = null
        }
        timer = setInterval(function () {
          if (dom.scrollTop > temp) {
            // 当鼠标滑动方向与 动画于东方向相反时 停止动画
            clearInterval(timer)
            temp = dom.scrollHeight
          }
          dom.scrollTop -= 5
          temp = dom.scrollTop
          if (dom.scrollTop <= 0) {
            clearInterval(timer)
            dom.scrollTop = 0
          }
        }, 25)
      },
      scrollToBottom () {
        var dom = document.getElementsByClassName('createNewItem')[0]
        var temp = 0
        if (timer) {
          // 当点击了toBottom的动画期间，若再点击toTop时 停止当前动画
          clearInterval(timer)
          timer = null
        }
        timer = setInterval(function () {
          // 当鼠标滑动方向与 动画于东方向相反时 停止动画
          if (dom.scrollTop < temp) {
            clearInterval(timer)
            temp = 0
            return false
          }
          dom.scrollTop += 5
          temp = dom.scrollTop
          if ((dom.scrollTop + dom.clientHeight) >= dom.scrollHeight) {
            clearInterval(timer)
            dom.scrollTop = dom.scrollHeight - dom.clientHeight
          }
        }, 25)
      },
      // 公用方法
      setAjaxParams (url, datas) {
        // 设置请求参数
        // datas是对象
        var params = {
          url: '',
          datas: {}
        }
        params.url = url
        params.datas = datas
        return params
      },
      ajaxPostMethod (that, params, successMsg, errMsg) {
        api.post(params)
        .then(function (res) {
          if (res.data.state !== '000000') {
            api.reqFail(that, res.data.message)
            return false
          }
          if (that.activeName === '2') {
            // 当前步骤为第二部时成功提交后将步骤设置为3，并跳转到投票管理界面
            that.active = 3
            that.$router.push('/voteManager')
          }
          if (!that.voteForms.objId) {
            // 设置新注册表单的id
            that.voteForms.objId = res.data.data.objId
            // 设置页面到下一步
            that.activeName = '2'
          }
          api.reqSuccess(that, successMsg)
        })
        .catch(function (err) {
          if (err) {
            console.log(err)
          }
          api.reqFail(that, errMsg)
        })
      },
      ajaxPutMethod (that, params, successMsg, errMsg) {
        api.put(params)
        .then(function (res) {
          if (res.data.state !== '000000') {
            api.reqFail(that, res.data.message)
            return false
          }
          if (!that.voteForms.objId) {
            // 设置新注册表单的id
            that.voteForms.objId = res.data.data.objId
          }
          // 设置页面到下一步
          that.activeName = '2'
          api.reqSuccess(that, successMsg)
        })
        .catch(function (err) {
          if (err) {
            console.log(err)
          }
          api.reqFail(that, errMsg)
        })
      },
      backToVoteManagementPage () {
        // 返回
        this.$router.push('/voteManager')
      },
      listenInputTextChange (val, index) {
        // 监听投票项名称内容的变化
        if (val.length < this.voteItems.max) {
          let count = this.voteItems.max - val.length
          this.voteItems.domains[index].adviceValue = `您还能输入${count - 2}个字符`
        }
        if (val.length === 0) {
          this.voteItems.domains[index].adviceValue = ''
        }
      },
      submitVoteForm (formName) {
        // 提交注册信息
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url = '/colife/activity/vote'
            var formDatas = {}
            // 活动名称
            formDatas.title = this.voteForms.name
            // 活动开始时间
            formDatas.beginTime = api.formatDate(this.voteForms.beginTime, '-', false)
            // 活动结束时间
            formDatas.endTime = api.formatDate(this.voteForms.endTime, '-', false)
            // 是否为图片类型投票
            formDatas.imageVote = this.voteForms.imageVote ? 1 : 0
            // 活动描述
            formDatas.description = this.voteForms.description
            // 封面地址
            if (this.voteForms.fileList[this.voteForms.fileList.length - 1]) {
              formDatas.imageUrl = this.voteForms.fileList[this.voteForms.fileList.length - 1].url
            }
            var params = this.setAjaxParams(url, formDatas)
            var successMsg = '注册成功'
            var errMsg = '提交活动注册表单失败'
            this.ajaxPostMethod(this, params, successMsg, errMsg)
          } else {
            api.reqFail(this, '注册投票活动表单验证出错')
            return false
          }
        })
      },
      editVoteForm (formName) {
        // 修改投票活动信息
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.voteForms.objId) {
              api.reqFail(this, '修改投票活动表单出错')
              return false
            }
            var url = `/colife/activity/vote/${this.voteForms.objId}`
            var formDatas = {}
            // 活动名称
            formDatas.title = this.voteForms.name
            // 活动开始时间
            formDatas.beginTime = api.formatDate(this.voteForms.beginTime, '-', false)
            // 活动结束时间
            formDatas.endTime = api.formatDate(this.voteForms.endTime, '-', false)
            // 是否为图片类型投票
            formDatas.imageVote = this.voteForms.imageVote ? 1 : 0
            // 活动描述
            formDatas.description = this.voteForms.description
            // 封面地址
            if (this.voteForms.fileList[this.voteForms.fileList.length - 1]) {
              formDatas.imageUrl = this.voteForms.fileList[this.voteForms.fileList.length - 1].url
            }
            var params = this.setAjaxParams(url, formDatas)
            var successMsg = '修改成功'
            var errMsg = '提交活动修改表单失败'
            this.ajaxPutMethod(this, params, successMsg, errMsg)
          } else {
            api.reqFail(this, '注册投票活动表单验证出错')
            return false
          }
        })
      },
      resetForm (formName) {
        // 重置表单信息
        this.$refs[formName].resetFields()
      },
      removeDomain (item) {
        // 移除选中的dom
        var index = this.voteItems.domains.indexOf(item)
        if (index !== -1) {
          this.voteItems.domains.splice(index, 1)
        }
      },
      addDomain () {
        // 新增dom
        var that = this
        var length = this.voteItems.domains.length + 1
        this.voteItems.domains.push({
          value: '',
          resourceUrl: '',
          docId: null,
          key: length,
          adviceValue: '',
          imageUrl: '',
          fileList: []
        })
        setTimeout(function () {
          that.scrollToBottom()
        }, 100)
      },
      saveData (formName) {
        // 保存数据 voteItems
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.voteForms.objId.length <= 0) {
              api.reqFail(this, '请先添加投票活动信息')
              return false
            }
            var url = `/colife/activity/vote/saveVoteItems`
            var formDatas = {}
            // 投票活动objId
            formDatas.voteId = this.voteForms.objId
            // 活动项内容填充
            formDatas.voteItems = []
            this.voteItems.domains.forEach(element => {
              var tempObj = {}
              tempObj.voteId = formDatas.voteId
              tempObj.itemIndex = element.key
              tempObj.title = element.value
              tempObj.docUrl = element.resourceUrl
              tempObj.docId = element.docId
              // tempObj.imageUrl = imageUrl
              if (element.fileList[element.fileList.length - 1]) {
                tempObj.imageUrl = element.fileList[element.fileList.length - 1].url
              } else {
                tempObj.imageUrl = ''
              }
              formDatas.voteItems.push(tempObj)
            })
            formDatas.voteItems = JSON.stringify(formDatas.voteItems)
            var params = this.setAjaxParams(url, formDatas)
            var successMsg = '保存投票项成功'
            var errMsg = '保存投票项失败'
            this.ajaxPostMethod(this, params, successMsg, errMsg)
          } else {
            api.reqFail(this, '添加投票活动项表单验证出错')
            return false
          }
        })
      },
      changeCurOperateItemIndex (index) {
        // 记录当前操作voteItems的附件上传的index值
        this.voteItems.curOperateItemIndex = index
      },
      checkFile (file) {
        // 在上传之前检测文件格式及大小
        var fileSize = Math.floor(file.size / 1204)
        var tempArr = file.type.split('/')
        var fileType = tempArr[tempArr.length - 1]
        if (fileSize > this.fileConf.size) {
          alert('超过上传文件的限制大小！')
          return false
        }
        if (this.fileConf.type.indexOf(fileType) < 0) {
          alert('文件类型不符合要求')
          return false
        }
        return true
      },
      voteFormsSuccessUpload (response, file, fileList) {
        // 封面图片上传成功后将图片地址存入voteforms的imageUrl
        this.voteForms.imageUrl = response.data.picSrc
      },
      errorUpload (err, file, fileList) {
        api.reqFail(this, err.data.message)
      },
      successUpload (response, file, fileList) {
        // 文件上传成功所做的操作
        const index = this.voteItems.curOperateItemIndex
        this.voteItems.domains[index].imageUrl = response.data.picSrc
        // this.imageUrl = URL.createObjectURL(file.raw)
      }
    }
  }
</script>
<style   scoped>
.createNewItem .top{
    padding:10px;
    border-bottom: 1px solid #409EFF;
}
.createNewItem .top::after{
    content: " ";
    display: block;
    clear: both;
    zoom: 1;
}
.createNewItem .title{
    font-size: 18px;
    font-weight: bold;
}
.createNewItem .content{
    padding: 30px 20px;
}
.createNewItem .content::after{
    content: " ";
    display: block;
    clear: both;
    zoom: 1;
}
.steps{
    width:15%;
}
.forms{
    width: 85%;
}
.layout-left{
    float: left;
}
.layout-right{
    float: right;
}
.tips{
  text-align: left;
  text-indent: 2em;
  padding: 10px 20px 20px 20px;
}
/* 投票活动注册表单 */
.forms .wrap{
  padding: 10px 20px;
  width: 80%;
  margin: 0 auto;
}
/* 投票项Block及内部的样式 */
.hover:hover{
  background-color:#F2F2F2;
  box-shadow: 0 0 10px 0 rgba(242, 242, 242, .7)
}
.hover:hover .delete-btn{
  display: block;
}
.delete-btn{
  position: absolute;
  top: -21px;
  right: -10px;
  font-size: 18px;
  display: none;
  cursor: pointer;
}
.delete-btn:hover{
  color:red;
}
.indexBlock{
  float: left;
}
.createNewItem .voteItems .voteItemBlock{
  width: 95%;
  padding: 20px 10px;
  margin:10px auto;
  border-radius: 5px;
}
.el-row{
  padding: 10px 0;
}
.advice{
  padding-left: 5px;
  color: red;
  display: inline-block;
  width: 100%;
  text-align: left;
  font-size: 10px;
}
/* 图片上传 */
.avatar-uploader{
  font-size: 28px;
  color: #8c939d;
  width: 110px;
  height: 110px;
  line-height: 110px;
  text-align: center;
  border:1px dotted #8c939d;
  border-radius:5px;
}
.avatar-uploader:hover{
  border-color:#409EFF;
  color:#409EFF;
}
.picture_word{
  display: block;
  font-size: 10px;
  height: 10px;
  line-height: 10px;
  margin-top: -32px;
}
/* 置顶 */
.fixed{
  position: fixed;
}
.top_btn,.down_btn{
  display: block;
  right: 15px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color:#409EFF;
  border-radius: 50%;
  color: #F2F2F2;
  opacity: 0;
  transition:all 1s ease-in-out;
}
.top_btn{
  bottom: 60px;
}
.down_btn{
  bottom: 20px;
}

</style>