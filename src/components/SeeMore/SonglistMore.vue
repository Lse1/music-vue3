<template>
    <div class="Songlistmore">
    <div class="Songlistmore-list">
      <div class="item" v-for="value in latestmv" :key="value.id" @click.stop="selectItem(value.id)">
       <img :src="value.picUrl" alt="">
        <!-- <img v-lazy="value.picUrl" alt=""> -->
        <p>{{value.name}}</p>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'SonglistMore',
  props: {
    latestmv: {
      type: Array,
      default: () => [],
      required: true
    },
    type: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    selectItem (id) {
      // console.log(id)
    //   this.$emit('select', id, this.type)
      this.$router.push({
        path: `/recommend/detail/${id}/${this.type}`
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.Songlistmore{
  @include bg_sub_color();
  .Songlistmore-list{
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20px 0;
    .item{
      width: 200px;
      padding-bottom: 20px;
      img{
        width: 100%;
        height: 200px;
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
