<template>
  <div class="history-list">
    <div class="hl-item" v-for="(historys, index) in showList" :key="index" :history="historys">
      <div class="hli-module" v-for="(history, index) in historys" :key="history.code">
        <div v-if="index === 0" class="hli-date">{{history.date}}</div>
        <div class="hli-time">{{history.time}}</div>
        <a class="hli-link" :href="history.uri || history.url">{{history.code}}</a>
        <span class="hli-brand">{{history.brand}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import u from '../js/utils'
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState(['historys']),
    showList() {
      let list = null // 展示用的 list
      if(this.historys) {
        list = []
        let subList = null // 展示用的内部小 list
        let currentDate = '' // 记录 subList 的日期
        // 分析日期
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let today = `${year}-${month}-${day}`
        let yestoday = `${year}-${month}-${day - 1}`
        this.historys.forEach(item => {
          if(item.date !== currentDate) {
            subList = [] // 清空
            currentDate = item.date // 更新当前日期
            if(currentDate === today) item.date = '今天'
            else if(currentDate === yestoday) item.date = '昨天'
            subList.push(item)
            list.push(subList) // 添加进展示用的 list
          }
          else {
            subList.push(item) // subList 添加内容
          }
        })
      }
      return list
    }
  }
}
</script>

<style lang="less" scoped>
.history-list {
  width: 1024px;
  min-height: 400px;
  box-sizing: border-box;
  border: 1px solid #d8d8d8;
  padding: 8px;
  margin-bottom: 8px;

  .hl-item {
    line-height: 32px;

    .hli-module {

      &>* {
        display: inline-block;
      }

      .hli-date {
        width: 100%;
        font-size: 18px;
      }

      .hli-time {
        width: 80px;
        margin-left: 20px;
        color: #999;
      }

      .hli-link {
        color: #00C7FF;
        cursor: pointer;
        width: 200px;
        text-decoration: none;
      }
    }
  }
}
</style>
