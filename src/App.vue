<script setup>
import { RouterView } from 'vue-router'
import LeftNavigationBar from './views/LeftNavigationBar.vue'
</script>

<template>
  <main>
    <div id="navigation"><LeftNavigationBar /></div>
    <div id="router-view"><RouterView /></div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  height: 100vh;
}
#navigation {
  width: 18.5%;
  background-color: #ffffff;
  padding: 24px;
}
#router-view {
  width: 81.5%;
  background-color: #f2f4f7;
  padding: 80px;
}
@media screen and (min-width: 1537px) {
  #navigation {
    width: 9.25%;
  }
}
</style>
