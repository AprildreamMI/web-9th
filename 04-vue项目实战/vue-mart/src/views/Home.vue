<template>
  <div class="home">
    <cube-slide class="slide" ref="slide" :data="slider" :interval="3000">
      <cube-slide-item v-for="(item, index) in slider" :key="index">
        <router-link :to="`/detail/${item.id}`">
          <img :src="item.img">
        </router-link>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'home',
  computed: {
    // 普通写法 是数组
    // 模块写法 是对象
    ...mapState({
      slider: state => state.goods.slider
    }),
    // 没有开启命名空间，可以直接用数组
    ...mapGetters(['goods'])
  },
  created () {
    console.log(1)
    // 获取数据
    this.getGoodsInfo()
  },
  methods: {
    ...mapActions(['getGoodsInfo'])
  }
}
</script>
<style lang="scss" scoped>
  .slide {
    height: 300px;
  }
</style>
