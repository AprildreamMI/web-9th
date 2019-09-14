<template>
  <div class="x_input">
    <input v-model="$_value" />
  </div>
</template>
<script>
export default {
  props: {
    value: {
      required: true
    }
  },
  computed: {
    $_value: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
        this.$parent.$emit('validate')
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>