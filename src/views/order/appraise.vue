<template>
  <div class="appraise">
    <aheaders status="3" @toback="toreplace" :showLan='true'></aheaders>
    <div class="appraise-01">
      <h3>{{$t('m.appraise1')}}</h3>
      <van-rate v-model="value" :size="25" :change="valueChange(value,currentIndex)" />
      <p v-show="toshows">
        <!-- <span @click="toaddTag(item,index)" :class='{tagons:tags}' v-for='(item,index) in iconList' :key='index'>
            
        </span>-->
        <em v-for="(item,index) in iconList" :key="index">
          <span
            v-for="(b,i) in item"
            :key="i"
            v-show="index+1==value"
            @click="toaddTag($event,b,index)"
            :class="{tagons:tags}"
          >{{b}}</span>
        </em>

        <!-- <span>房屋合适</span>
               <span>设施齐全</span>
        <span>风格喜欢</span>-->
      </p>
      <p>
        <textarea name v-model="user_desc" id cols="30" rows="3" :placeholder="$t('m.appraise2')"></textarea>
      </p>
      <button class="btn" @click="todetailOrder" :disabled='isclick'>{{$t('m.orderform')}}</button>
    </div>
    <afooter class="myFooter"></afooter>
  </div>
</template>
<script>
import Vue from 'vue';
import { Rate } from 'vant';
import interfaces from "@/utils/api.js";
Vue.use(Rate);
import aheaders from "@/components/Header";
import afooter from "@/components/Footer";

export default {
  name: 'appraise',
  data() {
    return {
      value: 0,
      tags: false,
      toshows: false,
      ids: '',
      iconList: [],
      currentIndex: 0,
      show2: 0,
      selected: false,
      user_content:[],
      user_desc: '',
      getHeight: {
        minHeight: ''
      },
      disabled:false
    };
  },

  created() {
    this.ids = this.$route.params.id;
    this.appraisesIcon(this.ids)
    // this.getHeight.minHeight = (window.outerHeight / window.outerWidth * 10.8 - 5.96) + 'rem'
  },
  mounted() {
    $eventbus.$on("changeLang", (res) => {
      this.ids = this.$route.params.id;
      this.appraisesIcon(this.ids)
    })
  },
 computed:{
  //  (!this.user_content[0]&&!this.user_content[1]&&!this.user_desc)
   isclick(){
      if(this.value==0) return true;
      else return false
    

    }
 },
  methods: {
    toreplace() {
      this.$router.go(-1)
    },
    toaddTag(e, item, list) {
      this.user_content=[]
      // let add = ''
      // if (e.target.className.indexOf('tagons') == -1) {
      //   if (this.value == list + 1) {
      //     e.target.className = 'tagons'
      //     this.user_content += ',' + item
      //     this.user_content = this.user_content.substr(1)
      //     console.log(this.user_content)
      //   } else {
      //     e.target.className = ''
      //   }
      // } else {
      //   e.target.className = ''
      // }
      // this.tags=true

      var str = {};
      var str2 = "";
      if (e.target.className.indexOf("tagons") == -1) {
          e.target.className = "tagons";
          this.user_content.push(item);
      } else {
        e.target.className = "";
        this.user_content.forEach((item, index) => {
          if (item == list) {
            this.user_content.splice(index, 1);
          }
        });
      }

    },
    todetailOrder() {
      if (this.value == 0) {
         this.$toast(this.$i18n.t('m.appraise3'));
      } else {
        this.appraises()
      }
    },
    valueChange(value) {
      if (value > 0) {
        this.toshows = true
      }
    },

    //    1评价保存接口
    appraises() {
      let inter = "";
      let inter2 = "";
      this.user_content.forEach((item, index) => {
        inter += "," + item;
        return (inter2 = inter.substr(1));
      });

      let bookid = this.ids
      let user_score = this.value
      let user_content = inter2
      let user_desc = this.user_desc
      
      console.log(user_content)
      let data = {
        bookid, user_score, user_content, user_desc
      }
      interfaces.orderSave(data).then((res) => {
        if (res.code == 0) {
          this.$toast({
            message: this.$i18n.t('m.appraise4'),
            icon: 'passed'
          });
          // console.log(this.ids)
          this.$router.push({ name: 'orderDetail', params: { id: this.ids } })
        }
      })
    },

    //    标签获取
    appraisesIcon(id) {
      interfaces.orderIcon(id).then((res) => {
        console.log(res)
        this.iconList = res
      })
    }
  },
  components: {
    aheaders,
    afooter
  },
}
</script>
<style scoped>
.appraise{width:100%;margin:0 auto; min-height: 100%;padding-bottom:5.96rem;box-sizing: border-box;position:relative;background-color: #fff;}
.appraise .appraise-01{width:90%;height:auto;padding:1.29rem 0 0;border-top:1px solid #f5f5f5;margin:0 auto;}
.appraise .appraise-01 h3{font-size:0.6rem;color:#000;margin-bottom:0.7rem;font-weight: bold;line-height: 1.5;}
.appraise .appraise-01 p{width:auto;height:auto;}
.appraise .appraise-01 p span{width:auto;height:0.68rem;line-height:0.68rem;display: inline-block;  border:1px solid #bfbfbf;padding:0 0.3rem;font-size:0.3rem;margin-right:0.3rem;}
.appraise .appraise-01 p textarea{width: 92%;border: 0;line-height: 0.4rem;font-size: 0.4rem;margin-top:0.5rem;}
.appraise .appraise-01  textarea{
  border-bottom: 1px solid #ddd !important;
  font-size: 0.3rem !important;
}
.btn{width: 8.07rem;
    height: 1.0rem;
    line-height: 1.0rem;
    color: #fff;
    text-align: center;
    background-color: #5975a9;
    font-size: 0.3rem;
    border: none;
    /* margin-left: 10%; */
    border-radius: 0.1rem;
    margin: 1.2rem auto 1.64rem;
    /* margin-left:0.8rem; */
    display: block;
    }
  .btn[disabled]{background-color: #ddd;color:#333;}  
.btn a{color:#fff;}
   .appraise .appraise-01 p .tagons{background-color:#5975a9 ;color:#fff;}
</style>