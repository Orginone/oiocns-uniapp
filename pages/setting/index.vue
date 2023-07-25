<template>
  <view class="BaseLayout">
    <appHead :text='"设置"'></appHead>
    <view class="main">
      <mainTag ref="mainTag"  :tabnav="tabnav" @ontype_="ontype"></mainTag>
      <view class="more">
        <img src="../../static/base/menu.png" alt="" />
      </view>
    </view>
    <personList v-show="showType =='0'" :listInfo="menu" :icon="['dotPlus', 'right']"></personList>
    <settingEdit v-show="showType =='1'" ></settingEdit>
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
      showType:0,//显示状态
      menu: [],
      // 线条宽度
      lineW: 10,
      // 是否固定
      fixed: false,
      // 菜单导航
      tabnav: [
        {
          type: '0', //状态值
          name: "全部",
          list: [], //数据
        },
        {
          type: "1", //状态值
          name: "常用",
          list: [], //数据
        },
        {
          type: "2", //状态值
          name: "最近",
          list: [], //数据
        },
      ],
    };
  },
  watch: {},
  onLoad() {
    this.getMenu();
    let that = this;
    // this.userInfo = storage.getItem("currentUser");
    // that.getMyInfo();
  },
  onShow() {
    this.setSetting([{ name: "设置" }]);
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
          itemType:element.item.target.metadata.typeName,
          icon:element?.item?.share?.avatar?.thumbnail
        };
        arr.push(obj);
      });
      // store.setting = res;
      this.menu = arr;
      console.log("this.menu", this.menu);
      // this.showMenu = true;
      // console.log(res,'res')
    },
    ontype(index){
      this.showType = index.type;
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
</style>
