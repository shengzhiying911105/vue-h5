<template>
  <div class="home" v-show="showHome">
    <div class="inner">
      <van-swipe :autoplay="3000" indicator-color="white" class="swiperImg">
        <van-swipe-item v-for="(item,index) in bannerImg" :key="index">
          <img :src="item.thumb" alt />
        </van-swipe-item>
      </van-swipe>

      <div class="header" :class="{showbgs:showbg}" :style="nav">
        <div class="logo">
          <img src="@/assets/images/logo.png" alt />
        </div>
        <div class="nav-lan">
          <span @click="changeLangEvent">
            {{lanBase}}
            <!-- {{lang ==='zh-CN'?'EN':'ZH'}} -->
            <!-- {{lang==1?'EN':'ZH'}} -->
          </span>
          <!-- <input type="text" v-model="lang" value="lang" style='display:none'>  -->
          <!-- <select id="sex" v-model="lang" @change="changeLangEvent">
          <option value="zh-CN">中文</option>
          <option value="en-US">英文</option>
          </select>-->
          <div class="nav-menu">
            <router-link :to="{path:'/order'}">
              <img src="@/assets/images/right-menu.png" alt />
            </router-link>
          </div>
        </div>
      </div>

      <div class="brand-story">
        <h3>{{story.catname}}</h3>
        <!-- <div class="brand-all" ref="heightShow" :class="{brandStory:showMore}">
        <p v-for="(item,index) in story2" :key="index">{{item}}</p>
        <div class="story-img" v-if="story.image">
          <img :src="story.image" alt />
        </div>
      </div>
      <div class="index-more" @click="toloadMore" style="margin:0 auto;">
        <div class="mas" v-show="toshows">
          <span>more</span>
          <img src="../assets/images/more-icon.jpg" alt />
        </div>
        <div class="mas" v-show="toshows2" :class="{brandimg2:showMore}">
          <img src="../assets/images/more-icon.jpg" alt />
        </div>
        </div>-->
        <showmorenew v-if="story2&&story2.length" :pageType="'shouye'" :htmlstr="story2"></showmorenew>
      </div>
      <!-- <div class="logo1"></div> -->
      <div :class="[showMore?'': 'yuyue']">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in project_list" :key="index">
            <div class="yu-item" @click.stop.prevent="toHotelxq(item.id,item.project_name)">
              <div class="yu-img">
                <!-- <router-link :to="{name:'hotelDetail', params:{id:item.id,name:item.project_name}}"> -->
                <img :src="item.pic" alt />
                <div class="yu-title">{{item.address}}</div>
                <!-- </router-link> -->
              </div>
              <div class="yu-name">
                <i>{{item.project_name}}</i>
                <!-- <router-link :to="{path:'/orderForm'}"> -->
                <van-button
                  type="info"
                  @click.stop.prevent="toOrderForm(item.id,item.project_name)"
                >{{$t('m.orderhouse')}}</van-button>
                <!-- </router-link> -->
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <div class="news">
        <van-tabs v-model="activeName" line-width="7%" :border="false" :ellipsis="false">
          <van-tab :title="$t('m.news')">
            <ul>
              <li v-for="(item,index) in news_list" :key="index">
                <router-link :to="{name:'newsdetail', params:{id:item.id}}">
                  <div class="news-date">
                    <h3 style="font-size:0.38rem;font-weight:bold;" v-if="index==0">{{item.title}}</h3>
                    <h3 v-else>{{item.title}}</h3>
                    <span
                      style="font-size:0.4rem;font-weight:bold;"
                      v-if="index==0"
                    >{{item.inputtime}}</span>
                    <span v-else>{{item.inputtime}}</span>
                  </div>
                  <div class="news-img" v-if="index==0&&item.thumb!=''">
                    <img :src="item.thumb" alt />
                  </div>
                </router-link>
              </li>
            </ul>
            <div class="news-more">
              <router-link :to="{path:'/news'}">
                <span style="color: #a5a5a5;">more</span>
                <img src="../assets/images/right.png" alt />
              </router-link>
            </div>
          </van-tab>
          <van-tab :title="$t('m.activity')">
            <ul>
              <li v-for="(item,index) in activity_list" :key="index">
                <router-link :to="{name:'activitydetail', params:{id:item.id}}">
                  <div class="news-date">
                    <h3 style="font-size:0.38rem;font-weight:bold;" v-if="index==0">{{item.title}}</h3>
                    <h3 v-else>{{item.title}}</h3>
                    <span
                      style="font-size:0.4rem;font-weight:bold;"
                      v-if="index==0"
                    >{{item.inputtime}}</span>
                    <span v-else>{{item.inputtime}}</span>
                  </div>
                  <div class="news-img" v-if="index==0&&item.thumb!=''">
                    <img :src="item.thumb" alt />
                  </div>
                </router-link>
              </li>
            </ul>
            <div class="news-more">
              <router-link :to="{path:'/activity'}">
                <span style="color: #a5a5a5;">more</span>
                <img src="../assets/images/right.png" alt />
              </router-link>
            </div>
          </van-tab>
        </van-tabs>
      </div>

      <div class="map">
        <!-- <div class="alltag" @click="toopencity">
        <span>{{$t('m.map.defaultName')}}</span>
        <div class="alltags" v-show="opens1">
          <span
            v-for="(item,index) in allcityName"
            :key="index"
            @click="tochangecity(item)"
          >{{item.name}}</span>
        </div>
        <img src="../assets/images/bottom.jpg" alt />
        </div>-->
        <maps v-if="alllongitude" :dataArr="alllongitude"></maps>
      </div>
      <footers></footers>
      <submitBtn
        v-if="hideModel"
        :name="names"
        :id="idss"
        @tohideModel="tohideModel"
        :status="status"
      ></submitBtn>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import interfaces from "../utils/api.js";
// import aheaders from "@/components/Header";
import footers from "@/components/Footer";
import store from "../store";
import maps from "@/components/map";
import submitBtn from "@/components/submitBtn";
import showmorenew from "@/components/ShowMoreNew";

import { Swipe, SwipeItem, Tab, Tabs } from "vant";

Vue.use(Swipe).use(SwipeItem);
Vue.use(Tab).use(Tabs);

export default {
  name: "home",
  data() {
    return {
      bannerImg: [],
      story: {},
      news_list: [],
      project_list: [],
      activity_list: [],
      storyHeight: 105,
      toshows: false,
      toshows2: false,
      showMore: false,
      activeName: 0,
      showImgs: false,
      scroll: 0,
      showbg: false,
      swiperOption: {
        slidesPerView: "auto",
        spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      lang: store.state.lang,

      hideModel: false,
      mobileLocal: '',
      story2: [],
      idss: '',
      names: '',

      name: '',
      sms: '',
      allcityName: '',
      couponSelected: '',
      // 地图
      opens1: false,
      openName: '上海市',
      alllongitude: null,
      allcityName: [],
      Longid: '',
      LongName: '',
      status: '',
      lanBase: 'EN',
      cityArr: null,
      showHome: false
    }
  },

  computed: {
    nav() {
      if (this.iswx) return '';
      return "width:750px;transform: translate3d(-50%, -4px, 10px);position:absolute;left:50%;margin:0;"
    }
  },

  methods: {
    getHomedata() {
      interfaces.getData().then((res) => {
        this.bannerImg = res.data.banner
        this.story = res.data.story
        this.news_list = res.data.news_list
        this.activity_list = res.data.activity_list
        this.project_list = res.data.project_list

        let story = res.data.story.description
        this.story2 = story.split('。')
        console.log(res.data)
      })
    },
    handleScroll() {
      this.scroll = $(window).height() + $(document).scrollTop();
    },
    handleScrolls() {
      let scrolltop =
        document.documentElement.scrollTop || document.body.scrollTop;
      scrolltop > 0 ? (this.showbg = true) : (this.showbg = false);
    },
    changeLangEvent() {
      console.log(this.lang)
      if (this.lang == 'zh-CN') {
        this.lang = 'en-US'
        this.lanBase = '中'
      } else if (this.lang == 'en-US') {
        this.lang = 'zh-CN'
        this.lanBase = 'EN'
      }
      this.$i18n.locale = this.lang; //关键语句

      this.$store.commit("changeLang", this.lang);
      $eventbus.$emit("changeLang", this.lang);
      localStorage.setItem('lanBase', this.lang == 'zh-CN' ? 1 : 4)
      let lanBase = localStorage.getItem('lanBase')

      if (lanBase == 1) {
        this.lanBase = 'EN'
      } else if (this.lang == 4) {
        this.lanBase = '中'
      }

      $eventbus.$emit("changeStyle", this.lanBase);
    },
    toloadMore() {
      this.showMore = !this.showMore
      if (this.showMore == true) {
        this.toshows = false
        this.toshows2 = true
      } else {
        this.toshows = true
        this.toshows2 = false
      }
    },

    tohideModel() {
      this.hideModel = false
    },
    toOrderForm(id, name) {
      this.idss = id
      this.names = name
      this.status = 1
      if (this.mobileLocal) {
        //  console.log(this.mobileLocal)
        this.$router.push({ name: 'orderForm', params: { id: id, name: name, mobile: this.mobileLocal } })
      } else {
        this.hideModel = true
      }
    },
    getCouponSelected() {
      console.log(this.couponSelected)
    },
    // 地图
    toopencity() {
      this.opens1 = !this.opens1
    },
    tochangecity(item) {
      //  this.opens1=!this.opens1
      this.cityArr = item
      this.openName = item.name
      this.Longid = item.linkageid
      this.LongName = item.name
      this.getallother(item.linkageid)
    },
    getallother(id) {
      interfaces.getCode(id).then((res) => {
        this.alllongitude = res
        //  this.$store.dispatch("setLocation", res);
      })
    },
    getAllmap() {
      interfaces.getAllcity().then((res) => {
        this.allcityName = res
      })
    },
    // 项目详情
    toHotelxq(id, name) {
      // this.tobrandImg(id)
      //      interfaces.getbrandFirst(id).then((res)=>{
      //      let ids=res.is_show_project_story
      //      if(ids==1){
      //        this.$router.push({name:'hotelDetail',params:{id:id,name:name}})
      //      }else{

      //      }
      //  })

      this.$router.push({ name: 'hotelDetail', params: { id: id, name: name } })

    },

  },
  beforeRouteEnter(to, from, next) {
    interfaces.getData().then(function (res) {
      next(vm => {
        vm.bannerImg = res.data.banner
        vm.story = res.data.story
        vm.news_list = res.data.news_list
        vm.activity_list = res.data.activity_list
        vm.project_list = res.data.project_list

        let story = res.data.story.description
        vm.story2 = story.split('。')
        vm.showHome = true
      })
    })
  },
  created() {
    //  this.getHomedata()
    // this.getallother(3362)

    let lanBase = localStorage.getItem('lanBase')

    if (lanBase == 1) {
      this.lanBase = 'EN'
    } else if (lanBase == 4) {
      this.lanBase = '中'
    }
    this.getAllmap()
    setTimeout(() => {
      this.mobileLocal = JSON.parse(localStorage.getItem('userinfo')).mobile
    }, 2000);

    //  this.couponSelected = this.allcityName[0].name;
  },
  mounted: function () {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("scroll", this.handleScrolls, true);
    $eventbus.$on("changeLang", (res) => {
      this.getHomedata()
      this.getAllmap()
      var id = 3362 || Number(this.cityArr.linkageid);
      this.getallother(id)
    });
    this.$nextTick(() => {
      this.getallother(3362)
    })

    // let height= window.getComputedStyle(this.$refs.heightShow).height
    // let height = window.getComputedStyle(this.$refs.heightShow).height
    //  console.log(height,'px')
    // if (height > this.storyHeight + 'px') {
    //   this.toshows = true;
    // }
  },
  //第四步：当再次进入（前进或者后退）时，只触发activated（注：只有在keep-alive加载时调用）
  activated() {
    if (this.scroll > 0) {
      // window.scrollTo(0, this.scroll);
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  //第五步：deactivated 页面退出时关闭事件 防止其他页面出现问题
  deactivated() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  components: {
    // aheaders,
    footers,
    maps,
    submitBtn,
    showmorenew
  }
};
</script>
<style lang="less">
.mint-indicator-wrapper {
  z-index: 10;
}
.mint-indicator-mask {
  background: #ffffff !important;
}
</style>
<style lang="less" scoped>
/* .map h3 select{width:2rem;height:1rem;overflow: hidden;background-color: #fff;border:transparent;}
.map h3 select option{width:2rem;height:1rem;overflow: hidden;padding:0;height:1rem;min-height:1rem;} */

.logo1 {
  height: 1.5rem;
  width: 70%;
  background: url("../assets/images/logo1.png") no-repeat;
  background-size: 100% auto;
  margin: 0 auto;
  margin-top: 0.3rem;
}

.brandimg2 {
  transform: rotate(180deg);
}

.showbgs {
  width: 100%;
  height: auto;
  position: fixed !important;
  background: rgba(255, 255, 255, 0.8);
  /* padding: 0 10%; */
  box-sizing: border-box;
  margin: 0;
  z-index: 99;
}

.header {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: space-between;
  padding: 0 0.6rem;
  box-sizing: border-box;
  padding: 0 0.6rem;
  padding-top: 0.15rem;
  padding-bottom: 0.15rem;
}
.header .logo {
  width: 1.54rem;
  height: 0.9rem;
  /* margin-top: 10px; */
  img {
    width: auto;
    height: 100%;
  }
}
.header .nav-lan {
  width: 2.37rem;
  height: 0.59rem;
}

.nav-lan {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-lan span {
  font-size: 0.44rem;
  border-bottom: 1px solid #000;
}
.nav-lan .nav-menu {
  width: 0.85rem;
  height: 0.6rem;
}
.nav-lan .nav-menu img {
  width: 0.85rem;
  height: 0.6rem;
}
.nav-lan .nav-menu a {
  font-size: 0.4rem;
  width: 0.85rem;
  height: 0.6rem;
  display: block;
}

.swiper-slide {
  width: 90%;
}

.inner{
  min-height: calc(100% + 1px);
}

.home {
  width: 100%;
  margin: 0 auto;
  min-height: 100%;
  padding-bottom: 5.96rem;
  box-sizing: border-box;
  position: relative;
  background-color: #fff;
  overflow-y: scroll; /* 增加该属性，可以增加弹性 */
  // -webkit-overflow-scrolling: touch;
}
.home img {
  width: 100%;
  height: auto;
}
.van-sidebar {
  position: fixed;
  top: 0;
  left: 0;
}
.swiperImg img {
  width: 100%;
  min-height: 12rem;
}

.brand-story {
  width: 80%;
  height: auto;
  text-align: center;
  margin: 0 auto;
}
.brand-all {
  width: 100%;
  height: 2.6rem;
  overflow: hidden;
}

.brand-story h3 {
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  line-height: 1.5;
  font-size: 0.6rem;
  color: #060606;
  margin: 1.5rem 0 0.86rem;
  font-weight: bold;
}
.brand-story p {
  font-size: 0.34rem;
  color: #060606;
  line-height: 0.68rem;
  /* height: 2.52rem; */
  /* max-height:2.52rem; */
  min-height: 0.68rem;
  overflow: hidden;
}

.brand-story .brandStory {
  height: auto;
  overflow: visible;
}

/* .brand-story .more{text-align: center;color:#a5a5a5;font-size:14px;padding-right:5px;background: url('../assets/images/more-icon.jpg')no-repeat 59% 50%;background-size: 10px 10px;} */
.index-more {
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.index-more span {
  font-size: 0.4rem;
  margin-right: 0.1rem;
  color: #a5a5a5;
}
.index-more .mas img {
  /* width: 0.12rem;
  height: 0.15rem; */
  width: 0.18rem;
  height: 0.18rem;
  margin-top: 0.1rem;
}
.active-img {
  text-align: center;
  margin-top: 1.16rem;
}

.yuyue {
  margin-top: 1rem;
}
.yuyue .van-swipe {
  padding-bottom: 20px;
}
.yu-item {
  width: 9.57rem;
  height: auto;
  margin: 0 auto;
  padding-bottom: 0.2rem;
}
.yu-img {
  width: 9.57rem;
  height: auto;
  position: relative;
}
.yu-img img {
  width: 9.57rem;
  height: 6.83rem;
  display: block;
}
.yu-title {
  /* width: auto;
  height: auto; */
  position: absolute;
  bottom: 0;
  left: 0px;
  right: 0;
  height: 0.85rem;
  line-height: 0.85rem;
  background: rgba(0, 0, 0, 0.4);
  font-size: 0.34rem;
  color: #fff;
  padding: 0 0.54rem;
}
.yu-name {
  // padding: 0.45rem 0.6rem 0.34rem;
  padding-top: 0.45rem;
  padding-bottom: 0.6rem;
  padding-right: 0.54rem;
  padding-left: 0.54rem;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 3px 3px #ededed;
}
.yu-name span {
  font-size: 0.38rem;
  color: #fff;
}
.yu-name i {
  font-size: 0.48rem;
  color: #000;
  font-weight: bold;
}
.yu-name a {
  display: inherit;
}
.yu-name button {
  background-color: #5975a9;
  border-radius: 5px;
  color: #fff;
  /* height: 35px; */
  /* line-height: 35px; */
  font-size: 14px;
  /* padding: 0 15px; */
  border: none;
  width: 2.96rem;
  height: 0.98rem;
  line-height: 0.98rem;
}

/* .news-more{width:auto;font-size:0.3rem;color:#a5a5a5;position:absolute;right:8px;top:17px;background: url('../assets/images/right.png')no-repeat 80% 50%;padding-right:0.6rem;background-size:13% 73%;} */
.news-more {
  display: flex;
  align-items: center;
  position: absolute;
  right: 8px;
  top: 17px;
}
.news-more a {
  color: #a5a5a5;
  font-size: 0.34rem;
}
.news-more a span {
  font-size: 0.4rem;
}
.news-more img {
  width: 0.18rem;
  height: 0.25rem;
  margin-left: 0.1rem;
}

.news ul {
  width: 100%;
  height: auto;
  margin-top: 0.4rem;
}
.news ul li .news-date {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1rem;
  height: 1rem;
  overflow: hidden;
}
.news ul li .news-date h3 {
  font-size: 0.34em;
  color: #000;
  line-height: 1rem;
  height: 1rem;
  overflow: hidden;
  width: 7.8rem;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.news ul li .news-date span {
  font-size: 0.34rem;
  color: #959595;
  text-indent: 2em;
}

.news-img {
  /* margin: 0.4rem 0; */
  margin: 0.2rem 0;
  min-height: 6.4rem;
  overflow: hidden;
  img {
    width: 100%;
    vertical-align: middle;
    margin: 0 auto;
  }
}
.van-tabs .van-tab {
  flex: none;
  width: 20%;
  margin-right: 0.5rem;
}
.van-tabs .van-tab {
  flex: none;
  width: 20%;
}
.van-tabs .van-tab span {
  font-size: 0.5rem;
}
.news {
  padding-top: 0.6rem;
  position: relative;
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 0.33rem;
}
.van-tabs .van-tabs__line {
  position: absolute;
  bottom: 15px;
  left: 0;
  z-index: 1;
  height: 3px;
  background-color: #3c5896;
  border-radius: 3px;
}
.news .van-tabs--line .van-tabs__wrap {
  height: 44px;
  border-bottom: 1px solid #ddd;
}
.van-tabs .van-tab span {
  font-size: 17px;
  color: #bfbfbf;
}

// .van-tabs .van-tab--active {
//   color: #000;
//   font-weight: 500;
// }
// .van-tabs .van-tab--active span {
//   color: #000;
// }

.scrolltop {
  width: 0.99rem;
  height: 0.96rem;
  position: fixed;
  bottom: 5%;
  right: 3%;
}
.scrolltop img {
  width: 100%;
  height: auto;
}

.map {
  /* width: auto; */
  /* height: auto; */
  width: 100%;
  overflow: hidden;
  padding-top: 0.6rem;
  padding-bottom: 0 !important;
  // margin: 0 auto;
}
.map .alltag {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* padding: 0 0.6rem; */
  margin-bottom: 0.38rem;
  position: relative;
  // width: 2.1rem;
  width: auto;
  margin-left: 0.6rem;
}
.map .alltag > span {
  font-size: 0.38rem;
  color: #0e0e0e;
  font-weight: bold;
  margin-right: 0.1rem;
  width: auto;
  min-width: 0.5rem;
}
.map .alltag img {
  width: 0.27rem;
  height: 0.16rem;
}
.map img {
  width: 100%;
  height: auto;
  display: block;
}
.alltags {
  position: absolute;
  top: 24px;
  left: -11px;
  width: 18%;
  height: auto;
  z-index: 99;
  background-color: #fff;
}
.alltags > span {
  width: auto;
  height: auto;
  padding: 10px;
  font-size: 0.38rem;
  color: #0e0e0e;
  display: block;
  text-align: center;
}

@media screen and (min-width: 640px) {
  body {
    width: 100%;
    height: 100%;
    background-color: #000 !important;
  }
  .swiper-slide {
    width: 65%;
  }
}
</style>>


