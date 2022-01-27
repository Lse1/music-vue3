<template>
  <div class="Videoplayers">
      <video-player  class="video-player vjs-custom-skin"
                 ref="videoPlayer"
                 :options="playerOptions"
                 :playsinline="true"
                 customEventName="customstatechangedeventname"

                 @play="onPlayerPlay($event)"
                 @pause="onPlayerPause($event)"

                 @statechanged="playerStateChanged($event)"
                 @ready="playerReadied">
      </video-player>
      <!-- <video-player  class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
        ></video-player> -->
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import { videoPlayer } from 'vue-video-player/src'
export default {
  name: 'VideoPlayers',
  components: {
    videoPlayer
  },
  props: {
    url: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      playerOptions: {
        // videojs options
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        autoplay: false,
        mute: false,
        preload: 'auto',
        language: 'zh-CN',
        aspectRatio: '16:9',
        fluid: true,
        sources: [{
          type: 'video/mp4',
          src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
        }],
        poster: '/static/images/author.jpg',
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: true, // 是否显示剩余时间功能
          fullscreenToggle: true // 全屏按钮
        }
      }
    }
  },
  mounted () {
    // console.log('this is current player instance object', this.player)
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    // listen event
    onPlayerPlay (player) {
    //   console.log('player play!', player)
      this.playerOptions.sources[0].src = this.url
    },
    onPlayerPause (player) {
      // console.log('player pause!', player)
    },
    // ...player event

    // or listen state event
    playerStateChanged (playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied (player) {
    //   console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    }
  },
  created () {
  }
}
</script>

<style>
.video-js .vjs-big-play-button{
  margin-left: 45%;
  margin-top: 25%;
}
</style>
