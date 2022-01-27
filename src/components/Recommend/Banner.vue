<template>
  <swiper class="banner"
          v-if="banners.length > 1"
          :options="swiperOptions">
    <swiper-slide v-for="value in banners"
                  :key="value.bannerId"
                  class="item">
      <img :src="value.pic"
           alt="">
    </swiper-slide>
    <template v-slot:pagination>
      <div class="swiper-pagination"></div>
    </template>
  </swiper>
</template>

<script>
// import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

// import style (>= Swiper 6.x), directive
// import 'swiper/swiper-bundle.css'
// import style (<= Swiper 5.x)
// import 'swiper/css/swiper.css'
// import 'swiper/dist/css/swiper.css'
// import { Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
// import 'swiper/css'
import 'swiper/swiper.min.css'
export default {
  name: 'Banner',
  data () {
    return {
      swiperOptions: {
        loop: true, // 循环模式选项
        autoplay: {
          delay: 1000, // 自动切换的时间间隔，单位ms
          stopOnLastSlide: false, // 当切换到最后一个slide时停止自动切换
          disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay。
        },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>

<style scoped lang="scss">
.banner {
  .item {
    img {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
<style lang="scss">
@import '../../assets/css/mixin';
/*注意点: 如果想覆盖swiper的样式, 那么style标签不能是scoped的, 否则无法覆盖*/
.banner {
  .swiper-pagination-bullet {
    width: 16px;
    height: 16px;
    background: #fff;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    @include bg_color();
    /*background: #f00;*/
  }
}
</style>
