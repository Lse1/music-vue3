<template>
  <div class="videomore">
    <div class="videomore-list">
      <div class="item"
           v-for="value in latestmv"
           :key="value.id"
           @click.stop="selectItem(value.id, value.name)">
        <img :src="value.cover"
             alt="">
        <!-- <img v-lazy="value.cover"> -->
        <p>{{value.name}}</p>
      </div>
    </div>
    <!-- <transition>
      <router-view></router-view>
    </transition> -->
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>

export default {
  name: 'VideoMore',
  props: {
    latestmv: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    selectItem (id, title) {
      //   console.log(id, title)
      // const title1 = 'assd0'
      this.$router.push({
        path: `/video/videoplayer/${id}/${title}`
      })
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin';
@import '../../assets/css/variable';
.videomore {
  @include bg_sub_color();
  .videomore-list {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20px 0;
    .item {
      width: 100%;
      padding-bottom: 20px;
      text-align: center;
      img {
        width: 700px;
        height: 400px;
        border-radius: 20px;
      }
      p {
        @include clamp(2);
        @include font_color();
        @include font_size($font_medium_s);
        text-align: center;
      }
    }
  }
}

.v-enter {
  transform: translateX(100%);
}
.v-enter-to {
  transform: translateX(0%);
}
.v-enter-active {
  transition: transform 1s;
}
.v-leave {
  transform: translateX(0%);
}
.v-leave-to {
  transform: translateX(100%);
}
.v-leave-active {
  transition: transform 1s;
}
</style>
