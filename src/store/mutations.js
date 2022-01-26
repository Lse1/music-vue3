import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_LIST_PLAYER,
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
export default {
  /*
  changeFullScreen (state, flag) {
    state.isFullScreen = flag
  }
   */
  [SET_FULL_SCREEN] (state, flag) {
    state.isFullScreen = flag
    if (flag) {
      state.isShowMiniPlayer = false
      state.isShowListPlayer = false
    }
  },
  [SET_MINI_PLAYER] (state, flag) {
    state.isShowMiniPlayer = flag
    if (flag) {
      state.isFullScreen = false
      state.isShowListPlayer = false
    }
  },
  [SET_LIST_PLAYER] (state, flag) {
    state.isShowListPlayer = flag
  },
  [SET_IS_PLAYING] (state, flag) {
    state.isPlaying = flag
  },
  [SET_MODE_TYPE] (state, flag) {
    state.modeType = flag
  },
  [SET_SONG_DETAIL] (state, list) {
    // console.log(list)
    state.songs = list
    state.isPlaying = false
  },
  [SET_SONG_LYRIC] (state, lyric) {
    state.currentLyric = lyric
  },
  [SET_DEL_SONG] (state, index) {
    if (index !== undefined) {
      state.songs.splice(index, 1)
    } else {
      state.songs = []
    }
    if (index < state.currentIndex) {
      state.currentIndex = state.currentIndex - 1
    }
    if (state.songs.length === 0) {
      state.isFullScreen = false
      state.isShowMiniPlayer = false
      state.isShowListPlayer = false
      state.isPlaying = false
    }
  },
  [SET_CURRENT_INDEX] (state, index) {
    if (index < 0) {
      index = state.songs.length - 1
    } else if (index > state.songs.length - 1) {
      index = 0
    }
    state.currentIndex = index
  },
  [SET_CURRENT_TIME] (state, time) {
    state.curTime = time
  },
  [SET_FAVORITE_SONG] (state, song) {
    const result = state.favoriteList.find(function (currentValue) {
      return currentValue.id === song.id
    })
    if (result === undefined) {
      state.favoriteList.push(song)
    } else {
      state.favoriteList.splice(state.favoriteList.indexOf(result), 1)
    }
  },
  [SET_FAVORITE_LIST] (state, list) {
    state.favoriteList = list
  },
  [SET_HISTORY_SONG] (state, song) {
    const result = state.historyList.find(function (currentValue) {
      return currentValue.id === song.id
    })
    if (result === undefined) {
      if (state.historyList.length > 30) {
        state.historyList.splice(0, 1)
      }
      state.historyList.push(song)
    }
  },
  [SET_HISTORY_LIST] (state, list) {
    state.historyList = list
  }
}
