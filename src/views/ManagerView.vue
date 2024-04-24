<script>
import axios from "axios";


export default {
  name: 'App',
  data(){
    return{
      tableData:[],
      elMainHeight:0,
    }
  },
  created() {
    this.$nextTick(() => {
      let docHeight = document.documentElement.clientHeight;
      this.elMainHeight = docHeight * 0.85
    });
    this.getAllUser(1)
  },
  methods:{
    // 鼠标移动逻辑
    getAllUser(current){
      axios.get(`${this.$domainUrl}/manager/allUser`,{
        params:{
          "current":current
        }
      }).then(e => {
        if (e.data.code === 200){
          this.tableData = e.data.data.records
        }
      })
    },
  }
}









</script>

<template>
  <el-container>
    <el-header>
      用户中心
    </el-header>
    <el-container>
      <el-aside width="50px">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            collapse
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <span>Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <span>Navigator Four</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-table :data="tableData" :height="elMainHeight" border style="width: 100%" >
          <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="nickname" label="昵称" width="180" />
          <el-table-column prop="roles" label="角色"  />
        <el-table-column prop="username" label="用户名称" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="status" label="状态 " />
        <el-table-column prop="createTime" label="注册时间" />
        <el-table-column prop="updateTime" label="修改时间" />
          <el-table-column label="编辑">
            <template #default="scope">
            <el-button @click="console.log(scope.row.id)">编辑</el-button>
            </template>
          </el-table-column>
      </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>

</style>