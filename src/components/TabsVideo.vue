<template>
  <nav class="navbar navbar-expand-lg"  style="width: 100%;height: 8vh" :class="isDark ? ' ':'lights'">
    <div class="container-fluid" >
      <el-dropdown trigger="click"  class="navbar-brand" @command="handleCommand">
    <span>
      <div>
          <el-avatar> user </el-avatar>
      </div>
    </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="dark" v-if="!isDark">深色模式</el-dropdown-item>
            <el-dropdown-item command="dark" v-if="isDark">浅色模式</el-dropdown-item>
            <el-dropdown-item command="goback">返回上一页</el-dropdown-item>
            <el-dropdown-item command="retrievePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="navbar-toggler" @click="goPhoto" >
        <div > 美图站</div>
      </div>
      <button  class="navbar-toggler"  @click="drawer = true" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon" ></span>
      </button>
      <div class="collapse navbar-collapse hidden-md-and-down" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"  >

          <li class="nav-item" v-for="(item) of tablesd" :key="item">
            <a class="nav-link" aria-current="page" @click="handleSelect(item.tablesname)" >{{ item.name }}</a>
          </li>
        </ul>

        <div @click="goPhoto" class="hidden-md-and-down">
          <div > 美图站</div>
        </div>
        <div class="d-flex" role="search" >
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="inputText">
          <button class="btn btn-outline-success" @click="handleSearch" >Search</button>
        </div>
      </div>

    </div>

  </nav>

  <el-drawer
      title="导航页"
      v-model="drawer"
      direction="ltr"
      :before-close="handleClose"
      size="50%"
      style="text-align: center;align-items: center"
  >
    <div>
      <el-input placeholder="此框没用" v-model="inputText" class="input-with-select"  style="width: 100%">
      </el-input>
    </div>
<!--    <el-button :icon="Search"   style="width: 100%"></el-button>-->


    <div v-for="(item,i) of tablesd" :key="item">
      <el-button @click="handleSelect(item.tablesname,i)" :type="buttonStyle[i]" style="width: 100%">
        {{item.name}}
      </el-button>
      <br>
    </div>
  </el-drawer>
</template>
<script>
import {Search} from '@element-plus/icons-vue'

export default {
  data(){
    return{
      dialogVisible: false,
      drawer: false,
      inputText:'',
      Search:Search,
      buttonStyle:new Array(2).fill(''),
      tablesd:[{"id":1,"tablesname":"/","name":"首页"},{"id":2,"tablesname":"like","name":"我喜欢"}],
    }
  },
  created() {

  },
  mounted(){
    this.openDark()

  },
  methods:{
    goPhoto(){
      this.$router.push("/")
    },
    handleCommand(command) {
      switch (command){
        case "dark":{this.toggleDark(); break}
        case "goback":{this.$router.go(-1);break}
        case "logout":{this.$router.replace("/logout");break}
        case "retrievePassword":{this.$router.replace("/retrievePassword");break}
        default : {console.log(command);break}
      }
    },
    handleClose(done) {
      done();
    },
    handleSelect(item,i){
      for (let j = 0; j < this.buttonStyle.length; j++) {
        this.buttonStyle[j] = '';
      }
      this.buttonStyle[i] = 'primary';
      this.inputText = ''
      this.$emit("handleSelect",item)

    },
    handleSearch(){
      this.$emit("handleSearch",this.inputText)
    },
    toggleDark(){
      this.$emit("toggleDark")
    },
    openDark(){
      const html = document.querySelector('nav')
      if (html) {
        if (this.isDark) {
          html.setAttribute("data-bs-theme","dark")
        } else {
          html.removeAttribute("data-bs-theme")
        }
      }
    }

  },
  props:{
    isDark:Boolean,
  },
  watch:{
    isDark(){
      this.openDark();
    }
  }
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
.lights{
  background-color: #e3f2fd;
}
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}



</style>