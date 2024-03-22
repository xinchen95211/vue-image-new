<template>
  <a></a>
</template>
<script>
import {ElMessage} from "element-plus";

export default {
  name: "LogoutView",
  inject:['reload'],
  created() {
    localStorage.removeItem("token")
    ElMessage.success("退出登陆成功")
    setTimeout(() => {
      location.replace("/login");
    }, 3000);

  },
  methods:{
  }
}
</script>
<style scoped>

</style>