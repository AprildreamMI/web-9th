<template>
  <div id="app">
    <x-form :model="ruleForm" :rules="rules">
      <x-form-item label="用户名" prop="name">
        <x-input v-model="ruleForm.name"></x-input>
      </x-form-item>
      <x-form-item label="密码" prop="password">
        <x-input v-model="ruleForm.password"></x-input>
      </x-form-item>
    </x-form>
  </div>
</template>

<script>
import xForm from './components/x-form'
import xFormItem from './components/x-form-item'
import xInput from './components/x-input'
export default {
  name: 'app',
  data () {
    return {
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  components: {
    xForm,
    xFormItem,
    xInput
  }
}
</script>

<style>

</style>
