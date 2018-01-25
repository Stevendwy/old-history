import Vue from 'vue'
import Vuex from 'vuex'
import u from '../utils'
import historyBase from './common/history-type'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // historyType: location.href.includes('/histroy/parts') ? 'part' : 'vin', // 是 vin 历史还是 part 历史
    historyType: historyBase,
    paginationTotal: 0, // 页码
    selectedIndex: -1, // 选中页码
    historys: [], // 历史记录列表
    brands: [], // 品牌列表
    selectedBrand: 'all' // 当前选中品牌
  },

  getters: {
    totalRequest(state) {
      return {
        brands: state.selectedBrand,
        c: state.historyType
      }
    },
    historyRequest(state) {
      return {
        brands: state.selectedBrand,
        n: state.selectedIndex
      }
    }
  },

  mutations:{
    updateBrand(state, payload) {
      state.selectedBrand = payload.brand
      state.selectedIndex = 0
    },
    updateSelectedIndex(state, payload) {
      state.selectedIndex = payload.index
    }
  },
  actions: {
    ajaxHistorys({state, getters}) {
      // let url = '/histroy/vinall'
      let url
      let _obj = getters.historyRequest    
      if(state.historyType === 'part') url = '/histroy/partall'
      else if(state.historyType === 'vin') url = '/histroy/vinall'
      else if(state.historyType === 'oe_part'){
        url = "/history/articles_oenumber"
        _obj.page = _obj.n+1
      }else {
        url = "/history/articles_number"
        _obj.page = _obj.n+1        
      }
      //   url = '/history/articles'
      //   if(state.historyType === 'oe_part') {
      //     _obj.type = "oe_number"
      //     _obj.page = _obj.n+1
      //     // delete _obj.n
      //   }else {
      //     _obj.page = _obj.n+1          
      //     // delete _obj.n
          
      //     _obj.type = "article_number"
      //   }
      // } 
      u.get(url, _obj, res => {
        state.historys = res.data
        if(res.total_page) {
          state.paginationTotal = res.total_page          
        }else {
          state.paginationTotal = res.amount_page                    
        }
      })
    },

    ajaxBrands({state}) {
      // debugger;
      if(state.historyType === 'oe_part' || state.historyType === 'article_part') {
        return
      }
      let obj = {
        _b: state.historyType
      }
      u.get('/histroy/brands', obj, res => {
        res.data.unshift(['all', '全部'])
        state.brands = res.data
      })
    }
  }
})