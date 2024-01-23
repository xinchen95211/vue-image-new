<template>
  <el-row :gutter="5">
    <el-col :xs="12" :sm="12" :md="8" :lg="4"
            v-for="(item,i) in imglist"
            :key="item"
            v-loading="loading[i] !== false"
            element-loading-text="正在拼命加载中..."
            element-loading-svg-view-box="-10, -10, 50, 50"
    >
            <el-card  :body-style="{ padding: '2px' }" >
              <div style="text-align: center;">
                <el-icon size="30px"  color="lightblue" @click="selectStar(i)">
                  <star v-if="!item.star" />
                  <star-filled v-if="item.star" />
                </el-icon>
<!--                <el-icon size="30px" color="lightblue" @click="selectDownload" >-->
<!--                  <Download />-->
<!--                </el-icon>-->
              </div>
              <div  class="related_box"  @click="selectItem(item.id)">
                <el-image
                    :src="item.domain + '/' + item.prefix + '/' + item.suffix + '/' + item.thumbnail + 't?123213'"
                    fit="cover"
                    class="el-image"
                    crossOrigin="anonymous"
                    @load="loading[i] = false"
                    @error="errorLoad(i)"
                >
                </el-image>
                <div>
                  <span>{{item.name}}</span>
                </div>
              </div>
            </el-card>

    </el-col>
  </el-row>





</template>

<script>

import { Star, StarFilled} from "@element-plus/icons-vue";

export default {
  name: 'PhotoCard',
  components: { StarFilled, Star},
  data(){
    return{
      loading:[],
      random:1,
      domainCount:[],
      domainList:["https://yaoyao.dynv6.net","https://wanfengbuwan.dynv6.net","https://huifaguang.dynv6.net"]
    }
  },
  created() {
    this.random = Math.floor(Math.random() * 100);
    this.domainCount = new Array(this.imglist.length).fill(0);
  },
  methods:{
    selectItem(id){
      this.$emit("selectItem",id)
    },
    clearLoading(){
      this.loading = []
    },
    selectStar(i){
      this.$emit("selectStar",i)
    },
    selectDownload(){
      alert("开发中")
      // this.$emit("selectDownload",id)
    },
    errorLoad(i){
      if (this.domainCount[i] >= this.domainList.length){
        return;
      }
      console.log(this.imglist[i].domain + this.domainCount[i])
      this.imglist[i].domain = this.domainList[this.domainCount[i]]
      console.log(this.imglist[i].domain)
      this.domainCount[i] = this.domainCount[i]+1
      console.log(this.domainCount[i])

    }
  },
  props: {
    imglist: Array,
  }
}

</script>

<style scoped>

.related_box {
  height:548px;
  text-align: center;
  color: skyblue;
}
.el-image {
  height: 85%;
  border-radius: 10px;
}

</style>