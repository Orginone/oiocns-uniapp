<template>
  <view class="index">
    <appHead :text="'门户'"></appHead>
    <view class="main">
      <!-- <appHead></appHead> -->
      <mainnav
        ref="tabnav"
        v-if="showTag"
        :tabnav="tabnav"
        @ontype_="ontype"
      ></mainnav>
      <view class="more" @click="showPop = true">
        <img src="../../static/base/menu.png" alt="" />
      </view>
      <showBox
        v-if="showPop"
        :showType="'showType'"
        @childShow="childShow()"
      ></showBox>
    </view>
    <group v-if="showType == '群动态'"></group>
  </view>
</template>

<script>
import group from "./pages/group.vue";
export default {
  data() {
    return {
      // 线条宽度
      lineW: 10,
      // 是否固定
      fixed: false,
      showPop: false, //弹出层状态
      showType:'群动态',
      // 菜单导航
      tabnav: [],
      showTag: false, //显示tag
      org_tag: {},
    };
  },
  components: {
    group,
  },
  onShow() {
    this.org_tag = uni.getStorageSync("org_tag");
    if (this.org_tag?.main) {
      this.tabnav = this.org_tag.main.select;
      this.showTag = true;
    } else {
      this.setOrgTag();
    }
  },
  async onLoad(options) {
    this.userInfo = uni.getStorageSync("currentUser");
  },
  methods: {
    setOrgTag() {
      let obj = {
        main: {
          select: [
            "首页",
            "群动态",
            "好友圈",
            "共享软件",
            "公物舱",
            "公益仓",
            "数据资产",
          ],
          unSelect: [],
        },
        store: {
          select: ["全部", "常用", "文件", "数据", "应用", "资源", "其他"],
          unSelect: [],
        },
        setting: {
          select: ["全部", "常用", "最近"],
          unSelect: [],
        },
        work: {
          select: ["全部", "常用", "发起", "待办", "已办", "已发起"],
          unSelect: [],
        },
      };
      this.tabnav = obj.main.select;
      uni.setStorageSync("org_tag", obj);
      this.showTag = true;
    },
    childShow() {
      this.showPop = false;
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
    ontype(item) {
      this.showType = item;
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
    jumpEdit() {
      uni.navigateTo({
        url: "/pages/tagEdit/tagEdit?type=main",
      });
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
.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 15upx;
  .more {
    width: 48rpx;
    height: 48rpx;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.show-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: rgba($color: #000, $alpha: 0.3);
}
.pop-box {
  width: 100%;
  background-color: #eee;
  position: absolute;
  bottom: 0;
  left: 0;
  overflow: hidden;
  transform: translateY(100%);
  animation: slide-up 0.3s forwards;
}
.pop-head {
  display: flex;
  justify-content: space-between;
  font-size: 32rpx;
  height: 120rpx;
  align-items: center;
  padding: 0 30rpx;
  background: #fff;
  font-weight: bold;
  .head-icon {
    width: 36rpx;
    height: 36rpx;
  }
}
.pop-main {
  background: #eee;
  padding: 20rpx 30rpx;
  border-radius: 16rpx;
  overflow: hidden;
  padding-bottom: 50rpx;
  min-height: 700rpx;

  .pop-list {
    border-radius: 16rpx;
    overflow: hidden;
  }
  .pop-item {
    background: #fff;
    height: 120rpx;
    display: flex;
    align-items: center;
    padding: 0 40rpx;
    font-size: 32rpx;
    border-top: 1px solid #eee;
  }
  .pop-item:first {
    border-top: 0;
  }
}
@keyframes slide-up {
  from {
    transform: translateY(-1000);
  }
  to {
    transform: translateY(0);
  }
}
.swiper .li {
  margin: 0 20rpx;
}
.swiper .li img {
  width: 100%;
  border-radius: 8rpx;
}
.group-box {
  margin: 20rpx;
  border: 1px solid #eee;
  border-radius: 16rpx;
  padding: 20rpx;
  font-size: 32rpx;
  .main-box {
    .main-head {
      display: flex;
      justify-content: space-between;
      .main-title {
        font-weight: bold;
      }
      .main-more {
        font-size: 28rpx;
        display: flex;
        align-items: center;
        img {
          margin-left: 10rpx;
          width: 36rpx;
          height: 36rpx;
        }
      }
    }
  }
  .main-list {
    display: flex;
    margin-top: 20rpx;
    .main-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      img {
        border-radius: 10rpx;
        width: 84rpx;
        height: 84rpx;
      }
    }
  }
}
.trends-box {
  padding: 20rpx;
  .main-head {
    display: flex;
    justify-content: space-between;
    .main-title {
      border-left: 4rpx solid #154ab8;
      padding-left: 20rpx;
      font-weight: bold;
    }
    .main-more {
      font-size: 28rpx;
      display: flex;
      align-items: center;
      img {
        margin-left: 10rpx;
        width: 36rpx;
        height: 36rpx;
      }
    }
  }
  .trends-list {
    margin-top: 20rpx;
    .trends-item {
      padding: 20rpx;
      border-radius: 12rpx;
      border-bottom: 1px solid #eee;
      display: flex;
      margin-bottom: 20rpx;
      img {
        width: 300rpx;
        height: 250rpx;
        border-radius: 16rpx;
      }
      .trends-right {
        width: calc(100% - 200rpx);
        padding: 0 20rpx;
        .tr-title {
          font-size: 32rpx;
        }
        .tr-tag {
          margin: 12rpx 0;
          display: flex;
          .tag-item {
            margin-right: 20rpx;
            padding: 2rpx 14rpx;
            border-radius: 32rpx;
            font-size: 28rpx;
            background: #154ab8;
            color: #fff;
          }
        }
        .tr-content {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #154ab8;
        }
        .tr-foot {
          margin-top: 10rpx;
          display: flex;
          justify-content: space-between;
          font-size: 28rpx;
          .look-more {
            border: 1px solid #154ab8;
            color: #154ab8;
            border-radius: 32rpx;
            padding: 0 10rpx;
          }
          .tr-time {
            color: #666;
          }
        }
      }
    }
  }
}
</style>
