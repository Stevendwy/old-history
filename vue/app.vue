<template>
  <div id="app">
    <brand-selector></brand-selector>
    <history-list :request="historyRequest"></history-list>
    <pagination
      :count-total='paginationTotal'
      :count-page="5"
      :pageClick="paginationPageClick"></pagination>
  </div>
</template>

<script>
import brandSelector from './brand-selector.vue'
import historyList from './history-list.vue'
import pagination from 'pagination-vue'
import u from '../js/utils'
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState([
      'paginationTotal',
      'historyRequest',
      "historyType"
    ])
  },
  mounted() {
    // 设置标题
    // document.getElementById('title-content').innerText = this.$store.state.historyType === 'part' ? '零件号历史查询记录' : 'VIN车架号历史查询记录'
    let title = ""
    if(this.historyType === 'part') {
      title = "零件号历史查询记录"
    }else if(this.historyType === 'vin') {
      title = "VIN车架号历史查询记录"
    }else if(this.historyType === 'oe_part') {
      title = "原厂OE号历史查询记录"
    }else {
      title = "品牌编号历史查询记录"
    }
    document.getElementById('title-content').innerText = title
    this.paginationPageClick(0);
  },
  methods: {
    paginationPageClick(index) {
      this.$store.commit({
        type: 'updateSelectedIndex',
        index
      })
      this.$store.dispatch('ajaxHistorys')
    }
  },
  components: {
    brandSelector,
    historyList,
    pagination
  }
}
</script>

<style scoped lang="less">
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: e('calc(100% - 152px)');

  .pagination {
    width: 1024px;
  }
}
</style>
