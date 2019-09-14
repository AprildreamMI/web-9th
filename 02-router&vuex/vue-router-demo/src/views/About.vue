<template>
<!-- 通过prop的方式获取/:id 中的id -->
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{ id }}</h2>
    <h3>{{name}} ~ {{ age }}</h3>
    <h3>{{name}} ~ {{ bAge }}</h3>
    <div>
      <button @click="addB">+ Bage</button>
      <button @click="addA">+ Aage</button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['id'],
  methods: {
      addB () {
        console.log(this.$store)
        // 只有state分模块 其他的不分模块 所以规划的时候就不要重名
        this.$store.commit('updateAge')
      },
      addA () {
        this.$store.A.commit('updateAge')
      }
  },
  computed: {
    ...mapState({
      age: state => state.A.age,
      bAge: state => state.B.age,
      name: state => state.B.name
    })
  }
}
</script>