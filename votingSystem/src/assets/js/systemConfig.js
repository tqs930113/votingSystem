export default {
  // 错误页面的配置
  errorPageConfig: {
    // 配置错误页面，从多少秒后跳转到redirectUrl
    initSecondCount: 5,
    // 重定向到登录界面的地址
    redirectUrl: '/'
  },
  // 文件上传配置
  fileConf: {
    size: 1000,
    type: ['jpg', 'png', 'jpeg'],
    url: '/colife/activity/vote/upload'
  },
  // pagination配置
  page: {
    // 总记录数
    total: 100,
    // 设置pageSize的选项
    pageSizeOptions: [5, 10, 25, 50, 100, 200],
    // 单页显示的记录数
    pageSize: 15,
    // 当前分页index
    currentPage: 1
  },
  // 系统信息文本提示
  tips: {
    statisticalAnalysis: {
      initTableErr: '初始化数据列表失败',
      initVoteErr: '加载投票信息失败'
    }
  },
  // 系统请求地址的配置项
  requestUrlConfig: {
    header: {
      getOnlineUserInfo: '/colife/activity/admin/getOnlineUser'
    },
    login: {
      checkUserValidation: '/colife/activity/authority'
    },
    userManagerRequestUrlConfig: {
      list: '/colife/activity/admin/list/',
      delete: '/colife/activity/admin/delete/',
      add: '/colife/activity/admin/add/',
      edit: '/colife/activity/admin/update/',
      public: '/colife/activity/admin/open/',
      unpublic: '/colife/activity/admin/close/',
      setAdmin: '/colife/activity/admin/{objId}/setAdmin',
      cancelAdmin: '/colife/activity/admin/{objId}/cancleAdmin'
    },
    statisticalAnalysis: {
      list: '/colife/activity/vote/{objId}/voteItems'
    },
    voteManager: {
      info: '/colife/activity/vote/{objId}'
    }
  },
  // 数字转换成对应文字意思配置
  numToStr: {
    userManagerNumToStr: {
      isAdmin: {
        // 是否管理员
        1: '是',
        0: '否'
      },
      userStatus: {
        // 用户状态
        2: '全部',
        0: '启用',
        1: '停用'
      }
    },
    voteManager: {
      activityState: {
        '-1': '全部',
        '1': '未开始',
        '2': '进行中',
        '3': '已结束'
      }
    }
  }
}
