<template>
  <router-view></router-view>
</template>

<script>

import axios from "axios";
import localforage from "localforage";
import {ElMessage, ElMessageBox} from "element-plus";



export default {
  name:'app',
  created() {
    let item = localStorage.getItem("message");
    if (item == null){
      ElMessageBox.alert('如遇问题可点击左上角头像框选择清除缓存', '通知', {
        confirmButtonText: 'ok',
        callback: () => {
          localStorage.setItem("message",'ok')
        },
      })
    }


    // this.$getValue('token').then(e => {
    //   if (e != null){
    //     if (checkToken(this.$domainUrl)){
    //       if (window.location.href.includes("login")){
    //         this.$router.push("/")
    //       }
    //     }
    //   }
    // })




    if (localStorage.getItem("token") != null){
      if (checkToken(this.$domainUrl)){
        if (window.location.href.includes("login")){
          this.$router.push("/")
        }
      }
    }

    let uuid = localStorage.getItem("uuid");
    if (uuid == null){
      localStorage.setItem("uuid",this.$uuid.v4())
    }
  },
}
const checkToken = async (domain) => {
  try {
    const response = await axios.get(`${domain}/login/CheckToken`);
    return response.data.code === 200 || response.data.code === 6000;
  } catch (error) {
    return false;
  }
}
</script>

<style>

</style>
