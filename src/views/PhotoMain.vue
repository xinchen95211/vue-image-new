<template>
  <div :class="isDark ? 'darks':''" >
    <div :style="{ height: tabHeight }">
      <tabs-vips @handleSelect="handleSelect" @handleSearch="handleSearch" @toggleDark="toggleDark"  :is-dark="isDark"></tabs-vips>
    <div class="centers">
<!--      <paglina-tion  :totalCount="totalCount" :currentPage="currentPage" @pageTurning="pageTurning"></paglina-tion>-->
      <div class="slider">
        <el-slider v-model="currentPage" :min="minPage" :max="totalPage" @change="changePage"/>
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
      <p  style="color:skyblue;font-size: 20px;" :style="{ height: folderHeight }">图片来自于网络，侵权联系删除</p>
    </div>
</div>




</template>

<script>
import PhotoCard from '../components/PhotoCard.vue'
import TabsVips from  '../components/TabsVips.vue'
import axios from "axios";

export default {
  name: "PhotoMain",
  data(){
    return{
      cardHeight:'',
      tabHeight:'',
      folderHeight:'',
      pmore:false,
      minPage:1,
      //图片数据
      imgList: [
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739139937857122306",
          "name": "[Ugirls爱尤物]No.2561_模特夏瑶私房浴室性感学生制服半撩秀翘臀美腿迷人诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2561_%E6%A8%A1%E7%89%B9%E5%A4%8F%E7%91%B6%E7%A7%81%E6%88%BF%E6%B5%B4%E5%AE%A4%E6%80%A7%E6%84%9F%E5%AD%A6%E7%94%9F%E5%88%B6%E6%9C%8D%E5%8D%8A%E6%92%A9%E7%A7%80%E7%BF%98%E8%87%80%E7%BE%8E%E8%85%BF%E8%BF%B7%E4%BA%BA%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "15171020620.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739139937941008385",
          "name": "[Ugirls爱尤物]No.2562_模特萌琪琪私房浴室性感白色连体泳衣湿身秀完美身材诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2562_%E6%A8%A1%E7%89%B9%E8%90%8C%E7%90%AA%E7%90%AA%E7%A7%81%E6%88%BF%E6%B5%B4%E5%AE%A4%E6%80%A7%E6%84%9F%E7%99%BD%E8%89%B2%E8%BF%9E%E4%BD%93%E6%B3%B3%E8%A1%A3%E6%B9%BF%E8%BA%AB%E7%A7%80%E5%AE%8C%E7%BE%8E%E8%BA%AB%E6%9D%90%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "06171045674.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739139937961979906",
          "name": "[Ugirls爱尤物]No.2563_模特绯月樱私房性感红花色高叉连体衣秀完美身材诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2563_%E6%A8%A1%E7%89%B9%E7%BB%AF%E6%9C%88%E6%A8%B1%E7%A7%81%E6%88%BF%E6%80%A7%E6%84%9F%E7%BA%A2%E8%8A%B1%E8%89%B2%E9%AB%98%E5%8F%89%E8%BF%9E%E4%BD%93%E8%A1%A3%E7%A7%80%E5%AE%8C%E7%BE%8E%E8%BA%AB%E6%9D%90%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "01171137216.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739139937970368515",
          "name": "[Ugirls爱尤物]No.2564_模特筱慧户外沙发上性感紫灰色吊裙秀完美身材迷人诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2564_%E6%A8%A1%E7%89%B9%E7%AD%B1%E6%85%A7%E6%88%B7%E5%A4%96%E6%B2%99%E5%8F%91%E4%B8%8A%E6%80%A7%E6%84%9F%E7%B4%AB%E7%81%B0%E8%89%B2%E5%90%8A%E8%A3%99%E7%A7%80%E5%AE%8C%E7%BE%8E%E8%BA%AB%E6%9D%90%E8%BF%B7%E4%BA%BA%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "01162427429.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739139937974562821",
          "name": "[Ugirls爱尤物]No.2565_模特西门小玉私房性感紫红蕾丝吊带睡裙秀丰满身材诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2565_%E6%A8%A1%E7%89%B9%E8%A5%BF%E9%97%A8%E5%B0%8F%E7%8E%89%E7%A7%81%E6%88%BF%E6%80%A7%E6%84%9F%E7%B4%AB%E7%BA%A2%E8%95%BE%E4%B8%9D%E5%90%8A%E5%B8%A6%E7%9D%A1%E8%A3%99%E7%A7%80%E4%B8%B0%E6%BB%A1%E8%BA%AB%E6%9D%90%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "0117621369.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739140003971936260",
          "name": "[Ugirls爱尤物]No.2566_模特苏沫私房半脱黑色外套露性感黑色内衣秀曼妙身姿诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2566_%E6%A8%A1%E7%89%B9%E8%8B%8F%E6%B2%AB%E7%A7%81%E6%88%BF%E5%8D%8A%E8%84%B1%E9%BB%91%E8%89%B2%E5%A4%96%E5%A5%97%E9%9C%B2%E6%80%A7%E6%84%9F%E9%BB%91%E8%89%B2%E5%86%85%E8%A1%A3%E7%A7%80%E6%9B%BC%E5%A6%99%E8%BA%AB%E5%A7%BF%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "02153532570.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739140003984519170",
          "name": "[Ugirls爱尤物]No.2567_模特合集幻想情人主题穆菲菲等七大美女秀完美身材诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2567_%E6%A8%A1%E7%89%B9%E5%90%88%E9%9B%86%E5%B9%BB%E6%83%B3%E6%83%85%E4%BA%BA%E4%B8%BB%E9%A2%98%E7%A9%86%E8%8F%B2%E8%8F%B2%E7%AD%89%E4%B8%83%E5%A4%A7%E7%BE%8E%E5%A5%B3%E7%A7%80%E5%AE%8C%E7%BE%8E%E8%BA%AB%E6%9D%90%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "04115422120.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739140004001296385",
          "name": "[Ugirls爱尤物]No.2568_模特李浅浅私房性感粉色连体衣+内衣系列秀完美身材诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2568_%E6%A8%A1%E7%89%B9%E6%9D%8E%E6%B5%85%E6%B5%85%E7%A7%81%E6%88%BF%E6%80%A7%E6%84%9F%E7%B2%89%E8%89%B2%E8%BF%9E%E4%BD%93%E8%A1%A3%2B%E5%86%85%E8%A1%A3%E7%B3%BB%E5%88%97%E7%A7%80%E5%AE%8C%E7%BE%8E%E8%BA%AB%E6%9D%90%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "09171436289.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739140004018073602",
          "name": "[Ugirls爱尤物]No.2569_模特吴美溪白色运动装+黑色蕾丝情趣内衣秀惹火身材诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2569_%E6%A8%A1%E7%89%B9%E5%90%B4%E7%BE%8E%E6%BA%AA%E7%99%BD%E8%89%B2%E8%BF%90%E5%8A%A8%E8%A3%85%2B%E9%BB%91%E8%89%B2%E8%95%BE%E4%B8%9D%E6%83%85%E8%B6%A3%E5%86%85%E8%A1%A3%E7%A7%80%E6%83%B9%E7%81%AB%E8%BA%AB%E6%9D%90%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "0717153598.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739140004039045122",
          "name": "[Ugirls爱尤物]No.2570_模特欧阳美萱户外天台性感黑色蕾丝内衣秀完美身材诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2570_%E6%A8%A1%E7%89%B9%E6%AC%A7%E9%98%B3%E7%BE%8E%E8%90%B1%E6%88%B7%E5%A4%96%E5%A4%A9%E5%8F%B0%E6%80%A7%E6%84%9F%E9%BB%91%E8%89%B2%E8%95%BE%E4%B8%9D%E5%86%85%E8%A1%A3%E7%A7%80%E5%AE%8C%E7%BE%8E%E8%BA%AB%E6%9D%90%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "0111442331.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739140004055822340",
          "name": "[Ugirls爱尤物]No.2571_模特夏瑶私房性感白色吊带衣配牛仔超短裤秀完美身材诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2571_%E6%A8%A1%E7%89%B9%E5%A4%8F%E7%91%B6%E7%A7%81%E6%88%BF%E6%80%A7%E6%84%9F%E7%99%BD%E8%89%B2%E5%90%8A%E5%B8%A6%E8%A1%A3%E9%85%8D%E7%89%9B%E4%BB%94%E8%B6%85%E7%9F%AD%E8%A3%A4%E7%A7%80%E5%AE%8C%E7%BE%8E%E8%BA%AB%E6%9D%90%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "0B17160163.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739140004076793859",
          "name": "[Ugirls爱尤物]No.2572_模特南私房性感粉色连体内衣+白色吊带衣秀完美身材诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2572_%E6%A8%A1%E7%89%B9%E5%8D%97%E7%A7%81%E6%88%BF%E6%80%A7%E6%84%9F%E7%B2%89%E8%89%B2%E8%BF%9E%E4%BD%93%E5%86%85%E8%A1%A3%2B%E7%99%BD%E8%89%B2%E5%90%8A%E5%B8%A6%E8%A1%A3%E7%A7%80%E5%AE%8C%E7%BE%8E%E8%BA%AB%E6%9D%90%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "03171644105.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739140004089376771",
          "name": "[Ugirls爱尤物]No.2573_模特筱慧暗夜天使主题性感黑色情趣旗袍配超薄黑丝诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2573_%E6%A8%A1%E7%89%B9%E7%AD%B1%E6%85%A7%E6%9A%97%E5%A4%9C%E5%A4%A9%E4%BD%BF%E4%B8%BB%E9%A2%98%E6%80%A7%E6%84%9F%E9%BB%91%E8%89%B2%E6%83%85%E8%B6%A3%E6%97%97%E8%A2%8D%E9%85%8D%E8%B6%85%E8%96%84%E9%BB%91%E4%B8%9D%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "00171723785.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739140016726814723",
          "name": "[Ugirls爱尤物]No.2574_模特章子希私房性感白色蕾丝内衣秀完美身材撩人诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2574_%E6%A8%A1%E7%89%B9%E7%AB%A0%E5%AD%90%E5%B8%8C%E7%A7%81%E6%88%BF%E6%80%A7%E6%84%9F%E7%99%BD%E8%89%B2%E8%95%BE%E4%B8%9D%E5%86%85%E8%A1%A3%E7%A7%80%E5%AE%8C%E7%BE%8E%E8%BA%AB%E6%9D%90%E6%92%A9%E4%BA%BA%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "0417181805.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739140016735203333",
          "name": "[Ugirls爱尤物]No.2575_模特萌汉药baby私房性感花色图案旗袍秀完美身材迷人诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2575_%E6%A8%A1%E7%89%B9%E8%90%8C%E6%B1%89%E8%8D%AFbaby%E7%A7%81%E6%88%BF%E6%80%A7%E6%84%9F%E8%8A%B1%E8%89%B2%E5%9B%BE%E6%A1%88%E6%97%97%E8%A2%8D%E7%A7%80%E5%AE%8C%E7%BE%8E%E8%BA%AB%E6%9D%90%E8%BF%B7%E4%BA%BA%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "06171832608.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739140024679215105",
          "name": "[Ugirls爱尤物]No.2576_模特合集性感魔盒主题萌汉药等七大美女私房性感服饰诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2576_%E6%A8%A1%E7%89%B9%E5%90%88%E9%9B%86%E6%80%A7%E6%84%9F%E9%AD%94%E7%9B%92%E4%B8%BB%E9%A2%98%E8%90%8C%E6%B1%89%E8%8D%AF%E7%AD%89%E4%B8%83%E5%A4%A7%E7%BE%8E%E5%A5%B3%E7%A7%81%E6%88%BF%E6%80%A7%E6%84%9F%E6%9C%8D%E9%A5%B0%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "0217024931.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739140024679215111",
          "name": "[Ugirls爱尤物]No.2577_模特方婉媮私房性感绿色吊带配白色内裤秀完美身材诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2577_%E6%A8%A1%E7%89%B9%E6%96%B9%E5%A9%89%E5%AA%AE%E7%A7%81%E6%88%BF%E6%80%A7%E6%84%9F%E7%BB%BF%E8%89%B2%E5%90%8A%E5%B8%A6%E9%85%8D%E7%99%BD%E8%89%B2%E5%86%85%E8%A3%A4%E7%A7%80%E5%AE%8C%E7%BE%8E%E8%BA%AB%E6%9D%90%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "00171935568.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739140450170384388",
          "name": "[Ugirls爱尤物]No.2578_模特筱慧私房浴室性感花色连身短裙配超薄肉丝迷人诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2578_%E6%A8%A1%E7%89%B9%E7%AD%B1%E6%85%A7%E7%A7%81%E6%88%BF%E6%B5%B4%E5%AE%A4%E6%80%A7%E6%84%9F%E8%8A%B1%E8%89%B2%E8%BF%9E%E8%BA%AB%E7%9F%AD%E8%A3%99%E9%85%8D%E8%B6%85%E8%96%84%E8%82%89%E4%B8%9D%E8%BF%B7%E4%BA%BA%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "0B95140189.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739140450174578694",
          "name": "[Ugirls爱尤物]No.2579_模特小卷卷老师性感黑色旗袍配黑丝袜秀完美身材诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2579_%E6%A8%A1%E7%89%B9%E5%B0%8F%E5%8D%B7%E5%8D%B7%E8%80%81%E5%B8%88%E6%80%A7%E6%84%9F%E9%BB%91%E8%89%B2%E6%97%97%E8%A2%8D%E9%85%8D%E9%BB%91%E4%B8%9D%E8%A2%9C%E7%A7%80%E5%AE%8C%E7%BE%8E%E8%BA%AB%E6%9D%90%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "03164033376.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739140450182967299",
          "name": "[Ugirls爱尤物]No.2580_模特球球私房性感肉色薄透连体衣秀丰满身材撩人诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2580_%E6%A8%A1%E7%89%B9%E7%90%83%E7%90%83%E7%A7%81%E6%88%BF%E6%80%A7%E6%84%9F%E8%82%89%E8%89%B2%E8%96%84%E9%80%8F%E8%BF%9E%E4%BD%93%E8%A1%A3%E7%A7%80%E4%B8%B0%E6%BB%A1%E8%BA%AB%E6%9D%90%E6%92%A9%E4%BA%BA%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "06172114489.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739140450187161603",
          "name": "[Ugirls爱尤物]No.2581_模特璎珞天使的甜味主题性感白色内衣秀完美身材诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2581_%E6%A8%A1%E7%89%B9%E7%92%8E%E7%8F%9E%E5%A4%A9%E4%BD%BF%E7%9A%84%E7%94%9C%E5%91%B3%E4%B8%BB%E9%A2%98%E6%80%A7%E6%84%9F%E7%99%BD%E8%89%B2%E5%86%85%E8%A1%A3%E7%A7%80%E5%AE%8C%E7%BE%8E%E8%BA%AB%E6%9D%90%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "1C15320642.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739140450195550213",
          "name": "[Ugirls爱尤物]No.2582_模特林佳沫私房性感黑色蕾丝透视睡衣秀完美身材诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2582_%E6%A8%A1%E7%89%B9%E6%9E%97%E4%BD%B3%E6%B2%AB%E7%A7%81%E6%88%BF%E6%80%A7%E6%84%9F%E9%BB%91%E8%89%B2%E8%95%BE%E4%B8%9D%E9%80%8F%E8%A7%86%E7%9D%A1%E8%A1%A3%E7%A7%80%E5%AE%8C%E7%BE%8E%E8%BA%AB%E6%9D%90%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "0920415329.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739140450199744517",
          "name": "[Ugirls爱尤物]No.2583_模特球球私房性感白T配黑色短裙露超薄黑丝秀美腿诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2583_%E6%A8%A1%E7%89%B9%E7%90%83%E7%90%83%E7%A7%81%E6%88%BF%E6%80%A7%E6%84%9F%E7%99%BDT%E9%85%8D%E9%BB%91%E8%89%B2%E7%9F%AD%E8%A3%99%E9%9C%B2%E8%B6%85%E8%96%84%E9%BB%91%E4%B8%9D%E7%A7%80%E7%BE%8E%E8%85%BF%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "0B17472621.jpg",
          "updateTime": null
        },
        {
          "collection": null,
          "createTime": null,
          "domain": "https://yaoyao.dynv6.net",
          "id": "1739140450203938823",
          "name": "[Ugirls爱尤物]No.2584_模特钟晴私房性感蓝色薄透连衣长裙秀丰满身材惹火诱惑写真35P",
          "prefix": "/onedriveyaoyao/jpmn2/Aiyouwu/",
          "suffix": "%5BUgirls%E7%88%B1%E5%B0%A4%E7%89%A9%5DNo.2584_%E6%A8%A1%E7%89%B9%E9%92%9F%E6%99%B4%E7%A7%81%E6%88%BF%E6%80%A7%E6%84%9F%E8%93%9D%E8%89%B2%E8%96%84%E9%80%8F%E8%BF%9E%E8%A1%A3%E9%95%BF%E8%A3%99%E7%A7%80%E4%B8%B0%E6%BB%A1%E8%BA%AB%E6%9D%90%E6%83%B9%E7%81%AB%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F35P",
          "tableName": null,
          "thumbnail": "0516432388.jpg",
          "updateTime": null
        }
      ],
      //当前分类
      tableName:'Aiyouwu',
      //当前页码
      currentPage: 1,
      //搜索内容
      search:'',
      //总页数
      totalPage:93,
      //总数据
      totalCount: 2162,
      loading:[],
      //暗黑模式
      isDark:null,
      pLoading:false
    }

  },
  created() {
    this.$nextTick(() => {
      let docHeight = document.documentElement.clientHeight;
      console.log("可视区域高度", docHeight);
      this.cardHeight = docHeight*0.8 + "px";
      this.tabHeight = docHeight*0.14 + 'px';
      this.folderHeight = docHeight * 0.05+'px';
      console.log(this.cardHeight , this.tabHeight ,  this.folderHeight)
    });
    //0为false 1 为 ture
    let item = localStorage.getItem("isDark");
    if (item == null){
      localStorage.setItem("isDark","0")
      this.isDark = false
    }else {
      this.isDark = (item === "0");
    }
  },
  methods:{
    load(){
      if (!this.pLoading){
        if (this.currentPage >= this.totalPage){
          this.pmore = true;
        }else {
          this.pmore = false;
          this.pLoading=true;
          this.currentPage += 1;
          axios.post("https://frp-hat.top:49728/photo", {
            "tables": this.tableName,
            "search": this.search,
            "row": this.currentPage
          }).then(res => {
            if (res.data.code === 200){
              this.imgList=this.imgList.concat(res.data.data.records);
              this.pLoading=false;
            }
          }).catch(error => {
                this.pLoading=false;
                this.currentPage -= 1;
                console.log(error)
              }
          )
        }
      }
    },
    selectItem(id){
      // this.$router.push('/show/'+ id)
      window.open('/#/show/'+ id);
    },
    selectStar(i){
      console.log(this.imgList[i].id);
      axios.get("https://frp-hat.top:49728/photo/like/" + this.imgList[i].id).then(e => {
        if (e.data.code === 2001){
          this.imgList[i].star = !this.imgList[i].star;
        }
      })
    },
    //图片加载
    imgListLoad(){
      axios.post("https://frp-hat.top:49728/photo", {
        "tables": this.tableName,
        "search": this.search,
        "row": this.currentPage
      }).then(res => {
        if (res.data.code === 200){
          this.$refs.photoCard.clearLoading();
          this.imgList = res.data.data.records;
          this.totalCount = res.data.data.total;
          this.currentPage = res.data.data.current;
          this.totalPage = res.data.data.pages;
        }
      }).catch(error => {
            console.log("error" + error)
      }
      )
    },
    //翻页逻辑
    pageTurning(e){
      this.currentPage = e;
      this.imgListLoad();
    },
    changePage(){
      this.imgListLoad();
    },
    //切换分类逻辑
    handleSelect(item){
      this.currentPage = 1;
      this.tableName = item
      this.search = ""
    },
    //搜索逻辑
    handleSearch(e){
      this.currentPage = 1;
      this.search = e
    },
    //切换暗黑模式
    toggleDark(){
      this.isDark = !this.isDark
    },
    //暗黑模式渲染
    openDark(){
      const html = document.querySelector('html')
      if (html) {
        if (this.isDark) {
          html.classList.remove("light");
          html.classList.add("dark");
          localStorage.setItem("isDark","0")
        } else {
          html.classList.remove("dark");
          html.classList.add("light");
          localStorage.setItem("isDark","1")
        }
      }
    },
},

  components: {
    PhotoCard,
    TabsVips,
  },

  //数据监听
  watch:{
    isDark(){this.openDark()},
    tableName(){this.imgListLoad()},
    search(){this.imgListLoad()},
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
  height: 5vh
}
</style>
