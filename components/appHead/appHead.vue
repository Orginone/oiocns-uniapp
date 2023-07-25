<template>
  <view class="head" @click.stop="closeEvent">
    <view class="tabBox">
      <view class="leftBox" @click="jump">
        <img
          src="../../static/base/setting-select.svg"
          alt=""
          class="leftBoxSrc"
        />
        <view class="head-text">{{ text }}</view>
      </view>
      <view class="rightBox">
        <img
          src="../../static/base/search1.png"
          alt=""
          class="rightBoxSrc mr20"
        />
        <img
          src="../../static/base/qr-scanner.png"
          @click="jumosys()"
          alt=""
          class="rightBoxSrc mr20"
        />
        <img
          src="../../static/base/add.png"
          alt=""
          class="rightBoxSrc"
          @click.stop="openEvent"
        />
        <!-- <img src="../../static/base/dotPlus.png" alt="" class="dotPlusSrc"/> -->
        <!-- <view class="more">
          <view class="more_point"></view>
          <view class="more_point"></view>
          <view class="more_point"></view>
        </view> -->
        <view class="menu-box" v-show="isShowMask == true">
          <div
            class="menu-item"
            v-for="(item, index) in menuList"
            :key="index"
            @click.stop="handle(item, index)"
          >
            <view class="item_btn">+</view>
            <view class="item_name">{{ item.name }}</view>
          </div>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "appHead",
  data() {
    return {};
  },
  props: {
    text: {
      default: () => {
        return '';
      },
    },
  },
  components: {},
  async onLoad(options) {},
  methods: {
    async loadAppList() {
      let arr = [];
      setTimeout(async () => {
        let res = await loadApps();
        res.forEach((item) => {
          item.metadata.icon = JSON.parse(item.metadata.icon);
          arr.push(item.metadata);
        });
        this.appList = arr;
      }, 1000);
    },
    jump() {
      uni.switchTab({
        url: "/pages/setting/index",
      });
    },
    jumosys() {
      uni.navigateTo({
        url: "/pages/setting/scanCode/index",
      });
    },
    //下拉选项打开时
    openEvent() {
      this.isShowMask = true;
    },
    closeEvent() {
      this.isShowMask = false;
    },

    handle(item, index) {
      this.isShowMask = false;
      this.mode = item.value;
      if (item.value == "newCohort" || item.value == "newCompany") {
        this.isShow2 = true;
      } else {
        this.isShow = true;
      }
    },

    uploadPop(index) {
      if (index == 1) {
        this.isShow = false;
      } else {
        this.isShow2 = false;
      }
    },
  },
};
</script>

<style lang="scss" scope>
page {
  background: #fff;
  .head {
    box-sizing: border-box;
    height: 100rpx;
    .tabBox {
      width: 100%;
      height: 100%;
      padding: 10upx 32upx;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      .leftBox {
        display: flex;
        align-items: center;
        .head-text {
          margin-left: 20rpx;
        }
        .leftBoxSrc {
          width: 62upx;
          height: 62upx;
          border-radius: 50%;
          display: block;
        }
      }

      .rightBox {
        display: flex;
        align-items: center;
        position: relative;
        .mr20 {
          margin-right: 20upx;
        }
        .rightBoxSrc {
          width: 48upx;
          height: 48upx;
          display: block;
        }
        .more {
          margin-top: 12upx;
          padding-left: 10upx;
          .more_point {
            width: 6upx;
            height: 6upx;
            background: rgba(89, 90, 92, 1);
            border-radius: 50%;
            margin-bottom: 8upx;
          }
        }
        .dotPlusSrc {
          width: 10upx;
          height: 36upx;
        }
      }
    }
    .userInfo {
      width: 100%;
      padding: 20upx 32upx;
      background: #3d5ed1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .userInfo_unit {
        display: flex;
        align-items: center;
        .userInfo_unit_fristName {
          width: 62upx;
          height: 62upx;
          border-radius: 50%;
          background: #fff;
          font-size: 28upx;
          color: #3d5ed1;
          text-align: center;
          line-height: 62upx;
        }
        .userInfo_unit_name {
          font-size: 30upx;
          color: #ffffff;
          margin-left: 14upx;
        }
      }
      .userInfo_img {
        width: 62upx;
        height: 62upx;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
    .topTab {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #3d5ed1;
      padding: 26upx 0;
      padding-bottom: 0;
      .more {
        padding-right: 26upx;
        .more_point {
          width: 4upx;
          height: 4upx;
          background: #ffffff;
          border-radius: 50%;
          margin-bottom: 4upx;
        }
      }
      .topTab_box {
        display: flex;
        width: 100%;
        justify-content: space-between;
      }
      .topTab_item {
        padding: 0 26upx;
        font-size: 22upx;
        color: #ffffff;
        text-align: center;
        .topTab_item_line {
          width: 36upx;
          height: 4upx;
          background: #ffffff;
          opacity: 1;
          margin: 0 auto;
          margin-top: 13upx;
        }
      }
    }
    .banner {
      width: 100%;
      height: 300upx;
      .swiper {
        width: 100%;
        height: 300upx;
      }
      .swiper_item {
        width: 100%;
        height: 300upx;
        img {
          width: 100%;
          height: 300upx;
        }
      }
    }
    .link {
      width: 100%;
      padding: 0 0 0 32upx;
      margin-top: 22upx;
    }
    .inlet {
      width: 100%;
      padding: 0 32upx;
      margin-top: 22upx;
    }
  }
  .li {
    width: 100%;
    height: 300upx;
  }
  .itemSrc {
    width: 100%;
    height: 300upx;
    display: block;
    margin: 0 auto;
    border-radius: 12rpx;
  }
  .menu-box {
    position: absolute;
    top: 60upx;
    right: 10upx;
    width: 360upx;
    height: 320upx;
    background: rgba(76, 76, 76, 1);
    border-radius: 16upx;
    z-index: 999;
    :before {
      content: "";
      width: 0px;
      height: 0px;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid rgba(76, 76, 76, 1);
      position: absolute;
      top: -5px;
      right: 16px;
    }
    .menu-item {
      width: 100%;
      padding: 4upx 60upx;
      display: flex;
      align-items: center;
      .item_btn {
        font-size: 50upx;
        color: #fff;
        text-align: center;
        margin-top: 0rpx;
        margin-bottom: 6rpx;
      }
      .item_name {
        font-size: 28upx;
        text-align: center;
        color: #fff;
        margin-left: 16upx;
      }
    }
  }
}
</style>
