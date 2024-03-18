<template>
  <div style="position: relative; margin-top: 10px" >
    <vue3VideoPlay id="vueVideo" v-bind="options" :poster="poster" @error="errorLoad"/>
  </div>
  <div style="display: flex;justify-content: center;">
    <el-button type="primary" @click="mount" >点击换一个</el-button>
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
      onclicks:false,
      options:{
        width: '800px', //播放器高度
        height: '450px', //播放器高度
        color: "#409eff", //主题色
        speed:true, //关闭进度条拖动
        title: '', //视频名称
        pageFullScreen:false,
        fullscreen:true,
        src: "https://alimov2.a.kwimgs.com/upic/2023/08/03/16/BMjAyMzA4MDMxNjQ5MThfMjg4Mzc1MTA4OF8xMDk1ODM0NDMwMzRfMl8z_b_B7ef17b36344f6d9bf2d9e78b40abd1a6.mp4?clientCacheKey=3xygkip62k7bpci_b.mp4&tt=b&di=b72e16c7&bp=13414",
        controlBtns:['audioTrack', 'quality', 'speedRate', 'volume', 'setting', 'pip', 'fullScreen']
      },
      poster:'',
      domainList:[],
      iterateeCount:0,
      videoURI:'',
    }
  },
  created() {
    this.$nextTick(() => {
      let docHeight = document.documentElement.clientHeight;
      let docwidth = document.documentElement.clientWidth;
      console.log("可视区域高度", docHeight);
      this.options.width = docwidth + "px";
      this.options.height = docHeight * 0.90 + "px";
      // this.tabHeight = docHeight * 0.14 + 'px';
      // this.folderHeight = docHeight * 0.05 + 'px';
      console.log(this.cardHeight, this.tabHeight, this.folderHeight)
    });
    this.mount();
  },
  methods:{
    mount() {
      if (this.onclicks){
        return;
      }
      this.onclicks = true;
      axios.get(`${this.$domainUrl}/video/random`).then(e => {
        if (e.data.code === 200) {
          let data = e.data.data;
          this.domainList = data.domainList;
          this.videoURI = data.videoUri;
          this.options.src = data.domain + data.videoUri;
          this.poster = data.domain + '/' + data.prefix + '/' +data.suffix + '/' +data.thumbnail;
        }
        this.onclicks = false
      }).catch(error => {
        this.onclicks = false
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

<style>
.zan{
  float: right;
  margin-top:500px;
  margin-right: 10px;
}
html{
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, #FFFFFF,#FFFFFF);
}
</style>