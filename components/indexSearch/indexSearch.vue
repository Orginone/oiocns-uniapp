<template>
  <view class="baseLayout">
    <view class="search_box">
      <input class="search_text" type="text" />
      <img
        class="search_icon"
        src="@/static/base/search_m.png"
        alt=""
        srcset=""
      />
    </view>
    <view class="add">+</view>
  </view>
</template>

<script>
export default {
  name: "indexSearch",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.baseLayout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .add {
    width: 54upx;
    height: 54upx;
    border: 1px solid #3d5ed1;
    font-size: 60upx;
    color: #3d5ed1;
    text-align: center;
    border-radius: 50%;
    line-height: 40upx;
  }
  .search_box {
    width: 586upx;
    height: 90upx;
    background: #ffffff;
    border-radius: 52upx;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .search_icon {
      width: 44upx;
      height: 44upx;
      display: block;
      margin-right: 56upx;
    }
    .search_text {
      margin-left: 56upx;
    }
  }
}
</style>
