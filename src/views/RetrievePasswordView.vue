<template>
  <div class="login-wrapper">
    <retrieve-password-components></retrieve-password-components>
    <br>
    <div class="msg">
      已有账户?
      <a style="color: blue" @click="this.$router.push('/login')">去登陆</a>
    </div>
  </div>
</template>

<script>
import RetrievePasswordComponents from "../components/RetrievePasswordComponents.vue";
export default {
  name: "RetrievePasswordView",
  components:{
    RetrievePasswordComponents
  }
}
</script>

<style scoped>

</style>