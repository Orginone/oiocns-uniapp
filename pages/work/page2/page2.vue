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
import { kernelApi } from "common/app";
export default {
  data() {
    return {
      baseInfo: null,
      listInfo1: [
        {
          name: "发起办事",
        },
        {
          name: "待办事项",
        },
        {
          name: "已办事项",
        },
        {
          name: "我发起的",
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
      let params = {
        id: this.baseInfo.id,
        page: { offset: 1, limit: 999, filter: "" },
      };
      let res = await kernelApi.queryWorkRecord(params);
      console.log(res, 132);
    },
    //待办事项
    async getWaitInfo() {
      let params = {
        id: this.baseInfo.id,
        page: { offset: 1, limit: 999, filter: "" },
      };
      let res = await kernelApi.queryApproveTask(params);
      console.log(res, 132);
    },
    //已办事项
    async getDoneInfo() {
      let params = {
        id: this.baseInfo.id,
        page: { offset: 1, limit: 999, filter: "" },
      };
      let res = await kernelApi.approvalTask(params);
      console.log(res, 132);
    },
    //我发起的
    async getMyInfo() {
      let params = {
        id: this.baseInfo.id,
        page: { offset: 1, limit: 999, filter: "" },
      };
      let res = await kernelApi.queryMyApply(params);
      console.log(res, 132);
    },
  },
};
</script>

<style lang="scss"></style>
