<template>
  <div style="position: relative; margin-top: 10px" :hidden="!hides">
    <vue3VideoPlay id="vueVideo" v-bind="options" :poster="poster" @error="errorLoad" />
  </div>
  <div style="position: relative; margin-top: 10px"  :hidden="hides">
    <vue3VideoPlay id="vueVideo2"  v-bind="options2" :poster="poster2" @error="errorLoad" />
  </div>
  <div style="margin-top: 10px;">
    <el-button type="primary" @click="clickEt" style="float:left; margin-left: 40%" >点击换一个</el-button>
  </div>
</template>

<script>
// import {Star, StarFilled} from "@element-plus/icons-vue";
import axios from "axios";
import Vue3VideoPlay from "vue3-video-play/lib/video-play/main.vue";
import {ElMessage} from "element-plus";

export default {
  name: "VideoShow",
  components: {Vue3VideoPlay},
  data() {
    return {
      domainList:["https://yaoyao.dynv6.net","https://wanfengbuwan.dynv6.net","https://huifaguang.dynv6.net"],
      hides: true,
      onclicks: false,
      options: {
        width: '800px', //播放器高度
        height: '450px', //播放器高度
        color: "#409eff", //主题色
        speed: true, //关闭进度条拖动
        title: '', //视频名称
        pageFullScreen: false,
        fullscreen: true,
        loop:true,
        src: "https://api.yujn.cn/api/xjj.php?_t=0",
        controlBtns: ['audioTrack', 'quality', 'speedRate', 'volume', 'setting', 'pip', 'fullScreen'],
        autoPlay: true,
        currentTime:0,
      },
      options2: {
        width: '800px', //播放器高度
        height: '450px', //播放器高度
        color: "#409eff", //主题色
        speed: true, //关闭进度条拖动
        title: '', //视频名称
        pageFullScreen: false,
        fullscreen: true,
        loop:true,
        src: "https://api.yujn.cn/api/xjj.php?_t=0",
        controlBtns: ['audioTrack', 'quality', 'speedRate', 'volume', 'setting', 'pip', 'fullScreen'],
        autoPlay: true,
        currentTime:0,
      },
      poster: '',
      poster2: '',
      iterateeCount: 0,
      videoURI: '',
    }
  },
  created() {
    this.$nextTick(() => {
      let docHeight = document.documentElement.clientHeight;
      let docwidth = document.documentElement.clientWidth;
      console.log("可视区域高度", docHeight);
      this.options.width = docwidth + "px";
      this.options.height = docHeight * 0.90 + "px";
      this.options2.width = docwidth + "px";
      this.options2.height = docHeight * 0.90 + "px";
    });
    this.mount(this.rdm());
    this.preLoad();
  },
  methods: {
    rdm(){
      return  Math.floor(Math.random() * (1276 - 1 + 1)) + 1
    },
    mount(superId) {

      this.$getValue("video_" + superId).then(res => {
        if (res == null) {
          ElMessage.error("这个视频暂时有问题,换一个看看吧")
        } else {
          let id = Math.floor(Math.random() * (res.length- 1 + 1)) + 1
          this.loadimg(res[id])
          console.log(res[id])
        }
      })
    },
    loadimg(res){
      this.videoURI = res.videoUri;
      this.options.src = this.domainList[0] + res.videoUri;
      this.poster = this.domainList[0] +  '/Thumbnail/Video_thumbnail/' + res.thumbnail;
    },
    clickEt(){
     let vueVideo = document.getElementById("vueVideo");
      let vueVideo2 = document.getElementById("vueVideo2");
      if (this.onclicks) {
        return;
      }
      this.onclicks = true;
      this.hides = !this.hides;
      if (this.hides) {
        this.options2.muted = true;
        this.options.muted = false;
      }else {
        this.options.muted = true;
        this.options2.muted = false;
      }
      this.options2.currentTime = 0.567;
      this.options.currentTime = 0.567;
      this.preLoad();
      vueVideo.currentTime = 0;
      vueVideo2.currentTime = 0;
      this.onclicks = false;
    },
    preLoad() {
      this.$getValue("video_" + this.rdm()).then(res => {
        if (res == null) {
          ElMessage.error("这个视频暂时有问题,换一个看看吧")
        }
          let id = Math.floor(Math.random() * (res.length- 1 + 1)) + 1
          if (this.hides) {
          this.options2.src = this.domainList[0] + res[id].videoUri;
          this.poster2 = this.domainList[0] +  '/Thumbnail/Video_thumbnail/' + res[id].thumbnail;
          } else {
          this.options.src = this.domainList[0] + res[id].videoUri;
          this.poster = this.domainList[0] +  '/Thumbnail/Video_thumbnail/' + res[id].thumbnail;
        }
        console.log(res[id])
      })
    },
    errorLoad() {
      if (this.iterateeCount === this.domainList.length) {
        ElMessage.error("这个视频有点问题，换一个看看吧")
        return;
      }
      this.options.src = this.domainList[this.iterateeCount] + this.videoURI;
      console.log(this.options.src)
      this.iterateeCount++;
    }
  }
}
</script>

<style>
.zan{
  float: right;
  margin-top:500px;
  margin-right: 10px;
}
</style>