<template>
  <view class="BaseLayout">
    <headbar></headbar>
    <personList :listInfo="menu" :icon="['dotPlus', 'right']" ></personList>
  </view>
</template>

<script>
import * as config from "./config/menuOperate";
import { mapState, mapMutations } from 'vuex';
import { loadApply } from "common/provider";
import { storage } from "common/app";

export default {
  data() {
    return {
      menu: [],
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
    this.setSetting([{name:'设置'}]);
  },
  methods: {
    
     ...mapMutations(['setSetting']),
    async getMenu() {
      let res = await config.loadSettingMenu();
      // this.removeCircularReferences(res)
      let arr = []
      res.children.forEach(element => {
         let obj = {
          label:element.label,
          key:element.key
         }
         arr.push(obj)
      });
      // store.setting = res;
      this.menu = arr;
      console.log('this.menu', this.menu);
      // this.showMenu = true;
      // console.log(res,'res')
    },
    async getMyInfo() {
      // let res = await loadApply({ id: this.userInfo.id,userId: this.userInfo.id });
      // console.log(res, '我发起的');
    },
  },
};
</script>

<style lang="scss" scoped></style>
