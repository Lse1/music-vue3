<template>
  <Header class="header">
    <template v-slot:left>
      <div class="header-left"></div>
    </template>
    <template v-slot:center>
      <p class="header-title">仿网易云音乐</p>
    </template>
    <template v-slot:right>
      <div class="header-right" @click.stop="accountClick"></div>
    </template>
  </Header>
</template>

<script>
import Header from './Header'
export default {
  name: 'MainHeader',
  components: {
    Header
  },
  methods: {
    accountClick () {
      this.$router.push('/account')
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
  .header{
    .header-left{
      height: 100%;
      @include bg_img('../assets/images/logo')
    }
    .header-right{
      height: 100%;
      @include bg_img('../assets/images/account')
    }
    .header-title{
      text-align: center;
      line-height: 100px;
      color: #fff;
      font-weight: bold;
      @include font_size($font_medium);
    }
  }
</style>
