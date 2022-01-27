<template>
    <div class="VideoDetail">
    <div class="VideoDetail-top">
      <h3>{{title}}</h3>
      <div class="more" @click="Seemore(title)">查看更多&gt;&gt;</div>
    </div>
    <div class="VideoDetail-list">
      <div class="item" v-for="value in latestmv" :key="value.id" @click.stop="selectItem(value.id, value.name)">
        <img v-lazy="value.cover">
        <p>{{value.name}}</p>
      </div>
    </div>
    </div>
</template>

<script>

export default {
  name: 'VideoDetail',
  props: {
    latestmv: {
      type: Array,
      default: () => [],
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    selectItem (id, title) {
      // console.log(id)
      this.$emit('select', id, title)
    },
    Seemore (title) {
      this.$emit('selectmore', title)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
  .VideoDetail{
  @include bg_sub_color();
  .VideoDetail-top{
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    h3{
      @include font_size($font-large);
      font-weight: bold;
      @include font_color();
    }
    .more{
      // background: #000;
      @include font_size($font_medium);
      margin-right: 50px;
      text-align: center;
    }
  }
  .VideoDetail-list{
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20px 0;
    .item{
      width: 100%;
      padding-bottom: 20px;
      text-align: center;
      img{
        width: 700px;
        height: 400px;
        border-radius: 20px;
      }
      p{
        @include clamp(2);
        @include font_color();
        @include font_size($font_medium_s);
        text-align: center;
      }
    }
  }
}
</style>
