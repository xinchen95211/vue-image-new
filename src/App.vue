<template>
  <router-view></router-view>
</template>

<script>

import axios from "axios";
import {ElLoading, ElMessage} from "element-plus";


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
      if (count > this.domainCount.length-1){
        this.count = 0;
      }
      const loading = ElLoading.service({
        lock: true,
        text: '正在进行第一次视频全数据加载请稍后...',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      let value = 1;
      let domain = this.domainCount[count];
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
      const loading = ElLoading.service({
        lock: true,
        text: '正在进行第一次图片全数据加载请稍后...',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      let value = 1;
      let domain = this.domainCount[count];
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

<style>

</style>
