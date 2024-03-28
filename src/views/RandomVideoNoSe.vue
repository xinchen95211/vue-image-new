<template>
  <div style="position: relative; margin-top: 10px" >
    <vue3VideoPlay id="vueVideo" v-bind="options" @ended="mount"/>
  </div>
  <div style="margin-top: 10px;">
    <el-button type="primary" @click="mount" style="float:left; margin-left: 40%" >点击换一个</el-button>
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
  name: "VideoShowNoSe",
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
        // src: "https://api.yujn.cn/api/xjj.php?_t=0",
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
      // console.log(this.cardHeight, this.tabHeight, this.folderHeight)
    });
    this.mount();
  },
  methods:{
    mount() {
      if (this.onclicks){
        return;
      }
      this.onclicks = true;
      if (this.type === "xgg"){
        this.options.src = "https://api.yujn.cn/api/xgg.php?_t="+Math.random();
      }else {
        this.options.src = "https://api.yujn.cn/api/xjj.php?_t="+Math.random();
      }
      this.onclicks = false

    },
    errorLoad(){
      this.mount();
    }
    },
    props:{
      type:String
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