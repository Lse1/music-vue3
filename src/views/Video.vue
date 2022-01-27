<template>
  <div class="Video">
    <div class="Video-warpper">
        <ScrollView>
          <div>
            <VideoDetail :title="'推荐MV'" :latestmv="latestmv" @select="fatherSelectItem" @selectmore="selectmoreItem"></VideoDetail>
            <VideoDetail :title="'最新MV'" :latestmv="newestvideo" @select="fatherSelectItem" @selectmore="selectmoreItem"></VideoDetail>
            <VideoDetail :title="'其他MV'" :latestmv="othervideo" @select="fatherSelectItem" @selectmore="selectmoreItem"></VideoDetail>
          </div>
        </ScrollView>
    </div>

    <!-- <transition>
      <router-view></router-view>
    </transition> -->
    <router-view  v-slot="{ Component }">
      <transition>
          <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getRecommendVideo, getNewestVideo, getOtherVideo } from '../api/index'
import VideoDetail from '../components/Video/VideoDetail.vue'
import ScrollView from '../components/ScrollView'
// import MetaInfo from '../../vue.meta.info'

export default {
  name: 'Video',
  // metaInfo: MetaInfo.recommend,
  components: {
    ScrollView,
    VideoDetail
  },
  methods: {
    fatherSelectItem (id, title) {
      // console.log(title)
      this.$router.push({
        path: `/video/videoplayer/${id}/${title}`
      })
    },
    selectmoreItem (title1) {
      this.$router.push({
        path: `/seemore/${title1}`
      })
    }
  },
  data () {
    return {
      latestmv: [],
      newestvideo: [],
      othervideo: []
    }
  },
  created () {
    getRecommendVideo({ limit: 5, offset: 1 })
      .then((data) => {
        // console.log(data)
        this.latestmv = data.data
      })
      .catch(function (err) {
        console.log(err)
      })
    getNewestVideo({ limit: 5, offset: 1 })
      .then((data) => {
        // console.log(data)
        this.newestvideo = data.data
      })
      .catch(function (err) {
        console.log(err)
      })
    getOtherVideo({ limit: 5, offset: 1 })
      .then((data) => {
        // console.log(data)
        this.othervideo = data.data
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}
</script>

<style scoped lang="scss">
.Video{
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  /*overflow: hidden;*/
  .Video-warpper{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}

.v-enter{
  transform: translateX(100%);
}
.v-enter-to{
  transform: translateX(0%);
}
.v-enter-active{
  transition: transform 1s;
}
.v-leave{
  transform: translateX(0%);
}
.v-leave-to{
  transform: translateX(100%);
}
.v-leave-active{
  transition: transform 1s;
}
</style>
