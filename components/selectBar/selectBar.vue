<template>
  <view class="baseLayout">
    <view class="titleArea">
      <view class="titleItem" v-for="(item, index) in lists" :key="index">
        <!-- 菜单标题 -->
        <view class="title" @click="showList(index)">
          <view class="text">{{ item.name }}</view>
          <view :class="listIndex == index ? 'active ico' : 'ico'">
            <img src="@/static/basePlus/triangle.png" alt="" />
          </view>
        </view>
        <!-- 下拉列表 -->
        <view class="downList" :class="{ activeList: listIndex == index }">
          <view
            class="listItem"
            v-for="(it, ind) in item.items"
            :key="ind"
            @click="slectItem(item, it)"
          >
            <view
              class="shape"
              :class="{ activeShape: item.listValue == it }"
            ></view>
            <view class="text">{{ it }}</view>
          </view>
          <view class="mask" v-show="listIndex != -1" @click="listIndex = -1"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "selectBar",
  data() {
    return {
      listIndex: -1,
	  show:false,
      lists: [
        {
          name: "来源",
          items: ["待办", "已办", "已完结", "抄送"],
          listValue: "",
        },
        {
          name: "发起人",
          items: ["张三", "李四", "老张", "老王"],
          listValue: "",
        },
        {
          name: "状态",
          items: ["还行", "不错"],
          listValue: "",
        },
        {
          name: "种类",
          items: ["种类一", "种类二", "种类三", "种类四", "种类五"],
          listValue: "",
        },
      ],
    };
  },
  methods: {
    // 展示下拉菜单
    showList(index) {
      if (this.listIndex == index) {
        this.listIndex = -1;
      } else {
        this.listIndex = index;
      }
    },
    //选择列表项目
    slectItem(item, it) {
      item.listValue = it;
      let arr = [];
      this.lists.forEach((item) => {
        arr.push({ name: item.name, value: item.listValue });
      });
      // this.listIndex = -1
      this.$emit("change", arr);
    },
  },
};
</script>

<style lang="scss" scoped>
.baseLayout {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  font-size: 26upx;
  color: $main-font;
  .mask{
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: -1;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0,0,0,0.15);
  }
  .titleArea {
    width: 100%;
    position: relative;
    z-index: 200;
    display: flex;
    align-items: center;
    height: 90upx;
    background-color: #fff;
    .titleItem {
      width: 100%;
      height: 100%;
      display: flex;
      width: 25%;
    }
    .title {
      position: relative;
      z-index: 100;
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      .ico {
        margin-left: 12upx;
        width: 24upx;
        height: 20upx;
        transform-origin: 50% 75%;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .active {
        transform: rotate(180deg);
        transition: 0.3s ease-in-out;
      }
    }
  }
  .downList {
    position: absolute;
    box-sizing: border-box;
    left: 0;
    top: -400upx;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    transition: top 0.5s;
    .listItem {
      width: 100%;
      border-top: 2upx solid #b3b3b3;
      height: 100upx;
      font-size: 30upx;
      display: flex;
      align-items: center;
      .shape {
        height: 30upx;
        width: 30upx;
        box-sizing: border-box;
        border-radius: 2upx;
        border: 2upx solid $main-blue;
        margin-right: 20upx;
        margin-left: 40upx;
      }
      .activeShape {
        border: 10upx solid $main-blue;
      }
      &:last-child {
        border-bottom: 2upx solid #b3b3b3;
      }
    }
  }

  .activeList {
    top: 90upx;
  }
}
</style>
