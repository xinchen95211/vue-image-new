<script>
import {Star, StarFilled} from "@element-plus/icons-vue";
import axios from "axios";
import {ElLoading} from "element-plus";
let loading;
export default{
  components: { StarFilled, Star},
  data(){
    return{
      loadPhotoLoad:false,
      column:6,
      pageWidth: window.innerWidth,
      random:1,
      domainCount:[],
      domainList:["https://yaoyao.dynv6.net","https://wanfengbuwan.dynv6.net","https://huifaguang.dynv6.net"],
      currentItem: 0,
      columnList:[],
      lselectLoad:false,
      scrollHeight:0,
      tempData:[],
      tempDataIndex:0,
      getPhotoBoole:false,
    }
  },
  created() {
       loading = ElLoading.service({
    lock: true,
    text: '正在加载中请稍后...',
    background: 'rgba(0, 0, 0, 0.8)',
    })
    this.currentItem = Math.floor(Math.random() * (this.maxValue - 1 + 1)) + 1
    this.domainList.sort(() => Math.random() - 0.5);
       console.log(this.currentItem)
    this.scrollHeight = document.documentElement.clientHeight;
    for (let j = 0; j < this.column; j++) {
      this.columnList[j] = [];
    }

      this.loadTemplate(this.getValuePrefix + this.currentItem);

    window.addEventListener('resize', this.handleResize);
  },
  mounted(){
    this.handleResize()
    for (let i = 0; i < 3; i++) {
      this.getPhoto();
    }

  },
  methods:{
    selectIte(){
      if (this.lselectLoad){
        return;
      }
      let elements = [];
      for (let j = 0; j < this.column; j++) {
        elements.push(this.$refs.listItem[j]);
      }
      this.lselectLoad = true;
      for (let j = 0; j < 6; j++) {
        this.columnList[j].length = 0;
      }
      for (let i = 0; i < this.tempDataIndex; i++) {
        this.loadPhotoFun(this.tempData[i],0,i)
      }
      setTimeout(() => {
        this.lselectLoad = false;
      },1000)

    },
    handleResize() {
      this.pageWidth = window.innerWidth;
      //xs
      if (this.pageWidth <= 768){
        this.column = 2
        //md
      }else if (this.pageWidth < 1200 && 768 < this.pageWidth){
        this.column = 3
        //lg
      }else if (this.pageWidth > 1200){
        this.column = 6
      }
    },
    getPhoto() {
      //判断是否已经加载1条数据
      if (this.tempData.length > 0) {
        if (this.tempDataIndex >= this.tempData.length) {
          this.tempDataIndex = 0;
          this.tempData.length = 0;
          this.getPhoto();
        } else {
          let forcount = 0;
          let fornumber = 4;
          if (this.tempDataIndex + 4 > this.tempData.length) {
            forcount = this.tempDataIndex;
            fornumber = this.tempData.length;
          }
          for (let i = forcount; i < fornumber; i++) {
            const value = this.tempData[this.tempDataIndex];
            this.loadPhotoFun(this.getPhotoValue(value, this.currentItem, this.tempDataIndex), 0, this.tempDataIndex)
            this.tempDataIndex += 1;
          }



        }
      } else {
        this.currentItem += 1;
        //获取数据
        if (this.currentItem > this.maxValue) {
          this.currentItem = 1;
          this.tempDataIndex = 0;
        }
        this.loadTemplate(this.getValuePrefix + this.currentItem);

      }
    },
    loadTemplate(value){
      this.$getValue(value).then(value => {
        this.tempData = value;
        this.getPhoto();
      })
    },
    loadPhotoFun(value, count,index){
      if (count >= this.domainList.length){
        return;
      }
      let elements = [];
      for (let j = 0; j < this.column; j++) {
        elements.push(this.$refs.listItem[j]);
      }
      let aImg = new Image();
      aImg.src = this.domainList[count] + '/' +value.url;
      aImg.onload = ()=>{
        value.domain = this.domainList[count]
        const heights = elements.map(element => element.offsetHeight);
        const minHeight = Math.min(...heights);
        const minIndex = heights.indexOf(minHeight);
        this.columnList[minIndex].push(value)
        this.tempData[index] = value;
        loading.close();
      }
      aImg.onerror = () => {
        this.loadPhotoFun(value, count + 1,index);
      };
    },
    scrollTIME(scrollLeft){
      const scrollWrapper = this.$refs.scrollbarRef.wrapRef
      const scrolled = scrollLeft.scrollTop;
      const clientHeight = scrollWrapper.clientHeight;
      const scrollHeight = scrollWrapper.scrollHeight;
      const percentageScrolled = (scrolled / (scrollHeight - clientHeight)) * 100;
      if (percentageScrolled >= 65) {
        if (this.loadPhotoLoad){
          return;
        }else {
          this.loadPhotoLoad = true;

              this.getPhoto();

          setTimeout(() => {
            this.loadPhotoLoad = false;
          },500)
        }

      }
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  props: {
    getValuePrefix:String,
    getPhotoValue:Function,
    selectItem:Function,
    maxValue:Number,
  },
  watch:{
    column(){
      setTimeout(()=>{
        this.selectIte();
      },50)
    }
  }
}
</script>

<template>
  <el-scrollbar style="text-align: center" ref="scrollbarRef" :height="scrollHeight" @scroll="scrollTIME">
    <el-row>
      <el-col :xs="12" :sm="8" :md="8" :lg="4"
              v-for="i in column"
      >
        <div ref="listItem">
          <el-image
              v-for="(value) in columnList[i-1]"
              :key="value"
              :src="value.domain + '/' + value.url"
              @click="selectItem(value.id,value.superId)"
          >
          </el-image>
        </div>
      </el-col>
    </el-row>
    <div>正在努力加载中,请稍后...</div>
  </el-scrollbar>
</template>

<style >
</style>