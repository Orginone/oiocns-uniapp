<template>
  <view class="show-box">
    <view class="title">
      <view class="head-left">
        <view class="title-color"></view>
        <view class="title-text">首页展示</view>
      </view>
      <view class="save-btn" @click="saveBtn()">保存</view>
    </view>
    <view class="pop-main">
      <view class="pop-list">
        <view
          class="pop-item"
          v-for="(item, index) in showtabnav"
          :key="index"
          @click="movelist(item)"
        >
          <img src="../../static/base/delete.png" alt="" />{{ item }}
        </view>
      </view>
    </view>
    <view class="title">
      <view class="head-left">
        <view class="title-color"></view>
        <view class="title-text">可添加的</view>
      </view>
    </view>
    <view class="pop-main">
      <view class="pop-list">
        <view
          class="pop-item"
          v-for="(item, index) in untabnav"
          :key="index"
          @click="removelist(item)"
        >
          <img src="../../static/base/tagadd.png" alt="" />{{ item }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "tagEdit",
  props: {
    // 线条宽度 单位px
    lineW: {
      type: [Number, String],
      default: 0,
    },
    // 选中的文字样式
    optStyle: {
      type: [String],
      default: "background:#154ab8;color: #fff;",
    }, // 其他未选中的文字样式
    optStyleElse: {
      type: [String],
      default: "background:#eee;color: #154ab8;",
    },
    // 自定义样式
    tabStyle: {
      type: [String],
      default: "",
    },
    // 自定义进度条样式
    lineStyle: {
      type: [String],
      default: "",
    },
    // 是否固定
    fixed: {
      type: Boolean,
      default: true,
    },
    // 默认选中值
    defaultKey: {
      type: [String, Number],
      default: "",
    },
    // 菜单导航
    tabnav: {
      type: Array,
      default: [
        //                 {
        // 	type: '', //状态值
        // 	name: '全部',
        // 	list: [], //数据
        // },
      ],
    },
  },
  data() {
    return {
      tabWid: 750, //tab组件宽度
      btnbb: true,
      userId: "",
      pageSize: 10,
      pageNum: 1,
      type: "", //当前选择类型
      dataInd: 0, //当前选择的索引
      orderStatus: "",
      deliveryId: "",
      navigateLastPage: 0, //总页数
      list: [],
      showtabnav: [],
      untabnav: [],
      optType: "",
    };
  },
  created() {
    let that = this;
  },
  onLoad(options) {
    this.optType = options.type;
    this.org_tag = uni.getStorageSync("org_tag");
    this.showtabnav = this.org_tag[options.type].select;
    this.untabnav = this.org_tag[options.type].unSelect;
  },
  methods: {
    saveBtn() {
      let obj = {
        select: this.showtabnav,
        unSelect: this.untabnav,
      };
      this.org_tag[this.optType] = obj;
      uni.setStorageSync("org_tag", this.org_tag);
      uni.navigateBack({
        delta: 1,
      });
    },
    movelist(item) {
      this.moveElement(this.showtabnav, this.untabnav, item);
    },
    removelist(item) {
      this.moveElement(this.untabnav, this.showtabnav, item);
    },
    moveElement(sourceArray, destinationArray, element) {
      const index = sourceArray.indexOf(element);
      if (index > -1) {
        sourceArray.splice(index, 1);
        destinationArray.push(element);
      }
    },
    typefun(ind) {
      this.dataInd = ind;
      this.type = this.tabnav[ind].type;
      this.pageNum = 1;

      // 判断当前有没有数据
      if (this.tabnav[ind].list.length == 0) {
      }

      this.$emit("ontype_", this.tabnav[ind]);
    },
  },
};
</script>

<style lang="scss">
page {
  background: #eee;
}
.title {
  padding: 20rpx 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .head-left {
    display: flex;
    align-items: center;
  }
  .title-color {
    width: 10rpx;
    height: 45rpx;
    background: #154ad8;
    margin-right: 20rpx;
  }
  .title-text {
    font-size: 32rpx;
    height: 45rpx;
    line-height: 45rpx;
  }
  .save-btn {
    color: #154ab8;
    font-size: 32;
  }
}
.pop-box {
  width: 100%;
  background-color: #eee;
  position: absolute;
  bottom: 0;
  left: 0;
  overflow: hidden;
  transform: translateY(100%);
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
    width: 40rpx;
    height: 40rpx;
  }
}
.pop-main {
  background: #eee;
  padding: 0 30rpx;
  border-radius: 16rpx;
  overflow: hidden;
  .pop-list {
    border-radius: 16rpx;
    overflow: hidden;
  }
  .pop-item {
    background: #fff;
    height: 120rpx;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    font-size: 32rpx;
    border-top: 1px solid #eee;
    img {
      width: 36rpx;
      height: 36rpx;
      margin-right: 30rpx;
    }
  }
  .pop-item:first {
    border-top: 0;
  }
}
</style>
