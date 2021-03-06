import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_LIST_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_SONG_DETAIL,
  SET_SONG_LYRIC,
  SET_DEL_SONG,
  SET_CURRENT_INDEX,
  SET_CURRENT_TIME,
  SET_FAVORITE_SONG,
  SET_FAVORITE_LIST,
  SET_HISTORY_SONG,
  SET_HISTORY_LIST
} from './mutations-type'
import {
  getSongDetail,
  getSongLyric,
  getSongURL
} from '../api/index'
export default {
  /*
  setFullScreen ({ commit }, flag) {
    commit('changeFullScreen', flag)
  }
   */
  setFullScreen ({ commit }, flag) {
    commit(SET_FULL_SCREEN, flag)
  },
  setMiniPlayer ({ commit }, flag) {
    commit(SET_MINI_PLAYER, flag)
  },
  setListPlayer ({ commit }, flag) {
    commit(SET_LIST_PLAYER, flag)
  },
  setIsPlaying ({ commit }, flag) {
    commit(SET_IS_PLAYING, flag)
  },
  setModeType ({ commit }, flag) {
    commit(SET_MODE_TYPE, flag)
  },
  async setSongDetail ({ commit }, ids) {
    const result = await getSongDetail({ ids: ids.join(',') })
    const urls = await getSongURL({ id: ids.join(',') })
    // console.log(urls)
    // console.log(result)
    const list = []
    result.songs.forEach(function (value, i) {
      const obj = {}
      // obj.url = urls.data[i].url
      for (let j = 0; j < urls.data.length; j++) {
        const item = urls.data[j]
        if (value.id === item.id) {
          obj.url = item.url
          break
        }
      }
      obj.id = value.id
      obj.name = value.name
      let singer = ''
      value.ar.forEach(function (item, index) {
        if (index === 0) {
          singer = item.name
        } else {
          singer += '-' + item.name
        }
      })
      obj.singer = singer
      obj.picUrl = value.al.picUrl
      list.push(obj)
    })
    // console.log(list)
    commit(SET_SONG_DETAIL, list)
  },
  async getSongLyric ({ commit }, id) {
    // console.log(id)
    const result = await getSongLyric({ id: id })
    // console.log(result.lrc.lyric)
    const obj = parseLyric(result.lrc.lyric)
    // console.log(obj)
    commit(SET_SONG_LYRIC, obj)
  },
  setDelSong ({ commit }, index) {
    commit(SET_DEL_SONG, index)
  },
  setCtrrentIndex ({ commit }, index) {
    commit(SET_CURRENT_INDEX, index)
  },
  setCtrrentTime ({ commit }, time) {
    commit(SET_CURRENT_TIME, time)
  },
  setFavoriteSong ({ commit }, song) {
    commit(SET_FAVORITE_SONG, song)
  },
  setFavoriteList ({ commit }, list) {
    commit(SET_FAVORITE_LIST, list)
  },
  setHistorySong ({ commit }, song) {
    commit(SET_HISTORY_SONG, song)
  },
  setHistoryList ({ commit }, list) {
    commit(SET_HISTORY_LIST, list)
  }
}
// ?????????????????????
function parseLyric (lrc) {
  const lyrics = lrc.split('\n')
  // [00:00.000] ?????? : ?????????
  // 1.???????????????????????????[00:00.000]
  const reg1 = /\[\d*:\d*\.\d*\]/g
  // 2.??????????????????????????? [00
  const reg2 = /\[\d*/i
  // 3.??????????????????????????? :00
  const reg3 = /:\d*/i
  // 4.????????????????????????????????????
  const lyricObj = {}
  lyrics.forEach(function (lyric) {
    // 1.????????????
    let timeStr = lyric.match(reg1)
    if (!timeStr) { return }
    timeStr = timeStr[0]
    // 2.????????????
    const minStr = timeStr.match(reg2)[0].substr(1)
    // 3.????????????
    const secondStr = timeStr.match(reg3)[0].substr(1)
    // 4.????????????, ????????????????????????????????????
    const time = parseInt(minStr) * 60 + parseInt(secondStr)
    // 5.????????????
    const text = lyric.replace(reg1, '').trim()
    // 6.????????????
    lyricObj[time] = text
  })
  return lyricObj
}
