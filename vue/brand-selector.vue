<template>
  <div class="brand-selector">
    <div class="brand-selecteor-content">
      <span v-if="isShow()">品牌检索: </span>
      <brand-radio v-for="(brand, index) in brands" :key="index" :brand="brand" :index="index"></brand-radio>
    </div>
    <button class="clear-all" @click="clearAll">清空</button>
  </div>
</template>

<script>
import brandRadio from './brand-selector-radio.vue'
import u from '../js/utils'
import {mapState} from 'vuex'

export default {
  computed: mapState([
    'brands',
    'selectedBrand',
    'historyType'
  ]),
  
  mounted() {
    this.$store.dispatch('ajaxBrands')
  },
  
  methods: {
    clearAll() {
      if(confirm("确认清空吗?")) {
        let url
        let obj = {
          off: true
        }
        if(this.historyType === 'part') {
          url = "/search/partoff"
        }else if(this.historyType === 'vin') {
          url = "/search/calloff"
        }else if(this.historyType === 'oe_part'){
          url = "/history/articles_oenumber_empty"
        }else {
          url = "/history/articles_number_empty"
        }
         u.get(url, obj, res => {
            location.href = "/"
          })
      }
    },
    isShow() {
        let isShow;
        if(this.historyType === 'part') {
          isShow = true
        }else if(this.historyType === 'vin') {
          isShow = true
        }else {
          isShow = false
        }
        return isShow
    }
  },
  components: {
    brandRadio
  }
}
</script>

<style scoped lang="less">
.brand-selector {
  width: 1024px;
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  position: relative;

  .brand-selecteor-content {
    span {
      margin-left: 8px;
    }
  }
  .clear-all {
    width: 80px;
    height: 32px;
    margin-bottom: 5px;
    background-color: #0D6FB8;
    color: white;
    outline: none;
    border: 0;
    box-shadow: inset 0px -2px 0px 0px #145D93;
    border-radius: 4px;
    margin-top: 4px;
    cursor: pointer;
  }
}
</style>
