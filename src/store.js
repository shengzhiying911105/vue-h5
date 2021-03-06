import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 'en-US',
    serviceInfo: null
    // minHeight:''
  },
  getters: {
    // minHeight: state => state.minHeight,
  },
  mutations: {
    setDefaultLang() {
      let lanBase = localStorage.getItem('lanBase')
      if (lanBase) {
        this.commit('changeLang', lanBase == 1 ? 'zh-CN' : 'en-US')
      } else {
        if (window.navigator && window.navigator.language.includes('zh')) {
          this.commit('changeLang', 'zh-CN')
        } else {
          this.commit('changeLang', 'en-US')
        }
      }
    },
    changeLang(state, playload) {
      state.lang = playload
    },
    setServiceInfo(state, playload) {
      state.serviceInfo = playload
    }
    // setDefaultHeight(state){
    //   this.state.minHeight = (window.outerHeight/window.outerWidth * 10.8 - 7.2)+'rem'
    //  },
  },

});