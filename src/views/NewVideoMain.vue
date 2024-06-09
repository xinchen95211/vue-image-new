<script>
import axios from "axios";
import WaterFall from "@/components/WaterFall.vue";

export default {
  data(){
    return{
      getValuePrefix:"video_",
    }
  },
  mounted() {

  },

  methods:{
    selectItem(id,superId){
      window.open('/#/video/'+ id + '/' + superId);
    },
    getPhotoValue(value,superValue,valueIndex){
      let newValue = {};
      newValue.id = valueIndex;
      newValue.superId = superValue;
      newValue.url = 'Thumbnail/Video_thumbnail/' + value.thumbnail;
      return newValue;
    },
  },
  props:{

  },
  components:{
    WaterFall
  }
}
</script>

<template>
<water-fall :getValuePrefix="getValuePrefix" :getPhotoValue="getPhotoValue" :selectItem="selectItem" :maxValue="1278"></water-fall>
</template>

<style scoped>

</style>