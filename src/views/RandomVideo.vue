<template>
  <div style="position: relative;z-index: -999; ">
    <vue3VideoPlay id="vueVideo" v-bind="options" :poster="poster" @error="errorLoad"/>
  </div>
<!--  <div class="zan">-->
<!--    <el-icon size="50px" color="skyblue" @click="selectStar(id)">-->
<!--      <star v-if="star"></star>-->
<!--      <star-filled v-if="!star"></star-filled>-->
<!--    </el-icon>-->
<!--  </div>-->
</template>

<script>
// import {Star, StarFilled} from "@element-plus/icons-vue";
import axios from "axios";
import Vue3VideoPlay from "vue3-video-play/lib/video-play/main.vue";
import {ElMessage} from "element-plus";

export default {
  name: "VideoShow",
  components: {Vue3VideoPlay},
  data(){
    return{
      options:{
        width: '800px', //播放器高度
        height: '450px', //播放器高度
        color: "#409eff", //主题色
        speed:true, //关闭进度条拖动
        title: '', //视频名称
        pageFullScreen:false,
        webFullScreen:true,
        fullscreen:true,
        src:"",
        controlBtns:['audioTrack', 'quality', 'speedRate', 'volume', 'setting', 'pip', 'fullScreen']
      },
      poster:'',
      domainList:[],
      iterateeCount:0,
      videoURI:'',
    }
  },
  created() {
    this.mount()
  },
  methods:{
    mount() {
      axios.get(`${this.$domainUrl}/video/random`).then(e => {
        if (e.data.code === 200) {
          let data = e.data.data;
          this.domainList = data.domainList;
          this.videoURI = data.videoUri;
          this.options.src = data.domain + data.videoUri;
          this.poster = data.domain + '/' + data.prefix + '/' +data.suffix + '/' +data.thumbnail;
        }
      }).catch(error => {
            console.log("error" + error)
          }
      )
    }
    },
    loadimg(res){
      let data = JSON.parse(res);
      this.domainList = data.domainList;
      this.videoURI = data.videoUri;
      this.options.src = data.domain + data.videoUri;
      this.poster = data.domain + '/' + data.prefix + '/' +data.suffix + '/' +data.thumbnail;
    },

    getVideoUrl(id){
      axios.get(`${this.$domainUrl}/video/${id}`).then(e => {
        if (e.data.code === 200){
          if (e.data.data == null){
            ElMessage.error("这个视频暂时有问题,换一个看看吧")
          }else{
            let dates = JSON.stringify(e.data.data);
            this.$setValue("video_" + id, dates)
            let data = e.data.data;
            this.domainList = data.domainList;
            this.videoURI = data.videoUri;
            this.options.src = data.domain + data.videoUri;
            this.poster = data.domain + '/' + data.prefix + '/' +data.suffix + '/' +data.thumbnail;

          }
        }
      })
    },
    errorLoad(){
      if (this.options.src === ''){return;}

      if (this.iterateeCount === this.domainList.length){
        ElMessage.error("这个视频有点问题，换一个看看吧")
        return;
      }
      this.options.src = this.domainList[this.iterateeCount] + this.videoURI;
      console.log(this.options.src)
      this.iterateeCount++;
    }
  }
</script>

<style scoped>
.zan{
  float: right;
  margin-top:500px;
  margin-right: 10px;
}
</style>