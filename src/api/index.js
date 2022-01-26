// 这个js文件就是用于管理各种接口地址的
import Network from './network'
// 0: pc
//
// 1: android
//
// 2: iphone
//
// 3: ipad
export const getBanner = () => Network.get('/banner?type=2')
export const getPersonalized = (data) => Network.get('/personalized', data)
export const getNewAlbum = () => Network.get('/album/newest')
export const getNewSong = (data) => Network.get('/personalized/newsong', data)
export const getPlayList = (data) => Network.get('/playlist/detail', data)
export const getAlbum = (data) => Network.get('/album', data)
export const getSongDetail = (data) => Network.get('/song/detail', data)
export const getSongLyric = (data) => Network.get('/lyric', data)
export const getSongURL = (data) => Network.get('/song/url', data)
export const getArtistsSongs = (data) => Network.get('/artists', data)
export const getRecommendVideo = (data1, data2) => Network.get('/mv/exclusive/rcmd', data1, data2)
export const getNewestVideo = (data1, data2) => Network.get('/mv/first', data1, data2)
export const getOtherVideo = (data1, data2) => Network.get('/mv/all', data1, data2)
export const getMvUrl = (data) => Network.get('/mv/url', data)
export const getSimiMv = (data) => Network.get('/simi/mv', data)
export const getMvDetail = (data) => Network.get('/related/allvideo', data)
export const getVideoList = (data) => Network.get('/video/url', data)
// export const getVideoDetail = () => Network.get('/video/group?id=58100')
// export const getVideoClassList = (data) => Network.get('/video/category/list', data)
// export const getHotArtists = () => Network.get('/top/artists?offset=0&limit=5')
export const getHotArtists = () => {
  return new Promise(function (resolve, reject) {
    Network.get('/top/artists?offset=0&limit=5')
      .then(function (result) {
        resolve(result.artists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getLetterArtists = (letter) => {
  return new Promise(function (resolve, reject) {
    const letterArtists = []
    Network.all([
      Network.get(`/artist/list?offset=0&limit=5&type=1&area=96&initial=${letter}`),
      Network.get(`/artist/list?offset=0&limit=5&type=1&area=7&initial=${letter}`),
      Network.get(`/artist/list?offset=0&limit=5&type=1&area=16&initial=${letter}`)
    ])
      .then(function (result) {
        // resolve(result)
        result.forEach(function (item) {
          letterArtists.push(...item.artists)
        })
        // console.log(letterArtists)
        resolve(letterArtists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getAllArtists = (letter) => {
  return new Promise(function (resolve, reject) {
    const keys = ['热']
    const list = [getHotArtists()]
    for (let i = 65; i < 91; i++) {
      const char = String.fromCharCode(i)
      keys.push(char)
      list.push(getLetterArtists(char))
    }
    Network.all(list)
      .then(function (result) {
        const obj = {}
        obj.keys = keys
        obj.list = result
        resolve(obj)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getTopListDetail = () => {
  return new Promise(function (resolve, reject) {
    const category = {
      officialList: [
        { name: '飙升榜' },
        { name: '新歌榜' },
        { name: '原创榜' },
        { name: '热歌榜' }
      ],
      recList: [
        // 云音乐说唱榜 云音乐电音榜 云音乐欧美新歌榜 中国新乡村音乐排行榜 云音乐ACG榜
        { name: '云音乐说唱榜' },
        { name: '云音乐电音榜' },
        { name: '中国新乡村音乐排行榜' },
        { name: '云音乐ACG榜' },
        { name: '云音乐古典榜' },
        { name: '潜力爆款榜' }
      ],
      globalList: [
        { name: '美国Billboard榜' },
        { name: 'UK排行榜周榜' },
        { name: 'Beatport全球电子舞曲榜' },
        { name: '日本Oricon榜' },
        { name: '云音乐欧美新歌榜' },
        { name: '云音乐欧美热歌榜' }
      ],
      otherList: [
        { name: 'KTV唛榜' },
        { name: '法国 NRJ Vos Hits 周榜' },
        { name: '云音乐古风榜' },
        { name: '云音乐韩语榜' },
        { name: '云音乐摇滚榜' },
        { name: '云音乐民谣榜' }
      ],
      titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
    }
    Network.get('/toplist/detail')
      .then(function (data) {
        data.list.forEach(function (obj) {
          let flag = false
          for (const key in category) {
            for (let i = 0; i < category[key].length; i++) {
              if (category[key][i].name === obj.name) {
                category[key][i].id = obj.id
                category[key][i].rank = obj
                flag = true
                break
              }
            }
            if (flag) {
              break
            }
          }
        })
        // console.log(category)
        resolve(category)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getTopList = (data) => Network.get('/playlist/detail', data)
export const getSearchList = (data) => Network.get('/search?type=1', data)
export const getSearchVideo = (data) => Network.get('/search?type=1004', data)
export const getSearchHot = () => Network.get('/search/hot')
