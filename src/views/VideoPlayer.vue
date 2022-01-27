<template>
    <div class="videoplayer">
      <div class="videoplayer-warpper">
        <div class="videoplayer-top">
          <DetailHeader :title="this.$route.params.title"></DetailHeader>
        <VideoPlayers :url="playlist.url"></VideoPlayers>
        </div>
        <div class="videoplayer-list" id="setheight">
        <ScrollView>
          <RelatedVideo :videolist="videolist" ref="scroll"></RelatedVideo>
        </ScrollView>
        </div>
        </div>
    </div>
</template>

<script>
import VideoPlayers from '../components/Video/Videoplayers.vue'
import RelatedVideo from '../components/Video/RelatedVideo.vue'
import ScrollView from '../components/ScrollView'
import { getMvUrl, getMvDetail } from '../api/index'
// import MetaInfo from '../../vue.meta.info'
import DetailHeader from '../components/Detail/DetailHeader.vue'
export default {
  name: 'VideoPlayer',
  // metaInfo: MetaInfo.recommend,
  components: {
    // videoPlayer
    VideoPlayers,
    RelatedVideo,
    ScrollView,
    DetailHeader
  },
  data () {
    return {
      playlist: {},
      videolist: []
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
  },
  created () {
    // console.log(this.$route.params.id)
    getMvUrl({ id: this.$route.params.id })
      .then((result) => {
        // console.log(result)
        this.playlist = result.data
        // console.log(this.playlist)
      })
      .catch((err) => {
        console.log(err)
      })
    getMvDetail({ id: this.$route.params.id })
      .then((result) => {
        // console.log(result)
        this.videolist = result.data
        // console.log(this.playlist)
        const ScrollHeight = document.querySelector('.videoplayer-list').scrollHeight
        const ScrollHeights = document.querySelector('.videoplayer-top').scrollHeight
        // this.debounce(this.$refs.scroll.refresh, 50)
        // console.log(ScrollHeight)
        // console.log(ScrollHeights)
        document.getElementById('setheight').style.height = ScrollHeight - ScrollHeights + 'px'
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/css/mixin.scss";
 .videoplayer{
     @include bg_sub_color();
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
    //  background: #f00;
    .videoplayer-warpper{
    width: 100%;
    height: 100%;
    // overflow: hidden;
    .videoplayer-top{
      width: 100%;
    }
    .videoplayer-list{
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
   }
 }
</style>
