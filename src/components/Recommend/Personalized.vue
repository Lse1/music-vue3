<template>
    <div class="personalized">
    <div class="personalized-top">
      <h3>{{title}}</h3>
      <div class="more" @click="Seemore(title)">查看更多&gt;&gt;</div>
    </div>
    <div class="personalized-list">
      <div class="item" v-for="value in personalized" :key="value.id" @click.stop="selectItem(value.id)">
       <img :src="value.picUrl" alt="">
        <!-- <img v-lazy="value.picUrl" alt=""> -->
        <p>{{value.name}}</p>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'Personalized',
  props: {
    personalized: {
      type: Array,
      default: () => [],
      required: true
    },
    title: {
      type: String,
      default: '',
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
      this.$emit('select', id, this.type)
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
.personalized{
  @include bg_sub_color();
  .personalized-top{
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
  .personalized-list{
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
