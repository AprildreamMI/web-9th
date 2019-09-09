<template>
  <form>
    <slot></slot>  
  </form>  
</template>
<script>
export default {
  //  分享数据给子组件
  provide () {
    return {
      xForm: this
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>

</style>