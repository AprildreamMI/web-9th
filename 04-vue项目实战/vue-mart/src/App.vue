<template>
  <div id="app">
    <transition name="router-move">
      <router-view />
    </transition>
    <div class="tabBar">
      <cube-tab-bar
        v-model="selectedLabelDefault"
        :data="tabs"
        @click="clickHandler"
        @change="changeHandler">
      </cube-tab-bar>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 选中项的默认值
      selectedLabelDefault: '',
      // 通过数据驱动，具体渲染页面
      tabs: [
        {
          label: 'Home',
          value: '/home',
          icon: 'cubeic-home'
        },
        {
          label: 'Cart',
          value: '/cart',
          icon: 'cubeic-mall'
        },
        {
          label: 'Me',
          value: '/me',
          icon: 'cubeic-person'
        }
      ]
    }
  },
  created () {
    this.selectedLabelDefault = this.$route.path
  },
  methods: {
    clickHandler () {

    },
    changeHandler (value) {
      console.log('tabbar切换', value)
      this.$router.push(value)
    }
  },
  watch: {
    $route (route) {
      this.selectedLabelDefault = route.path
    }
  }
}
</script>

<style lang="scss">
  .tabBar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 10px 10px 20px #888888;
  }
  // 入场前状态
  .router-move-enter {
    transform: translate3d(-100%, 0, 0);
  }

  // 离场状态
  .royte-move-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  // 激活状态 已经正位
  .router-move-enter-active, .router-move-leave-active {
    transition: all 0.3s;
  }
</style>
