<template>
  <div class="recommend">
    <div class="recommend-warpper">
        <ScrollView>
          <div>
            <Banner :banners="banners"></Banner>
            <Personalized :personalized="personalized" :title="'推荐歌单'" @select="fatherSelectItem" :type="'personalized'" @selectmore="selectmoreItem"></Personalized>
            <Personalized :personalized="albums" :title="'最新专辑'" @select="fatherSelectItem" :type="'album'" @selectmore="selectmoreItem"></Personalized>
            <SongList :songs="songs" @selectmore="selectmoreItem"></SongList>
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
import { getBanner, getPersonalized, getNewAlbum, getNewSong } from '../api/index'
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/Personalized'
import SongList from '../components/Recommend/SongList'
import ScrollView from '../components/ScrollView'
// import MetaInfo from '../../vue.meta.info'

export default {
  name: 'Recommend',
  // metaInfo: MetaInfo.recommend,
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView
  },
  methods: {
    fatherSelectItem (id, type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      })
    },
    selectmoreItem (title1) {
      this.$router.push({
        path: `/recommend/SongMore/${title1}`
      })
    }
  },
  data () {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: []
    }
  },
  created () {
    getBanner()
      .then((data) => {
        // console.log(data)
        this.banners = data.banners
      })
      .catch(function (err) {
        console.log(err)
      })
    getPersonalized({ limit: 6 })
      .then((data) => {
        // console.log(data)
        this.personalized = data.result
      })
      .catch(function (err) {
        console.log(err)
      })
    getNewAlbum({ limit: 10 })
      .then((data) => {
        // console.log(data)
        this.albums = data.albums.splice(0, 6)
      })
      .catch(function (err) {
        console.log(err)
      })
    getNewSong({ limit: 10 })
      .then((data) => {
        // console.log(data)
        // this.songs = data.result
        // console.log(data.result)
        const list = []
        data.result.forEach((value) => {
          const obj = {}
          obj.id = value.id
          obj.name = value.name
          obj.picUrl = value.song.album.picUrl
          let singer = ''
          for (let i = 0; i < value.song.artists.length; i++) {
            if (i === 0) {
              singer = value.song.artists[i].name
            } else {
              singer += '-' + value.song.artists[i].name
            }
          }
          obj.singer = singer
          list.push(obj)
        })
        this.songs = list
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}
</script>

<style scoped lang="scss">
.recommend{
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  /*overflow: hidden;*/
  .recommend-warpper{
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
