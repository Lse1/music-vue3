<template>
  <div class="SearchSongs">
    <div class="SearchSongs-box">
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
      <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="keywords" v-throttle="search">
    </div>
    <ul class="classification">
        <li :class="{'active' : switchNum === 0}" @click.stop="switchItem(0)">歌曲</li>
        <li :class="{'active' : switchNum === 1}" @click.stop="switchItem(1)">视频</li>
    </ul>
    <div class="SearchSongs-suggest" v-show="keywords !== '' && switchNum === 0">
      <ScrollView>
        <ul>
          <li v-for="value in songs" :key="value.id" @click.stop="selectMusic(value.id)">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
            <p>{{value.name}} - {{value.artists[0].name}}</p>
          </li>
        </ul>
      </ScrollView>
    </div>
    <div class="SearchSongs-suggests" v-show="keywords !== '' && switchNum === 1">
      <ScrollView>
        <ul>
          <li v-for="value in songs" :key="value.id" @click.stop="selectVideo(value.id, value.name)">
            <img v-lazy="value.cover" alt="">
            <p>{{value.name}} - {{value.artists[0].name}}</p>
          </li>
        </ul>
      </ScrollView>
    </div>
    <div class="SearchSongs-hot">
      <h3>热门搜索</h3>
      <ul>
        <li v-for="value in hots" :key="value.first" @click.stop="selectedHot(value.first)">{{value.first}}</li>
      </ul>
    </div>
    <div class="SearchSongs-history">
    <ScrollView>
    <ul>
      <li v-for="value in searchHistory" :key="value">
        <div class="history-left" @click.stop="selectedHot(value)">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+" alt="">
          <p>{{value}}</p>
        </div>
        <div class="history-right">
          <img @click.stop="delHistory(value)" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=" alt="">
        </div>
      </li>
    </ul>
    </ScrollView>
    </div>
  </div>
</template>

<script>
import ScrollView from '../components/ScrollView.vue'
import { getSearchList, getSearchHot, getSearchVideo } from '../api/index'
import { mapActions } from 'vuex'
import { getLocalStorage, setLocalStorage } from '../tools/tools'
// import MetaInfo from '../../vue.meta.info'

export default {
  name: 'SearchSongs',
  // metaInfo: MetaInfo.search,
  components: {
    ScrollView
  },
  data () {
    return {
      keywords: '',
      songs: [],
      hots: [],
      searchHistory: [],
      switchNum: 0
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    search () {
      // console.log('发送请求')
      if (this.switchNum === 0) {
        getSearchList({ keywords: this.keywords })
          .then((data) => {
          // console.log(data)
            this.songs = data.result.songs
          })
          .catch(function (err) {
            console.log(err)
          })
      } else if (this.switchNum === 1) {
        getSearchVideo({ keywords: this.keywords })
          .then((data) => {
            // console.log(data)
            this.songs = data.result.mvs
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    },
    selectMusic (id) {
      this.setFullScreen(true)
      this.setSongDetail([id])

      if (this.searchHistory.includes(this.keywords)) {
        return
      }
      // console.log(this.keywords)
      this.searchHistory.unshift(this.keywords)
      setLocalStorage('searchHistory', this.searchHistory)
      this.keywords = ''
    },
    selectVideo (id, title) {
      // console.log(id)
      this.$router.push({
        path: `/video/videoplayer/${id}/${title}`
      })
    },
    selectedHot (name) {
      this.keywords = name
      this.search()
    },
    delHistory (name) {
      this.searchHistory = this.searchHistory.filter(function (item) {
        return item !== name
      })
      setLocalStorage('searchHistory', this.searchHistory)
    },
    switchItem (num) {
      this.switchNum = num
      this.search()
    }
  },
  directives: {
    throttle: {
      // 指令的定义
      inserted: function (el, obj) {
        let timerId = null
        let flag = true
        el.addEventListener('input', function () {
          if (!flag) return
          flag = false
          timerId && clearTimeout(timerId)
          timerId = setTimeout(function () {
            flag = true
            obj.value()
          }, 1000)
        })
      }
    }
  },
  created () {
    getSearchHot()
      .then((data) => {
        // console.log(data)
        this.hots = data.result.hots
      })
      .catch(function (err) {
        console.log(err)
      })
    if (getLocalStorage('searchHistory') === undefined || getLocalStorage('searchHistory') === null) {
      return
    }
    this.searchHistory = getLocalStorage('searchHistory')
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable.scss";
@import "../assets/css/mixin.scss";
  .SearchSongs{
    position: fixed;
    left: 0;
    right: 0;
    top: 184px;
    bottom: 0;
    @include bg_sub_color();
    .SearchSongs-box{
      display: flex;
      align-items: center;
      margin: 40px 20px;
      background: #ebecec;
      border-radius: 30px;
      border-bottom: 1px solid #ccc;
      /*height: 60px;*/
      img{
        width: 40px;
        height: 40px;
        margin-left: 20px;
      }
      input{
        border: none;
        outline: none;
        background: transparent;
        @include font_size($font_medium);
        height: 60px;
        margin-left: 20px;
      }
    }
    .classification{
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    font-weight: bold;
    border: 1px solid #fff;
    border-radius: 10px;
    @include font_size($font_medium);
    @include no-wrap();
    height: 60px;
    margin-top: 20px;
    li{
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      text-align: center;
      @include font_color();
      &:nth-of-type(1){
        border-right: 1px solid #fff;
      }
      &.active{
        // background: rgba(14, 12, 105, 0.377);
        color: black;
        font-size: 50px;
      }
    }
  }
    .SearchSongs-suggest{
      position: fixed;
      left: 0;
      right: 0;
      top: 390px;
      bottom: 0;
      overflow: hidden;
      z-index: 999;
      @include bg_sub_color();
      li{
        display: flex;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        img{
          width: 40px;
          height: 40px;
        }
        p{
          margin-left: 20px;
          @include font_color();
          @include font_size($font_medium);
        };
      }
    }
    .SearchSongs-suggests{
      position: fixed;
      left: 0;
      right: 0;
      top: 390px;
      bottom: 0;
      overflow: hidden;
      z-index: 999;
      @include bg_sub_color();
      li{
        // display: flex;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        img{
          width: 700px;
          height: 400px;
        }
        p{
          margin-left: 20px;
          @include font_color();
          @include font_size($font_medium);
        };
      }
    }
    .SearchSongs-hot{
      ul{
        display: flex;
        flex-wrap: wrap;
        li{
          height: 60px;
          line-height: 60px;
          border: 1px solid #000;
          border-radius: 30px;
          padding: 0 20px;
          @include font_color();
          @include font_size($font_medium_s);
          margin: 20px;
        }
      }
    }
    .SearchSongs-history{
      position: fixed;
      left: 0;
      right: 0;
      top: 800px;
      bottom: 0;
      overflow: hidden;
      margin-top: 20px;
      li{
        padding: 30px 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        .history-left{
          display: flex;
          align-items: center;
          img{
            width: 40px;
            height: 40px;
          }
          p{
            margin-left: 20px;
            @include font_color();
            @include font_size($font_medium_s);
          }
        }
        .history-right{
          img{
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
</style>
