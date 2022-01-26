<template>
  <div class="detail">
    <SubHeader :title="playlist.name"></SubHeader>
    <DetailTop :path="playlist.coverImgUrl" ref="top"></DetailTop>
    <div class="bottom">
      <ScrollView ref="scrollview">
        <DetailBottom :playlist="playlist.tracks"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import SubHeader from '../components/Detail/DetailHeader'
import DetailTop from '../components/Detail/DetailTop'
import DetailBottom from '../components/Detail/DetailBottom'
import ScrollView from '../components/ScrollView'
import { getPlayList, getAlbum, getArtistsSongs, getTopList } from '../api/index'
// import MetaInfo from '../../vue.meta.info'

export default {
  name: 'Detail',
  // metaInfo: MetaInfo.singer,
  components: {
    SubHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  data: function () {
    return {
      playlist: {}
    }
  },
  created () {
    // console.log(this.$route.params.type)
    // console.log(this.$route.params.id)
    if (this.$route.params.type === 'personalized') {
      getPlayList({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data)
          this.playlist = data.playlist
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'album') {
      getAlbum({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data)
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'singer') {
      getArtistsSongs({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data)
          this.playlist = {
            name: data.artist.name,
            coverImgUrl: data.artist.picUrl,
            tracks: data.hotSongs
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'rank') {
      getTopList({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data)
          this.playlist = {
            name: data.playlist.name,
            coverImgUrl: data.playlist.creator.backgroundUrl,
            tracks: data.playlist.tracks
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    const defaultHeight = this.$refs.top.$el.offsetHeight
    // console.log(defaultHeight)
    this.$refs.scrollview.scrolling((offsetY) => {
      // console.log(offsetY)
      if (offsetY < 0) {
        // const scale = 10 * Math.abs(offsetY) / defaultHeight
        const scale = Math.abs(offsetY) / defaultHeight
        this.$refs.top.changeMask(scale)
        // console.log(scale)
        // this.$refs.top.$el.style.filter = `blur(${scale})`
      } else {
        const scale = 1 + offsetY / defaultHeight
        // console.log(scale)
        this.$refs.top.$el.style.transform = `scale(${scale})`
      }
    })
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
.detail{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /*overflow: hidden;*/
  @include bg_sub_color();
  .bottom{
    position: fixed;
    top: 500px;
    bottom: 0;
    left: 0;
    right: 0;

  }
}
</style>
