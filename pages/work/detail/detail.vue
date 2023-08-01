<template>
  <view class="BaseLayout">
    <view class="head head-check">基本信息</view>
    <view class="content">
      <textarea name="" id="" cols="30" rows="10"></textarea>
    </view>
    <view class="foot">
      <view class="nocheck">退回</view>
      <view class="passcheck">通过</view>
    </view>
  </view>
</template>

<script>
import { anyStoreApi } from "../../../common/app";

export default {
  data() {
    return {
      menu: [],
      listType: "store",
      showType: "0",
    };
  },
  watch: {},
  async onLoad(options) {
    console.log(options);
    this.belongId = options.belongId;
    this.instanceId = options.instanceId;
    let res = await this.getInfo();
    console.log('res',res);
  },

  onShow() {},
  methods: {
    async getInfo() {
      return await anyStoreApi.aggregate(this.belongId, "work-instances", {
        match: { id: this.instanceId },
        limit: 1,
        lookup: {
          from: "work-tasks",
          localField: "id",
          foreignField: "instanceId",
          as: "tasks",
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.head {
  height: 100rpx;
  line-height: 100rpx;
  font-size: 32rpx;
}
.head-check {
}
.foot {
  position: fixed;
  bottom: 0;
  height: 150rpx;
  background: #fff;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 9;

  .nocheck {
    background: rgb(246, 57, 57);
    margin-right: 80rpx;
  }
  .passcheck {
    background: #154ad8;
  }
  .nocheck,
  .passcheck {
    width: 200rpx;
    height: 80rpx;
    line-height: 80rpx;
    color: #fff;
    font-size: 32rpx;
    border-radius: 8rpx;
    text-align: center;
  }
}
</style>
