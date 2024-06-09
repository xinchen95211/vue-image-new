<template>
  <div style="position: relative;z-index: -999; ">
    <vue3VideoPlay id="vueVideo" v-bind="options" :poster="poster" @error="errorLoad" @playing="closeLoad"/>
  </div>
</template>

<script>

import Vue3VideoPlay from "vue3-video-play/lib/video-play/main.vue";
import {ElLoading, ElMessage} from "element-plus";
let loading;
export default {
  name: "VideoShow",
  components: {Vue3VideoPlay},
  data(){
    return{
      domainList:["https://yaoyao.dynv6.net","https://wanfengbuwan.dynv6.net","https://huifaguang.dynv6.net"],
      options:{
        width: '800px', //播放器高度
        height: '450px', //播放器高度
        color: "#409eff", //主题色
        speed:true, //关闭进度条拖动
        title: '', //视频名称
        pageFullScreen:false,
        webFullScreen:true,
        fullscreen:true,
        autoPlay:true,
        src:"",
        controlBtns:['audioTrack', 'quality', 'speedRate', 'volume', 'setting', 'pip', 'fullScreen']
      },
      poster:'',
      iterateeCount:0,
      videoURI:'',
    }
  },
  created() {
    this.domainList.sort(() => Math.random() - 0.5);
    this.mount(this.id,this.superId);
    loading = ElLoading.service({
      lock: true,
      text: '正在加载中请稍后...',
      background: 'rgba(0, 0, 0, 0.8)',
    })
    setTimeout(() => {
      loading.close();
    }, 2000);
  },
  methods:{
    closeLoad(){
      loading.close();
    },
    mount(id,superId) {
      this.$getValue("video_" + superId).then(res => {
        if (res == null) {
          ElMessage.error("这个视频暂时有问题,换一个看看吧")
        } else {
          this.loadimg(res[id])
        }
      })
    },
    loadimg(res){
      this.videoURI = res.videoUri;
      this.options.src = this.domainList[0] + res.videoUri;
      this.poster = this.domainList[0] +  '/Thumbnail/Video_thumbnail/' + res.thumbnail;
    },
    errorLoad(){
      if (this.options.src === ''){return;}
      if (this.iterateeCount === this.domainList.length){
        ElMessage.error("这个视频有点问题，换一个看看吧")
        return;
      }
      this.options.src = this.domainList[this.iterateeCount] + this.videoURI;
      this.iterateeCount++;
    }
  },

  props:{
    id:String,
    superId:String
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