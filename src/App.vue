<template>
  <router-view></router-view>
</template>

<script>

import axios from "axios";
import localforage from "localforage";
import {ElMessage, ElMessageBox} from "element-plus";
const timeStrapCheck = (name) => {
  let item = localStorage.getItem(name);
  if (item == null){
    return true;
  }else {
    let parse = JSON.parse(item);
    let time = new Date().toISOString();
    return parse < time;
  }
}
const addTimeStrap = (name) =>{
  let time = new Date();
  time.setDate(time.getDate() + 1)
  localStorage.setItem(name,JSON.stringify(time))
}


export default {
  name:'app',
  created() {
    let item = localStorage.getItem("Mymessage");
    if (item == null){
      ElMessageBox.alert('如遇问题可点击左上角头像框选择清除缓存或反馈信息给开发者', '通知', {
        confirmButtonText: 'ok',
        callback: () => {
          localStorage.setItem("Mymessage",'ok')
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
    // console.log(window.location.hash)
    // if (window.location.hash === "#/rdm"){
    //   return;
    // }


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
    if (timeStrapCheck("checkTOKEN")){
      const response = await axios.get(`${domain}/login/CheckToken`);
      addTimeStrap("checkTOKEN")
      return response.data.code === 200 || response.data.code === 6000;
    }else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
</script>

<style>

</style>
