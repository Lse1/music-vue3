<template>
  <div id="app">
    <MainHeader></MainHeader>
    <Tabbar></Tabbar>
    <!-- <keep-alive include="Singer, Search">
      <router-view/>
    </keep-alive> -->
    <router-view  v-slot="{ Component }">
      <transition>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
    <!-- <router-view></router-view> -->
    <!-- <Player></Player> -->
  </div>
</template>

<script>
import MainHeader from './components/MainHeader'
import Tabbar from './components/Tabbar'
// import Player from './views/Player'
export default {
  name: 'App',
  components: {
    MainHeader,
    Tabbar
    // Player
  }
}
</script>

<style lang="scss">
</style>
