<template>
    <div class="seemoreitem">
        <VideoMore v-if="title === '推荐MV'" :latestmv="latestmv"></VideoMore>
        <VideoMore else v-if="title === '最新MV'" :latestmv="latestmv"></VideoMore>
        <VideoMore else v-if="title === '其他MV'" :latestmv="latestmv"></VideoMore>
        <SonglistMore else v-if="title === '推荐歌单'" :latestmv="latestmv" :type="'personalized'"></SonglistMore>
        <SonglistMore else v-if="title === '最新专辑'" :latestmv="latestmv" :type="'album'"></SonglistMore>
        <SongListItem else v-if="title === '最新音乐'" :songs="latestmv"></SongListItem>
    </div>
</template>

<script>
import VideoMore from '../components/SeeMore/VideoMore.vue'
import SonglistMore from '../components/SeeMore/SonglistMore.vue'
import SongListItem from '../components/SongListItem.vue'
export default {
  name: 'SeeMoreItem',
  props: {
    title: {
      type: String,
      default: '',
      require: true
    },
    latestmv: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  components: {
    VideoMore,
    SonglistMore,
    SongListItem
  }
}
</script>

<style>

</style>
