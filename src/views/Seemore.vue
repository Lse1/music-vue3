<template>
  <div class="seemore">
    <div class="seemore-warpper">
      <div class="seemore-top">
        <DetailHeader :title="this.$route.params.title1"></DetailHeader>
      </div>
      <div class="seemore-list"
           id="setheight">
        <ScrollView ref='wrapper'>
          <div ref="gdh">
            <SeeMoreItem :title="this.$route.params.title1"
                         :latestmv="latestmv"
                         v-show="true"></SeeMoreItem>
            <div class="seemore-paging">
              <div class="paging-last"
                   @click="last">上一页</div>
              <input type="number"
                     oninput="if(value<1)value=1;"
                     class="paging-value"
                     value="1"
                     ref="input">
              <div class="paging-next"
                   @click="next">下一页</div>
              <div class="paging-next"
                   @click="PageChange">跳转</div>
            </div>
          </div>
        </ScrollView>
      </div>
    </div>
  </div>
</template>

<script>
import DetailHeader from '../components/Detail/DetailHeader.vue'
import SeeMoreItem from '../components/SeeMoreItem.vue'
import ScrollView from '../components/ScrollView'
import { getRecommendVideo, getNewestVideo, getOtherVideo } from '../api/index'
export default {
  name: 'Seemore',
  components: {
    DetailHeader,
    SeeMoreItem,
    ScrollView
  },
  data () {
    return {
      latestmv: [],
      num: 12,
      nums: 20
    }
  },
  methods: {
    last () {
      this.$refs.input.value = parseInt(this.$refs.input.value - 1)
      // console.log(typeof this.$refs.input.value)
      this.PageChange()
    },
    next () {
      // console.log('123')
      this.$refs.input.value = parseInt(this.$refs.input.value) + 1
      this.PageChange()
      this.$refs.wrapper.scrollTo(0, 0, 3)
    },
    PageChange () {
      const off = parseInt(this.$refs.input.value - 1) * 10 + 1
      // console.log(typeof off, off)
      if (this.$route.params.title1 === '推荐MV') {
        getRecommendVideo({ limit: 10, offset: off })
          .then((data) => {
            this.latestmv = data.data
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (this.$route.params.title1 === '最新MV') {
        getNewestVideo({ limit: 10, offset: off })
          .then((data) => {
            this.latestmv = data.data
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (this.$route.params.title1 === '其他MV') {
        getOtherVideo({ limit: 10, offset: off })
          .then((data) => {
            this.latestmv = data.data
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    ProcessingHeight () {
      const ScrollHeight = document.querySelector('.seemore-list').scrollHeight
      const ScrollHeights = document.querySelector('.seemore-top').scrollHeight
      document.getElementById('setheight').style.height = ScrollHeight - ScrollHeights - 100 + 'px'
    },
    getData (str) {
      if (this.$route.params.title1 === '推荐MV') {
        getRecommendVideo({ limit: 10, offset: 1 })
          .then((data) => {
            this.flag = true
            this.latestmv = data.data
            if (str === '首次') {
              this.ProcessingHeight()
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (this.$route.params.title1 === '最新MV') {
        getNewestVideo({ limit: 10, offset: 1 })
          .then((data) => {
            this.flag = true
            this.latestmv = data.data
            if (str === '首次') {
              this.ProcessingHeight()
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (this.$route.params.title1 === '其他MV') {
        getOtherVideo({ limit: 10, offset: 1 })
          .then((data) => {
            this.flag = true
            this.latestmv = data.data
            if (str === '首次') {
              this.ProcessingHeight()
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  },
  created () {
    this.getData('首次')
  },
  mounted () {
  },
  computed: {
  },
  watch: {
    '$route' () {
      this.getData('非首次')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixin.scss';
.seemore {
  @include bg_sub_color();
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  //  background: #f00;
  .seemore-warpper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .seemore-top {
      width: 100%;
    }
    .seemore-list {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .seemore-paging {
      position: fixed;
      display: flex;
      justify-content: center;
      width: 100%;
      bottom: 0;
      // z-index: 999;
      // background: #000;
      .paging-last {
        border: 1px solid #000;
        margin-right: 20px;
      }
      .paging-value {
        width: 100px;
        text-align: center;
      }
      .paging-next {
        border: 1px solid #000;
        margin-left: 20px;
      }
    }
  }
}
</style>
