<template>
<!--  div.container>div.error>.-number+.-word>p.description^.-button|bem -->
  <div class="container">
      <div class="error">
          <div class="error__number"></div>
          <div class="error__word">
              <p class="description">
                  {{getDescription}}
              </p>
          </div>
          <div class="error__button">
            <div class="label"><span class="count">{{count}}</span>秒后</div>
            <el-button @click="redirectTargetUrl" round>回到登录页面</el-button>
          </div>
      </div>
  </div>
</template>
<script>
import config from '../../assets/js/systemConfig.js'
export default {
  beforeMount () {
    this.remainderSecond()
  },
  data () {
    return {
      count: config.errorPageConfig.initSecondCount,
      redirectURL: config.errorPageConfig.redirectUrl
    }
  },
  computed: {
    getDescription () {
      return this.$route.query.description
    }
  },
  methods: {
    remainderSecond () {
      var that = this
      var timer = setInterval(function () {
        that.count -= 1
        if (that.count === 0) {
          clearInterval(timer)
          window.location.href = that.redirectURL
        }
      }, 1000)
    },
    redirectTargetUrl () {
      window.location.href = this.redirectURL
    }
  }
}
</script>

<style lang="less" scoped>
// 常量
@usualColor:#409EFF;
@errorHeight:300px;
@errorWidth:60%;
@errorLeft:20px;
@numFontSize:140px;
@numLetterSpacing:.1em;
@errorWordsFontSize:30px;
@labelPaddingRight:10px;
@countPaddingRight:5px;
// 通用方法
#color(@name){
    color:@name
}
#square(@h){
    width: @h;
    height: @h;
}
#line-h(@h){
    height: @h;
    line-height: @h;
}
.container{
    background: url(../../assets/img/errorbg.jpg) no-repeat center center;
    position: relative;
    width: 100%;
    height: 100%;

    .error{
        height: @errorHeight;
        position: absolute;
        top:50%;
        margin-top:-@errorHeight / 2;
        width: @errorWidth;
        text-align: center;
        left: @errorLeft;

        &__number{
            width: 100%;
            font-size: @numFontSize;
            letter-spacing: @numLetterSpacing;
            font-weight: bold;
        }

        &__word{
            padding: 30px 0;
            font-size:@errorWordsFontSize;
            #color(@usualColor)
        }

        &__button{

            .label{
                display: inline;
                text-align: right;
                padding-right:@labelPaddingRight; 
               
                .count{
                  #color(@usualColor);
                  padding-right: @countPaddingRight;
                }
            }
        }
    }
}
</style>
