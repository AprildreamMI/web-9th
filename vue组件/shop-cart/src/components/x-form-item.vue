<template>
  <div class="form-item">
    <div class="label">
      {{ label }}
    </div>
    <div>
      <slot></slot>
      <p v-show="isShowErrorMessage">{{ errorMessage }}</p>
    </div>
  </div>  
</template>
<script>
import asyncValidator from 'async-validator'
export default {
  inject: ['xForm'],
  data () {
    return {
      isShowErrorMessage: '',
      errorMessage: ''
    }
  },
  props: {
    label: {
      type: String
    },
    prop: {
      type: String
    }
  },
  mounted () {
    this.$on('validate', this.validate)
  },
  methods: {
    // 进行验证
    validate () {
      let propRules = this.xForm.rules[this.prop]
      let propValue = this.xForm.model[this.prop]
      const asyncvalidator = new asyncValidator({
        [this.prop]: propRules
      })
      asyncvalidator.validate({[this.prop]:propValue}, error => {
        if (error) {
          this.errorMessage = error[0].message
          this.isShowErrorMessage = true
        } else {
          this.errorMessage = ''
          this.isShowErrorMessage = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>