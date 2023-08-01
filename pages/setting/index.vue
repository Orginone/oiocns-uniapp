<template>
  <view class="BaseLayout">
    <appHead :text="'设置'"></appHead>
    <view class="main">
      <mainTag
        ref="mainTag"
        v-if="showTag"
        :tabnav="tabnav"
        @ontype_="ontype"
      ></mainTag>
      <view class="more">
        <img src="../../static/base/menu.png" @click="showPop = true" alt="" />
      </view>
      <showBox v-if="showPop" :showType="'setting'" @childShow= childShow()></showBox>
    </view>
    <personList
      v-show="showType == '全部'"
      :listInfo="menu"
      :icon="['dotPlus', 'right']"
    ></personList>
    <settingEdit v-show="showType == '常用'"></settingEdit>
  </view>
</template>

<script>
import * as config from "./config/menuOperate";
import { mapState, mapMutations } from "vuex";
import { loadApply } from "common/provider";
import { storage } from "common/app";

export default {
  data() {
    return {
      showType: '全部',
      menu: [],
      // 线条宽度
      lineW: 10,
      // 是否固定
      fixed: false,
      // 菜单导航
      showTag: false,
      tabnav: [],
      showPop:false,
    };
  },
  watch: {},
  onLoad() {
    this.getMenu();
  },
  onShow() {
    this.setSetting([{ name: "设置" }]);
    this.org_tag = uni.getStorageSync("org_tag");
    this.tabnav = this.org_tag.setting.select;
    this.showTag = true;
  },
  methods: {
    ...mapMutations(["setSetting"]),
    async getMenu() {
      let res = await config.loadSettingMenu();
      console.log("res", res);
      // this.removeCircularReferences(res)
      let arr = [];
      res.children.forEach((element) => {
        console.log("item", element?.item?.share?.avatar?.thumbnail);
        let obj = {
          label: element.label,
          key: element.key,
          itemType: element.item.target.metadata.typeName,
          icon: element?.item?.share?.avatar?.thumbnail,
        };
        arr.push(obj);
      });
      // store.setting = res;
      this.menu = arr;
      console.log("this.menu", this.menu);
      // this.showMenu = true;
      // console.log(res,'res')
    },
    childShow(){
      this.showPop = false;
    },
    ontype(item) {
      this.showType = item;
    },
    async getMyInfo() {
      // let res = await loadApply({ id: this.userInfo.id,userId: this.userInfo.id });
      // console.log(res, '我发起的');
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
</style>
