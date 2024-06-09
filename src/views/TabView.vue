<script setup>

import {VideoPlay} from "@element-plus/icons-vue";
const openPhoto = () => {
  window.open('/#/photo')
}
const openVideo = () => {
  window.open('/#/video')
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