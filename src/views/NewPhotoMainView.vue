<script>
import axios from "axios";
import WaterFall from "@/components/WaterFall.vue";

export default {
  data(){
    return{
      getValuePrefix:"photo_",
    }
  },
  mounted() {
   // this.down();
  },

  methods:{
    selectItem(id,superId){
      window.open('/#/photo/'+ id + '/'+ superId);
    },
    getPhotoValue(value,superValue,index){
      let newValue = {};
      newValue.id = index;
      newValue.superId = superValue;
      newValue.url = value.prefix + '/' + value.suffix + '/' + value.thumbnail;
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
<water-fall :getValuePrefix="getValuePrefix" :getPhotoValue="getPhotoValue" :selectItem="selectItem" :maxValue="296"></water-fall>
</template>

<style scoped>

</style>