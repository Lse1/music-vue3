<template>
  <Header class="header">
    <template v-slot:left>
      <div class="header-left"
           @click.stop="back"></div>
    </template>
    <template v-slot:center>
      <p class="header-title">{{title}}</p>
    </template>
    <template v-slot:right>
      <div class="header-right"></div>
    </template>
  </Header>
</template>

<script>
import Header from '../Header'
export default {
  name: 'DetailHeader',
  components: {
    Header
  },
  methods: {
    back () {
      window.history.back()
    }
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/variable';
@import '../../assets/css/mixin';
.header {
  .header-left {
    height: 100%;
    @include bg_img('../../assets/images/back');
  }
  // .header-right{
  //   @include bg_img('../../assets/images/more')
  // }
  .header-title {
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
    @include no-wrap();
  }
}
</style>
