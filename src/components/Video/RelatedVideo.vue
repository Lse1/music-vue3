<template>
    <div class="relatedvideo">
        <div class="relatedvideo-top">
            <h3>相关视频</h3>
        </div>
        <div class="relatedvideo-list">
            <div class="item" v-for="value in videolist" :key="value.vid">
                <div @click="Tips" v-show="flag">
                <img v-lazy="value.coverUrl" alt="">
                <p>{{value.title}}</p>
                </div>
            </div>
            <div @click="Tips" v-show="!flag">
                    当你看到这句话时说明你想播放相关视频，但是很抱歉，可能因为没有登录的原因，
                    我获取到的数据只有封面和标题，没有视频数据。
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'RelatedVideo',
  data: function () {
    return {
      flag: true
    }
  },
  props: {
    videolist: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    Tips () {
      this.flag = !this.flag
    }
  }
}
</script>

<style lang="scss" scoped>
.relatedvideo{
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
  @include bg_sub_color();
  .relatedvideo-top{
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    h3{
      @include font_size($font-large);
      font-weight: bold;
      @include font_color();
    }
  }
  .relatedvideo-list{
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
