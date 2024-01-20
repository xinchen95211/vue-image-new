<template>
<div :class="isDark ? 'darks':''">

  <el-row :gutter="5" >
    <div class="centers"><h3>{{nameS}}</h3></div>
    <el-col :xs="24"
            v-for="(item,i) in imgList"
            :key="item"
            v-loading="loading[i] !== false"
            element-loading-text="正在拼命加载中..."
            element-loading-svg-view-box="-10, -10, 50, 50"
    >
        <div  class="related_box">
          <el-image
              :src="this.domain + '/' + this.prefix + '/' + this.suffix + '/' + item"
              fit="cover"
              :preview-src-list="imgList"
              class="el-image"
              @load="loading[i] = false"
              :initial-index="i"
          >
          </el-image>
        </div>

    </el-col>
  </el-row>

</div>
</template>

<script>
import axios from "axios";
export default {
  name: "PhotoShow",
  data(){
    return{
      loading:[],
      nameS: "",
      domain:"",
      prefix: "",
      suffix: "",
      collection:[],
      imgList:[],
      isDark:false,
      // domainCount:[],
      // domainList:["https://yaoyao.dynv6.net","https://wanfengbuwan.dynv6.net","https://huifaguang.dynv6.net"]
    }
  },
  created() {

    let item = localStorage.getItem("isDark");
    this.isDark = (item === "0");
    const html = document.querySelector('html')
    if (html) {
      if (this.isDark) {
        html.classList.remove("light");
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
        html.classList.add("light");
      }
    }
    this.mount(this.id);
  },
  methods:{
    mount(id){
      // let res = localStorage.getItem("photo_" + id);
      this.$getValue("photo_" + id).then(res => {
        if (res == null){
          axios.get(`${this.$domainUrl}/photo/` + id).then(e => {
            if (e.data.code === 200){
              let date = JSON.stringify(e.data.data);
              this.$setValue("photo_" + id,date)
              this.loadimg(date)
            }
          }).catch(error => {
                console.log("error" + error)
              }
          )
        }else {
          this.loadimg(res)
        }
      })
      // if (res == null){
      //     axios.get(`${this.$domainUrl}/photo/` + id).then(e => {
      //       if (e.data.code === 200){
      //         res = JSON.stringify(e.data.data);
      //         localStorage.setItem("photo_" + id,res)
      //         this.loadimg(res)
      //       }
      //     }).catch(error => {
      //           console.log("error" + error)
      //         }
      //     )
      // }else {
      //   this.loadimg(res)
      // }
    },
    loadimg(res){
      let resf = JSON.parse(res);
      this.nameS = resf.name;
      this.prefix = resf.prefix;
      this.suffix = resf.suffix;
      this.domain = resf.domain;
      let parse = JSON.parse(resf.collection);
      this.imgList = parse;
      this.domainCount = new Array(this.imglist.length).fill(0);
    },
    errorLoad(i){
      // if (this.domainCount[i] > this.domainList.length){
      //   return;
      // }
      // console.log(this.imglist[i].domain + this.domainCount[i])
      // this.imglist[i].domain = this.domainList[this.domainCount[i]]
      // console.log(this.imglist[i].domain)
      // this.domainCount[i] = this.domainCount[i]+1
      // console.log(this.domainCount[i])
    }
  },

  props:{
    id:String
  }

}
</script>

<style scoped>
.related_box {
  height:100%;
  text-align: center;
}
.centers{
  margin: 0 auto;
}
.darks{
  color: pink;
  background-color: black;
}
</style>
