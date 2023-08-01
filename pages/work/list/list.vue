<template>
  <view>
    <lostPage v-show="!list.length" mode="noContent"></lostPage>
    <view v-show="list.length" class="thing-list">
      <view
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="jumpDetail(item)"
      >
        <view class="left">
          <view class="box"></view>
          <view class="item-title">{{ item.title }}</view>
        </view>
        <view class="item-time">{{ item.createTime }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  WaitInfo,
  DoneInfo,
  loadSpecies,
  loadWorkNode,
  loadWorkDefines,
} from "common/person";
import { loadApply } from "common/provider";
import { anyStoreApi } from "../../../common/app";

export default {
  data() {
    return {
      menu: [],
      id: "",
      list: [],
    };
  },
  onLoad(options) {
    let data = options.id;
    this.id = options.id;
    this.showType = options.type;
    this.userInfo = uni.getStorageSync("currentUser");
    // this.getWaitInfo();
    console.log("this.showType", this.showType);
    this.baseInfo = data;
    if (this.showType == 0) {
      this.getWaitInfo();
    } else if (this.showType == 1) {
      this.getDoneInfo();
    } else if (this.showType == 2) {
      this.getMyInfo();
    } else if (this.showType == 3) {
      this.getStartInfo();
    }
  },
  methods: {
    async getInfo(data, infoType) {
      const hisWorkCollName = "work-task";
      console.log("data", data);
      if (infoType == "Done") {
        return await anyStoreApi.aggregate(data.id, hisWorkCollName, {
          match: {
            belongId: data.belongId,
            status: { _gte_: 100 },
            records: { _exists_: true },
          },
          sort: {
            createTime: -1,
          },
          skip: 0,
          limit: 20,
        });
      } else if (infoType == "myInfo") {
        return await anyStoreApi.aggregate(data.id, hisWorkCollName, {
          match: {
            belongId: data.belongId,
            createUser: data.belongId,
            nodeId: { _exists_: false },
          },
          sort: {
            createTime: -1,
          },
          skip: 0,
          limit: 20,
        });
      } else {
       
      }
    },
    // 发起办事
    async getStartInfo() {
      let params = this.userInfo.id;
      let res = await loadSpecies(this.id);
      console.log(res, "办事列表");
      this.list = res.data;
      // this.baseInfo.StartInfo = res.data.result
      // this.listInfo1[0].data = this.baseInfo

      // let resNode = await loadWorkNode(params)
      // let resWorkNode = await loadWorkDefines(params)
      // console.log(resWorkNode, '');
    },
    //待办事项
    async getWaitInfo() {
      let res = await WaitInfo(this.id);
      console.log(res, "待办事项");
      if (res.data.result) {
        this.list = res.data?.result;
      }
      // this.baseInfo.WaitInfo = res.data.result
      // this.listInfo1[1].data = this.baseInfo
    },

    //已办事项
    async getDoneInfo() {
      let res = await this.getInfo(
        {
          id: this.id,
          belongId: this.id,
        },
        "Done"
      );
      this.list = res.data;
      // this.baseInfo.DoneInfo = res.data.result
      // this.listInfo1[2].data = this.baseInfo
      console.log(res, "已办事项");
    },
    //我发起的
    async getMyInfo() {
      let res = await this.getInfo(
        {
          id: this.id,
          createUser: this.id,
          belongId: this.id,
        },
        "myInfo"
      );
      this.list = res.data;
      // this.baseInfo.MyInfo = res.data
      // this.listInfo1[3].data = this.baseInfo
      console.log(res, "我发起的");
    },
    jumpDetail(item) {
      uni.navigateTo({
        url: "/pages/work/detail/detail?belongId=" + item.belongId+'&instanceId='+item.instanceId,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  align-items: center;
  padding: 15rpx;
  .more {
    width: 48rpx;
    height: 48rpx;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.item {
  height: 120rpx;
  border-bottom: 1px solid #eee;
  padding: 15rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    .box {
      width: 72rpx;
      height: 72rpx;
      background: #154ab8;
      margin-right: 20rpx;
      border-radius: 8rpx;
    }
  }
  .item-title {
    font-size: 32rpx;
    color: #333;
  }
}
</style>
