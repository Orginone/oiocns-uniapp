<template>
  <view>
    <headbar :url="'/pages/work/work'" basic="办事" last></headbar>
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
import { kernelApi, storage } from "common/app";
import { WaitInfo, DoneInfo, loadSpecies, loadWorkNode, loadWorkDefines } from "common/person";
import { loadApply } from "common/provider";

export default {
  data() {
    return {
      baseInfo: null,
      listInfo1: [
        {
          name: "发起办事",
          data: {}
        },
        {
          name: "待办事项",
          data: {}
        },
        {
          name: "已办事项",
          data: {}
        },
        {
          name: "我发起的",
          data: {}
        },
      ],
      // listInfo2: [
      // 	{
      // 		name: '资产捐赠'
      // 	},
      // 	{
      // 		name: '资产调拨'
      // 	},
      // 	{
      // 		name: '资产交易'
      // 	}
      // ]
    };
  },
  onLoad(options) {
    let data = JSON.parse(options.data);
    this.userInfo = storage.getItem("currentUser")
    console.log('====================================');
    console.log(this.userInfo, data);
    console.log('====================================');
    // this.localList = (data.localList)
    this.baseInfo = data;
    this.getStartInfo();
    this.getWaitInfo();
    this.getDoneInfo();
    this.getMyInfo();
  },
  methods: {
    // 发起办事
    async getStartInfo() {
      let params = this.userInfo.id
      let res = await loadSpecies(params);
      console.log(res, '办事列表');
      // this.baseInfo.StartInfo = res.data.result
      // this.listInfo1[0].data = this.baseInfo


      // let resNode = await loadWorkNode(params)
      // let resWorkNode = await loadWorkDefines(params)
      // console.log(resWorkNode, '');
    },
    //待办事项
    async getWaitInfo() {
      let res = await WaitInfo(this.baseInfo.id);
      console.log(res, '待办事项');
      // this.baseInfo.WaitInfo = res.data.result
      // this.listInfo1[1].data = this.baseInfo
    },
    //已办事项
    async getDoneInfo() {
      let res = await DoneInfo(this.baseInfo.id);
      // this.baseInfo.DoneInfo = res.data.result
      // this.listInfo1[2].data = this.baseInfo
      console.log(res, '已办事项');

    },
    //我发起的
    async getMyInfo() {
      let res = await loadApply({ id: this.userInfo.id, belongId: this.baseInfo.id, userId: this.userInfo.id });
      this.baseInfo.MyInfo = res.data
      this.listInfo1[3].data = this.baseInfo
      console.log(res, '我发起的');
    },
  },
};
</script>

<style lang="scss">
page{
  background-color: #f2f4f9;
}
</style>
