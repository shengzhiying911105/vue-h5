<template>
  <div class="activitydetail">
    <!-- <img src='../../assets/images/news-detail.png'/> -->
    <aheaders status="3" @toback="toreplace" :showLan="false"></aheaders>
    <div :class="['newsdatails',this.$i18n.locale==='zh-CN'?'justify-text':'left-text']">
      <h2>{{newsDetails.title}}</h2>
      <div class="date">{{newsDetails.inputtime}}</div>
      <div class="mains-new">
        <!-- <img src="../../assets/images/index_01.jpg" alt="">
                  <p> 中国城市发展已迈入存量更新时代，城市更新既是建筑规划的时代更迭，是科技人文的发展需求，也是经济民生的新方向。“中国城
        中国城市发展已迈入存量更新时代，城市更新既是建筑规划的时代更迭，是科技人文的发展需求，也是经济民生的新方向。“中国城
        </p>-->
        <!-- {{newsDetails.description}} -->
        <p v-html="newsDetails.content">{{newsDetails.content}}</p>
      </div>
    </div>
    <afooter></afooter>
  </div>
</template>

<script>
// @ is an alias to /src
import interfaces from "@/utils/api.js";
import aheaders from "@/components/Header";
import afooter from "@/components/Footer";

import config from '@/config/config.js'
import { WXsdk } from "@/utils/wxShare"

export default {
  name: 'activitydetail',
  data() {
    return {
      id: '',
      newsDetails: {},
      scroll: 0,
      getHeight: {
        minHeight: ''
      }

    }
  },
  // minHeight(){
  //   return (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
  // },
  methods: {
    toreplace() {
      this.$router.go(-1)
    },
    activedetails(id) {
      interfaces.activedetail(id).then((res) => {
        this.newsDetails = res
        console.log(res)
      })
    },
    handleScroll() {
      this.scroll = $(window).height() + $(document).scrollTop()
    }

  },
  created() {
    this.id = this.$route.params.id;
    //  this.activedetails(this.id)
    this.getHeight.minHeight = (window.outerHeight / window.outerWidth * 10.8 - 5.96) + 'rem'
  },
  beforeRouteEnter(to, from, next) {
    // WXsdk.getShare(config.shareTitle, config.shareContent, config.shareIcon, config.shareLink+`?shareId=${location.hash}`)

    let id = to.params.id
    interfaces.activedetail(id).then(function (res) {
      to.meta[i18n.locale] = res.title
      next(vm => {
        vm.newsDetails = res
      })
    })
  },

  mounted: function () {
    WXsdk.getShare(config.shareTitle, config.shareContent, config.shareIcon, config.shareLink + `?shareId=${this.splicejing(location.hash)}`)
    window.addEventListener('scroll', this.handleScroll);
    $eventbus.$on("changeLang", (res) => {
      this.activedetails(this.id)
    })
  },
  //第四步：当再次进入（前进或者后退）时，只触发activated（注：只有在keep-alive加载时调用）
  activated() {
    if (this.scroll > 0) {
      // window.scrollTo(0, this.scroll);
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  //第五步：deactivated 页面退出时关闭事件 防止其他页面出现问题
  deactivated() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  beforeRouteLeave(to, from, next) {
    WXsdk.getShare(config.shareTitle, config.shareContent, config.shareIcon, config.shareLink + `?shareId=${location.hash}`)
    next()
  },
  components: {
    aheaders,
    afooter
  }
}
</script>

<style scoped>
.activitydetail {
  width: 100%;
  margin: 0 auto;
  min-height: 100%;
  padding-bottom: 5.96rem;
  box-sizing: border-box;
  position: relative;
  background-color: #fff;
}
.newsdetail {
  width: 100%;
  margin: 0 auto;
}

.newsdatails {
  width: 100%;
  height: auto;
  margin: 0rem auto 0.6rem;
  overflow: hidden;
  border-top: 1px solid #f5f5f5;
  padding-top: 0.6rem;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
  background-color: #fff;
}

.newsdatails >>> p {
  line-height: 2;
  font-size: 0.36rem !important;
  margin-bottom: 0.3rem;
  color: #313131;
}

.left-text >>> p {
  text-align: left;
}

.justify-text >>> p {
  text-align: justify;
}

.newsdatails >>> img {
  width: 9.5rem;
  margin-top: 0.2rem;
}

.newsdatails >>> strong {
  font-weight: bold !important;
}

.newsdatails >>> span {
  font-size: 0.34rem !important;
}

.newsdatails h2 {
  font-size: 0.6rem;
  color: #2d2d2d;
  line-height: 0.87rem;
  max-height: 0.8rem;
  min-height: 0.87rem;
  overflow: hidden;
}
.newsdatails .date {
  font-size: 0.34rem;
  color: #aeaeae;
  margin: 0.35rem 0;
}
.newsdatails .mains-new {
  font-size: 0.36rem;
  color: #000;
  padding-bottom: 1rem;
  line-height: 1.5;
}
.newsdatails .mains-new img {
  width: 100%;
  height: auto;
  margin: 0 auto;
}
.newsdatails .mains-new p {
  font-size: 0.36rem;
  color: #000;
  line-height: 0.79rem;
}
</style>
