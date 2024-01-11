<template>

  <el-pagination
      style="height: 3vh"
      :page-size="24"
      :pager-count=pagerCount
      background layout="prev, pager, next"
      :total="totalCount"
      :current-page="currentPage"
      :hide-on-single-page="totalCount <= 24"
      @update:current-page="pageTurning"
      :small="true"
  />
</template>

<script>
export default {
  name: "PaginaTion",
  data(){
    return{
      pagerCount:15,
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize(); // 初始执行一次回调函数
  },

  methods:{
    pageTurning(e){
      console.log(e)
      this.$emit("pageTurning",e)
    },
    handleResize() {
      // 获取屏幕宽度
      const screenWidth = window.innerWidth || document.documentElement.clientWidth;
      // 检查屏幕宽度是否小于等于575px
      if (screenWidth <= 575) {
        this.pagerCount = 5;
      } else if(screenWidth >= 576 && screenWidth <= 856){
        this.pagerCount = 9;
      } else {
        this.pagerCount = 15;
      }
    }

  },
  props:{
    totalCount:Number,
    currentPage:Number
  }
}
</script>

<style scoped>

</style>