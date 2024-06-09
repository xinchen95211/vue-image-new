<template>
  <el-scrollbar style="text-align: center" ref="scrollbarRef" :height="scrollHeight" >
          <el-image
              v-for="(item,i) in imgList"
              :key="item"
              :src="item"
              fit="cover"
              :preview-src-list="imgList"
              class="el-image"
              :initial-index="i"
          >
          </el-image>
  </el-scrollbar>
</template>

<script>
import {ElLoading} from "element-plus";
export default {
  name: "PhotoShow",
  data(){
    return{
      domainList:["https://yaoyao.dynv6.net","https://wanfengbuwan.dynv6.net","https://huifaguang.dynv6.net"],
      imgList:[],
      columnList:[],
      scrollHeight:0,
    }
  },
  created() {
    this.domainList.sort(() => Math.random() - 0.5);
    this.scrollHeight = document.documentElement.clientHeight;
    const loading = ElLoading.service({
      lock: true,
      text: '正在加载中请稍后...',
      background: 'rgba(0, 0, 0, 0.8)',
    })
    setTimeout(() => {
      loading.close();
    }, 2000);
  },
  mounted() {
    this.getPhoto(this.id,this.superId);
  },
  methods:{
    loadPhotoFun(value, count){
      if (count >= this.domainList.length){
        this.imgList.push(this.domainList[count-1] + '/' +value)
        return;
      }
      let aImg = new Image();
      aImg.src = this.domainList[count] + '/' +value;
      aImg.onload = ()=>{
        this.imgList.push(this.domainList[count] + '/' +value)
      }
      aImg.onerror = () => {
        this.loadPhotoFun(value, count + 1);
      };
    },
    getPhoto(id,superId){
      this.$getValue("photo_" + superId).then(item => {
        JSON.parse(item[id].collection).forEach(value => {
          this.loadPhotoFun(item[id].prefix + '/' + item[id].suffix + '/' + value,0)
        })
      })
    },
  },

  props:{
    id:String,
    superId:String,
  }

}
</script>

<style scoped>

</style>
