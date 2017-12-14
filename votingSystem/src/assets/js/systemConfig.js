export default {
  // 错误页面的配置
  errorPageConfig: {
    // 配置错误页面，从多少秒后跳转到redirectUrl
    initSecondCount: 5
  },
  // 系统请求地址的配置项
  requestUrlConfig: {
    userManagerRequestUrlConfig: {
      list: '/colife/activity/admin/list/',
      delete: '/colife/activity/admin/delete/',
      add: '/colife/activity/admin/add/'
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
        1: '启用',
        0: '停用'
      }
    }
  }
}
