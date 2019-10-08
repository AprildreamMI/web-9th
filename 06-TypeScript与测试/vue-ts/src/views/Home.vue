<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <TsComOne msg="Ts 扫盲"></TsComOne>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import TsComOne from '@/components/TsComOne.vue';

@Component({
  components: {
    HelloWorld,
    TsComOne,
  }, 
})
export default class Home extends Vue {}
</script>
