<template>
  <div class="login">
    <h1>登录</h1>
    <cube-form
      :model="formData"
      :schema="schema"
      @submit="handleLogin"
      @validate="haneldValidate"
      >
    </cube-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      /**
       * 通过数据驱动 去生成表单的形式
       */
      schema: {
        fields: [
          {
            type: 'input',
            modelKey: 'username',
            label: '用户名',
            props: {
              placeholder: '请输入用户名'
            },
            rules: {
              required: true
            },
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey: 'password',
            label: '密码',
            props: {
              type: 'password',
              placeholder: '请输入密码',
              eye: {
                open: true
              }
            },
            rules: {
              required: true
            },
            trigger: 'blur'
          },
          {
            type: 'submit',
            label: '登录'
          }
        ]
      }
    }
  },
  methods: {
    // 登录方法
    handleLogin (e) {
      e.preventDefault()
      this.$store.dispatch('login', this.formData)
        .then(code => {
          if (code) {
            const path = this.$route.query.redirect || '/'
            console.log(path)
            this.$router.push(path)
          }
        }).catch(err => {
          console.log(err)
          const toast = this.$createToast({
            txt: '登录失败',
            type: 'error'
          })
          toast.show()
        })
    },
    // 哪一项出错
    haneldValidate (ret) {
      console.log(ret)
    }
  }
}
</script>
<style lang="scss" scoped>
  .login {
    padding: 20px 0;
    & > h1 {
      font-size: 42px;
      line-height: 55px;
      margin-bottom: 30px;
      text-align: center;
    }
  }
</style>
