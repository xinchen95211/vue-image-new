<template>
  <router-view></router-view>
</template>

<script>

import axios from "axios";



export default {
  name:'app',
  created() {
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

  methods:{
    async checkToken(){
      try {
        const response = await axios.get(`https://frp-hat.top:49728/login/CheckToken`);
        return response.data.code === 200 || response.data.code === 6000;
      } catch (error) {
        return false;
      }
    }
  }

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
