<script setup>

import {VideoPlay} from "@element-plus/icons-vue";
import axios from "axios";
import {ElLoading, ElMessage} from "element-plus";
const openPhoto = () => {
  let photo = localStorage.getItem("photo");
  if (photo == null){
    ElMessage.error("图片区数据还没加载完成，请稍后或刷新重试")
    return
  }
  window.open('/#/photo')
}
const openVideo = () => {
  let video = localStorage.getItem("video");
  if (video == null){
    ElMessage.error("视频区数据还没加载完成，请稍后或刷新重试")
    return
  }
  window.open('/#/video')
}



export default {
  name:'app',
  data(){
    return{
      domainList:['/yao','/wan','/hui'],
    }
  },
  created() {
    this.domainList.sort(() => Math.random() - 0.5);
    let item1 = localStorage.getItem("superData");
    if (item1 != null){
      this.$deleteAll();
      localStorage.clear();
    }

    let photo = localStorage.getItem("photo");
    let video = localStorage.getItem("video");
    if (video == null){
      this.loadVideo(0)
    }
    if (photo == null){
      this.loadPhoto(0)
    }
  },
  methods:{
    loadVideo(count){
      if (count > this.domainList.length-1){
        this.count = 0;
      }
      const loading = ElLoading.service({
        lock: true,
        text: '正在进行第一次视频全数据加载请稍后...',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      let value = 1;
      let domain = this.domainList[count];
      axios.get(`${domain}/Thumbnail/附件/video.json`).then(res => {
        res.data.forEach(item => {
          item.forEach(value => {
            return value;
          })
          this.$setValue("video_" + value,item)
          value++;
        })
        ElMessage.success("视频区加载成功")
        localStorage.setItem("video","123")
        setTimeout(() => {
          loading.close();
        },2000)

      }).catch(() => {
        this.loadVideo(count+1)
      })
    },
    loadPhoto(count){
      if (count > this.domainList.length-1){
        this.count = 0;
      }
      const loading = ElLoading.service({
        lock: true,
        text: '正在进行第一次图片全数据加载请稍后...',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      let value = 1;
      let domain = this.domainList[count];
      axios.get(`${domain}/Thumbnail/附件/photo.json`).then(res => {
        res.data.forEach(item => {
          item.forEach(value => {
            return value;
          })
          this.$setValue("photo_" + value,item)
          value++;
        })
        ElMessage.success("图片区数据加载成功")
        localStorage.setItem("photo","123")
        setTimeout(() => {
          loading.close();
        },2000)
      }).catch(() => {
      })
    }
  },
}
</script>

<template>


    <el-row style="height: 90vh; background-color: black">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" class="container" @click="openPhoto">
        <el-icon size="250" >
          <Picture  />
        </el-icon>
        <div style="font-size: 20px">图片区</div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" class="container" @click="openVideo">
        <el-icon size="250">
          <VideoPlay ></VideoPlay>
        </el-icon>
        <div style="font-size: 20px">视频区</div>
      </el-col>
    </el-row>
</template>

<style >
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  color:skyblue;
}


</style>