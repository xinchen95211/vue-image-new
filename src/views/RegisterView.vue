<template>
  <div class="login-wrapper">
    <register-components></register-components>
    <br>
    <div class="msg">
      已有账户?
      <a style="color: blue" @click="this.$router.push('/login')">去登陆</a>
    </div>
  </div>
</template>

<script>
import RegisterComponents from "../components/RegisterComponents.vue";
export default {
  name: "RegisterView",
  components:{
    RegisterComponents
  }
}
</script>

<style scoped>

</style>