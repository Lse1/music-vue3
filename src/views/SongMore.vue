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
import { getPersonalized, getNewAlbum, getNewSong } from '../api/index'
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
      flag: false,
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
    Pulldownloading () {
      console.log('下拉加载')
    },
    ProcessingHeight () {
      const ScrollHeight = document.querySelector('.seemore-list').scrollHeight
      const ScrollHeights = document.querySelector('.seemore-top').scrollHeight
      document.getElementById('setheight').style.height = ScrollHeight - ScrollHeights - 100 + 'px'
    },
    getData () {
      if (this.$route.params.title1 === '推荐歌单') {
        getPersonalized({ limit: 18 })
          .then((data) => {
            // console.log(data)
            this.latestmv = data.result
            // this.ProcessingHeight()
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (this.$route.params.title1 === '最新专辑') {
        getNewAlbum({ limit: 18 })
          .then((data) => {
            // console.log(data) // data.albums.splice(0, 18)
            this.latestmv = data.albums
            // this.ProcessingHeight()
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (this.$route.params.title1 === '最新音乐') {
        getNewSong({ limit: 20 })
          .then((data) => {
            // console.log(data) // data.albums.splice(0, 18)
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
            this.latestmv = list
            // this.ProcessingHeight()
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    if (this.$route.params.title1 === '推荐歌单') {
      let timerId = null
      this.$refs.wrapper.scrolling((value) => {
        if (this.$refs.gdh.offsetHeight + value < this.$refs.wrapper.$el.offsetHeight - 100) {
          timerId && clearTimeout(timerId)
          timerId = setTimeout(() => {
            // console.log('下拉加载')
            this.num = this.num + 12
            // console.log(typeof this.num, this.num)
            getPersonalized({ limit: this.num })
              .then((data) => {
                // console.log(data)
                this.latestmv = data.result
              })
              .catch((err) => {
                console.log(err)
              })
          }, 1000)
        }
      })
    } else if (this.$route.params.title1 === '最新音乐') {
      let timerId = null
      this.$refs.wrapper.scrolling((value) => {
        if (this.$refs.gdh.offsetHeight + value < this.$refs.wrapper.$el.offsetHeight - 100) {
          timerId && clearTimeout(timerId)
          timerId = setTimeout(() => {
            // console.log('下拉加载')
            this.nums = this.nums + 10
            // console.log(typeof this.nums, this.nums)
            getNewSong({ limit: this.nums })
              .then((data) => {
                // console.log(data) // data.albums.splice(0, 18)
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
                this.latestmv = list
              })
              .catch((err) => {
                console.log(err)
              })
          }, 1000)
        }
      })
    }
  },
  computed: {
  },
  watch: {
    '$route' () {
      this.getData()
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
  }
}
</style>
