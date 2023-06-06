<template>
  <view>
    <headbar
      right
      :left="'more'"
      :url="'/pages/work/work'"
      basic="办事"
    ></headbar>
    <personList :listInfo="listInfo1" :url="'/pages/work/page3/page3'"></personList>
    <!-- <personList
      :listInfo="listInfo2"
      :url="'/pages/work/page3/page3'"
      icon="dotPlus "
      style="transform: translateY(-18upx)"
    ></personList> -->
  </view>
</template>

<script>
import { kernelApi,storage } from "common/app";
import { WaitInfo,DoneInfo,loadSpecies,loadWorkNode,loadWorkDefines } from "common/person";
import { loadApply } from "common/provider";

export default {
  data() {
    return {
      baseInfo: null,
      listInfo1: [
        
      ],
    };
  },
async  onLoad(options) {
     this.baseInfo = JSON.parse(options.data)
	 console.log('====================================');
	 console.log(this.baseInfo);
	 console.log('====================================');
	 let arr =[]
	 if(this.baseInfo.data.StartInfo[0]){
        this.baseInfo.data.StartInfo.forEach((e)  => {
		 arr.push({name:e.name,data:e})
	 });
	 this.listInfo1 = arr
	 }
	 let res = await loadWorkNode({belongId:arr[0].data.id})
	 console.log('====================================');
	 console.log(res);
	 console.log('====================================');
  },
  methods: {

   
  },
};
</script>

<style lang="scss"></style>
