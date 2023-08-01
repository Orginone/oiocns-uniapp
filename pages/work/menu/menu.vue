<template>
  <view class="BaseLayout">
    <view class="itemArea">
      <view
        class="listItem"
        v-for="(item, index) in list"
        :key="index"
        @tap="turnDetailPage(item)"
      >
        <img class="box"  :src="'' + item.icon + ''" />
        <view class="name">{{ item.label }}</view>
        <view class="right">
          <img src="../../../static/base/right.png" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      menu: [],
      listType: "store",
      showType: "0",
      list: [
        {
          type:0,
          icon: "../../../static/base/work.svg",
          label: "待办事项",
        },
        {
          type:1,
          icon: "../../../static/base/workDone.svg",
          label: "已办事项",
        },
        {
          type:2,
          icon: "../../../static/base/myWork.svg",
          label: "我发起的",
        },
        {
          type:3,
          icon: "../../../static/base/myWork.svg",
          label: "发起办事",
        },
      ],
    };
  },
  watch: {},
  onLoad(options) {
    console.log(options.id);
    this.id = options.id
  },
  onShow() {},
  methods: {
    turnDetailPage(item) {
      uni.navigateTo({
        url: "/pages/work/list/list" + "?type=" + item.type+'&id='+this.id,
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
.itemArea {
  box-sizing: border-box;

  .listItem {
    display: flex;
    padding: 16upx 30upx;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    &:active {
      background-color: #edeffc;
      border-radius: 10upx;
    }
    .box {
      width: 72upx;
      height: 72upx;
      margin-right: 25upx;
    }

    .name {
      font-size: 32upx;
    }

    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      transform: translateY(2upx);

      img {
        margin-left: 28upx;
        height: 28upx;
        width: 28upx;
      }
      .dotPlus {
        position: relative;
        padding: 5upx 10upx;
        img {
          height: 30upx;
          width: 8upx;
        }
      }
    }
  }
}
.box{
  color: #154ad8;
}
</style>
