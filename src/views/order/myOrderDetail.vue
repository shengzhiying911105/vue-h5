<template>
  <div class="order-detail">
    <aheaders status="3" @toback="toreplace" :showLan="true"></aheaders>
    <!-- 项目信息 -->
    <div class="order-detail01">
      <div class="order-left" style="position:relative;">
        <h3 style="position:absolute;top:-5px;left:0px;">{{$t('m.bookdetail1')}}</h3>
        <p>{{projectarr.project_name}}</p>
        <em
          style="width:4.2rem;color:#929292;font-size:0.3rem;margin-top: 0.8rem;line-height:0.6rem;display:block;margin-top:0.2rem;"
        >{{projectarr.address}}</em>
      </div>
      <div class="order-right">
        <img :src="projectarr.onepic" alt />
      </div>
    </div>

    <div class="order-detail02">
      <!-- v-show='showStar' -->
      <div class="pingjia" v-if="feedbackarr.user_score">
        <em>{{$t('m.bookdetail2')}}</em>
        <van-rate v-model="value" readonly />
      </div>
      <p style="margin-top:0.5rem">
        <span>{{$t('m.feedback8')}}</span>
        <em>{{bookarr.name}}</em>
      </p>
      <p>
        <span>{{$t('m.feedback9')}}</span>
        <em>{{bookarr.mobile}}</em>
      </p>
      <p>
        <span>{{$t('m.feedback10')}}</span>
        <em>{{bookarr.book_time}}</em>
      </p>
      <p v-if="!feedbackarr.user_score&&bookarr.intention">
        <span>{{$t('m.feedback11')}}</span>
        <em>{{bookarr.intention}}</em>
      </p>
      <p v-if="feedbackarr.user_content&&feedbackarr.user_score">
        <span>{{$t('m.feedback20')}}</span>
        <em>{{feedbackarr.user_content}}</em>
      </p>
    </div>

    <div class="yijiedan" v-show="showSale">
      <div class="yi-01">
        <img :src="sales.avater" alt />
        <div class="yi_02">
          <h3>{{sales.realname}}</h3>
          <!-- <p>{{sales.sale_desc}}</p> -->
          <p>{{$t('m.feedback19')}}</p>
        </div>
      </div>

      <div class="yi_03" @click="callPhone(sales.mobile)">
        <img src="../../assets/images/dianhua.png" alt />
      </div>
    </div>

    <div class="order-detail03">
      <p>
        <span>{{$t('m.feedback12')}}</span>
        <em>{{bookarr.book_number}}</em>
        <em
          style="color:#929292;font-size:0.3rem;margin-left:0.2rem;"
          @click="copy"
          class="getcopy"
          :data-clipboard-text="bookarr.book_number"
        >{{$t('m.feedback14')}}</em>
      </p>
      <p>
        <span>{{$t('m.feedback13')}}</span>
        <em>{{bookarr.inputtime}}</em>
      </p>
    </div>

    <div
      class="connectUs"
      v-if="bookarr.status==1||bookarr.status==3||bookarr.status==4"
    >
      <button class="s1" @click="toFormEdit(bookarr.id)">{{$t('m.bookdetail4')}}</button>
      <button @click="deleteForm(bookarr.id)">{{$t('m.bookdetail5')}}</button>
    </div>

    <div class="kefu" @click="openServe">
      <img src="../../assets/images/kefu2.png" alt />
      <span>{{$t('m.bookdetail3')}}</span>
    </div>

    <afooter></afooter>
  </div>
</template>
<script>
import Vue from 'vue';
import { Rate } from 'vant';
import Clipboard from "clipboard"; //复制版
Vue.use(Rate);
import aheaders from "@/components/Header";
import afooter from "@/components/Footer";
import interfaces from "@/utils/api.js";
export default {
  name: 'orderDetail',
  data() {
    return {
      value: 0,
      showStar: false,
      projectarr: {},
      bookarr: {},
      feedbackarr: {},
      sales: {},
      showSale: false,
      getHeight: {
        minHeight: ''
      }
    }
  },
  computed: {
    //  this.getHeight.minHeight = (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
    //      minHeight(){
    //     return (window.outerHeight/window.outerWidth * 10.8 - 5.96)+'rem'
    //   }
  },
  created() {
    this.getHeight.minHeight = (window.outerHeight / window.outerWidth * 10.8 - 5.96) + 'rem'
    let id = this.$route.params.id
    this.bookdetails(id)
  },
  mounted() {
    $eventbus.$on("changeLang", (res) => {
      let id = this.$route.params.id
      this.bookdetails(id)
    })
  },
  methods: {
    toFormEdit(id) {
      this.$router.push({ name: 'orderForm', params: { orderid: id } })
    },
    deleteForm(id) {
      //  let data={id:id}
      interfaces.deleteForms({ id: id }).then((res) => {
        if (res.code == 0) {
          this.$toast(this.$i18n.t('m.cancalSucess'))
          this.bookdetails(id)
          setTimeout(() => {
            this.$router.push({name:'myOrder'})
          }, 1000);
        }
      })
    },
    toreplace() {
      this.$router.push({ name: 'myOrder' })
    },
    bookdetails(id) {
      interfaces.bookDetail(id).then((res) => {
        this.projectarr = res.projectarr  // 项目信息部分
        this.bookarr = res.bookarr  //预约人信息部分
        this.feedbackarr = res.feedbackarr //评价信息部分
        this.value = parseInt(res.feedbackarr.user_score) //星星评分值
        if (res.sales != '') {
          this.sales = res.sales  //销售人员信息部分
          this.showSale = true
        } else {
          this.showSale = false
        }
      })
    },
    callPhone(num) {
      window.location.href = 'tel://' + num
    },
    copy() {
      var _this = this;
      var clipboard = new Clipboard(".getcopy"); //单页面引用
      clipboard.on("success", e => {
        this.$toast(this.$i18n.t('m.show3'))
        // 释放内存 
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        Message({
          message: this.$i18n.t('m.show4'),
          type: "warning"
        });
        // 释放内存
        clipboard.destroy();
      });
    }
  },
  components: {
    aheaders,
    afooter
  }
}
</script>

<style scoped>
.connectUs {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 1.8rem;
  /* border-bottom: 0.2rem solid #f5f5f5; */
  border-top: 0.2rem solid #f5f5f5;
}
.connectUs button {
  width: 3.9rem;
  height: 0.98rem;
  line-height: 0.98rem;
  color: #fff;
  font-size: 0.38rem;
  border: 1px solid #5975a9;
  background-color: #fff;
  color: #5975a9;
  padding: 0;
  border-radius: 5px;
  display: block;
}
.connectUs .s1 {
  background-color: #5975a9;
  color: #fff;
}
.order-detail {
  width: 100%;
  margin: 0 auto;
  min-height: 100%;
  padding-bottom: 5.96rem;
  box-sizing: border-box;
  position: relative;
  background-color: #fff;
}
.order-detail .order-detail01 {
  width: auto;
  height: 4.5rem;
  border-bottom: 0.2rem solid #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #f5f5f5;
  padding: 0 0.6rem;
}
.order-detail .order-detail01 .order-left {
  width: auto;
  height: auto;
}
.order-detail .order-detail01 .order-left h3 {
  font-size: 0.44rem;
  color: #060606;
  margin-bottom: 0.3rem;
  font-weight: bold;
}
.order-detail .order-detail01 .order-left p {
  font-size: 0.38rem;
  color: #060606;
  line-height: 0.6rem;
  margin-top: 0.8rem;
}
.order-detail .order-detail01 .order-right {
  width: 3.69rem;
  height: 2.65rem;
}
.order-detail .order-detail01 .order-right img {
  width: 100%;
  height: 100%;
}

/* .yijiedan{width:auto;height:3.15rem;border-bottom:0.2rem solid #f5f5f5;display: flex;align-items:center;justify-content:space-between;padding:0 0.6rem;}
.yijiedan .yi-01{width:auto;height:auto;border-radius: 50%;display: flex;align-items:center;justify-content:space-around;}
.yijiedan .yi-01 img{width:1.24rem;height:1.24rem;border-radius: 50%;}
.yijiedan .yi_02{display: flex;align-items: left;flex-direction: column;width: 5.5rem;margin-left: 1rem;}
.yijiedan .yi_02 h3{font-size:0.4rem;color:#000;} 
.yijiedan .yi_02 p{font-size:0.3rem;color:#929292;margin-top:0.2rem;line-height: 0.5rem;} 
.yijiedan .yi_03{width:auto;height:auto;}
.yijiedan .yi_03 img{width:0.68rem;height:0.68rem;} */

.yijiedan {
  width: auto;
  height: 3.15rem;
  border-bottom: 0.2rem solid #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.6rem;
}
.yijiedan .yi-01 {
  width: auto;
  height: auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.yijiedan .yi-01 img {
  width: 1.24rem;
  height: 1.24rem;
  border-radius: 50%;
}
.yijiedan .yi_02 {
  display: flex;
  align-items: left;
  flex-direction: column;
  width: 5.5rem;
  margin-left: 1rem;
}
.yijiedan .yi_02 h3 {
  font-size: 0.4rem;
  color: #000;
}
.yijiedan .yi_02 p {
  font-size: 0.3rem;
  color: #929292;
  margin-top: 0.2rem;
  line-height: 0.5rem;
}
.yijiedan .yi_03 {
  width: auto;
  height: auto;
}
.yijiedan .yi_03 img {
  width: 0.68rem;
  height: 0.68rem;
}
.order-detail02 {
  width: auto;
  height: auto;
  display: flex;
  align-items: left;
  flex-direction: column;
  padding: 0 0.6rem 0.7rem;
  justify-content: center;
  border-bottom: 0.2rem solid #f5f5f5;
}
.order-detail02 p {
  font-size: 0.35rem;
  line-height: 1rem;
  color: #060606;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}
.order-detail02 p span {
  color: #929292;
  width: 2.3rem;
}

.order-detail03 {
  width: auto;
  height: 2.96rem;
  display: flex;
  align-items: left;
  flex-direction: column;
  padding: 0 0.6rem;
  justify-content: center;
}
.order-detail03 p {
  font-size: 0.35rem;
  line-height: 0.96rem;
  color: #060606;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.order-detail03 span {
  color: #929292;
  width: 2.3rem;
}
.order-detail03 em {
  color: #060606;
  font-size: 0.36rem;
}

.kefu {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.8rem;
  border-bottom: 0.2rem solid #f5f5f5;
  border-top: 0.2rem solid #f5f5f5;
}
.kefu img {
  width: 0.35rem;
  height: 0.35rem;
  margin-right: 0.3rem;
}
.kefu span {
  font-size: 0.35rem;
  color: #000000;
}

.pingjia {
  width: 100%;
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.66rem;
}
.pingjia em {
  font-size: 0.4rem;
  color: #060606;
  font-weight: bold;
}
.pingjia .van-rate {
  width: auto;
  height: auto;
}
</style>