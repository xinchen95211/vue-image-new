<template>
  <div :class="isDark ? 'darks':''" >
    <div :style="{ height: tabHeight }">
      <tabs-video @handleSelect="handleSelect" @handleSearch="handleSearch" @toggleDark="toggleDark" :tablebs="tablesd" :is-dark="isDark"></tabs-video>
      <div class="centers">
        <!--      <paglina-tion  :totalCount="totalCount" :currentPage="currentPage" @pageTurning="pageTurning"></paglina-tion>-->
        <div class="slider">
          <el-slider v-model="currentPage" :min="minPage" :max="totalPage" @change="changePage" show-input size="small"/>
        </div>
      </div>
    </div>
    <div  v-infinite-scroll="load" class="infinite-list" style="overflow: auto;"  :style="{ height: cardHeight }">
      <photo-card ref="photoCard" :imglist="imgList" @selectItem="selectItem" @selectStar="selectStar" ></photo-card>
      <div class="centers">
        <p v-if="pLoading" style="color:skyblue;font-size: 20px;">正在努力加载中</p>
        <p v-if="pmore" style="color:skyblue;font-size: 20px;">已经没有数据可以加载了</p>
      </div>
    </div>
    <div class="centers">
      <p  style="color:skyblue;font-size: 20px;" :style="{ height: folderHeight }">视频来自于网络，侵权联系删除</p>
    </div>
  </div>
</template>

<script>
import PhotoCard from '../components/PhotoCard.vue'
import TabsVideo from  '../components/TabsVideo.vue'
import axios from "axios";

export default {
  name: "PhotoMain",
  data() {
    return {
      tablesd:[{"id":1,"tablesname":"/","name":"首页"},{"id":2,"tablesname":"like","name":"我喜欢"}],
      cardHeight: '',
      tabHeight: '',
      folderHeight: '',
      pmore: false,
      minPage: 1,
      //图片数据
      imgList: [],
      //当前分类
      tableName: '',
      //当前页码
      currentPage: 1,
      //搜索内容
      search: '',
      //总页数
      totalPage: 93,
      //总数据
      totalCount: 2162,
      loading: [],
      //暗黑模式
      isDark: null,
      pLoading: false
    }

  },
  created() {
    this.$nextTick(() => {
      let docHeight = document.documentElement.clientHeight;
      console.log("可视区域高度", docHeight);
      this.cardHeight = docHeight * 0.8 + "px";
      this.tabHeight = docHeight * 0.14 + 'px';
      this.folderHeight = docHeight * 0.05 + 'px';
      console.log(this.cardHeight, this.tabHeight, this.folderHeight)
    });
    //0为false 1 为 ture
    let item = localStorage.getItem("isDark");
    if (item == null) {
      localStorage.setItem("isDark", "0")
      this.isDark = false
    } else {
      this.isDark = (item === "0");
    }
    let tablenamd = localStorage.getItem("superVideoTable");
    if (tablenamd != null){
      this.tableName = tablenamd;
    }
    let superdata = localStorage.getItem("superVideoData");
    if (superdata != null){
      let parse = JSON.parse(superdata);
      this.imgList = parse.records;
      this.totalCount = parse.total;
      this.currentPage = parse.current;
      this.totalPage = parse.pages;
    }else {
      this.imgListLoad();
    }


  },
  methods: {
    load() {
      if (!this.pLoading) {
        if (this.currentPage >= this.totalPage) {
          this.pmore = true;
        } else {
          this.pmore = false;
          this.pLoading = true;
          this.currentPage += 1;
          axios.post(`${this.$domainUrl}/video`, {
            "tag": this.tableName,
            "row": this.currentPage
          }).then(res => {
            if (res.data.code === 200) {
              this.imgList = this.imgList.concat(res.data.data.records);
              this.pLoading = false;
              let e = JSON.stringify(res.data.data);
              localStorage.setItem("superVideoData",e)
            }
          }).catch(error => {
                this.pLoading = false;
                this.currentPage -= 1;
                console.log(error)
              }
          )
        }
      }
    },
    selectItem(id) {
      // this.$router.push({name:'/videoshow',query: {id:id,poster:}})
      window.open(`/#/videoshow/${id}`);

    },
    selectStar(i) {
      console.log(this.imgList[i].id);
      axios.get(`${this.$domainUrl}/video/like/` + this.imgList[i].id).then(e => {
        if (e.data.code === 2001) {
          this.imgList[i].star = !this.imgList[i].star;
        }
      })
    },
    //视频加载
    imgListLoad() {
      axios.post(`${this.$domainUrl}/video`, {
        "tag": this.tableName,
        "row": this.currentPage
      }).then(res => {
        if (res.data.code === 200) {
          this.$refs.photoCard.clearLoading();
          this.imgList = res.data.data.records;
          this.totalCount = res.data.data.total;
          this.currentPage = res.data.data.current;
          this.totalPage = res.data.data.pages;
          let e = JSON.stringify(res.data.data);
          localStorage.setItem("superVideoData",e)
        }
      }).catch(error => {
            console.log("error" + error)
          }
      )
    },
    //翻页逻辑
    pageTurning(e) {
      this.currentPage = e;
      this.imgListLoad();
    },
    changePage() {
      this.imgListLoad();
    },
    //切换分类逻辑
    handleSelect(item) {
      this.currentPage = 1;
      this.tableName = item;
      localStorage.setItem("superVideoTable",item)
      this.imgListLoad();
    },
    //搜索逻辑
    handleSearch(e) {
      this.currentPage = 1;
      this.search = e
    },
    //切换暗黑模式
    toggleDark() {
      this.isDark = !this.isDark
    },
    //暗黑模式渲染
    openDark() {
      const html = document.querySelector('html')
      if (html) {
        if (this.isDark) {
          html.classList.remove("light");
          html.classList.add("dark");
          localStorage.setItem("isDark", "0")
        } else {
          html.classList.remove("dark");
          html.classList.add("light");
          localStorage.setItem("isDark", "1")
        }
      }
    },
  },

  components: {
    PhotoCard,
    TabsVideo,
  },

  //数据监听
  watch: {
    isDark() {
      this.openDark()
    },
    tableName() {
      this.imgListLoad()
    },
    search() {
      this.imgListLoad()
    },
    // currentPage(){this.imgListLoad()},
  }
}
</script>

<style scoped>
.centers{
  display: flex;
  justify-content: center;
}
.slider{
  width: 90vw;
  height: 5vh;
  padding-top: 10px;
  padding-bottom: 6px;
}
</style>