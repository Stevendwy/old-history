import Vue from 'vue'
import store from './store/root'
import app from '../vue/app.vue'
import userAgreement from '../vue/user-agreement.vue'

new Vue({
  el: '#vue',
  store,
  template: '<app></app>',
  components: {
    app
  }
})


// 用户协议相关, 无视即可
new Vue({
  el: '#user-agreement',
  store,
  data: {
    show: false
  },
  template: '<user-agreement :show="show"></user-agreement>',
  components: {
    userAgreement
  },
  methods: {
    toggle() {
      this.show = !this.show
    }
  },
  mounted() {
    window.toggleUserAgreement = this.toggle
  }
})