<template>
  <view class="container">
    <scroll-view class="scroll-view" scroll-x="true">
      <view class="list">
        <view
          v-for="(item, index) in tabnav"
          class="item"
          :key="item"
          @click="typefun(index)"
        >
          <view
            class="text"
            :style="selectItem === item ? optStyle : optStyleElse"
          >
            {{ item }}
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  name: "mainTag",
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
      selectItem: "", //当前选择类型
      dataInd: 0, //当前选择的索引
      orderStatus: "",
      deliveryId: "",
      navigateLastPage: 0, //总页数
      list: [],
    };
  },
  created() {
    let that = this;
    this.selectItem = this.tabnav[0];
  },
  methods: {
    typefun(index) {
      this.selectItem = this.tabnav[index];

      this.$emit("ontype_", this.tabnav[index]);
    },
  },
};
</script>

<style lang="scss">
.container {
  width: 640rpx;
  height: 60rpx;
  margin-right: 25rpx;
}

.scroll-view {
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
}

.list {
  display: flex;
}
.text {
  text-align: center;
  font-size: 28rpx;
  transition: all 0.3s;
  padding: 6rpx 24rpx;
  border-radius: 80rpx;
  margin-right: 20rpx;
}
</style>
