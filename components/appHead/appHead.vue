<template>
  <view class="head" @click.stop="closeEvent">
    <view class="tabBox">
      <view class="leftBox" @click="showItem">
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
        <view class="menu-box-wrap" v-show="isShowMask == true">
          <view class="menu-box">
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
        <view
          class="menu-box-wrap"
          v-show="infoType == true"
          @click="infoType = false"
        >
          <view class="menu-boxs">
            <view class="info-box">
              <view class="left">
                <img
                  src="../../static/base/setting-select.svg"
                  alt=""
                  class="leftBoxSrc"
                />
                <view class="info-content">
                  <view>{{ userInfo.name }}</view>
                  <view>{{ userInfo.remark }}</view>
                </view>
              </view>
              <view class="right-box">
                <img
                  src="../../static/base/ewm.png"
                  @click="jumpewm()"
                  alt=""
                />
              </view>
            </view>
            <div
              class="menu-item"
              v-for="(item, index) in infoList"
              :key="index"
            >
              <view class="item_btn">+</view>
              <view class="item_name">{{ item.name }}</view>
            </div>
          </view>
        </view>
      </view>
    </view>
    <popBox :show="isShow" :mode="mode" @uploadPop="uploadPop" />
    <formBox :show="isShow2" :mode="mode" @uploadPop="uploadPop" />
  </view>
</template>

<script>
import popBox from "../settingEdit/components/pop";
import formBox from "../settingEdit/components/form";
import * as config from "../../pages/setting/config/menuOperate";

export default {
  name: "appHead",
  data() {
    return {
      isShowMask: false,
      menuList: [
        { name: "添加朋友", value: "joinFriend" },
        { name: "加入群组", value: "joinCohort" },
        { name: "加入单位", value: "joinCompany" },
        { name: "发起群聊", value: "newCohort" },
      ],
      infoList: [
        { name: "账号与安全", value: "joinFriend" },
        { name: "卡包设置", value: "joinCohort" },
        { name: "门户设置", value: "joinCompany" },
        { name: "主题设置", value: "newCohort" },
        { name: "退出登录", value: "newCohort" },
      ],
      isShow: false,
      mode: "",
      isShow2: false,
      infoType: false,
      belongId: "",
      belongName: "",
      userInfo: {},
    };
  },
  props: {
    text: {
      default: () => {
        return "";
      },
    },
  },
  components: { popBox, formBox },
  async mounted(options) {
    setTimeout(() => {
      this.loadAppList();
    }, 200);
  },
  methods: {
    async loadAppList() {
      let res = await config.loadSettingMenu();
      this.userInfo = uni.getStorageSync("currentUser")
      console.log(this.userInfo);
      this.belongId = res.children[0].item.belongId;
      this.belongName = res.children[0].label;
    },
    jumpewm() {
      uni.navigateTo({
        url:
          "/pages/setting/qrcode/index?id=" +
          this.userInfo.id +
          "&name=" +
          this.userInfo.name,
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
    showItem() {
      this.infoType = true;
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

<style lang="scss" scoped>
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
  .menu-box-wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
  }
  .menu-box {
    position: absolute;
    top: 80upx;
    right: 20upx;
    width: 320upx;
    background: #fff;
    border-radius: 16upx;
    z-index: 999;
    color: #333;
    .menu-item {
      width: 100%;
      padding: 4upx 40upx;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      .item_btn {
        font-size: 50upx;
        color: #333;
        text-align: center;
        margin-top: 0rpx;
        margin-bottom: 6rpx;
      }
      .item_name {
        font-size: 28upx;
        text-align: center;
        color: #333;
        margin-left: 16upx;
      }
    }
    .menu-item:last-child {
      border-bottom: 0;
    }
  }
  .menu-boxs {
    position: absolute;
    top: 80upx;
    left: 20upx;
    min-width: 400rpx;
    background: #fff;
    border-radius: 16upx;
    z-index: 999;
    color: #333;
    .info-box {
      display: flex;
      justify-content: space-between;
      padding: 0 20rpx;
      padding-top: 20rpx;
      .left {
        display: flex;
        align-items: center;
        img {
          width: 80rpx;
          height: 80rpx;
          margin-right: 20rpx;
        }
      }
      .right-box {
        margin-top: 20rpx;
        margin-right: 20rpx;
        img {
          width: 48rpx;
          height: 48rpx;
        }
      }
    }
    .menu-item {
      width: 100%;
      padding: 4upx 40upx;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      .item_btn {
        font-size: 50upx;
        color: #333;
        text-align: center;
        margin-top: 0rpx;
        margin-bottom: 6rpx;
      }
      .item_name {
        font-size: 28upx;
        text-align: center;
        color: #333;
        margin-left: 16upx;
      }
    }
    .menu-item:last-child {
      border-bottom: 0;
    }
  }
}
</style>
