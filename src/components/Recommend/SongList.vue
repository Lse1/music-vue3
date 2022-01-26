<template>
    <div class="song">
      <div class="song-top">
        <h3>最新音乐</h3>
        <div class="more" @click="Seemore('最新音乐')">查看更多&gt;&gt;</div>
      </div>
      <SongListItem :songs="songs"></SongListItem>
    </div>
</template>

<script>
import SongListItem from '../SongListItem'
export default {
  name: 'SongList',
  components: {
    SongListItem
  },
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    Seemore (title) {
      this.$emit('selectmore', title)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.song{
  width: 100%;
  @include bg_sub_color();
  .song-top{
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
  .song-list{
    width: 100%;
    overflow: hidden;
    .item{
      width: 100%;
      display: flex;
      height: 200px;
      align-items: center;
      padding: 0 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      img{
        width: 150px;
        height: 150px;
        border-radius: 20px;
        margin-right: 20px;
      }
      div{
        h3{
          @include font_size($font_large);
          @include font_color();
        }
        p{
          @include font_size($font_samll);
          @include font_color();
          opacity: 0.6;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
