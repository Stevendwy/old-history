<template>
  <span>
    <input type="radio" name="brand" :value="brand[0]" @click="clicked(brand)" :checked="index === 0"/>
    <label :for="brand[0]">{{brand[1]}}</label>
  </span>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  methods: {
    clicked(brand) {
      this.$store.commit({
        type: 'updateBrand',
        brand: brand[0]
      }),
      this.ajaxHistorys()
    },
    ...mapActions([
      'ajaxTotal',
      'ajaxHistorys'
    ])
  },
  props: ['brand', 'index']
}
</script>

<style scoped lang='less'>

</style>