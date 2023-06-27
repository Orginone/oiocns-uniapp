<template>
  <view class="baseLayout">
    <headbar basic="办事" last url='/pages/work/work'></headbar>
    <personList :listInfo='listInfo' :title="'个人'" url="/pages/work/page3/page3"></personList>
    <personList :listInfo='listInfo2' :title="'组织'" :url="url"> ></personList>
  </view>
</template>
<script>
import { kernelApi, storage } from "common/app";
import { loadCohorts } from 'common/person'
import { loadApply } from "common/provider";
export default {
  data() {
    return {
      url: "/pages/work/page2/page2",
      listInfo: [
        {
          name: "发起办事",
          url: '/pages/work/page5/page5',
          data:{}
        },
        {
          name: "待办事项",
          data:{}
        },
        {
          name: "已办事项",
          data:{}
        },
        {
          name: "我发起的",
          data:{}
        },
      ],
      listInfo2: [
        {
          name: "杭州电子科技大学",
        },
        {
          name: "浙江省财政厅",
        },
        {
          name: "浙江省教育局",
        },
      ],
      userInfo: {},
      baseInfo:{
        name:'我发起的'
      },
    };
  },
  async onLoad(options) {
    this.userInfo = storage.getItem("currentUser");
    let res = await loadCohorts(this.userInfo.id)
    this.listInfo2 = res.data.result
    console.log(res);
    this.getMyInfo()
  },
  methods: {
    //我发起的
    async getMyInfo() {
      let res = await loadApply({ id: this.userInfo.id,userId: this.userInfo.id });
      this.baseInfo.MyInfo = res.data
      this.listInfo[3].data = this.baseInfo
      console.log(res, '我发起的');
    },
  }
};
</script>

<style lang="scss" scoped>
.baseLayout {
  background-color: #f2f4f9;
}
</style>
