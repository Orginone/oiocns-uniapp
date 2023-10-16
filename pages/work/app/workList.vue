<template>
  <view>
    <appHead :text="'办事'"></appHead>
    <view class="myList">
      <lostPage v-show="!list.length" mode="noContent"></lostPage>
      <view v-show="list.length" class="thing-list">
        <view
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="jumpWorkDetail(item)"
        >
          <view class="left">
            <view class="box"></view>
            <view class="item-title">{{ item.name }}</view>
            <view class="item-tag">{{item.typeName}}</view>
          </view>
          <view class="item-time">{{ item.createTime }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import orgCtrl from "@/ts/controller";
import { kernel } from "../../../ts/base";

export default {
  data() {
    return {
      menu: [],
      id:'',//上级的id
      list: [], //办事列表
    };
  },
  onLoad(options) {
    this.id = options.id;
    this.getList();
  },
  onShow() {},
  methods: {
    findObject(arr,id){
			if(arr && arr.length >0){
				arr.forEach(element => {
					if(element._metadata.id == id){
						this.getWork(element)
						return
					}
					if(element.children && element.children.length>0){
						this.findObject(element.children,id)
					}
				});
			}
		},
    async getWork(app){
      let list = [];
      const res = await app.loadWorks();
      orgCtrl.currentKey = app.key;
      res.forEach(element => {
        list.push(element._metadata);
      });
      this.list = list
    },
    //办事列表
    async getList() {
      let apps = [];
      for (const target of orgCtrl.targets) {
        apps.push(...(await target.directory.loadAllApplication()));
      }
      this.findObject(apps,this.id)
    },
    jumpWorkDetail(item){
      uni.navigateTo({
        url: "/pages/work/app/detail?id=" + item.id,
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
.myList {
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
    .item-tag{
      border-radius: 30rpx;
      padding: 3rpx 10rpx;
      background: #154ab8;
      color: #fff;
      font-size: 24rpx;
      margin-left: 10rpx;
    }
  }
}
</style>
