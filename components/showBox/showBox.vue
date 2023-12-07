<template>
  <view class="show-box" v-if="showPop" @click="open()">
    <view class="pop-box">
      <view class="pop-head">
        <img
          src="../../static/base/backs.png"
          class="head-icon"
          @click="open()"
          alt=""
        />
        <view class="pop-title">{{ titleText }}分组</view>
        <view class="pop-edit" @click="jumpEdit()">分组</view>
      </view>
      <view class="pop-main">
        <view class="pop-list">
          <view class="pop-item" v-for="(item, index) in tabnav" :key="index">{{
            item
          }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "showBox",
  props: {
    showType: {
      default: "",
    },
  },
  data() {
    return {
      // 线条宽度
      lineW: 10,
      // 是否固定
      fixed: false,
      showPop: true, //弹出层状态
      // 菜单导航
      tabnav: [],
      showTag: false, //显示tag
      org_tag: {},
      titleText: "",
    };
  },
  components: {},
  mounted() {
    console.log(this.showType);
    if (this.showType == "main") {
      this.titleText = "门户";
    } else if ((this.showType == "store")) {
      this.titleText = "存储";
    } else if ((this.showType == "setting")) {
      this.titleText = "设置";
    } else if ((this.showType == "work")) {
      this.titleText = "办事";
    }
    this.org_tag = uni.getStorageSync("org_tag");
    if (this.org_tag?.main) {
      this.tabnav = this.org_tag[this.showType].select;
    } else {
      this.setOrgTag();
    }
    this.showTag = true;
  },
  methods: {
    setOrgTag() {
      let obj = {
        main: {
          select: [
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
      uni.setStorageSync("org_tag", obj);
    },
    open() {
      this.$emit('childShow');
    },
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
    ontype(index) {
      console.log(index);
    },
    jumpEdit() {
      uni.navigateTo({
        url: "/pages/tagEdit/tagEdit?type=" + this.showType,
      });
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
</style>
